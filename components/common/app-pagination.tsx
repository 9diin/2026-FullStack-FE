import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui"

function AppPagination() {
    return (
        <Pagination className="mx-0 w-fit">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" text="이전" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" text="다음" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default AppPagination
