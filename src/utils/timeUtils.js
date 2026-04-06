export function generateTimeRange(startTime, hours) {
  const start = new Date(startTime);

  if (isNaN(start)) {
    throw new Error("Invalid start time received");
  }

  const end = new Date(start);
  end.setTime(end.getTime() + hours * 60 * 60 * 1000);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
    nextStart: end, // ✅ REQUIRED
  };
}