import "./Utilisateur.scss"
import { fetchUsers, reset } from "../../features/users/usersSlince"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import Users from "../../components/User/Users"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"

function Utilisateur() {
  const dispatch = useDispatch()
  const { status, users, message } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())

    if (status === "error") {
      toast.error(message)
    }
    return () => {
      dispatch(reset())
    }
  }, [message, dispatch])
  if (status === "pending") return <DashboardSpinner />
  return (
    <div className="utilisateurs">
      {users.map((user, i) => (
        <Users user={user} key={i} />
      ))}
    </div>
  )
}

export default Utilisateur
