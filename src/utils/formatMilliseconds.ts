export default function formatMilliseconds(milliseconds: number): string {
  return (milliseconds / 1000).toFixed(2);
}
