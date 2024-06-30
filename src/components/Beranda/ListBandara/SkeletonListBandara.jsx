export const SkeletonListBandara = () => (
  <div className="animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div className="px-4" key={i}>
        <div className="h-4 w-72 bg-gray-300 rounded-full -4 mt-5"></div>
        <div className="h-4 w-40 bg-gray-300 rounded-full ms-4 mt-4"></div>
      </div>
    ))}
  </div>
)
