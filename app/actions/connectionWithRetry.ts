async function connectWithRetry(fn: () => Promise<any>, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`DB connection failed, retrying… (${i + 1})`);
      await new Promise((r) => setTimeout(r, 1000)); // wait 1s
    }
  }
  throw new Error("Could not connect to DB after retries");
}