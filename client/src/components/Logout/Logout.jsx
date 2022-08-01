import "./Logout.scss"
import { logout } from "../../features/auth/authSlice"
import { useDispatch } from "react-redux"

function Logout() {
  const dispatch = useDispatch()

  //onClick function
  const onClick = (e) => {
    dispatch(logout())
  }
  return (
    <button className="logout-btn" title="Se déconnecter" onClick={onClick}>
      Se déconnecter
    </button>
  )
}

export default Logout
