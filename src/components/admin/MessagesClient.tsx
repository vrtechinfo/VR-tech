'use client';

import { useState, useMemo } from 'react';
import { Mail, MailOpen, Trash2, MessageCircle } from 'lucide-react';
import { SearchBar } from '@/components/admin/SearchBar';
import { FilterDropdown } from '@/components/admin/FilterDropdown';
import { Pagination } from '@/components/admin/Pagination';
import { SortableHeader } from '@/components/admin/SortableHeader';

interface Message {
    id: number;
    name: string;
    email: string;
    contact: string;
    message: string;
    status: string;
    created_at: Date;
}

interface MessagesClientProps {
    messages: Message[];
    onDelete: (id: number) => Promise<void>;
    onMarkAsRead: (id: number) => Promise<void>;
}

export function MessagesClient({ messages, onDelete, onMarkAsRead }: MessagesClientProps) {
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
        new: messages.filter(m => m.status === 'new').length,
        read: messages.filter(m => m.status === 'read').length,
        replied: messages.filter(m => m.status === 'replied').length,
    }), [messages]);

    // Filter and search logic
    const filteredMessages = useMemo(() => {
        return messages.filter(msg => {
            // Search filter
            const matchesSearch = searchQuery === '' ||
                msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.message.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter
            const matchesStatus = statusFilters.length === 0 || statusFilters.includes(msg.status);

            return matchesSearch && matchesStatus;
        });
    }, [messages, searchQuery, statusFilters]);

    // Sort logic
    const sortedMessages = useMemo(() => {
        if (!sortConfig) return filteredMessages;

        return [...filteredMessages].sort((a, b) => {
            const aValue = a[sortConfig.column as keyof Message];
            const bValue = b[sortConfig.column as keyof Message];

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            let comparison = 0;
            if (aValue > bValue) comparison = 1;
            if (aValue < bValue) comparison = -1;

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredMessages, sortConfig]);

    // Pagination logic
    const totalPages = Math.ceil(sortedMessages.length / itemsPerPage);
    const paginatedMessages = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedMessages.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedMessages, currentPage, itemsPerPage]);

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

    const statusOptions = [
        { value: 'new', label: 'New' },
        { value: 'read', label: 'Read' },
        { value: 'replied', label: 'Replied' },
        { value: 'archived', label: 'Archived' }
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
                <p className="text-zinc-400">Manage customer inquiries and messages</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-900/20 rounded-lg">
                            <Mail className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.new}</p>
                            <p className="text-sm text-zinc-400">New Messages</p>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-900/20 rounded-lg">
                            <MailOpen className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.read}</p>
                            <p className="text-sm text-zinc-400">Read</p>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-900/20 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.replied}</p>
                            <p className="text-sm text-zinc-400">Replied</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px]">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name, email, or message..."
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
                    Found {sortedMessages.length} of {messages.length} messages
                </div>
            )}

            {/* Messages Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/80 text-zinc-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">
                                    <SortableHeader
                                        column="name"
                                        label="Name"
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
                                <th className="px-6 py-4 font-medium">Message</th>
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
                            {paginatedMessages.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        {searchQuery || statusFilters.length > 0
                                            ? 'No messages match your filters.'
                                            : 'No messages found.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedMessages.map((message) => (
                                    <tr key={message.id} className="hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">
                                            {message.name}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            <div className="text-sm">{message.email}</div>
                                            <div className="text-xs text-zinc-500">{message.contact}</div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 max-w-md">
                                            <p className="truncate">{message.message}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${message.status === 'new'
                                                        ? 'bg-blue-900/20 text-blue-500'
                                                        : message.status === 'read'
                                                            ? 'bg-yellow-900/20 text-yellow-500'
                                                            : message.status === 'replied'
                                                                ? 'bg-green-900/20 text-green-500'
                                                                : 'bg-zinc-800 text-zinc-400'
                                                    }`}
                                            >
                                                {message.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 text-sm">
                                            {new Date(message.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {message.status === 'new' && (
                                                    <button
                                                        onClick={() => onMarkAsRead(message.id)}
                                                        className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-900/20 rounded-lg transition-colors"
                                                        title="Mark as Read"
                                                    >
                                                        <MailOpen className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => onDelete(message.id)}
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
                {sortedMessages.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={sortedMessages.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                )}
            </div>
        </div>
    );
}
