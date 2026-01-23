'use server'

import { db } from '@/lib/db';

export type JobRole = {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  type: string;
  status: 'active' | 'inactive' | 'archived';
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Fetch all job postings from the database
 */
export async function getJobRoles(): Promise<JobRole[]> {
  // Check if DATABASE_URL is set, otherwise return mock data immediately to avoid unnecessary connection attempts
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set. Using mock job data.');
    return getMockJobRoles();
  }

  try {
    const jobs = await db
      .selectFrom('job_postings')
      .select(['id', 'title', 'description', 'location', 'department', 'type', 'status', 'created_at', 'updated_at'])
      .orderBy('created_at', 'desc')
      .execute();

    // Convert numeric IDs to strings for consistency with the frontend
    return jobs.map(job => ({
      ...job,
      id: job.id.toString()
    }));
  } catch (error) {
    console.error('Failed to fetch job roles from database, falling back to mock data:', error);
    return getMockJobRoles();
  }
}

/**
 * Mock data fallback for when database is unavailable
 */
function getMockJobRoles(): JobRole[] {
  return [
    {
      id: '1',
      title: 'Frontend Developer',
      description: 'We are looking for a skilled Frontend Developer to join our engineering team. You will be responsible for implementing visual elements and user interactions that users see and interact with in our web applications.',
      location: 'Hyderabad/Remote',
      department: 'Engineering',
      type: 'Full-time',
      status: 'active'
    },
    {
      id: '2',
      title: 'UI/UX Designer',
      description: 'We are seeking a talented UI/UX Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills, and be able to translate high-level requirements into interaction flows and artifacts.',
      location: 'Hyderabad/Hybrid',
      department: 'Design',
      type: 'Full-time',
      status: 'active'
    },
    {
      id: '3',
      title: 'Backend Engineer',
      description: 'Join our core platform team to build scalable VR service infrastructures. Experience with Node.js/TypeScript and PostgreSQL is highly valued.',
      location: 'Remote',
      department: 'Engineering',
      type: 'Full-time',
      status: 'active'
    }
  ];
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
        type: jobData.type,
        status: 'active'
      })
      .returning(['id', 'title', 'description', 'location', 'department', 'type', 'status', 'created_at', 'updated_at'])
      .executeTakeFirstOrThrow();

    return {
      ...result,
      id: result.id.toString(),
      status: result.status as 'active' | 'inactive' | 'archived'
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
    console.error("Failed to delete job posting:", { jobId: id });
    throw new Error('Failed to delete job posting');
  }
}
