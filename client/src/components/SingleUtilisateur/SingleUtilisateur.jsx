import "./SingleUser.scss"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

function SingleUtilisateur({ user, setReducer }) {
  const API_URI = "/users/update"
  const handleClick = useRef(null)
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
    console.log(formData)
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  //UseEffect
  useEffect(() => {
    const updateUser = async () => {
      try {
        console.log(formData)
        await axios.put(API_URI, formData, config)
        toast.success("La modification a été effectué avec seccès!")
      } catch (error) {
        toast.error(error)
      }
    }
    handleClick.current = updateUser
  }, [formData])
  return (
    <article className="single-user" key={user.id_util + 1}>
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
        <div className="btn__container__container">
          <div className="btn__container">
            <button
              className="appliquer__btn"
              onClick={(e) => {
                handleClick.current()
                setReducer()
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
