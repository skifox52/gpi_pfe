import { Outlet, Navigate } from "react-router-dom"

const useProtect = (user) => {
  const isInfo = user?.toLowerCase() === "informaticien" ? true : false
  return isInfo
}

function ProtectInfo({ role }) {
  const isInfo = useProtect(role)
  return isInfo ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectInfo
