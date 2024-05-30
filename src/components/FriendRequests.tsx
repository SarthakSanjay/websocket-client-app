import axios from 'axios'
import { useEffect, useState } from 'react'
import { TOKEN } from '../utils/util'
import { User } from './SearchModal'
import { totalFriendReqAtom } from '../atom/atom'
import { useSetRecoilState } from 'recoil'

interface request {
    id: number
    friend: User
    date :Date
}
const FriendRequests = () => {
    const [requests , setRequests] = useState([])
    const setTotalFriendReq = useSetRecoilState(totalFriendReqAtom)
    console.log("req",requests);
    useEffect(()=>{
        async function fetchRequests() {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/friend/all/request`,{
                headers:{
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            setRequests(res.data.friendReq)
            setTotalFriendReq(res.data.friendReq.length)
            
        }
        fetchRequests()
    },[])
  return (
    <div className={`h-full w-[65%] flex rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 dark:bg-purple-950  p-4`}>
        {requests.map((req:request) => {
            return <Request req={req} />
        })}
    </div>
  )
}
interface reqProp {
    req: request
}
const Request: React.FC<reqProp> = ({req}) =>{
    return <div className='bg-white/35 w-2/3 h-14 rounded-lg text-black px-3 flex items-center justify-between'>
    <div className='flex gap-3 items-center'>
        <img src='https://www.github.com/sarthaksanjay.png' 
        className='h-10 w-10 rounded-lg' />
        <h1>{req.friend.username}</h1>
    </div>
    <div className='flex gap-3'>
        <button className='bg-black/60 text-green-500 h-7 w-max px-2 rounded-lg'>Accept</button>
        <button className='bg-black/60 text-red-500 h-7 w-max px-2 rounded-lg'>Reject</button>
    </div>
</div>
}
export default FriendRequests