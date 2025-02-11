"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";

type props = {
  children: ReactNode;
};
const EmployeeTemplate = (myProp: props) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="w-dvw ">
      {/* header section */}
      <header className="w-full p-3 bg-orange-500 flex items-center gap-3">
        <button
          onClick={() => setShow(true)}
          type="button"
          className="size-8 rounded-full flex justify-center items-center bg-blue-800 hover:bg-blue-600 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white">Sekopling Sphoor</h1>
      </header>

      {/* sidebar section */}
      <div
        className={`w-1/2 md:w-1/3 lg:w-1/4 bg-blue-800 h-dvh fixed top-0 transform transition-transform ${
          show ? "left-0" : "right-full"
        }`}
      >
        {/* brand section */}
        <div className="w-full relative">
          <div className="w-full text-white font-bold my-5 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              />
            </svg>
          </div>
          <div
            className="absolute right-3 -top-3 cursor-pointer text-2xl text-white font-bold"
            onClick={() => setShow(false)}
          >
            &times;{" "}
          </div>
        </div>
        {/* menu section */}
        <div className="w-full flex flex-col">
          <Link
            href={`/karyawan/kereta`}
            className="w-full rounded-md text-white p-3 font-semibold hover:bg-blue-400"
          >
            Data Kereta
          </Link>
          <Link
            href={`/karyawan/Employee`}
            className="w-full rounded-md text-white p-3 font-semibold hover:bg-blue-400"
          >
            Data Karyawan
          </Link>
          <Link
            href={`/karyawan/Customer`}
            className="w-full rounded-md text-white p-3 font-semibold hover:bg-blue-400"
          >
            Data Customer
          </Link>
          <Link
            href={`/karyawan/jadwal`}
            className="w-full rounded-md text-white p-3 font-semibold
            hover:bg-blue-400"
          >
            {" "}
            Data Jadwal
          </Link>
        </div>
      </div>
      {myProp.children}
    </div>
  );
};
export default EmployeeTemplate;
