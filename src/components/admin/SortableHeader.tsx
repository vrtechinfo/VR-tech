'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortableHeaderProps {
    column: string;
    label: string;
    currentSort: { column: string; direction: 'asc' | 'desc' } | null;
    onSort: (column: string) => void;
    className?: string;
}

export function SortableHeader({
    column,
    label,
    currentSort,
    onSort,
    className = ''
}: SortableHeaderProps) {
    const isActive = currentSort?.column === column;
    const direction = isActive ? currentSort.direction : null;

    return (
        <button
            onClick={() => onSort(column)}
            className={`flex items-center gap-2 font-semibold text-left hover:text-red-600 transition-colors ${isActive ? 'text-red-600' : 'text-gray-700'
                } ${className}`}
        >
            <span>{label}</span>
            {direction === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
            ) : direction === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
            ) : (
                <ArrowUpDown className="w-4 h-4 opacity-40" />
            )}
        </button>
    );
}
