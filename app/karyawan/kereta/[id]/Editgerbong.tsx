"use client"
import { useState } from "react";
import { wagon } from "../../types";
import { useRouter } from "next/navigation";
import { getStoresCookie } from "@/helper/client.cookkie";
import { axiosInstance } from "@/helper/api";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/modal";

interface props {
    item: wagon
}

const Editgerbong = (myprops: props) => {
  const [name, setName] = useState<string>(myprops.item.name)
  const [seatCount, setSeatCount] = useState<number>(myprops.item.seat_count)
  const [show, setShow] = useState<boolean>(false)
  const router = useRouter()

  const openModal = () => {
    setName(myprops.item.name)
    setSeatCount(myprops.item.seat_count)
    setShow(true)
  }

  const closeModal = () => {
    setShow(false)
    setName(myprops.item.name)
    setSeatCount(myprops.item.seat_count)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Pindahkan ke awal agar tidak ada event default yang berjalan
    try {
      const  cookie = getStoresCookie('token')
      const response: any = await axiosInstance.put(`/train/wagon/${myprops.item.id}`, {
        name,
        seat_count: seatCount
      }, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        }
      }
    )

    const message = response.data.message

    if (!response.data.success) {
      toast(message, {
                type:'warning',
                containerId: `toastEdit-${myprops.item.id}`
      })
    }

    toast(message, {
      type:'success',
      containerId: `toastEdit-${myprops.item.id}`
    })

   setShow(false)
   setTimeout(() => router.refresh(), 1000)
    } catch (error) {
      console.log(error)
      toast(
        `Something went wrong`,

        {
          toastId: `toastEdit-${myprops.item.id}`,
          type: 'error',
        }
      )  
    }
  }
  return (
    <div>
      <ToastContainer containerId={`toastEdit-${myprops.item.id}`}/>
      <button type="button" onClick={() => openModal()}
      className="px-2 py-1 bg-sky-600 hover:bg-sky-500 rounded-md text-white"
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <Modal isShow={show}>
      <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Tambah Kereta</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>
            
            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Nama Gerbong
                </small>
                <input type="text" id={`name-${myprops.item.id}`} 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" 
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Jumlah Kursi
                </small>
                <input type="text"  id={`seat-${myprops.item.id}`}
                value={seatCount.toString()} 
                onChange={(e) => setSeatCount(Number(e.target.value))}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                />
              </div>
            </div>

            <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
             <button type="button" onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
              >Close</button>
             <button type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
              >Submit</button>
            </div>

          </form>
      </Modal>
    </div>
  );
};

export default Editgerbong;
