import React from 'react';
import axios from 'axios';
import baseUrl from '../../../redux/baseUrl';

const CSVDownloadButton = ({endPoint,label}) => {
  const downloadCSV = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${endPoint}`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const url = URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.download = 'subscription_records.csv';
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return <button className='btn btn-sm btn-primary' onClick={downloadCSV}>{label}</button>;
};

export default CSVDownloadButton;
