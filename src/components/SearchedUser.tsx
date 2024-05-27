import { User } from "./SearchModal"

interface SearchUserProp {
    user : User
}
const SearchedUser : React.FC<SearchUserProp> = ({user}) => {
  return (
    <div className="h-16 hover:bg-white/25 rounded-lg my-1 cursor-pointer pr-2 flex justify-between items-center">
    <div className="flex gap-3 items-center">
    <img 
       src="https://www.github.com/sarthaksanjay.png"
       className="h-16 w-16 rounded-lg" />
       <div className="flex flex-col">
            <h1>{user.username}</h1>
            <h1>{user.email}</h1>
       </div>
    </div>

       <div className="flex h-full gap-3 opacity-0 hover:opacity-100 items-center">
        <button className="w-max h-8 px-2 py-1 rounded-lg bg-gradient-to-r from-slate-300 to-slate-500 text-black text-sm">Details</button>
        <button className="w-max h-8 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-sm">Send Request</button>
       </div>
    </div>
  )
}

export default SearchedUser