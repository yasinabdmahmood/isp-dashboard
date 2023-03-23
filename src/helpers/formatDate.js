function formatDate(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${year}/${padNumber(month)}/${padNumber(day)}  ${hours}:${padNumber(minutes)} ${ampm}`;
  }
  
  function padNumber(num) {
    return num.toString().padStart(2, '0');
  }

  export default formatDate;