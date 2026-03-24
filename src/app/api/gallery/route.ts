import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.API}/gallery/get`, {
      headers: JSON_HEADER,
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed");

    const data = await res.json();

    return NextResponse.json({
      success: true,
      data: data.data, // ⚠️ still nested
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}