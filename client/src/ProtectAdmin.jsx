import { Navigate, Outlet } from "react-router-dom"

const useProtectAdmin = (user) => {
  const isAdmin = user?.toLowerCase() === "admin" ? true : false
  return isAdmin
}

function ProtectAdmin({ role }) {
  const isAdmin = useProtectAdmin(role)
  return isAdmin ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectAdmin
