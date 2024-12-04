import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { facilities } from "../config/constants";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import PageLayout from "../layouts/page-layout";
import OutletCardSkeleton from "../components/skeletons/outlet-card-skeleton";
import { useOutlets } from "../hooks";
import TypingAnimation from "../components/typing-animation";
import OutletCard from "../components/outlet-card";
import SearchBar from "../components/search-bar";

const Home = () => {
  const { outlets, isFetchingOutlets } = useOutlets();

  return (
    <PageLayout>
      <section className="w-full h-[50dvh] mb-10 overflow-hidden bg-gray-200 relative">
        <img
          className="w-full h-full object-cover opacity-70 absolute"
          src="outlets/kost_mega_city.webp"
          alt=""
        />
        <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <TypingAnimation />
        </div>
      </section>
      <section className="px-[5%] md:px-[14%] w-full -translate-y-40">
        <SearchBar />
      </section>
      <section className="px-[5%] md:px-[14%] py-5 w-full">
        <div className="border p-[4%] md:p-[2%] rounded-xl bg-white">
          <div className="flex justify-between mb-8 w-full">
            <span>
              <h1 className="text-md md:text-2xl font-bold">
                Outlets Nearby Your Workspace!
              </h1>
              <p className="md:text-md mb-4 text-gray-400">
                Various outlets accross JABODETABEK to reach your minimum wage
                working space!
              </p>
            </span>
            <a
              href="/outlets"
              className="flex gap-1 items-center text-sm underline"
            >
              See all <FaChevronRight color="black" size={12} />
            </a>
          </div>
          <div className="flex w-full gap-5 overflow-x-auto pb-10">
            {isFetchingOutlets && <OutletCardSkeleton num={12} />}
            {outlets?.map((outlet, i) => (
              <OutletCard outlet={outlet} key={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="px-[5%] md:px-[14%] py-10 w-full">
        <h1 className="text-2xl font-bold mb-1">IBDA-KOST will give you...</h1>
        <p className="text-md mb-4 text-gray-500">
          unlimited comforts and chills through your renting live with our
          facilities.
        </p>
        <div className="w-full flex gap-4 overflow-x-auto pb-4">
          {facilities.map((facility, i) => (
            <div
              key={facility.key}
              className="w-full px-8 md:aspect-square border flex md:flex-col gap-4 justify-center items-center rounded-xl flex-shrink-1 bg-white"
            >
              <facility.icon size={24} color={facility.color} />
              <p className="text-gray-400">{facility.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Section 2: Keunggulan */}
      {/* <section className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-purple-700 mb-6">
            Mengapa Memilih IBDA Kost?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg">
              <img
                src="https://via.placeholder.com/100x100"
                alt="Icon"
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-purple-700">
                Manajemen Kamar
              </h3>
              <p className="text-gray-600">
                Lacak status kamar dengan mudah, dari ketersediaan hingga
                riwayat penyewaan.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg">
              <img
                src="https://via.placeholder.com/100x100"
                alt="Icon"
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-purple-700">
                Pembayaran Otomatis
              </h3>
              <p className="text-gray-600">
                Proses pembayaran jadi lebih praktis dengan sistem otomatisasi.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg">
              <img
                src="https://via.placeholder.com/100x100"
                alt="Icon"
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-purple-700">
                Laporan Keuangan
              </h3>
              <p className="text-gray-600">
                Transparansi dalam laporan keuangan untuk pengelola kost.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Section 3: Testimoni */}
      <section className="h-screen bg-gradient-to-br from-purple-500 to-purple-800 text-white flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-8">Apa Kata Mereka?</h2>
        <div className="max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
            <p className="italic">
              "IBDA Kost sangat membantu saya mengelola pembayaran bulanan dan
              memantau ketersediaan kamar. Semuanya jadi jauh lebih efisien!"
            </p>
            <p className="text-yellow-300 font-semibold mt-4">
              - Budi, Pemilik Kost
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
            <p className="italic">
              "Sebagai penghuni kost, saya sangat terbantu dengan transparansi
              laporan dan kemudahan pembayaran melalui IBDA Kost."
            </p>
            <p className="text-yellow-300 font-semibold mt-4">
              - Siti, Penghuni Kost
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Call-to-Action */}
      {/* <section className="h-screen bg-gray-200 flex flex-col justify-center items-center">
        <div className="text-center px-6">
          <h2 className="text-4xl font-bold text-purple-700 mb-6">
            Siap untuk Mulai?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Kelola kost Anda dengan mudah dan efisien bersama IBDA Kost. Klik
            tombol di bawah untuk menjelajahi lokasi kost yang tersedia!
          </p>
          <a
            href="/outlets"
            className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-full shadow-md hover:bg-purple-800 transition duration-300"
          >
            Jelajahi Kost
          </a>
        </div>
      </section> */}
    </PageLayout>
  );
};

export default Home;
