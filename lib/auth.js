import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "insecure-dev-secret-change-me";
export const ADMIN_COOKIE_NAME = "examniti_admin_token";

/** Sign a short-lived admin session token. */
export function signAdminToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

/** Verify a token string, returning true only if it is a valid admin token. */
export function verifyAdminToken(token) {
  if (!token) return false;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Reads the admin cookie from the current request context (works in
 * Server Components and Route Handlers) and reports whether the caller
 * is an authenticated admin.
 */
export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}
