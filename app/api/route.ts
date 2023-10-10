import { NextResponse } from "next/server";

// Notice the funciton definiton:
export async function GET(req:Request) {
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405,
    }
  );
}


