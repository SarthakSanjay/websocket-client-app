import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="h-10 w-full bg-purple-300 flex text-black rounded-lg">
        <div className="h-10 w-10 text-2xl flex justify-center items-center"><FiSearch /></div>
        <input type="text" className="h-full w-full bg-transparent outline-none px-1 text-black
        placeholder:text-black "
        placeholder="search" />
    </div>
  )
}

export default Search