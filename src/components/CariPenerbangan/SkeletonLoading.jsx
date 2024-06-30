export const SkeletonLoading = ({ loop = 10 }) => {
  const skeletons = Array.from({ length: loop })?.map((_, index) => (
    <div key={index} className="border animate-pulse w-full rounded-xl px-3 pt-4 pb-5 h-fit mb-4">
      <div className="flex items-center mt-2">
        <div className="h-4 w-44 bg-gray-300 rounded-xl"></div>
      </div>
      <div className="flex mt-2 gap-x-8">
        <div className="w-full">
          <div className="h-4 w-full bg-gray-300 rounded-xl mt-4 mb-3"></div>
          <div className="h-4 w-full bg-gray-300 rounded-xl"></div>
        </div>
        <div>
          <div className="h-4 w-24 bg-gray-300 rounded-xl"></div>
          <div className="h-4 w-24 bg-gray-300 my-3 rounded-xl"></div>
          <div className="h-4 w-24 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  ))

  return <>{skeletons}</>
}
