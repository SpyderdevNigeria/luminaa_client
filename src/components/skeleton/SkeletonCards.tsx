export function LabCardSkeleton() {
  return (
    <main className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white  text-black flex flex-col gap-6 relative animate-pulse">
      {/* Dropdown Placeholder */}
      <div className="absolute top-4 right-4 w-6 h-6 bg-gray-200 rounded-full" />

      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      {/* Progress Bar Skeleton */}
      <div className="w-full">
        <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
        <div className="flex items-center justify-between">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center relative"
            >
              <div className="w-4 h-4 bg-gray-300 rounded-full z-10" />
              {index !== 3 && (
                <div className="absolute top-1/2 left-1/2 h-1 w-full transform -translate-y-1/2 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-3 w-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 bg-gray-300 rounded w-20 mb-2" />
          <div className="w-24 h-6 rounded-full bg-gray-200" />
        </div>
        <div className="md:col-span-2">
          <div className="h-4 bg-gray-300 rounded w-20 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-full mb-1" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-36 bg-gray-300 rounded-md" />
      </div>
    </main>
  );
}
export function TestDetailsSkeleton() {
  return (
    <div className="container-bd max-w-6xl mx-auto animate-pulse">
      <div className="w-full">
        {/* <button className="text-xl gap-2 font-semibold my-4 flex items-center">
          <BiArrowBack /> Back
        </button> */}

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Test Overview Skeleton */}
          <section className="lg:col-span-4 lg:row-span-2">
            <main className="w-full space-y-4 rounded-lg p-4 bg-white ">
              <div className="h-6 bg-gray-300 rounded w-40" />
              <div className="grid grid-cols-2 gap-4 pt-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-14 bg-gray-200 rounded" />
                ))}
                <div className="col-span-2">
                  <div className="h-4 w-40 bg-gray-300 rounded mb-4" />
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded" />
                    ))}
                  </div>
                  <div className="flex justify-end pt-4">
                    <div className="h-10 w-32 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </main>
          </section>

          {/* Patient Info Skeleton */}
          <section className="lg:col-span-3">
            <div className="w-full space-y-4 h-full bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full" />
                <div className="h-6 w-40 bg-gray-300 rounded" />
              </div>
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-6 bg-gray-300 rounded w-full" />
            </div>
          </section>

          {/* Doctor Info Skeleton */}
          <section className="lg:col-span-3">
            <div className="h-full space-y-4 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full" />
                <div className="h-6 w-40 bg-gray-300 rounded" />
              </div>
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-6 bg-gray-300 rounded w-full" />
            </div>
          </section>

          {/* Doctor Note Skeleton */}
          <section className="lg:col-span-7">
            <div className="w-full space-y-4 rounded-lg p-4 bg-white ">
              <div className="h-6 w-48 bg-gray-300 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </section>
        </div>
      </div>

      {/* Test Results Skeleton */}
      <section>
        <div className="mt-6 container-bd">
          <div className="h-6 w-48 bg-gray-300 rounded mb-4" />
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-4 mt-2"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full h-12 bg-gray-200 rounded" />
              ))}
              <div className="h-10 w-10 bg-gray-300 rounded" />
            </div>
          ))}

          {/* New Result Inputs */}
          <div className="flex flex-row items-center justify-between gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-12 bg-gray-200 rounded" />
            ))}
            <div className="h-10 w-10 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Result Note Skeleton */}
        <section className="lg:col-span-7">
          <div className="w-full space-y-4 rounded-lg p-4 bg-white ">
            <div className="h-6 w-48 bg-gray-300 rounded" />
            <div className="h-28 bg-gray-200 rounded" />
            <div className="flex justify-end">
              <div className="h-10 w-40 bg-gray-300 rounded" />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export function AppointmentCardSkeleton() {
  return (
    <div className="bg-white  border border-[#E5E7EB] rounded-xl p-6 shadow-sm animate-pulse">
      {/* Title & Patient */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>

      {/* Location */}
      <div className="mt-4">
        <div className="h-3 w-24 bg-gray-300 rounded mb-1" />
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Date & Time Box */}
      <div className="mt-4 bg-[#F9FAFB] rounded-lg p-4 flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="space-y-1">
          <div className="h-2 w-24 bg-gray-300 rounded" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Symptoms */}
      <div className="my-4">
        <div className="h-2 w-20 bg-gray-300 rounded mb-1" />
        <div className="space-y-1">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Button */}
      <div className="mt-5">
        <div className="h-9 w-40 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export function MedicationCardSkeleton() {
  return (
    <div className="bg-white  border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition relative animate-pulse">
      {/* Top: Icon + Medication Name */}
      <div className="flex items-center space-x-3">
        <div className="bg-gray-200 p-3 rounded-full w-10 h-10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>

      {/* Middle: Key Info */}
      <div className="mt-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="h-3 bg-gray-100 rounded w-1/4 mb-1" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        ))}

        {/* Description */}
        <div>
          <div className="h-3 bg-gray-100 rounded w-1/4 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>

      {/* Bottom: Button Skeleton */}
      <div className="mt-6">
        <div className="w-full h-10 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}