import "./UserDetails.scss"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { toast } from "react-toastify"

function UserDetails() {
  const [user, setUser] = useState()
  const user_name = useSelector((state) => state.auth.user)

  useEffect(() => {
    const fetchSingleUser = async (name) => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${name}`)
        setUser(response.data)
      } catch (error) {
        toast.error(error)
      }
    }
    fetchSingleUser(user_name ? user_name.nom_util : "null")
    return () => {
      setUser()
    }
  }, [])
  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".user-details") &&
      !e.target.classList.contains(".user-details")
    ) {
      document.querySelector("dialog").close()
    }
  })

  return (
    <dialog className="user-details">
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
    </dialog>
  )
}

export default UserDetails
