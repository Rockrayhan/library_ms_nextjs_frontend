import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    // Call backend logout (optional, if your backend needs to invalidate tokens)
    if (accessToken) {
      try {
        await fetch(`${process.env.BACKEND_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Cookie': `accessToken=${accessToken}`,
          },
        });
      } catch (err) {
        console.error("Backend logout error:", err);
        // Continue even if backend logout fails
      }
    }

    const response = NextResponse.json({ 
      success: true,
      message: "Logged out successfully" 
    });

    // Clear cookies
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}