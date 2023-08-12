export function generateUniqueId(type?: string): string {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36);
  if (type) {
    return type + "-" + timestamp + randomString;
  }
  return timestamp + randomString;
}
