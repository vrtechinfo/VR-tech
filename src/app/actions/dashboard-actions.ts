"use server";

import { db } from "@/lib/db";
import { getSignedFileUrl } from "@/lib/utils/r2";

// Interface for contact form submissions
export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  contact: string;
  message: string;
  created_at: Date | string;
}

// Interface for career form submissions with resume URL
export interface CareerSubmission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  resume_path: string;
  resume_url?: string; // Signed URL for downloading the resume
  created_at: Date | string;
}

// Interface for job postings
export interface JobPosting {
  id: number;
  title: string;
  description: string;
  location: string;
  department: string;
  type: string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * Fetch all contact form submissions
 */
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const submissions = await db
      .selectFrom("contact_submissions")
      .selectAll()
      .orderBy("created_at", "desc")
      .execute();
    
    // Format dates to strings if needed for the UI
    return submissions.map(submission => ({
      ...submission,
      created_at: submission.created_at
    }));
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return [];
  }
}

/**
 * Fetch all career form submissions with signed URLs for resumes
 */
export async function getCareerSubmissions(): Promise<CareerSubmission[]> {
  try {
    const submissions = await db
      .selectFrom("career_applications")
      .selectAll()
      .orderBy("created_at", "desc")
      .execute();
    
    // Generate signed URLs for resume downloads
    const submissionsWithUrls = await Promise.all(
      submissions.map(async (submission) => {
        try {
          const resumeUrl = await getSignedFileUrl(submission.resume_path, 3600); // 1 hour expiration
          return { ...submission, resume_url: resumeUrl };
        } catch (error) {
          console.error(`Error generating signed URL for ${submission.resume_path}:`, error);
          return { ...submission, resume_url: undefined };
        }
      })
    );
    
    // Format dates to strings if needed for the UI
    return submissionsWithUrls;
  } catch (error) {
    console.error("Error fetching career submissions:", error);
    return [];
  }
}

/**
 * Fetch all job postings
 */
export async function getJobPostings(): Promise<JobPosting[]> {
  try {
    const postings = await db
      .selectFrom("job_postings")
      .selectAll()
      .orderBy("created_at", "desc")
      .execute();
    
    return postings;
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return [];
  }
}

/**
 * Create a new job posting
 */
export async function createJobPosting(jobData: Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>): Promise<JobPosting | null> {
  try {
    const result = await db
      .insertInto("job_postings")
      .values({
        title: jobData.title,
        description: jobData.description,
        location: jobData.location,
        department: jobData.department,
        type: jobData.type
      })
      .returning(["id", "title", "description", "location", "department", "type", "created_at", "updated_at"])
      .executeTakeFirstOrThrow();
    
    return result;
  } catch (error) {
    console.error("Error creating job posting:", error);
    return null;
  }
}

/**
 * Delete a job posting by ID
 */
export async function deleteJobPosting(id: number): Promise<boolean> {
  try {
    await db
      .deleteFrom("job_postings")
      .where("id", "=", id)
      .execute();
    
    return true;
  } catch (error) {
    console.error(`Error deleting job posting with ID ${id}:`, error);
    return false;
  }
}
