import React from 'react'

interface APprop {
    src : string
}
const AudioPlayer: React.FC<APprop> = ({src}) => {
  return (
    <div>
    <audio controls>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  )
}

export default AudioPlayer