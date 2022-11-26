import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(request)
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

export const config = {
  matcher: ["/user/:path*", "/dashboard/:path*", "/shopping/:path*"],
};
