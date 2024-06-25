import { useRecoilValue } from "recoil"
import { toggleFilesAtom } from "../atom/atom"
import Files from "./Files"
import UserInfo from "./UserInfo"

const UserDetails = () => {
  const toggleFiles = useRecoilValue(toggleFilesAtom)

  return (
    <div className="h-full lg:w-[30%] bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-3xl p-3
    flex items-center flex-col">
      {toggleFiles ? <Files /> : <UserInfo /> }
    </div>
  )
}

export default UserDetails