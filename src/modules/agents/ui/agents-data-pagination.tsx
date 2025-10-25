import { Button } from "@/components/ui/button";

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const DataPagination = ({
    page, totalPages, onPageChange
}: Props) => {
    return (
        <div className="flex items-center justify-between">
            <div className="">
                Page {page} of {totalPages || 1}
            </div>
            <div className="">
                <Button
                    disabled={page === 1}
                    variant="outline"
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                >
                    Previous
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 0}
                    variant="outline"
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};