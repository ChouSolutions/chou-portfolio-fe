export const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

// Helper function để đảm bảo URL không có trailing slash
export function getStrapiUrl(path: string = ""): string {
  const baseUrl = STRAPI_URL.endsWith("/")
    ? STRAPI_URL.slice(0, -1)
    : STRAPI_URL;

  if (!path) return baseUrl;

  // Nếu path đã bắt đầu bằng /, không thêm / nữa
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
