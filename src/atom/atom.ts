import axios from "axios";
import { atom, selector } from "recoil";
import { TOKEN } from "../utils/util";

export const themeAtom = atom({
    key: "themeAtom",
    default: 'light'
})

export const totalFriendReqAtom = atom({
    key: "totalFriendReqAtom",
    default: 0
})

export const fetchNotificationCount = selector({
    key: 'fetchNotificationCount',
    get: async ({ get }) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/friend/all/request`,{
            headers:{
                Authorization: `Bearer ${TOKEN}`
            }
        })
        return res.data.friendReq.length; 
      } catch (error) {
        console.error('Error fetching notification count:', error);
        return get(totalFriendReqAtom); 
      }
    },
  });

  export const messageAtom = atom({
    key: 'messageAtom',
    default: {
      friendId : 0,
      message: ''
    }
  })

  export const fetchSelfDetails = selector({
    key: 'fetchSelfDetails',
    get:  async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/details`,{
          headers:{
              Authorization: `Bearer ${TOKEN}`
          }
      })
        return res.data.user; 
      } catch (error:any) {
        console.error('Error fetching self details:', error.message);
      }
    },
  })