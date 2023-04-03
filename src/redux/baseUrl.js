const baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'? 'http://localhost:3000':'https://baban-net.herokuapp.com';
export default baseUrl;
