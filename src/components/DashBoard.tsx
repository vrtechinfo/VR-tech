"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import SignIn from './sign-in';
import { getContactSubmissions, getCareerSubmissions } from '@/app/actions/dashboard-actions';
import type { ContactSubmission, CareerSubmission } from '@/app/actions/dashboard-actions';

// Tab options
enum Tab {
  CONTACT = 'contact',
  CAREER = 'career'
}

export default function DashBoard() {
  const { data: session, isPending, error } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CONTACT);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [careerSubmissions, setCareerSubmissions] = useState<CareerSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataError, setDataError] = useState<string | null>(null);
  
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
        } else {
          const careers = await getCareerSubmissions();
          setCareerSubmissions(careers);
        }
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
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
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
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === Tab.CONTACT 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Form Submissions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(Tab.CAREER)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === Tab.CAREER 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Career Applications
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
              {activeTab === Tab.CONTACT ? (
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
