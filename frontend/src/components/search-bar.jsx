import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOutlets } from "../hooks";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const searchRef = useRef();
  const navigate = useNavigate();
  const { setSearchTerm, searchResult } = useOutlets();

  function handleSearch(e) {
    e.preventDefault();
    setSearchTerm(searchRef?.current.value);
  }

  return (
    <>
      <div className="rounded-full bg-white shadow-xl relative">
        <form
          onSubmit={handleSearch}
          className="flex justify-between w-full items-center gap-4"
        >
          <input
            className="w-full py-5 px-6 rounded-full"
            type="text"
            placeholder="Search places, outlets, cities... ex: outlet near Kemayoran"
            // onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchRef}
          />
          <button
            type="submit"
            // onClick={() => setSearchTerm(searchRef?.current.value)}
            className="w-fit h-full py-5 px-6 flex gap-1 items-center font-semibold text-[#8542F0] bg-[#F3ECFD] hover:bg-[#E8DAFB] rounded-full transition-all duration-300"
          >
            <IoSearch size={20} color="#8542F0" />
            Search
          </button>
        </form>
        <div
          className={`flex flex-col gap-4 absolute z-50 w-full -bottom-4 translate-y-full ${
            searchResult?.length > 0 && "py-2"
          } bg-white shadow-xl rounded-md`}
        >
          {searchResult.length > 0 && (
            <>
              {searchResult?.map((res, i) => (
                <button
                  className="border-b px-6 py-2 flex items-center justify-between gap-2 hover:bg-gray-50"
                  key={i}
                  onClick={() => navigate(`/outlets/${res.outlet_id}`)}
                >
                  <span className="flex gap-2 w-full h-full">
                    <p>{res.name}</p>
                    <p className="text-gray-400">{res.address}</p>
                  </span>
                  <p className="text-gray-400">{res.city}</p>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
