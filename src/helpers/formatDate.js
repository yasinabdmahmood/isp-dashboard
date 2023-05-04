export const formatDate = (dateTimeStr) => {
  function padNumber(num) {
    return num.toString().padStart(2, '0');
  }
  const date = new Date(dateTimeStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}/${padNumber(month)}/${padNumber(day)}  ${padNumber(hours)}:${padNumber(minutes)}`;
}

  
  

export const convertToRailsDateTime = (dateTimeStr) => {
  function padNumber(num) {
    return num.toString().padStart(2, '0');
  }
  const date = new Date(dateTimeStr);
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());
  const seconds = padNumber(date.getSeconds());
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
  const timezoneOffsetSign = timezoneOffset >= 0 ? '-' : '+';
  const timezone = `${timezoneOffsetSign}${padNumber(timezoneOffsetHours)}:${padNumber(timezoneOffsetMinutes)}`;
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds} ${timezone}`;
};

  
  
  

  