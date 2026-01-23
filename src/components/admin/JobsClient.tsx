'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Power } from 'lucide-react';
import { SearchBar } from '@/components/admin/SearchBar';
import { FilterDropdown } from '@/components/admin/FilterDropdown';
import { Pagination } from '@/components/admin/Pagination';
import { SortableHeader } from '@/components/admin/SortableHeader';

interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    status: string;
    created_at: Date;
}

interface JobsClientProps {
    jobs: Job[];
    onDelete: (id: number) => Promise<void>;
    onToggleStatus: (id: number, status: string) => Promise<void>;
}

export function JobsClient({ jobs, onDelete, onToggleStatus }: JobsClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilters, setStatusFilters] = useState<string[]>([]);
    const [typeFilters, setTypeFilters] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>({
        column: 'created_at',
        direction: 'desc'
    });

    // Filter and search logic
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // Search filter
            const matchesSearch = searchQuery === '' ||
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter
            const matchesStatus = statusFilters.length === 0 || statusFilters.includes(job.status);

            // Type filter
            const matchesType = typeFilters.length === 0 || typeFilters.includes(job.type);

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [jobs, searchQuery, statusFilters, typeFilters]);

    // Sort logic
    const sortedJobs = useMemo(() => {
        if (!sortConfig) return filteredJobs;

        return [...filteredJobs].sort((a, b) => {
            const aValue = a[sortConfig.column as keyof Job];
            const bValue = b[sortConfig.column as keyof Job];

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            let comparison = 0;
            if (aValue > bValue) comparison = 1;
            if (aValue < bValue) comparison = -1;

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredJobs, sortConfig]);

    // Pagination logic
    const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
    const paginatedJobs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedJobs.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedJobs, currentPage, itemsPerPage]);

    // Reset to page 1 when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (filters: string[]) => {
        setStatusFilters(filters);
        setCurrentPage(1);
    };

    const handleTypeFilterChange = (filters: string[]) => {
        setTypeFilters(filters);
        setCurrentPage(1);
    };

    const handleSort = (column: string) => {
        setSortConfig(current => {
            if (current?.column === column) {
                return {
                    column,
                    direction: current.direction === 'asc' ? 'desc' : 'asc'
                };
            }
            return { column, direction: 'asc' };
        });
    };

    const handleItemsPerPageChange = (count: number) => {
        setItemsPerPage(count);
        setCurrentPage(1);
    };

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'archived', label: 'Archived' }
    ];

    const typeOptions = [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Internship', label: 'Internship' }
    ];

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Job Postings</h1>
                    <p className="text-zinc-400">Manage job openings and positions</p>
                </div>
                <Link
                    href="/admin/jobs/new"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Create Job
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px]">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by title, department, or location..."
                    />
                </div>
                <FilterDropdown
                    label="Status"
                    options={statusOptions}
                    activeFilters={statusFilters}
                    onFilterChange={handleStatusFilterChange}
                />
                <FilterDropdown
                    label="Type"
                    options={typeOptions}
                    activeFilters={typeFilters}
                    onFilterChange={handleTypeFilterChange}
                />
            </div>

            {/* Results count */}
            {(searchQuery || statusFilters.length > 0 || typeFilters.length > 0) && (
                <div className="mb-4 text-sm text-zinc-400">
                    Found {sortedJobs.length} of {jobs.length} jobs
                </div>
            )}

            {/* Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/80 text-zinc-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="title"
                                        label="Title"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="department"
                                        label="Department"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="location"
                                        label="Location"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="type"
                                        label="Type"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="status"
                                        label="Status"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="created_at"
                                        label="Created"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {paginatedJobs.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                                        {searchQuery || statusFilters.length > 0 || typeFilters.length > 0
                                            ? 'No jobs match your filters.'
                                            : 'No jobs found. Create your first job posting.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">
                                            {job.title}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">{job.department}</td>
                                        <td className="px-6 py-4 text-zinc-400">{job.location}</td>
                                        <td className="px-6 py-4 text-zinc-400">{job.type}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'active'
                                                        ? 'bg-green-900/20 text-green-500'
                                                        : job.status === 'inactive'
                                                            ? 'bg-yellow-900/20 text-yellow-500'
                                                            : 'bg-zinc-800 text-zinc-400'
                                                    }`}
                                            >
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 text-sm">
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onToggleStatus(job.id, job.status)}
                                                    className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="Toggle Status"
                                                >
                                                    <Power className="w-4 h-4" />
                                                </button>
                                                <Link
                                                    href={`/admin/jobs/${job.id}/edit`}
                                                    className="p-2 text-zinc-500 hover:text-yellow-500 hover:bg-yellow-900/20 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => onDelete(job.id)}
                                                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {sortedJobs.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={sortedJobs.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                )}
            </div>
        </div>
    );
}
