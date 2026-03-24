import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.API}/services/get`, {
      headers: JSON_HEADER,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      data: data.data,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error loading services" },
      { status: 500 }
    );
  }
}