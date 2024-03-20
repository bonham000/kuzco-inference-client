export default function openLink(link: string): void {
  window.open(link, "_blank")?.focus();
}
