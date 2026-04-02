export function generateTimeRange(startTime, hours) {
  const start = new Date(startTime);

  if (isNaN(start)) {
    throw new Error("Invalid start time received");
  }

  const end = new Date(start);
  end.setHours(end.getHours() + hours);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
    nextStart: end, // ✅ REQUIRED
  };
}