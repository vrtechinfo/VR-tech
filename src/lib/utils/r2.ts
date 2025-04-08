import { 
  S3Client, 
  PutObjectCommand,
  GetObjectCommand 
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import path from "node:path";

// R2 configuration
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || "";

/**
 * Uploads a file to Cloudflare R2 storage
 * @param file The file to upload
 * @param folder Optional folder path within the bucket (e.g., 'resumes')
 * @returns The key (path) of the uploaded file
 */
export async function uploadToR2(
  file: File,
  folder = "resumes"
): Promise<string> {
  // Generate a unique filename to avoid collisions
  const fileExtension = path.extname(file.name);
  const fileName = `${randomUUID()}${fileExtension}`;
  const key = `${folder}/${fileName}`;

  // Convert File to Buffer and upload to R2
  const buffer = Buffer.from(await file.arrayBuffer());

  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return key;
}

/**
 * Generates a signed URL for a file in R2 storage
 * @param key The key (path) of the file in R2
 * @param expiresIn Expiration time in seconds (default: 1 hour)
 * @returns A signed URL that can be used to access the file
 */
export async function getSignedFileUrl(
  key: string, 
  expiresIn = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(r2Client, command, { expiresIn });
}
