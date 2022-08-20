import "./UserDetails.scss"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { toast } from "react-toastify"

function UserDetails() {
  const [user, setUser] = useState()
  const user_name = useSelector((state) => state.auth.user)
  const token =
    useSelector((state) => (state.auth.user ? state.auth.user.token : null)) ||
    null
  useEffect(() => {
    const fetchSingleUser = async (name) => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const response = await axios.get(
          `http://localhost:5000/users/${name}`,
          config
        )
        setUser(response.data)
      } catch (error) {
        toast.error(error)
      }
    }
    if (token) {
      fetchSingleUser(user_name ? user_name.nom_util : "null")
    } else {
      return () => {
        setUser()
      }
    }
    return () => {
      setUser()
    }
  }, [token, user_name])
  return (
    <dialog className="user-details">
      <article className="user-detais-card">
        <span>Identifiant : </span>
        <p>{user ? user.Id : "null"}</p>
        <span>Code de département : </span>
        <p>{user ? user.Code_dep ?? "null" : "null"}</p>
        <span>Nom : </span>
        <p>{user ? user.Nom : "null"}</p>
        <span>Prénom : </span>
        <p>{user ? user.Prenom : "null"}</p>
        <span>E-mail : </span>
        <p>{user ? user.Email : "null"}</p>
        <span>Numéro portable : </span>
        <p>{user ? user.TelephM : "null"}</p>
        <span>Numéro fix : </span>
        <p>{user ? user.Teleph : "null"}</p>
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
