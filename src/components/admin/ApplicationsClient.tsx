'use client';

import { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import { SearchBar } from '@/components/admin/SearchBar';
import { FilterDropdown } from '@/components/admin/FilterDropdown';
import { Pagination } from '@/components/admin/Pagination';
import { SortableHeader } from '@/components/admin/SortableHeader';

interface Application {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    resume_path: string | null;
    status: string;
    created_at: Date;
}

interface ApplicationsClientProps {
    applications: Application[];
    onDelete: (id: number) => Promise<void>;
    onStatusUpdate: (id: number, status: string) => Promise<void>;
}

export function ApplicationsClient({ applications, onDelete, onStatusUpdate }: ApplicationsClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilters, setStatusFilters] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>({
        column: 'created_at',
        direction: 'desc'
    });

    // Calculate stats
    const stats = useMemo(() => ({
        total: applications.length,
        new: applications.filter(a => a.status === 'new').length,
        reviewed: applications.filter(a => a.status === 'reviewed').length,
        shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    }), [applications]);

    // Filter and search logic
    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            // Search filter
            const matchesSearch = searchQuery === '' ||
                app.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.phone.includes(searchQuery);

            // Status filter
            const matchesStatus = statusFilters.length === 0 || statusFilters.includes(app.status);

            return matchesSearch && matchesStatus;
        });
    }, [applications, searchQuery, statusFilters]);

    // Sort logic
    const sortedApplications = useMemo(() => {
        if (!sortConfig) return filteredApplications;

        return [...filteredApplications].sort((a, b) => {
            let aValue: any;
            let bValue: any;

            if (sortConfig.column === 'name') {
                aValue = `${a.first_name} ${a.last_name}`;
                bValue = `${b.first_name} ${b.last_name}`;
            } else {
                aValue = a[sortConfig.column as keyof Application];
                bValue = b[sortConfig.column as keyof Application];
            }

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            let comparison = 0;
            if (aValue > bValue) comparison = 1;
            if (aValue < bValue) comparison = -1;

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredApplications, sortConfig]);

    // Pagination logic
    const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);
    const paginatedApplications = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedApplications.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedApplications, currentPage, itemsPerPage]);

    // Reset to page 1 when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (filters: string[]) => {
        setStatusFilters(filters);
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

    const handleStatusChange = async (id: number, status: string) => {
        await onStatusUpdate(id, status);
    };

    const statusOptions = [
        { value: 'new', label: 'New' },
        { value: 'reviewed', label: 'Reviewed' },
        { value: 'shortlisted', label: 'Shortlisted' },
        { value: 'rejected', label: 'Rejected' }
    ];

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Applications</h1>
                    <p className="text-zinc-400">Manage candidate applications</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                    <p className="text-sm text-zinc-400">Total</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-blue-500">{stats.new}</p>
                    <p className="text-sm text-zinc-400">New</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-yellow-500">{stats.reviewed}</p>
                    <p className="text-sm text-zinc-400">Reviewed</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-green-500">{stats.shortlisted}</p>
                    <p className="text-sm text-zinc-400">Shortlisted</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px]">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name, email, or phone..."
                    />
                </div>
                <FilterDropdown
                    label="Status"
                    options={statusOptions}
                    activeFilters={statusFilters}
                    onFilterChange={handleStatusFilterChange}
                />
            </div>

            {/* Results count */}
            {(searchQuery || statusFilters.length > 0) && (
                <div className="mb-4 text-sm text-zinc-400">
                    Found {sortedApplications.length} of {applications.length} applications
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
                                        column="name"
                                        label="Candidate"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="email"
                                        label="Contact"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4 font-medium">Resume</th>
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
                                        label="Date"
                                        currentSort={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {paginatedApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        {searchQuery || statusFilters.length > 0
                                            ? 'No applications match your filters.'
                                            : 'No applications found.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">
                                            <div>{app.first_name} {app.last_name}</div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            <div className="text-white text-sm">{app.email}</div>
                                            <div className="text-xs">{app.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {app.resume_path ? (
                                                <a
                                                    href={app.resume_path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </a>
                                            ) : (
                                                <span className="text-zinc-500 text-sm">No Resume</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                className={`px-2 py-1 rounded-full text-xs font-medium bg-transparent border cursor-pointer ${app.status === 'new'
                                                        ? 'border-blue-500 text-blue-500'
                                                        : app.status === 'reviewed'
                                                            ? 'border-yellow-500 text-yellow-500'
                                                            : app.status === 'shortlisted'
                                                                ? 'border-green-500 text-green-500'
                                                                : 'border-red-500 text-red-500'
                                                    }`}
                                            >
                                                <option value="new">New</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 text-sm">
                                            {new Date(app.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => onDelete(app.id)}
                                                className="text-zinc-500 hover:text-red-500 transition-colors p-2 hover:bg-red-900/20 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {sortedApplications.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={sortedApplications.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                )}
            </div>
        </div>
    );
}
