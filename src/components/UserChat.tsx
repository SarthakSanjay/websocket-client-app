const UserChat = () => {
  return (
    <div className='h-16 w-full hover:bg-purple-200 rounded-lg flex mt-2 justify-between items-center'>
        <img src='https://www.github.com/sarthaksanjay.png' 
        className='h-16 w-16 rounded-lg' />
        <div className='h-16 w-[70%] text-black flex flex-col '>
            <text className='font-semibold'>name</text>
            <text className='font-extralight'>message</text>
        </div>
    </div>
  )
}

export default UserChat