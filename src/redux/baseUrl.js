const baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'? 'http://localhost:3000':'https://isp-system.onrender.com';
export default baseUrl;
