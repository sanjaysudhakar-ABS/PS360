import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Floating click-to-call / WhatsApp buttons. Each renders only when the
 * corresponding number is configured in site-config, so the site works
 * email-first until real numbers are added.
 */
export function FloatingContactButtons() {
  const { whatsapp, phoneE164 } = siteConfig.contact;
  if (!whatsapp && !phoneE164) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      )}
      {phoneE164 && (
        <a
          href={`tel:${phoneE164}`}
          aria-label={`Call ${siteConfig.name}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg shadow-black/20 transition hover:scale-105"
        >
          <Phone className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}
