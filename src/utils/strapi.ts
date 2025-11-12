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

// Helper function để kiểm tra xem URL có phải domain production không
export function isProductionDomain(url: string): boolean {
  try {
    const strapiUrlObj = new URL(STRAPI_URL);
    const urlObj = new URL(url);
    return urlObj.hostname === strapiUrlObj.hostname;
  } catch {
    // Nếu không parse được URL, kiểm tra bằng string
    const baseUrl = STRAPI_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return url.includes(baseUrl);
  }
}
