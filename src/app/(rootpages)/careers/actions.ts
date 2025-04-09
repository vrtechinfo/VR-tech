'use server'

import { db } from '@/lib/db';

export type JobRole = {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  type: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Fetch all job postings from the database
 */
export async function getJobRoles(): Promise<JobRole[]> {
  try {
    const jobs = await db
      .selectFrom('job_postings')
      .select(['id', 'title', 'description', 'location', 'department', 'type', 'created_at', 'updated_at'])
      .orderBy('created_at', 'desc')
      .execute();
    
    // Convert numeric IDs to strings for consistency with the frontend
    return jobs.map(job => ({
      ...job,
      id: job.id.toString()
    }));
  } catch (error) {
    console.error('Failed to fetch job roles:', error);
    throw new Error('Failed to fetch job roles');
  }
}

/**
 * Create a new job posting
 */
export async function createJobPosting(jobData: Omit<JobRole, 'id' | 'created_at' | 'updated_at'>): Promise<JobRole> {
  try {
    const result = await db
      .insertInto('job_postings')
      .values({
        title: jobData.title,
        description: jobData.description,
        location: jobData.location,
        department: jobData.department,
        type: jobData.type
      })
      .returning(['id', 'title', 'description', 'location', 'department', 'type', 'created_at', 'updated_at'])
      .executeTakeFirstOrThrow();
    
    return {
      ...result,
      id: result.id.toString()
    };
  } catch (error) {
    console.error('Failed to create job posting:', error);
    throw new Error('Failed to create job posting');
  }
}

/**
 * Delete a job posting by ID
 */
export async function deleteJobPosting(id: string): Promise<void> {
  try {
    await db
      .deleteFrom('job_postings')
      .where('id', '=', Number.parseInt(id, 10))
      .execute();
  } catch (error) {
    console.error(`Failed to delete job posting with ID ${id}:`, error);
    throw new Error('Failed to delete job posting');
  }
}
