import { ScheduleType } from "../types";
import DropSchedule from "./dropSchedule";
import EditSchedule from "./editSchedule";

type Props = {
  item: ScheduleType;
};

export const showType = (date: string) => {
  const currentDate = new Date(date);
  return currentDate.toLocaleTimeString(`id-ID`, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
const Schedule = (myProps: Props) => {
  return (
    <div className="flex flex-wrap w-full border rounded-md shadow-md my-2">
      <div className="w-full md:w-3/12 p-3 flex flex-col">
        <small className="text-xs font-semibold text-sky-700">
          Berangkat Dari
        </small>
        <strong>{myProps.item.departured_location}</strong>
        <small className="text-xs font-semibold text-sky-700">
          Waktu Keberangkatan
        </small>
        <strong>{showType(myProps.item.departured_time)}</strong>
      </div>
      <div className="w-full md:w-3/12 p-3 flex flex-col">
        <small className="text-xs font-semibold text-sky-700">Tiba Di</small>
        <strong>{myProps.item.arrived_location}</strong>
        <small className="text-xs font-semibold text-sky-700">
          Waktu Kedatangan
        </small>
        <strong>{showType(myProps.item.arrived_time)}</strong>
      </div>
      <div className="w-full md:w-4/12 p-3  flex flex-col">
        <small className="text-xs font-semibold text-sky-700">
          Unit Kereta
        </small>
        <strong>{myProps.item.train_details.name}</strong>
        <small className="text-xs font-semibold text-sky-700">Price</small>
        <strong>
          {myProps.item.price.toLocaleString(`en-US`, {
            style: `currency`,
            currency: `IDR`,
          })}
        </strong>
      </div>
      <div className="flex gap-2 items-center">
        <EditSchedule item={myProps.item} />
        <DropSchedule schedule={myProps.item} />
      </div>
    </div>
  );
};
export default Schedule;
