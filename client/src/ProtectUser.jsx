import { Navigate, Outlet } from "react-router-dom"

const useProtectUser = (user) => {
  const isUser = user === "utilisateur" ? true : false
  return isUser
}

function ProtectUser({ role }) {
  const isUser = useProtectUser(role)
  return isUser ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectUser
