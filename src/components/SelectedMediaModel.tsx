import React from 'react'

const SelectedMediaModel = () => {
    let fileUrl
  return (
    <div className="flex flex-col gap-3 w-[500px] h-[500px]">
    {fileUrl ? (
      <img
        src={fileUrl}
        className="h-[300px] w-[300px] rounded-lg border-2 border-gray-300"
      />
    ) : (
      ""
    )}</div>
  )
}

export default SelectedMediaModel