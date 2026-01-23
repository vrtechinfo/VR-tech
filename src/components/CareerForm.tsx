"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { submitCareerForm } from "@/app/actions/form-actions";
import { careerFormSchema } from "@/lib/validations/form-schemas";
import { z } from "zod";

export default function CareerForm({ jobId }: { jobId?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [submitMessage, setSubmitMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      // Create a new FileList-like object
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setSubmitMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      // Client-side validation - need to handle the file separately
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        setFormErrors({
          resume: ["Resume file is required"]
        });
        setSubmitMessage({
          text: "Please upload your resume",
          type: "error"
        });
        setIsSubmitting(false);
        return;
      }

      const data = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
        resume: file,
        jobId: jobId
      };

      // Client-side validation
      careerFormSchema.parse(data);

      // Submit to server action
      const result = await submitCareerForm(formData);
      console.log("Career form submission result:", result);

      if (result.success) {
        setSubmitMessage({
          text: result.message,
          type: "success"
        });
        // Reset form on success
        if (formRef.current) {
          formRef.current.reset();
        }
        setFileName("");
      } else {
        setSubmitMessage({
          text: result.message,
          type: "error"
        });
        if (result.errors) {
          setFormErrors(result.errors);
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string[]> = {};
        for (const err of error.issues) {
          const field = err.path[0] as string;
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field].push(err.message);
        }
        setFormErrors(errors);
        setSubmitMessage({
          text: "Please correct the errors in your form.",
          type: "error"
        });
      } else {
        setSubmitMessage({
          text: "An unexpected error occurred. Please try again later.",
          type: "error"
        });
        console.error("Form error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 backdrop-blur-sm">
      <input type="hidden" name="jobId" value={jobId || ""} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`w-full px-4 py-2 bg-transparent border-b ${formErrors.firstName ? "border-red-500" : "border-gray-400"
              } focus:border-white focus:outline-none`}
            required
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-xs mt-1">{formErrors.firstName[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`w-full px-4 py-2 bg-transparent border-b ${formErrors.lastName ? "border-red-500" : "border-gray-400"
              } focus:border-white focus:outline-none`}
            required
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-xs mt-1">{formErrors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full px-4 py-2 bg-transparent border-b ${formErrors.email ? "border-red-500" : "border-gray-400"
              } focus:border-white focus:outline-none`}
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone No.*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`w-full px-4 py-2 bg-transparent border-b ${formErrors.phone ? "border-red-500" : "border-gray-400"
              } focus:border-white focus:outline-none`}
            required
          />
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="resume" className="block text-sm font-medium mb-2">
          Upload CV/Resume*
        </label>
        <button
          type="button"
          className={`w-full border ${formErrors.resume ? "border-red-500" : "border-gray-400"
            } rounded-md p-4 text-center cursor-pointer hover:bg-gray-800/20 transition-colors`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload resume"
        >
          <div className="flex flex-col items-center">
            <Image src="/Upload.png" alt="Upload" width={40} height={40} className="mb-2" />
            <p className="text-sm text-gray-400">
              {fileName ? fileName : "Click or drag a file to Upload"}
            </p>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          id="resume"
          name="resume"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        {formErrors.resume && (
          <p className="text-red-500 text-xs mt-1">{formErrors.resume[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message*
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`w-full px-4 py-2 bg-transparent border-b ${formErrors.message ? "border-red-500" : "border-gray-400"
            } focus:border-white focus:outline-none resize-none`}
          required
        />
        {formErrors.message && (
          <p className="text-red-500 text-xs mt-1">{formErrors.message[0]}</p>
        )}
      </div>

      {submitMessage && (
        <div
          className={`w-full text-center p-2 rounded ${submitMessage.type === "success"
            ? "bg-green-700/50 text-white"
            : "bg-red-700/50 text-white"
            }`}
        >
          {submitMessage.text}
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-2 bg-white text-black font-medium rounded-full ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-200"
            } transition-colors`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
