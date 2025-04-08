import type { ColumnType, Generated } from "kysely";

// Define the shape of the tables in the database
export interface Database {
  contact_submissions: ContactSubmissionTable;
  career_applications: CareerApplicationTable;
}

// Define the contact_submissions table schema
export interface ContactSubmissionTable {
  id: Generated<number>;
  name: string;
  email: string;
  contact: string;
  message: string;
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
  created_at: ColumnType<Date, string | undefined, never>;
}

// SQL to create the tables if they don't exist
export const createTablesSQL = `
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS career_applications (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  resume_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;
