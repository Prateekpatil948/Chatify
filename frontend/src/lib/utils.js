export function formatMessageTime(date) {
  if (!date) return "";

  const msgDate = new Date(date);
  const now = new Date();

  const isToday = msgDate.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = msgDate.toDateString() === yesterday.toDateString();

  const time = msgDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) return time;
  if (isYesterday) return `Yesterday, ${time}`;

  const fullDate = msgDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `${fullDate}, ${time}`;
}
