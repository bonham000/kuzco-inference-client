export default function randomInRange(start: number, end: number): number {
  if (start > end) {
    throw new Error("Start must be less than or equal to end");
  }

  const range = end - start;
  return Math.floor(Math.random() * (range + 1)) + start;
}
