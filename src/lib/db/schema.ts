import type { ColumnType, Generated } from "kysely";

// Define the shape of the tables in the database
export interface Database {
  user: UserTable;
  session: SessionTable;
  account: AccountTable;
  verification: VerificationTable;
  contact_submissions: ContactSubmissionTable;
  career_applications: CareerApplicationTable;
  job_postings: JobPostingTable;
}

// User roles
export type UserRole = 'admin' | 'team_member';
export type UserStatus = 'active' | 'inactive';

// Application statuses
export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'rejected';

// Contact message statuses
export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

// Job posting statuses
export type JobStatus = 'active' | 'inactive' | 'archived';

// Better-Auth User table
export interface UserTable {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: ColumnType<Date, string | Date, never>;
  updatedAt: ColumnType<Date, string | Date, string | Date>;
  role: UserRole;
  status: UserStatus;
}

// Better-Auth Session table
export interface SessionTable {
  id: string;
  expiresAt: ColumnType<Date, string | Date, never>;
  token: string;
  createdAt: ColumnType<Date, string | Date, never>;
  updatedAt: ColumnType<Date, string | Date, string | Date>;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}

// Better-Auth Account table
export interface AccountTable {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: ColumnType<Date, string | Date, never> | null;
  refreshTokenExpiresAt: ColumnType<Date, string | Date, never> | null;
  scope: string | null;
  password: string | null;
  createdAt: ColumnType<Date, string | Date, never>;
  updatedAt: ColumnType<Date, string | Date, string | Date>;
}

// Better-Auth Verification table
export interface VerificationTable {
  id: string;
  identifier: string;
  value: string;
  expiresAt: ColumnType<Date, string | Date, never>;
  createdAt: ColumnType<Date, string | Date, never> | null;
  updatedAt: ColumnType<Date, string | Date, string | Date> | null;
}

// Define the contact_submissions table schema
export interface ContactSubmissionTable {
  id: Generated<number>;
  name: string;
  email: string;
  contact: string;
  message: string;
  status: ColumnType<MessageStatus, MessageStatus | undefined, MessageStatus>;
  admin_reply: string | null;
  replied_by: string | null;
  replied_at: ColumnType<Date, string | Date | undefined, string | Date | undefined> | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

// Define the career_applications table schema
export interface CareerApplicationTable {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  // Store the file path where the resume is saved
  resume_path: string;
  job_id: number | null;
  status: ColumnType<ApplicationStatus, ApplicationStatus | undefined, ApplicationStatus>;
  notes: string | null;
  reviewed_by: string | null;
  reviewed_at: ColumnType<Date, string | Date | undefined, string | Date | undefined> | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

// Define the job_postings table schema
export interface JobPostingTable {
  id: Generated<number>;
  title: string;
  description: string;
  location: string;
  department: string;
  type: string;
  status: JobStatus;
  publish_date: ColumnType<Date, string | Date | undefined, string | Date | undefined> | null;
  expiry_date: ColumnType<Date, string | Date | undefined, string | Date | undefined> | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string | Date | undefined>;
}

// SQL to create the tables if they don't exist
export const createTablesSQL = `
CREATE TABLE IF NOT EXISTS contact_submissions(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  admin_reply TEXT,
  replied_by TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_postings(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  department TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  publish_date TIMESTAMP WITH TIME ZONE,
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS career_applications(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  resume_path TEXT NOT NULL,
  job_id INTEGER REFERENCES job_postings(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--Better-Auth Tables
CREATE TABLE IF NOT EXISTS "user"(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS session(
  id TEXT PRIMARY KEY,
  "expiresAt" TIMESTAMP NOT NULL,
  token TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account(
  id TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" TIMESTAMP,
  "refreshTokenExpiresAt" TIMESTAMP,
  scope TEXT,
  password TEXT,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS verification(
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_career_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_job_postings_status ON job_postings(status);
CREATE INDEX IF NOT EXISTS idx_user_role ON "user"(role);
CREATE INDEX IF NOT EXISTS idx_user_status ON "user"(status);
`;
