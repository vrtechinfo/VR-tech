'use client';

import { Filter, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterOption {
    value: string;
    label: string;
}

interface FilterDropdownProps {
    label: string;
    options: FilterOption[];
    activeFilters: string[];
    onFilterChange: (filters: string[]) => void;
    className?: string;
}

export function FilterDropdown({
    label,
    options,
    activeFilters,
    onFilterChange,
    className = ''
}: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (value: string) => {
        if (activeFilters.includes(value)) {
            onFilterChange(activeFilters.filter(f => f !== value));
        } else {
            onFilterChange([...activeFilters, value]);
        }
    };

    const handleClear = () => {
        onFilterChange([]);
    };

    const activeCount = activeFilters.length;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
                <Filter className="w-4 h-4" />
                <span>{label}</span>
                {activeCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                        {activeCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">Filters</span>
                            {activeCount > 0 && (
                                <button
                                    onClick={handleClear}
                                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="p-3 max-h-64 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={activeFilters.includes(option.value)}
                                    onChange={() => handleToggle(option.value)}
                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
