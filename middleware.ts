import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./plugins/axios";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookies = request.cookies;

  if (
    cookies.get("roal_cases/access_token") &&
    cookies.get("roal_cases/refresh_token")
  ) {
    return NextResponse.next();
  } else {
    return NextResponse.rewrite("http://localhost:3000/sign-in");
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/dashboard/:path*"],
};
