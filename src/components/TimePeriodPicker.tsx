import { useState } from "react";
import { Subheading } from "./Controls/Subheading";
import { DatePicker } from "./Controls/DatePicker";

export const TimePeriodPicker = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-31");

  return (
    <section>
      <Subheading text="Time Period" />

      <div className="grid grid-cols-2 gap-4">
        {/* Start Date */}
        <DatePicker
          label="Start Date"
          date={startDate}
          setDate={setStartDate}
        />

        {/* End Date */}
        <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
      </div>
    </section>
  );
};
