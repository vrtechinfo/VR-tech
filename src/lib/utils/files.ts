import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Base upload directory path relative to project root
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Save a file from FormData to the server's file system
 * @param file The file to save
 * @param subDirectory Optional subdirectory within the uploads folder
 * @returns The relative path to the saved file that can be stored in the database
 */
export async function saveFile(
	file: File,
	subDirectory = "resumes",
): Promise<string> {
	// Create upload directory if it doesn't exist
	const uploadPath = path.join(UPLOAD_DIR, subDirectory);
	fs.mkdirSync(uploadPath, { recursive: true });

	// Generate a unique filename to avoid collisions
	const fileExtension = path.extname(file.name);
	const fileName = `${randomUUID()}${fileExtension}`;
	const filePath = path.join(uploadPath, fileName);

	// Convert File to Buffer and save it
	const buffer = Buffer.from(await file.arrayBuffer());
	fs.writeFileSync(filePath, buffer);

	// Return the relative path for storing in the database
	return `/uploads/${subDirectory}/${fileName}`;
}
