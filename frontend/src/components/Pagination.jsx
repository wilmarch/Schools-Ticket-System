import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-100">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs font-bold rounded-md transition disabled:opacity-30 disabled:cursor-not-allowed bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
                ←
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                        page === currentPage
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs font-bold rounded-md transition disabled:opacity-30 disabled:cursor-not-allowed bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
                →
            </button>
        </div>
    );
}

export default Pagination;
