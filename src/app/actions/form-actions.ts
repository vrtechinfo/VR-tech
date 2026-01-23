"use server";

import { z } from "zod";
import { contactFormSchema, careerFormSchema } from "@/lib/validations/form-schemas";
import { db } from "@/lib/db";
import { uploadToR2 } from "@/lib/utils/r2";
import { checkRateLimit, formatRemainingTime } from "@/lib/utils/rate-limit";

type FormResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * Server action to handle contact form submissions
 */
export async function submitContactForm(formData: FormData): Promise<FormResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const contact = formData.get("contact") as string;
  const message = formData.get("message") as string;

  // Create a form data object to validate
  const data = { name, email, contact, message };

  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(data);

    console.log("Contact form validatedData:", validatedData);

    // Check rate limit based on email address
    const { allowed, remainingSeconds } = checkRateLimit(validatedData.email);
    if (!allowed) {
      console.log(`Rate limited submission from ${validatedData.email}, ${remainingSeconds} seconds remaining`);
      return {
        success: false,
        message: `Please wait ${formatRemainingTime(remainingSeconds)} before submitting another form.`
      };
    }

    // Check for database connection
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not set. Simulating contact form success in development mode.");
      return {
        success: true,
        message: "Development Mode: Your message was received (simulation). Please configure DATABASE_URL for real storage."
      };
    }

    try {
      // Store in database
      await db
        .insertInto("contact_submissions")
        .values({
          name: validatedData.name,
          email: validatedData.email,
          contact: validatedData.contact,
          message: validatedData.message,
          status: 'new'
        })
        .execute();

      // TODO: Send email notification if needed
      console.log("Contact form submission stored in database successfully");

      return {
        success: true,
        message: "Thank you for your message. We'll get back to you shortly!"
      };
    } catch (dbError) {
      console.error("Database error during contact form submission:", dbError);
      return {
        success: false,
        message: "Failed to save your message. Our database appears to be offline. Please try again later."
      };
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};

      for (const err of error.issues) {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(err.message);
      }

      return {
        success: false,
        message: "Please correct the errors in your form.",
        errors
      };
    }

    // Handle other errors
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later."
    };
  }
}

/**
 * Server action to handle career/application form submissions
 */
export async function submitCareerForm(formData: FormData): Promise<FormResponse> {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const resumeFile = formData.get("resume") as File;
    const jobIdStr = formData.get("jobId") as string;

    // Create a form data object to validate
    const data = {
      firstName,
      lastName,
      email,
      phone,
      message,
      resume: resumeFile,
      jobId: jobIdStr || undefined
    };

    // Validate the form data
    const validatedData = careerFormSchema.parse(data);

    // Check rate limit based on email address
    const { allowed, remainingSeconds } = checkRateLimit(validatedData.email);
    if (!allowed) {
      console.log(`Rate limited career submission from ${validatedData.email}, ${remainingSeconds} seconds remaining`);
      return {
        success: false,
        message: `Please wait ${formatRemainingTime(remainingSeconds)} before submitting another application.`
      };
    }

    // Check for database connection
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not set. Simulating career form success in development mode.");
      return {
        success: true,
        message: "Development Mode: Your application was received (simulation). Please configure DATABASE_URL for real storage."
      };
    }

    try {
      // 1. Upload the resume file to Cloudflare R2 storage
      console.log("Uploading resume to R2...");
      const resumePath = await uploadToR2(validatedData.resume, "resumes");
      console.log("Resume uploaded successfully to path:", resumePath);

      // 2. Store the application in the database
      console.log("Storing career application in database...");
      const parsedJobId = validatedData.jobId ? parseInt(validatedData.jobId) : NaN;
      const jobId = isNaN(parsedJobId) ? null : parsedJobId;

      await db
        .insertInto("career_applications")
        .values({
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
          resume_path: resumePath,
          job_id: jobId,
          status: 'new'
        })
        .execute();

      console.log("Career form submission stored in database successfully");

      return {
        success: true,
        message: "Thank you for your application. We'll review your details and get back to you soon!"
      };
    } catch (uploadOrDbError) {
      console.error("Error during resume upload or database operation:", uploadOrDbError);
      return {
        success: false,
        message: "Failed to process your application. Our storage or database services appear to be offline. Please try again later."
      };
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};

      for (const err of error.issues) {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(err.message);
      }

      return {
        success: false,
        message: "Please correct the errors in your form.",
        errors
      };
    }

    // Handle other errors
    console.error("Career form error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later."
    };
  }
}
