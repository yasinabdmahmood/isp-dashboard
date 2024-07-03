const isAdminPlus = () => {
    const role = JSON.parse(sessionStorage.getItem('user'))?.role;
    return role === 'admin_plus'
}

export default isAdminPlus;