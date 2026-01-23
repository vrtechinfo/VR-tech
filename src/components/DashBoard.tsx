"use client";
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import SignIn from './sign-in';
import { getContactSubmissions, getCareerSubmissions, getJobPostings, createJobPosting, deleteJobPosting } from '@/app/actions/dashboard-actions';
import type { ContactSubmission, CareerSubmission, JobPosting } from '@/app/actions/dashboard-actions';

// Tab options
enum Tab {
  CONTACT = 'contact',
  CAREER = 'career',
  JOBS = 'jobs'
}

export default function DashBoard() {
  const { data: session, isPending, error } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CONTACT);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [careerSubmissions, setCareerSubmissions] = useState<CareerSubmission[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataError, setDataError] = useState<string | null>(null);
  
  // Job posting form state
  const [showJobForm, setShowJobForm] = useState<boolean>(false);
  const [newJobPosting, setNewJobPosting] = useState<Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>>({ 
    title: '',
    description: '',
    location: '',
    department: '',
    type: '',
    status: 'active'
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Fetch data when tab changes or component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setDataError(null);

      try {
        if (activeTab === Tab.CONTACT) {
          const contacts = await getContactSubmissions();
          setContactSubmissions(contacts);
          return;
        } 
        
        if (activeTab === Tab.CAREER) {
          const careers = await getCareerSubmissions();
          setCareerSubmissions(careers);
          return;
        }
        
        // Tab.JOBS
        const jobs = await getJobPostings();
        setJobPostings(jobs);
      } catch (err) {
        console.error('Error fetching data:', err);
        setDataError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is authenticated
    if (session) {
      fetchData();
    }
  }, [activeTab, session]);

  // Filter functions
  const filterByDate = (item: ContactSubmission | CareerSubmission) => {
    if (!startDate && !endDate) return true;

    const itemDate = new Date(item.created_at);

    if (startDate && endDate) {
      const start = new Date(startDate);
      // Add 1 day to end date to include the end date itself
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      return itemDate >= start && itemDate < end;
    }

    if (startDate) {
      const start = new Date(startDate);
      return itemDate >= start;
    }

    // At this point, endDate must be set (and startDate is not)
    const end = new Date(endDate);
    // Add 1 day to include the end date
    end.setDate(end.getDate() + 1);
    return itemDate < end;
  };

  const filterBySearch = (item: ContactSubmission | CareerSubmission) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    if ('name' in item) {
      // Contact submission
      return (
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.contact.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query)
      );
    }
    
    // Career submission
    return (
      item.first_name.toLowerCase().includes(query) ||
      item.last_name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.message.toLowerCase().includes(query)
    );
  };

  // Apply filters to current data
  const filteredContactSubmissions = contactSubmissions
    .filter(filterByDate)
    .filter(filterBySearch);

  const filteredCareerSubmissions = careerSubmissions
    .filter(filterByDate)
    .filter(filterBySearch);
    
  const filteredJobPostings = jobPostings
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      );
    });

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
  };

  // Handle job posting form submission
  const handleSubmitJobPosting = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    
    // Validate form
    if (!newJobPosting.title.trim()) {
      setFormError('Job title is required');
      return;
    }
    if (!newJobPosting.description.trim()) {
      setFormError('Job description is required');
      return;
    }
    if (!newJobPosting.location.trim()) {
      setFormError('Location is required');
      return;
    }
    if (!newJobPosting.department.trim()) {
      setFormError('Department is required');
      return;
    }
    if (!newJobPosting.type.trim()) {
      setFormError('Job type is required');
      return;
    }
    
    try {
      const result = await createJobPosting(newJobPosting);
      if (result) {
        // Reset form
        setNewJobPosting({ 
          title: '',
          description: '',
          location: '',
          department: '',
          type: '',
          status: 'active'
        });
        setShowJobForm(false);
        setFormSuccess('Job posting created successfully!');
        
        // Refresh job postings
        const jobs = await getJobPostings();
        setJobPostings(jobs);
      } else {
        setFormError('Failed to create job posting. Please try again.');
      }
    } catch (err) {
      console.error('Error creating job posting:', err);
      setFormError('An error occurred. Please try again.');
    }
  };
  
  // Handle job posting deletion
  const handleDeleteJobPosting = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      try {
        const success = await deleteJobPosting(id);
        if (success) {
          // Refresh job postings
          const jobs = await getJobPostings();
          setJobPostings(jobs);
          setFormSuccess('Job posting deleted successfully!');
        } else {
          setFormError('Failed to delete job posting. Please try again.');
        }
      } catch (err) {
        console.error('Error deleting job posting:', err);
        setFormError('An error occurred. Please try again.');
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-red-500">Error loading session: {error.message}</p></div>;
  }

  if (!session) {
    return <SignIn />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
          <button
            type="button"
            onClick={() => authClient.signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-1/4">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-1/4">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-auto self-end">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              type="button"
              onClick={() => setActiveTab(Tab.CONTACT)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === Tab.CONTACT
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Contact Form Submissions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(Tab.CAREER)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === Tab.CAREER
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Career Applications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(Tab.JOBS)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === Tab.JOBS
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Job Postings
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Success and Error Messages */}
          {formSuccess && (
            <div className="p-4 m-4 bg-green-50 text-green-700 rounded-md">
              {formSuccess}
            </div>
          )}
          {formError && (
            <div className="p-4 m-4 bg-red-50 text-red-700 rounded-md">
              {formError}
            </div>
          )}
          
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Loading data...</p>
            </div>
          ) : dataError ? (
            <div className="p-12 text-center">
              <p className="text-red-500">{dataError}</p>
            </div>
          ) : (
            <>
              {activeTab === Tab.JOBS ? (
                /* Job Postings Management */
                <div className="p-4">
                  {!showJobForm ? (
                    <div className="mb-4 flex justify-between items-center">
                      <h2 className="text-lg font-medium">Manage Job Postings</h2>
                      <button
                        type="button"
                        onClick={() => setShowJobForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Add New Job Posting
                      </button>
                    </div>
                  ) : (
                    <div className="mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Create New Job Posting</h2>
                        <button
                          type="button"
                          onClick={() => setShowJobForm(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          &times; Close
                        </button>
                      </div>
                      
                      <form onSubmit={handleSubmitJobPosting}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input
                              id="job-title"
                              type="text"
                              value={newJobPosting.title}
                              onChange={(e) => setNewJobPosting({...newJobPosting, title: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g. Senior Frontend Developer"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="job-location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                              id="job-location"
                              type="text"
                              value={newJobPosting.location}
                              onChange={(e) => setNewJobPosting({...newJobPosting, location: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g. Toronto, Canada or Remote"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="job-department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <input
                              id="job-department"
                              type="text"
                              value={newJobPosting.department}
                              onChange={(e) => setNewJobPosting({...newJobPosting, department: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g. Engineering"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="job-type" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <select
                              id="job-type"
                              value={newJobPosting.type}
                              onChange={(e) => setNewJobPosting({...newJobPosting, type: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value="">Select job type</option>
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Internship">Internship</option>
                              <option value="Freelance">Freelance</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                          <textarea
                            id="job-description"
                            value={newJobPosting.description}
                            onChange={(e) => setNewJobPosting({...newJobPosting, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={6}
                            placeholder="Provide a detailed description of the job role, responsibilities, requirements, etc."
                            required
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowJobForm(false)}
                            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Create Job Posting
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  
                  <div className="overflow-x-auto">
                    <div className="p-4 border-b border-gray-200 text-sm text-gray-600">
                      Showing {filteredJobPostings.length} of {jobPostings.length} job postings
                    </div>
                    {filteredJobPostings.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-gray-500">No job postings found.</p>
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredJobPostings.map((job) => (
                            <tr key={job.id}>
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{job.title}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">{job.description.substring(0, 100)}...</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">{job.department}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{formatDate(job.created_at)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteJobPosting(job.id)}
                                  className="text-red-600 hover:text-red-800 focus:outline-none"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ) : activeTab === Tab.CONTACT ? (
                /* Contact Submissions Table */
                <div className="overflow-x-auto">
                  <div className="p-4 border-b border-gray-200 text-sm text-gray-600">
                    Showing {filteredContactSubmissions.length} of {contactSubmissions.length} contact form submissions
                  </div>
                  {filteredContactSubmissions.length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="text-gray-500">No matching contact form submissions found.</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredContactSubmissions.map((submission) => (
                          <tr key={submission.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{submission.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{submission.contact}</td>
                            <td className="px-6 py-4">
                              <div className="max-w-xs overflow-hidden text-ellipsis">{submission.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(submission.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ) : (
                /* Career Applications Table */
                <div className="overflow-x-auto">
                  <div className="p-4 border-b border-gray-200 text-sm text-gray-600">
                    Showing {filteredCareerSubmissions.length} of {careerSubmissions.length} career applications
                  </div>
                  {filteredCareerSubmissions.length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="text-gray-500">No matching career applications found.</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCareerSubmissions.map((submission) => (
                          <tr key={submission.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{`${submission.first_name} ${submission.last_name}`}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{submission.phone}</td>
                            <td className="px-6 py-4">
                              <div className="max-w-xs overflow-hidden text-ellipsis">{submission.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {submission.resume_url ? (
                                <a
                                  href={submission.resume_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  Download
                                </a>
                              ) : (
                                <span className="text-gray-400">Not available</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(submission.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
