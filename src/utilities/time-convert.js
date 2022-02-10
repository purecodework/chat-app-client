// a helper function that converts isoDate to xx:xx AM/PM format

const timeConvert = (isoDate) => {
  const time = new Date(isoDate).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
    timeZone: "UTC",
  });
  return time;
};

export default timeConvert;
