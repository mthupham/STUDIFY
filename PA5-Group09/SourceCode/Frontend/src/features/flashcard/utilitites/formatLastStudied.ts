export function formatLastStudied(
  lastStudiedAt: string | Date | null | undefined,
): string {
  if (!lastStudiedAt) {
    return "Never";
  }

  const studiedTime = new Date(lastStudiedAt).getTime();
  const now = Date.now();

  const diffMs = now - studiedTime;

  if (diffMs < 0) {
    return "Just now";
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }

  const diffYears = Math.floor(diffDays / 365);

  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}
