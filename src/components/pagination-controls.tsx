import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = Math.min(totalPages, maxVisiblePages!);
  const pageNumbers: number[] = [];

  for (let i = 0; i < visiblePages; i++) {
    let pageNum: number;
    if (totalPages <= maxVisiblePages) {
      pageNum = i + 1;
    } else if (currentPage <= 3) {
      pageNum = i + 1;
    } else if (currentPage >= totalPages - 2) {
      pageNum = totalPages - maxVisiblePages + 1 + i;
    } else {
      pageNum = currentPage - 2 + i;
    }
    pageNumbers.push(pageNum);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">
        {pageNumbers.map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(pageNum)}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
