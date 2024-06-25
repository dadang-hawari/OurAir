export default function SkeletonDetailPesanan() {
  return (
    <div className="w-full md:max-w-[376px] mt-2 bg-white p-4 rounded-lg shadow-md animate-pulse">
      <div className="w-full">
        <div className="flex justify-between mt-2">
          <div className="bg-gray-300 w-1/2 h-6 rounded-full"></div>
          <span className="bg-gray-300 w-20 h-6 rounded-full"></span>
        </div>
        <div className="my-2">
          <div className="bg-gray-300 w-2/3 h-5 rounded-full my-3"></div>
        </div>
        <div className="flex justify-between">
          <span className="bg-gray-300 w-24 h-5 rounded-full"></span>
          <span className="bg-gray-300 w-20 h-5 rounded-full"></span>
        </div>
        <div className="bg-gray-300 w-20 h-5 rounded-full my-2"></div>
        <div className="text-sm">
          <hr className="w-[95%] mx-auto my-3" />
          <div className="flex items-center gap-x-2">
            <div className="w-full">
              <div className="bg-gray-300 w-2/3 h-5 rounded-full my-3"></div>
              <div className="bg-gray-300 w-24 h-5 rounded-full"></div>
              <div className="bg-gray-300 w-2/3 h-5 rounded-full my-3"></div>
              <div className="bg-gray-300 w-24 h-5 rounded-full"></div>
            </div>
          </div>
          <hr className="w-[95%] mx-auto my-3" />
          <div>
            <div className="flex justify-between">
              <div className="bg-gray-300 w-1/2 h-6 rounded-full"></div>
              <span className="bg-gray-300 w-20 h-6 rounded-full"></span>
            </div>
            <div className="bg-gray-300 w-2/3 h-5 rounded-full my-3"></div>
            <div className="bg-gray-300 w-24 h-5 rounded-full"></div>
            <div className="bg-gray-300 w-28 h-5 rounded-full my-3"></div>
          </div>
          <hr className="w-[95%] mx-auto my-3" />
          <div className="w-full">
            <div className="bg-gray-300 w-1/2 h-6 rounded-full"></div>

            <div className="flex justify-between my-3">
              <div className="bg-gray-300 w-1/2 h-5 rounded-full "></div>
              <div className="bg-gray-300 w-20 h-5 rounded-full"></div>
            </div>

            <div className="flex justify-between my-3">
              <div className="bg-gray-300 w-1/2 h-5 rounded-full "></div>
              <div className="bg-gray-300 w-20 h-5 rounded-full"></div>
            </div>
          </div>
          <hr className="w-[95%] mx-auto my-3" />
          <div className="flex justify-between my-3">
            <div className="bg-gray-300 w-1/2 h-5 rounded-full "></div>
            <div className="bg-gray-300 w-20 h-5 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 mt-5 text-xl font-[600] text-white rounded-md w-full h-[62px]"></div>
    </div>
  )
}
