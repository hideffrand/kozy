export default function OutletCardSkeleton({ num }) {
  return (
    <>
      {Array.from({ length: num }).map((_, index) => (
        <div
          key={index}
          className="w-60 flex flex-col gap-2 flex-shrink-0 bg-white relative"
        >
          <div className="bg-gray-200 w-full h-52 rounded-md animate-pulse"></div>
          <div className="bg-gray-200 w-full h-4 rounded-md animate-pulse"></div>
          <div className="bg-gray-200 w-full h-12 rounded-md animate-pulse"></div>
          <div className="flex gap-2">
            <div className="bg-gray-200 w-full h-4 rounded-md animate-pulse"></div>
            <div className="bg-gray-200 w-full h-4 rounded-md animate-pulse"></div>
          </div>
          <div className="bg-gray-200 w-full h-8 rounded-md animate-pulse absolute bottom-0"></div>
        </div>
      ))}
    </>
  );
}
