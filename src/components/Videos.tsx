import React, { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { videosAtom } from '../atom/atom'
import { filesProp } from '../types/common'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { TOKEN } from '../utils/util'
import { GoPlay } from 'react-icons/go'

const Videos = () => {
    const [videos ,setVideos] = useRecoilState(videosAtom)
    const {id} = useParams()
    const videoRef = useRef<HTMLVideoElement>(null)

    const playVideo = () => {
        if(videoRef.current){
            console.log(videoRef.current);
            videoRef.current.requestFullscreen()
        }
    }
    useEffect(()=>{
        async function fetchUserDetails() {
          const res = await axios.get(`/user/${id}`,{
            headers:{
              Authorization: `Bearer ${TOKEN}`
            }
          })
          setVideos(res.data.mediaVideo)
    
        }
        if(id){
          fetchUserDetails()
        }
      },[id])
  return (
    <div className='h-[80vh] w-full border overflow-y-scroll
     p-2'>
        <div className='flex h-max gap-2'>
        {videos.map((video:filesProp) =>{
              return <div className='relative'>
                <video 
              ref={videoRef}
              className="h-max border w-[180px]"
              src={video.data}>
              </video>
                <button className='absolute bg-black/35 h-10 w-10 rounded-full
                flex justify-center items-center top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] text-3xl text-white
                hover:text-black hover:bg-white/35 '
                onClick={playVideo}>
                    <GoPlay />
                    </button>
              </div>
            })}
        </div>
    </div>
  )
}

export default Videos