import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const convertDateTime = (time: string) => {
  const parsedTime = dayjs.utc(time).tz("Asia/Singapore");
  return parsedTime.format("DD-MMM-YY HH:mm");
};

export default convertDateTime;
