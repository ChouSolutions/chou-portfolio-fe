import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Route handler để revalidate cache on-demand
// Có thể gọi từ webhook hoặc admin panel
export async function POST(request: NextRequest) {
  try {
    const { tag, secret } = await request.json();

    // Kiểm tra secret để bảo mật (nên đặt trong env)
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Revalidate với stale-while-revalidate (profile="max")
    if (tag) {
      revalidateTag(tag, "max");
      return NextResponse.json({
        revalidated: true,
        tag,
        now: Date.now(),
      });
    }

    // Nếu không có tag, revalidate tất cả posts
    revalidateTag("posts", "max");
    return NextResponse.json({
      revalidated: true,
      tag: "posts",
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 }
    );
  }
}

