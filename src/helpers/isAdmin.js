const isAdmin = () => {
    const role = JSON.parse(sessionStorage.getItem('user'))?.role;
    return role === 'admin' || 'admin_plus'
}

export default isAdmin;