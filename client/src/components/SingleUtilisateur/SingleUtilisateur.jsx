import "./SingleUser.scss"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { confirmAlert } from "react-confirm-alert"

function SingleUtilisateur({ user, changeState }) {
  const API_URI_UPDATE = "/users/update"
  const API_URI_DELETE = "/users/delete"
  const handleClick = useRef(null)
  const handleDelete = useRef(null)
  const [modifier, setModifier] = useState(false)
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const initialState = {
    nom: user.Nom,
    prenom: user.Prénom,
    email: user.Email,
    tel_mob: user.Téléphone_portable,
    tel: user.Téléphone,
  }
  const [formData, setFormData] = useState(initialState)
  //Onchange function

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  //UseEffect
  useEffect(() => {
    //Update user
    const updateUser = async () => {
      try {
        if (JSON.stringify(formData) === JSON.stringify(initialState)) {
          setModifier(false)
          return toast.warning("Aucun élément n'a été modifié")
        }
        await axios.put(`${API_URI_UPDATE}/${user.Id}`, formData, config)
        setModifier(false)
        changeState()
        toast.success("La modification a été effectué avec seccès!")
      } catch (error) {
        toast.error(error)
      }
    }
    handleClick.current = updateUser

    //Delete user
    const deleteUser = async () => {
      try {
        await axios.delete(`${API_URI_DELETE}/${user.Id}`, config)
        changeState()
        toast.info("L'utilisateur a bien été supprimé !")
      } catch (error) {
        toast.error(error)
      }
    }
    handleDelete.current = deleteUser
  }, [formData, modifier, user, handleClick, handleDelete])

  return (
    <article className="single-user" key={user.id_util + 1}>
      <span>Id</span>
      <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>{user.Id}</p>
      <span>Nom</span>
      {modifier ? (
        <input
          type="text"
          name="nom"
          maxLength={15}
          value={formData["nom"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Nom}</p>
      )}
      <span>Prénom</span>
      {modifier ? (
        <input
          type="text"
          name="prenom"
          maxLength={15}
          value={formData["prenom"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Prénom}</p>
      )}
      <span>E-mail</span>
      {modifier ? (
        <input
          type="email"
          maxLength={50}
          name="email"
          value={formData["email"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Email}</p>
      )}
      <span>Téléphone portable</span>
      {modifier ? (
        <input
          type="tel"
          name="tel_mob"
          value={formData["tel_mob"]}
          onChange={onChange}
        />
      ) : (
        <p>0{user.Téléphone_portable}</p>
      )}
      <span>Téléphone fix</span>
      {modifier ? (
        <input
          type="tel"
          name="tel"
          value={formData["tel"]}
          onChange={onChange}
        />
      ) : (
        <p>0{user.Téléphone}</p>
      )}

      {modifier ? (
        <div className="btn__container__container__container">
          <div className="btn__container__container">
            <div className="btn__container">
              <button
                className="appliquer__btn"
                onClick={(e) => {
                  handleClick.current()
                }}
              >
                Appliquer
              </button>
            </div>
            <div className="btn__container">
              <button
                className="annuler__btn"
                onClick={(e) => {
                  setModifier(!modifier)
                  setFormData(initialState)
                }}
              >
                Annuler
              </button>
            </div>
          </div>
          <div className="btn__container">
            <button
              className="delete__btn"
              ref={handleDelete}
              onClick={(e) => {
                confirmAlert({
                  title: "Supprimer un utilisateur!",
                  message: "Voulez vous vraiment supprimer cet utilisateur?",
                  buttons: [
                    {
                      label: "Oui",
                      onClick: () => {
                        handleDelete.current()
                      },
                    },
                    {
                      label: "Non",
                    },
                  ],
                })
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div className="btn__container">
          <button
            className="modifier__btn"
            onClick={(e) => {
              setModifier(!modifier)
            }}
          >
            Modifier
          </button>
        </div>
      )}
    </article>
  )
}

export default SingleUtilisateur
