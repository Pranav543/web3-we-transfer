//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const data = await req.formData();
  const file = data.get("file");
  const wallet = data.get("walletAddress");
  console.log("wallet", wallet);

  // file is the file object
  const content = await file?.arrayBuffer();
  const fileName = file?.name;
  const contentType = file?.type;

  // Initialize the SDK
  const storage = new Storage({
    key: process.env.APILLION_API_KEY,
    secret: process.env.APILLION_SECRET,
    logLevel: LogLevel.VERBOSE,
  });

  // list buckets
  const buckets = await storage.listBuckets({ limit: 5 });

  // create and instance of a bucket directly through uuid
  const bucket = storage.bucket("e8d36da5-e9e9-46ce-ba4c-f5c4eab61a35");

  const uploadResult = await bucket.uploadFiles(
    [
      {
        fileName: fileName,
        contentType: contentType,
        content: content,
      },
    ],
    // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
    { wrapWithDirectory: true, directoryPath: `user_data/${wallet}` }
  );

  const uploadedFile = await bucket.file(uploadResult[0].fileUuid).get();

  return NextResponse.json({
    message: "File uploaded successfully",
    status: "ok",
    data: uploadResult,
    file: uploadedFile,
  });
}
