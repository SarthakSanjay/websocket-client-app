import MessageArea from './components/MessageArea'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className='h-screen w-screen bg-black text-white flex'>
        <Sidebar />
        <MessageArea />
    </div>
  )
}

export default App
