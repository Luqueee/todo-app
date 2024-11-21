"use client";

import { useState } from "react";
import CalendarField from "./Calendar";
import UpdateDate from "@/db/task/update/UpdateDate";

export default function DateForm({ date, id }: { date: string; id: string }) {
  const [dateValue, setDate] = useState(new Date(date));

  const handleDateChange = (date: Date) => {
    console.log(date);
    setDate(date);
    UpdateDate({ id, date });
  };

  return (
    <CalendarField
      value={dateValue}
      onChange={(value) => {
        if (value) handleDateChange(value);
      }}
    />
  );
}
