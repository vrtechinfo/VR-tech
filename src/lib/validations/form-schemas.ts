import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(1, "Contact number is required")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Career application form validation schema
export const careerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/, "Please enter a valid phone number"),
  resume: z.instanceof(File, { message: "Resume file is required" })
    .refine(
      (file) => {
        // Check file type
        const acceptedFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        return acceptedFileTypes.includes(file.type);
      }, 
      { message: "File must be PDF, DOC or DOCX" }
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, 
      { message: "File size must be less than 5MB" }
    ),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type CareerFormValues = z.infer<typeof careerFormSchema>;
