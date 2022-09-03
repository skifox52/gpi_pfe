import "./Utilisateur.scss"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Users from "../../components/User/Users"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"

function Utilisateur() {
  const API_URI = "/users/all"
  const token = useSelector((state) => state.auth.user.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const respones = await axios.get(API_URI, config)
        setUsers(respones.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error)
      }
    }
    fetchUsers()
    return () => {
      setUsers([])
    }
  }, [])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="utilisateurs">
      {users?.map((user, i) => (
        <Users user={user} key={i} />
      ))}
    </div>
  )
}

export default Utilisateur
