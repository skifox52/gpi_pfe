import "./Utilisateur.scss"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import SingleUtilisateur from "../../components/SingleUtilisateur/SingleUtilisateur"
import SearchBar from "../../components/serchBar/SearchBar"

function Utilisateur() {
  const API_URI = "/users/all"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState(false)
  const [input, setInput] = useState("")
  const searchInput = (value) => {
    setInput(value)
  }

  const changeState = () => {
    setState(!state)
  }
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
  }, [state])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="utilisateurs">
      <>
        <SearchBar
          users={users}
          changeState={changeState}
          searchInput={searchInput}
        />
      </>
      {users
        ?.filter((user) => {
          if (input === "") return user

          if (
            user.Nom.toLowerCase().includes(input.toLocaleLowerCase()) ||
            user.Prénom.toLowerCase().includes(input.toLocaleLowerCase()) ||
            user.Role.toLowerCase().includes(input.toLowerCase())
          )
            return user
        })
        .map((user, i) => (
          <SingleUtilisateur
            user={user}
            key={user.Id}
            changeState={changeState}
          />
        ))}
    </div>
  )
}

export default Utilisateur
