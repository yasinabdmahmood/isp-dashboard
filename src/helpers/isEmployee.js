const isEmployee = () => {
    const role = JSON.parse(sessionStorage.getItem('user'))?.role;
    return role === 'employee'
}

export default isEmployee;