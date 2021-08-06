export function toFormData(data: Record<string, any>) {
  return new URLSearchParams(
    Object.entries(data).map(([key, value]) => [key, String(value)])
  );
}

export function getURLOrigin(url: string) {
  return url.replace(/\/+$/, "");
}

export const formDataHeaders = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
};
