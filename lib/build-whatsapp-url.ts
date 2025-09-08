// `https://wa.me/<number>?text=…`: opens a chat with the crew with the
// message already typed. The number carries the country code and digits
// only; the text is encoded so line breaks and accents survive.
export function buildWhatsappUrl(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) throw new Error("Expected a phone number with digits");
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
