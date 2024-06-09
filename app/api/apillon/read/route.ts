//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const data = await req.formData();
  const uuid = data.get("directoryUuid");
  const wallet = data.get("walletAddress");
  // console.log("wallet", wallet, uuid);

  if (!uuid) {
    return NextResponse.json({
      message: "No Files Uploaded yet",
      status: "ok",
      data: { total: 0, items: [] },
    });
  }
  // Initialize the SDK
  const storage = new Storage({
    key: process.env.APILLION_API_KEY,
    secret: process.env.APILLION_SECRET,
    logLevel: LogLevel.VERBOSE,
  });

  // create and instance of a bucket directly through uuid
  const bucket = storage.bucket("e8d36da5-e9e9-46ce-ba4c-f5c4eab61a35");

  // list objects (files, folders) in a bucket
  const objects = await bucket.listObjects({
    directoryUuid: uuid,
    markedForDeletion: false,
    limit: 10,
  });

  return NextResponse.json({
    message: "Read Successful",
    status: "ok",
    data: objects,
  });
}
