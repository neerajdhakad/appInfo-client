import Card from "./Card";
import { Input } from "./ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

function Applications() {
  return (
    <>
      <div className="px-8 dark:bg-[#36454F] dark:text-white">
        <div className="py-4 text-4xl font-semibold">Applications</div>
        {/* Searchbar */}
        <div className="w-full my-4">
          <Input type="text" placeholder="Search application by name" />
        </div>
        {/* Applcations */}
        <div className="flex gap-4 flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> 
        </div>
        {/* Pagination */}
        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" size={undefined} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size={undefined}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size={undefined}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" size={undefined} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default Applications;
