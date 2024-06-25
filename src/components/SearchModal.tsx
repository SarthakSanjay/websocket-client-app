import { useSetRecoilState } from "recoil"
import { User } from "../types/common"
import SearchedUser from "./SearchedUser"
import { searchInputAtom } from "../atom/atom"

interface Users {
    users : User[]
}
const SearchModal : React.FC<Users> = ({users}) => {
    const setSearchInput = useSetRecoilState(searchInputAtom)

  return (
    <div className="absolute py-3 px-5 bg-black/80  rounded-lg h-1/2 w-1/3 z-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    flex items-center flex-col border ">
        <div className="h-full w-full overflow-y-scroll">
        {
            users.map((user)=>{
                return <SearchedUser user={user}/>
            })
        }
        </div>
       
         <button 
      onClick={()=>setSearchInput('')}
      className="h-10 w-max py-1 my-2 px-5 bg-red-600 text-white rounded-lg
      hover:bg-red-800 ">Close</button>
        </div>
  )
}

export default SearchModal