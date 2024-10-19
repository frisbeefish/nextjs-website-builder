export function timestampToFriendlyDate(timestamp) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const d = new Date(Date.parse(timestamp));
  return d.toLocaleDateString(undefined, options);
}
