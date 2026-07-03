import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${siteConfig.contact.phoneE164}`}
        aria-label={`Call ${siteConfig.name}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg shadow-black/20 transition hover:scale-105"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
