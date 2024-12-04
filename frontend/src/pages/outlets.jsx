import React, { useState } from "react";
import PageLayout from "../layouts/page-layout";
import { useOutlets } from "../hooks";
import OutletCardSkeleton from "../components/skeletons/outlet-card-skeleton";
import OutletCard from "../components/outlet-card";
import SearchBar from "../components/search-bar";

const Outlets = () => {
  const [filter, setFilter] = useState("");
  const { outlets, outletCities, isFetchingOutlets } = useOutlets();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredOutlets = outlets.filter((outlet) =>
    outlet.city.toString().includes(filter)
  );

  return (
    <PageLayout navBgColor={"white"}>
      <section className="w-full h-[36dvh] mb-10 overflow-hidden bg-gray-600 relative">
        <img
          className="w-full h-full object-cover opacity-50 absolute"
          src="/outlets/kost_mega_city.webp"
          alt=""
        />
      </section>
      <section className="px-[14%] w-full absolute -translate-y-40">
        <h1 className="mb-12 text-3xl font-bold text-center text-white">Search all Outlets</h1>
        <SearchBar />
      </section>
      <section className="px-[14%] py-10">
        <div className="flex justify-between items-center mb-6">
          <span></span>
          <div className="flex gap-2 items-center">
            <p className="text-gray-400">City: </p>
            <select
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="">–– All</option>
              {outletCities?.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isFetchingOutlets && <OutletCardSkeleton num={12} />}
          {filteredOutlets?.map((outlet, i) => (
            <OutletCard type={2} outlet={outlet} key={i} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Outlets;
