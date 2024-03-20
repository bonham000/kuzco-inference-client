export default async function sleep(timeMilliseconds = 5_000): Promise<void> {
  await new Promise((resolve, _) => {
    setTimeout(resolve, timeMilliseconds);
  });
}
