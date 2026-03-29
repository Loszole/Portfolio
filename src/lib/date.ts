const monthYearFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatMonthYear(value: string) {
  return monthYearFormatter.format(new Date(value));
}

export function formatLongDate(value: string) {
  return longDateFormatter.format(new Date(value));
}
