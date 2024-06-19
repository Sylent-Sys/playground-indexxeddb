import { NextResponse } from "next/server";
import { sample } from "../../../../data/sample";

export async function GET() {
    return NextResponse.json(sample);
}