export function generateTimeRange(date, hours) {
  const start = new Date(date);
  const end = new Date(start);

  end.setHours(start.getHours() + hours);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
    nextStart: end,
  };
}