import { Skeleton } from "../components/ui/skeleton"

function SkeletonAppDetails() {
  return (
    <>
       <div className="py-4 px-8 flex items-center gap-4 shadow-md bg-white">
          <Skeleton className="h-8 w-8 rounded-full skeleton" />
          <Skeleton className="h-8 w-32 skeleton" />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3 app-details mt-4">
          <div className="w-full md:w-1/2">
            <div className="border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 mb-4 skeleton" />
              <Skeleton className="h-6 w-64 mb-2 skeleton" />
              <Skeleton className="h-6 w-64 mb-2 skeleton" />
            </div>
            <div className="mt-4 border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 skeleton" />
            </div>
            <div className="mt-4 border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 skeleton" />
              <Skeleton className="h-6 w-64 mt-2 skeleton" />
            </div>
            <div className="mt-4 border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 skeleton" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 mb-4 skeleton" />
              <Skeleton className="h-6 w-64 mb-2 skeleton" />
            </div>
            <div className="mt-4 border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 skeleton" />
            </div>
            <div className="mt-4 border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 skeleton" />
            </div>
            <div className="mt-4 border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 skeleton" />
            </div>
            <div className="mt-4 border-2 border-dashed p-4">
              <Skeleton className="h-6 w-48 skeleton" />
            </div>
          </div>
        </div>
      </>
  )
}

export default SkeletonAppDetails