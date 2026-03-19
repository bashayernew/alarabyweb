import { NextResponse } from "next/server";

/**
 * Universal 500 error handler for request-creation APIs.
 * - Logs full error to Vercel/server console for debugging
 * - Returns real error + stack when DEBUG_REQUESTS=true
 * - Returns generic message in production
 * - Includes envDebugRequests in debug response to verify env var is read at runtime
 */
export function handleApiError(
  err: unknown,
  context: string,
  genericMessage: string
): NextResponse {
  const isDebug = process.env.DEBUG_REQUESTS?.toLowerCase() === "true";
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : JSON.stringify(err);
  const stack = err instanceof Error ? err.stack : undefined;

  console.error("🔥 NEW DEPLOY CHECK - DEBUG_REQUESTS =", process.env.DEBUG_REQUESTS);
  console.error(`[${context}] API ERROR`);
  console.error("DEBUG_REQUESTS =", process.env.DEBUG_REQUESTS);
  console.error("Error message =", message);
  if (stack) console.error(stack);
  console.error("Raw error =", err);

  return NextResponse.json(
    isDebug
      ? {
          error: message || "Unknown error",
          stack: stack ?? null,
          context,
          debug: true,
          envDebugRequests: process.env.DEBUG_REQUESTS ?? null,
        }
      : {
          error: genericMessage,
        },
    { status: 500 }
  );
}
