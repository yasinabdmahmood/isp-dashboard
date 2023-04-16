export const formatDate = (dateTimeStr) => {
    function padNumber(num) {
      return num.toString().padStart(2, '0');
    }
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'AM' : 'PM';
    return `${year}/${padNumber(month)}/${padNumber(day)}  ${hours}:${padNumber(minutes)} ${ampm}`;
  }
  
  

  export const convertToRailsDateTime = (dateTimeStr) => {
    function padNumber(num) {
      return num.toString().padStart(2, '0');
    }
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());
    const hours = padNumber(date.getHours() % 12 || 12);
    const minutes = padNumber(date.getMinutes());
    const seconds = padNumber(date.getSeconds());
    const ampm = date.getHours() >= 12 ? 'AM' : 'PM';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  }
  
  
  

  