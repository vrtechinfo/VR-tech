-- Migration: Create Job Postings Table

-- Create the job_postings table if it doesn't exist
CREATE TABLE IF NOT EXISTS job_postings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  department TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some initial job postings for testing
INSERT INTO job_postings (title, description, location, department, type)
VALUES 
  (
    'Senior Frontend Developer',
    'We are looking for an experienced Frontend Developer proficient in React, Next.js, and TypeScript. The ideal candidate will have 5+ years of experience building modern web applications.',
    'Toronto, Canada',
    'Engineering',
    'Full-time'
  ),
  (
    'UI/UX Designer',
    'Seeking a creative UI/UX Designer to join our team. You will be responsible for creating beautiful, intuitive interfaces for our products while ensuring excellent user experience.',
    'Remote',
    'Design',
    'Full-time'
  ),
  (
    'DevOps Engineer',
    'Looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. Experience with AWS, Docker, and Kubernetes is required.',
    'Vancouver, Canada',
    'Operations',
    'Full-time'
  );
