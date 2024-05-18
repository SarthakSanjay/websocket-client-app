import '../index.css'
interface MessageProp {
  self ?: boolean
  text : string
}
const Message : React.FC<MessageProp> = ({self,text}) => {
  console.log(self);
  return (
    <div className={`h-min  max-w-[40%] py-2 px-3 rounded-lg m-3 relative text-purple-950
    ${self
       ? ' bg-purple-400 before:before-custom before:bg-custom-gradient self-end'
    :' bg-purple-300 before:my before:my-custom-gradient'} 

    `}>
        {text}
    </div>
  )
}

export default Message