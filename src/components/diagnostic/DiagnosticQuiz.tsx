"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  pillars,
  questions,
  bands,
  pillarRecommendations,
  painPoints,
} from "@/lib/diagnostic-data";
import { siteConfig } from "@/lib/site-config";

type Stage = "intro" | "quiz" | "results" | "done";

const MAX_SCORE = questions.length * 4;
const MAX_PAIN_POINTS = 3;

/* ---------- deterministic pulse waveform (SSR-safe) ---------- */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pulsePath(health: number): string {
  const rand = mulberry32(Math.round(health * 1000) + 7);
  const w = 300;
  const mid = 32;
  const beats = 3;
  const segW = w / beats;
  const jitter = (1 - health) * 14;
  const amp = 14 + (1 - health) * 10;
  let d = `M0 ${mid}`;
  for (let i = 0; i < beats; i++) {
    const x0 = i * segW;
    const noise = () => (rand() - 0.5) * jitter;
    d += ` L${(x0 + segW * 0.18).toFixed(1)} ${(mid + noise() * 0.3).toFixed(1)}`;
    d += ` L${(x0 + segW * 0.3).toFixed(1)} ${(mid - amp - noise()).toFixed(1)}`;
    d += ` L${(x0 + segW * 0.4).toFixed(1)} ${(mid + amp * 1.3 + noise()).toFixed(1)}`;
    d += ` L${(x0 + segW * 0.5).toFixed(1)} ${(mid - amp * 0.4).toFixed(1)}`;
    d += ` L${(x0 + segW * 0.65).toFixed(1)} ${(mid + noise() * 0.3).toFixed(1)}`;
    d += ` L${(x0 + segW).toFixed(1)} ${mid}`;
  }
  return d;
}

function healthColor(health: number): string {
  if (health < 0.45) return "#f87171";
  if (health < 0.7) return "#fbbf24";
  return "#34d399";
}

function Pulse({ health, color }: { health: number; color: string }) {
  const d = pulsePath(health);
  return (
    <div
      className="relative mx-6 h-16 overflow-hidden border-y border-white/10 sm:mx-8"
      aria-hidden="true"
    >
      <span className="absolute right-2 top-1.5 z-10 rounded bg-brand-950 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-white/40">
        CX PULSE
      </span>
      <svg
        className="pulse-anim absolute left-0 top-0 h-16 w-[200%]"
        viewBox="0 0 600 64"
        preserveAspectRatio="none"
      >
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={d}
          transform="translate(300 0)"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ---------- animated score count-up ---------- */

function useCountUp(target: number, durationMs = 900): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);
  return value;
}

/* ---------- main component ---------- */

