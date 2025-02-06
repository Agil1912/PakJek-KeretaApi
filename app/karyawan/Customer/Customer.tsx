import React from "react";
import { User } from "../types";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./Deletecustomer";
import Forgotpassword from "./Forgotpassword";

interface props {
  item: User;
}
const Customer = (myprops: props) => {
  return (
    <div className="w-full flex flex-wrap my-2 border text-black rounded-md shadow-lg">
      <div className="w-full flex flex-col  md:w-4/12 p-2">
        <small className="text-sm font-medium">Name</small>
        <span>{myprops.item.name}</span>
      </div>
      <div className="w-full flex flex-col  md:w-4/12 p-2">
        <small className="text-sm font-medium">Alamat</small>
        <span>{myprops.item.address}</span>
      </div>
      <div className="w-full flex flex-col  md:w-4/12 p-2">
        <small className="text-sm font-medium">No. Telp</small>
        <span>{myprops.item.phone}</span>
      </div>
      <div className="w-full flex flex-col  md:w-2/12 p-2">
        <small className="text-sm font-medium">Action</small>
        <div className="flex gap-2 items-center">
          <EditCustomer item={myprops.item} />
          <DeleteCustomer item={myprops.item} />
          <Forgotpassword item={myprops.item} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
