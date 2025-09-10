// `mailto:` with an optional subject and body. `encodeURIComponent` turns
// spaces into "%20" and line breaks into "%0A", which mail clients read
// fine; "+" would arrive literally.
export function buildMailtoUrl(email: string, subject?: string, body?: string): string {
  const params = new Array<string>();
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return params.length ? `mailto:${email}?${params.join("&")}` : `mailto:${email}`;
}
