import SearchedUser from "./SearchedUser"

export interface User {
    id: number
    email: string
    username: string
}
interface Users {
    users : User[]
}
const SearchModal : React.FC<Users> = ({users}) => {

  return (
    <div className="absolute p-3 bg-black/80 overflow-y-scroll rounded-lg h-1/2 w-1/3 z-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {
            users.map((user)=>{
                return <SearchedUser user={user}/>
            })
        }
        </div>
  )
}

export default SearchModal