export const parseOrderTime = (time) => {
  let dateTime = new Date(time);
  return `${dateTime.getDate()}/${
    dateTime.getMonth() + 1
  }/${dateTime.getFullYear()} - ${dateTime.getHours()}:${
    dateTime.getMinutes() < 10 ? "0" : ""
  }${dateTime.getMinutes()}`;
};
