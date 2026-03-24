import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const res = await fetch(
      `${process.env.API}/gallery/get/${resolvedParams.id}`,
      {
        headers: JSON_HEADER,
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed");

    const data = await res.json();

    return NextResponse.json({
      success: true,
      data: data.data,
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}