export function DiagnosticQuiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null),
  );
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const health = useMemo(() => {
    const answered = answers.filter((a): a is number => a !== null);
    if (answered.length === 0) return 0.35;
    return answered.reduce((a, b) => a + b, 0) / (answered.length * 4);
  }, [answers]);

  const results = useMemo(() => {
    const total = answers.reduce((a: number, b) => a + (b ?? 0), 0);
    const band = bands.find((b) => total <= b.max) ?? bands[bands.length - 1];
    const pillarScores = pillars.map((name, pIdx) => {
      let sum = 0;
      questions.forEach((q, i) => {
        if (q.pillar === pIdx) sum += answers[i] ?? 0;
      });
      return { name, score: sum, max: 12 };
    });
    const weakest = pillarScores.reduce(
      (min, p, i) => (p.score < pillarScores[min].score ? i : min),
      0,
    );
    return { total, band, pillarScores, weakest };
  }, [answers]);

  const selectAnswer = useCallback(
    (optIndex: number) => {
      if (advanceTimer.current) return;
      const score = questions[qIndex].options[optIndex].score;
      setAnswers((prev) => {
        const next = [...prev];
        next[qIndex] = score;
        return next;
      });
      setFlashIndex(optIndex);
      advanceTimer.current = setTimeout(() => {
        advanceTimer.current = null;
        setFlashIndex(null);
        if (qIndex < questions.length - 1) {
          setQIndex(qIndex + 1);
        } else {
          setStage("results");
        }
      }, 260);
    },
    [qIndex],
  );

  const goBack = useCallback(() => {
    if (advanceTimer.current) return;
    if (qIndex > 0) setQIndex(qIndex - 1);
  }, [qIndex]);

  // Keyboard: 1-4 / A-D answer, ← goes back.
  useEffect(() => {
    if (stage !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const num = ["1", "2", "3", "4"].indexOf(k);
      const letter = ["a", "b", "c", "d"].indexOf(k);
      const idx = num >= 0 ? num : letter;
      if (idx >= 0 && idx < questions[qIndex].options.length) {
        e.preventDefault();
        selectAnswer(idx);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, qIndex, selectAnswer, goBack]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const restart = () => {
    setStage("intro");
    setQIndex(0);
    setAnswers(new Array(questions.length).fill(null));
  };

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-brand-950 text-white shadow-xl">
      {stage === "intro" && (
        <Intro onStart={() => setStage("quiz")} />
      )}
      {stage === "quiz" && (
        <Quiz
          qIndex={qIndex}
          answers={answers}
          health={health}
          flashIndex={flashIndex}
          onSelect={selectAnswer}
          onBack={goBack}
        />
      )}
      {stage === "results" && (
        <Results
          results={results}
          onDone={() => setStage("done")}
          onRestart={restart}
        />
      )}
      {stage === "done" && <ThankYou band={results.band.name} onRestart={restart} />}
      <p className="pb-4 pt-3 text-center font-mono text-[10px] tracking-widest text-white/25">
        PS360 CONSULTING — POST-SALES CUSTOMER EXPERIENCE
      </p>
    </div>
  );
}

/* ---------- intro ---------- */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div className="px-6 pt-7 sm:px-8">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
          {siteConfig.name}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-[26px]">
          The Post-Sales Health Diagnostic
        </h2>
        <p className="mb-5 mt-2 max-w-xl text-sm leading-relaxed text-white/60">
          15 questions. 3 minutes. A clear read on how your customer
          experience actually holds up after the deal closes — built by
          operators who&apos;ve run this function across tech and non-tech
          companies.
        </p>
      </div>
      <Pulse health={0.35} color="#fbbf24" />
      <div className="px-6 pb-8 pt-5 sm:px-8">
        <div className="mb-6 flex flex-wrap gap-5">
          {["15 questions", "5 pillars scored", "Instant results"].map(
            (item) => (
              <span
                key={item}
                className="flex items-center gap-2 font-mono text-[11.5px] text-white/50"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                {item}
              </span>
            ),
          )}
        </div>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-400"
        >
          Start the diagnostic
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

/* ---------- quiz ---------- */

function Quiz({
  qIndex,
  answers,
  health,
  flashIndex,
  onSelect,
  onBack,
}: {
  qIndex: number;
  answers: (number | null)[];
  health: number;
  flashIndex: number | null;
  onSelect: (optIndex: number) => void;
  onBack: () => void;
}) {
  const q = questions[qIndex];
  const color = healthColor(health);
  const savedScore = answers[qIndex];

  return (
    <>
      <div className="px-6 pt-7 sm:px-8">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
          {siteConfig.name}
        </p>
        <h2 className="mb-5 text-2xl font-semibold tracking-tight">
          The Post-Sales Health Diagnostic
        </h2>
      </div>
      <Pulse health={health} color={color} />

      <div className="flex gap-1 px-6 pt-4 sm:px-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors ${
              i < qIndex
                ? "bg-accent-400"
                : i === qIndex
                  ? "bg-accent-400/40"
                  : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className="px-6 pt-3 font-mono text-[11px] uppercase tracking-wider text-white/50 sm:px-8">
        Pillar {q.pillar + 1} of 5 — {pillars[q.pillar]}
      </p>

      <div className="min-h-[280px] px-6 pb-8 pt-4 sm:px-8">
        <p className="mb-5 text-lg font-medium leading-snug sm:text-xl">
          {q.question}
        </p>
        <div className="flex flex-col gap-2.5" role="group" aria-label="Answer options">
          {q.options.map((opt, i) => {
            const isSaved = savedScore === opt.score && flashIndex === null;
            const isFlashing = flashIndex === i;
            return (
              <button
                key={opt.text}
                type="button"
                onClick={() => onSelect(i)}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm leading-snug transition ${
                  isFlashing || isSaved
                    ? "border-accent-400 bg-accent-500/15"
                    : "border-white/10 bg-white/5 hover:border-accent-400/60 hover:bg-white/10"
                }`}
              >
                <span className="mt-px shrink-0 rounded border border-white/15 px-1.5 font-mono text-[11px] text-white/50">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={qIndex === 0}
            className="flex items-center gap-1.5 text-[13px] text-white/50 transition hover:text-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <span className="font-mono text-[11px] text-white/50">
            {qIndex + 1} / {questions.length}
            <span className="ml-3 hidden text-white/30 sm:inline">
              tip: press A–D
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/* ---------- results + pain points + lead capture ---------- */

interface ResultsData {
  total: number;
  band: (typeof bands)[number];
  pillarScores: { name: string; score: number; max: number }[];
  weakest: number;
}

function Results({
  results,
  onDone,
  onRestart,
}: {
  results: ResultsData;
  onDone: () => void;
  onRestart: () => void;
}) {
  const { total, band, pillarScores, weakest } = results;
  const displayScore = useCountUp(total);
  const [barsIn, setBarsIn] = useState(false);
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [otherPain, setOtherPain] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setBarsIn(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Suggest pain points tied to the two weakest pillars first.
  const orderedPainPoints = useMemo(() => {
    const byScore = [...pillarScores.keys()].sort(
      (a, b) => pillarScores[a].score - pillarScores[b].score,
    );
    const weakTwo = new Set(byScore.slice(0, 2));
    return [...painPoints].sort((a, b) => {
      const aw = a.pillars.some((p) => weakTwo.has(p)) ? 0 : 1;
      const bw = b.pillars.some((p) => weakTwo.has(p)) ? 0 : 1;
      return aw - bw;
    });
  }, [pillarScores]);

  const suggestedIds = useMemo(() => {
    const byScore = [...pillarScores.keys()].sort(
      (a, b) => pillarScores[a].score - pillarScores[b].score,
    );
    const weakTwo = new Set(byScore.slice(0, 2));
    return new Set(
      painPoints
        .filter((p) => p.pillars.some((pl) => weakTwo.has(pl)))
        .map((p) => p.id),
    );
  }, [pillarScores]);

  const togglePain = (id: string) => {
    setSelectedPains((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= MAX_PAIN_POINTS) return prev;
      return [...prev, id];
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const company = formData.get("company")?.toString().trim() ?? "";
    const stageValue = formData.get("stage")?.toString() ?? "";

    if (!name || !email || !company || !stageValue) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (selectedPains.length === 0 && !otherPain.trim()) {
      setFormError("Pick at least one pain point above (or describe your own).");
      return;
    }
    setFormError("");
    setSubmitState("submitting");

    const painLabels = selectedPains
      .map((id) => painPoints.find((p) => p.id === id)?.label ?? id)
      .join("; ");
    const pillarSummary = pillarScores
      .map((p) => `${p.name}: ${p.score}/${p.max}`)
      .join(" | ");

    const body = new URLSearchParams();
    body.append("form-name", "diagnostic");
    body.append("bot-field", formData.get("bot-field")?.toString() ?? "");
    body.append("name", name);
    body.append("email", email);
    body.append("company", company);
    body.append("stage", stageValue);
    body.append("score", `${total}/${MAX_SCORE}`);
    body.append("band", band.name);
    body.append("pillars", pillarSummary);
    body.append("pain_points", painLabels);
    body.append("pain_points_other", otherPain.trim());

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Failed with ${response.status}`);
      onDone();
    } catch (error) {
      console.error("Diagnostic lead submission failed:", error);
      setFormError(
        `Something went wrong. Please try again, or email us at ${siteConfig.contact.email}.`,
      );
      setSubmitState("idle");
    }
  }

  return (
    <>
      <div className="px-6 pt-7 sm:px-8">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
          {siteConfig.name}
        </p>
        <h2 className="mb-5 text-2xl font-semibold tracking-tight">
          Your Diagnostic Result
        </h2>
      </div>
      <Pulse health={total / MAX_SCORE} color={band.color} />

      <div className="px-6 pb-8 pt-4 sm:px-8">
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono text-5xl font-semibold"
            style={{ color: band.color }}
          >
            {displayScore}
          </span>
          <span className="font-mono text-lg text-white/50">
            / {MAX_SCORE}
          </span>
        </div>
        <p
          className="mb-3 mt-1 text-lg font-semibold"
          style={{ color: band.color }}
        >
          {band.name}
        </p>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/60">
          {band.text}
        </p>

        <div className="mb-6 flex flex-col gap-3">
          {pillarScores.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-[130px] shrink-0 text-xs text-white/60 sm:w-[170px] sm:text-[12.5px]">
                {p.name}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: barsIn ? `${(p.score / p.max) * 100}%` : "0%",
                    background: band.color,
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
              </div>
              <span className="w-9 shrink-0 text-right font-mono text-xs text-white/50">
                {p.score}/{p.max}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-7 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-accent-400">
            Where we&apos;d start
          </p>
          <p className="mt-1.5 text-sm font-medium">
            {pillarScores[weakest].name}
            <span className="font-mono text-white/40">
              {" "}
              — {pillarScores[weakest].score}/{pillarScores[weakest].max}
            </span>
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">
            {pillarRecommendations[weakest]}
          </p>
        </div>

        <hr className="mb-6 border-white/10" />

        <form
          name="diagnostic"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="form-name" value="diagnostic" />
          <div className="hidden" aria-hidden="true">
            <input name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <p className="text-[17px] font-semibold">
            What are the 2–3 pain points you most need to solve?
          </p>
          <p className="mb-4 mt-1 text-[13px] leading-relaxed text-white/55">
            Pick up to {MAX_PAIN_POINTS}. We&apos;ve highlighted the ones that
            usually go with your two weakest pillars.
          </p>

          <div className="mb-3 flex flex-wrap gap-2">
            {orderedPainPoints.map((p) => {
              const selected = selectedPains.includes(p.id);
              const suggested = suggestedIds.has(p.id);
              const disabled =
                !selected && selectedPains.length >= MAX_PAIN_POINTS;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePain(p.id)}
                  disabled={disabled}
                  aria-pressed={selected}
                  className={`rounded-full border px-3.5 py-2 text-[13px] transition ${
                    selected
                      ? "border-accent-400 bg-accent-500/20 text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-accent-400/60 hover:text-white"
                  } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  {p.label}
                  {suggested && !selected && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-accent-400">
                      suggested
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={otherPain}
            onChange={(e) => setOtherPain(e.target.value)}
            placeholder="Something else? Describe it in a sentence (optional)"
            className="mb-7 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-accent-400"
          />

          <p className="text-[17px] font-semibold">Get the full breakdown</p>
          <p className="mb-4 mt-1 text-[13px] leading-relaxed text-white/55">
            A 20-minute call to walk through your weakest pillar and one
            concrete fix you can put in place this month — no pitch, just the
            diagnosis.
          </p>

          <div className="mb-4 flex flex-col gap-2.5">
            <input
              name="name"
              type="text"
              placeholder="Full name"
              autoComplete="name"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-accent-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Work email"
              autoComplete="email"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-accent-400"
            />
            <input
              name="company"
              type="text"
              placeholder="Company name"
              autoComplete="organization"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-accent-400"
            />
            <select
              name="stage"
              defaultValue=""
              className="w-full rounded-lg border border-white/15 bg-brand-950 px-3.5 py-2.5 text-sm text-white outline-none focus:border-accent-400"
            >
              <option value="" disabled>
                Company stage
              </option>
              <option value="pre-revenue">Pre-revenue / early stage</option>
              <option value="under-1m">Under $1M revenue</option>
              <option value="1m-5m">$1M – $5M revenue</option>
              <option value="over-5m">Over $5M revenue</option>
            </select>
          </div>

          {formError && (
            <p className="mb-3 text-sm text-red-400">{formError}</p>
          )}

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState === "submitting" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {submitState === "submitting"
              ? "Sending…"
              : "Send me my full results"}
          </button>
        </form>

        <button
          type="button"
          onClick={onRestart}
          className="mt-4 block w-full text-center text-xs text-white/40 underline hover:text-white/70"
        >
          Retake the diagnostic
        </button>
      </div>
    </>
  );
}

/* ---------- thank you ---------- */

function ThankYou({
  band,
  onRestart,
}: {
  band: string;
  onRestart: () => void;
}) {
  return (
    <>
      <div className="px-6 pt-7 sm:px-8">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
          {siteConfig.name}
        </p>
        <h2 className="mb-5 text-2xl font-semibold tracking-tight">
          You&apos;re all set
        </h2>
      </div>
      <Pulse health={1} color="#34d399" />
      <div className="px-6 pb-8 pt-6 text-center sm:px-8">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400 bg-emerald-400/10">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        </div>
        <p className="text-[17px] font-semibold">
          Your {band} result is on its way
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-white/55">
          We&apos;ll follow up within one business day with your full
          breakdown and where we&apos;d start.
          {siteConfig.calendlyUrl
            ? " If you'd rather skip ahead, grab time directly below."
            : ""}
        </p>
        {siteConfig.calendlyUrl ? (
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-400"
          >
            Book your 20-min diagnostic call →
          </a>
        ) : (
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-5 inline-block rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-400"
          >
            Or email us: {siteConfig.contact.email}
          </a>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="mt-5 block w-full text-center text-xs text-white/40 underline hover:text-white/70"
        >
          Retake the diagnostic
        </button>
      </div>
    </>
  );
}
