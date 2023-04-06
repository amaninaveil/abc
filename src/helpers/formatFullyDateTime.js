import { MonthNames } from "../components/AdminHeader/DateTimeDisplay/type";

const formatFullyDate = (dateString) => {
  let today = new Date(dateString);
  return `${
    MonthNames[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;
};
export default formatFullyDate;
