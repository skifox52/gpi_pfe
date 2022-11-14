import "./UserDetails.scss"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { toast } from "react-toastify"

function UserDetails() {
  const API_URI = "/users"
  const [user, setUser] = useState()
  const id = useSelector((state) => state.auth.user?.userId)
  const token = useSelector((state) => state.auth.user?.token)
  useEffect(() => {
    const fetchSingleUser = async (id) => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const response = await axios.get(`${API_URI}/${id}`, config)
        setUser(response.data)
      } catch (error) {
        toast.error(error)
      }
    }
    if (token) {
      fetchSingleUser(id)
    } else {
      return () => {
        setUser()
      }
    }
    return () => {
      setUser()
    }
  }, [token, id])
  return (
    <dialog className="user-details">
      <article className="user-detais-card">
        <span>Identifiant : </span>
        <p>{user ? user.Id : "null"}</p>
        <span>Nom : </span>
        <p>{user ? user.Nom : "null"}</p>
        <span>Prénom : </span>
        <p>{user ? user.Prenom : "null"}</p>
        <span>E-mail : </span>
        <p>{user ? user.Email : "null"}</p>
        <span>Département : </span>
        <p>{user ? user.Departement : "null"}</p>
        <span>Direction : </span>
        <p>{user ? user.Direction : "null"}</p>
        <span>Numéro portable : </span>
        <p>{user ? `0${user.TelephM}` : "null"}</p>
        <span>Numéro fix : </span>
        <p>{user ? `0${user.Teleph}` : "null"}</p>
        <button
          onClick={(e) => {
            document.querySelector(".user-details").close()
          }}
          className="close-btn"
          title="Fermer"
        >
          <IoCloseOutline />
        </button>
      </article>
    </dialog>
  )
}

export default UserDetails
