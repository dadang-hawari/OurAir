import React from 'react'

export default function SkeletonNotification() {
  return (
    <div className="max-w-3xl mx-auto p-4 mt-5">
      <div className="w-full animate-pulse flex items-center justify-between">
        <div className="w-full flex items-center gap-x-5">
          <div className="bg-gray-300 h-7 w-7 rounded-full p-4"></div>
          <div className="w-full">
            <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
            <div className="bg-gray-300 h-4 max-w-80 mt-3  rounded-full"></div>
          </div>
          <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
        </div>
      </div>
      <div className="w-full animate-pulse my-8 flex items-center justify-between">
        <div className="w-full flex items-center gap-x-5">
          <div className="bg-gray-300 h-7 w-7 rounded-full p-4"></div>
          <div className="w-full">
            <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
            <div className="bg-gray-300 h-4 max-w-80 mt-3  rounded-full"></div>
          </div>
          <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
        </div>
      </div>
      <div className="w-full animate-pulse flex mb-8 items-center justify-between">
        <div className="w-full flex items-center gap-x-5">
          <div className="bg-gray-300 h-7 w-7 rounded-full p-4"></div>
          <div className="w-full">
            <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
            <div className="bg-gray-300 h-4 max-w-80 mt-3  rounded-full"></div>
          </div>
          <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
        </div>
      </div>
      <div className="w-full animate-pulse flex items-center justify-between">
        <div className="w-full flex items-center gap-x-5">
          <div className="bg-gray-300 h-7 w-7 rounded-full p-4"></div>
          <div className="w-full">
            <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
            <div className="bg-gray-300 h-4 max-w-80 mt-3  rounded-full"></div>
          </div>
          <div className="bg-gray-300 h-4 max-w-40 w-full rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
