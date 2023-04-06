import React, { useState, useEffect } from "react";
import "./_dateTime.scss";
import { MonthNames, DayNames } from "./type";

function DateTime(props) {
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const getDate = () => {
    let today = new Date();
    let result = {};
    result.date = today.getDate();
    result.monthYear = MonthNames[today.getMonth()] + " " + today.getFullYear();
    result.day = DayNames[today.getDay()];
    setDate(result);
  };


  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  useEffect(() => {
    getDate();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      m = checkTime(m);
      setTime(h + ":" + m);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="date-time d-flex flex-direction-row align-items-center">
      <div className="calendar">
        <i className="fa fa-clock-o mr-3"></i>
        <span id="time" className="mr-5">
          {time}
        </span>
      </div>
      <div className="calendar">
        <div className="date">{date?.date}</div>
        <div>
          <div>{date?.monthYear}</div>
          <div className="day">{date?.day}</div>
        </div>
      </div>
    </div>
  );
}

DateTime.propTypes = {};

export default DateTime;
