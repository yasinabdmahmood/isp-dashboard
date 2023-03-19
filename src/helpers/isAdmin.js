const isAdmin = () => {
    const role = JSON.parse(sessionStorage.getItem('user')).role;
    return role === 'admin'
}

export default isAdmin;