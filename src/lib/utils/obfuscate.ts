/**
 * URL-safe Base64 encoding/decoding to obfuscate MongoDB hex IDs in the URL.
 */

export function encodeId(id: string): string {
  if (!id) return "";
  try {
    // btoa is built-in. Convert plain hex string to base64
    const base64 = btoa(id);
    // Make it URL-safe: replace +, / and remove trailing =
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (e) {
    return id;
  }
}

export function decodeId(encoded: string): string {
  if (!encoded) return "";
  try {
    // Add back URL-safe characters
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    // Restore padding
    while (base64.length % 4) {
      base64 += "=";
    }
    // Decode with atob
    return atob(base64);
  } catch (e) {
    return encoded;
  }
}
