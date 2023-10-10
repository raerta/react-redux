import { getItems } from "@/app/services/apiServices/getItems";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const items = getItems();
    return NextResponse.json({ message: "OK", items }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "error", error });
  }
}
