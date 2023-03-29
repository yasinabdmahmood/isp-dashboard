const baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'? 'http://127.0.0.1:3000':'https://isp-system.onrender.com';
export default baseUrl;
