import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-change-this-secret-please");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("edumanage_session")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = { matcher: ["/dashboard/:path*"] };
