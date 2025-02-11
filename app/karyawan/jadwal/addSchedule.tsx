"use client";

import Modal from "@/components/modal";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookkie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { Train } from "../types";

type Props = {
  trains: Train[];
};

const AddSchedule = (myProp: Props) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const [departured_location, setDepaturedLocation] = useState<string>("");
  const [arrived_location, setArrivedLocation] = useState<string>("");
  const [departured_time, setDepaturedTime] = useState<Date>(new Date());
  const [arrived_time, setArrivedTime] = useState<Date>(new Date());
  const [train_id, setTrainId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const openModal = () => {
    setShow(true);
    setDepaturedLocation("");
    setArrivedLocation("");
    setDepaturedTime(new Date());
    setArrivedTime(new Date());
    setTrainId(0);
    setPrice(0);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `/schedule`;
      const requestData = {
        departured_location,
        arrived_location,
        departured_time,
        arrived_time,
        price,
        train_id,
      };
      const TOKEN = getStoresCookie(`token`);
      const response: any = await axiosInstance.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const message = response.data.message;
      if (response.data.success === true) {
        setShow(false);
        toast(message, {
          containerId: `toastAddJadwal`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(message, {
          containerId: `toastAddJadwal`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`something wrong`, {
        containerId: `toastAddJadwal`,
        type: "error",
      });
    }
  };
  return (
    <div>
      <ToastContainer containerId={`toastAddJadwal`} />
      <button
        className="rounded-md text-white bg-green-600 hover:bg-green-600 px-4 py-2"
        type="button"
        onClick={() => openModal()}
      >
        Tambah Jadwal Kereta
      </button>
      <Modal isShow={show}>
        <form onSubmit={handleSubmit}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Tambah Kereta</h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          <div className="w-full p-3">
            <div className="my-p2 border rounded-md">
              <small className="text-xs font-semibold text-sky-500">
                Berangakat Dari
              </small>
              <input
                type="text"
                id={`departured_location`}
                value={departured_location}
                onChange={(e) => setDepaturedLocation(e.target.value)}
                className="p-1 outline-none  w-full hover:border-b hover: border-sky-500"
                required={true}
              />
            </div>
          </div>
          <div className="w-full p-3">
            <div className="my-p2 border rounded-md">
              <small className="text-xs font-semibold text-sky-500">
                Waktu Berangkat
              </small>
              <DatePicker
                id={`departured_time`}
                selected={new Date(departured_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                onChange={(date) => setArrivedTime(date || new Date())}
                className="p-1 outline-none  w-full hover:border-b hover: border-sky-500"
              />
            </div>
          </div>
          <div className="w-full p-3">
            <div className="my-p2 border rounded-md">
              <small className="text-xs font-semibold text-sky-500">
                Tiba Di
              </small>
              <input
                type="text"
                id={`arrived_location`}
                value={arrived_location}
                onChange={(e) => setArrivedLocation(e.target.value)}
                className="p-1 outline-none  w-full hover:border-b hover: border-sky-500"
                required={true}
              />
            </div>
          </div>
          <div className="w-full p-3">
            <div className="my-p2 border rounded-md">
              <small className="text-xs font-semibold text-sky-500">
                Waktu Datang
              </small>
              <DatePicker
                id={`arrived_time`}
                selected={new Date(arrived_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                onChange={(date) => setArrivedTime(date || new Date())}
                className="p-1 outline-none  w-full hover:border-b hover: border-sky-500"
              />
            </div>
          </div>
          <div className="w-full p-3">
            <div className="my-p2 border rounded-md">
              <small className="text-xs font-semibold text-sky-500">
                Harga
              </small>
              <input
                type="number"
                id={`price`}
                value={price.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="p-1 outline-none  w-full hover:border-b hover: border-sky-500"
                required={true}
              />
            </div>
          </div>
          <div className="w-full p-3">
            <div className="my-p2 border rounded-md">
              <small className="text-xs font-semibold text-sky-500">
                Jenis Kereta
              </small>
              <select
                id={`train_id`}
                value={train_id.toString()}
                onChange={(e) => setTrainId(Number(e.target.value))}
                className="p-1 outline-none w-full border hover:border-sky-500"
                required={true}
              >
                <option value="">Pilih Jenis Kereta</option>
                {myProp.trains.map((kereta, index) => (
                  <option value={kereta.id} key={`optionKereta-${index}`}>
                    {kereta.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default AddSchedule;
