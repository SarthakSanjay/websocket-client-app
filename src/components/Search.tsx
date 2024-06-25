import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchModal from "./SearchModal";
import axios from "axios";
import { TOKEN } from "../utils/util";
import { searchInputAtom } from "../atom/atom";
import { useRecoilState } from "recoil";

const Search = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputAtom);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`/user/search`, {
        params: {
          search: searchInput,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => setUsers(res.data.users));
  }, [searchInput]);
  
  return (
    <div className="h-10 w-full bg-white/15 border border-black flex text-white rounded-lg ">
      <div className="h-10 w-10 text-2xl flex justify-center items-center text-black">
        <FiSearch />
      </div>
      <input
        type="text"
        className="h-full w-full bg-transparent outline-none px-1
        placeholder:text-black"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        value={searchInput}
        placeholder="search"
      />
      {searchInput.trim() !== "" && <SearchModal users={users} />}
    </div>
  );
};

export default Search;
