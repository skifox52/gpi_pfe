import "./SingleInfo.scss"
import { useState, useRef, useEffect } from "react"
import { confirmAlert } from "react-confirm-alert"
import axios from "axios"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

function SingleInfo({ inf, changeState }) {
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const DELETE_API_URI = `/info/delete/${inf.id_info}`
  const UPDATE_API_URI = `/info/update/${inf.id_info}`
  const [modifier, setModifier] = useState(false)
  const handleDelete = useRef(null)
  const handleUpdate = useRef(null)
  const initialState = {
    cat_info: inf.categorie_informaticien,
    nom_info: inf.nom_informaticien,
    email_info: inf.email_info,
    teleph_info: inf.telephone_info,
    groupe_info: inf.groupe_info,
  }
  const [formData, setFormData] = useState(initialState)
  //onChange
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    const deleteInfo = async () => {
      try {
        await axios.delete(DELETE_API_URI, config)
        changeState()
        toast.success(`Informaticien ${inf.id_info} supprimé`)
      } catch (error) {
        toast.error(error)
      }
    }
    const onUpdate = async () => {
      try {
        if (
          !formData["email_info"]
            .toString()
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          return toast.warn("Adress mail non valide")
        }
        if (formData["nom_info"] === "" || formData["teleph_info"] === "") {
          return toast.warn("Remplissez vos champs")
        }
        if (
          JSON.stringify(formData).toLowerCase() ===
          JSON.stringify(initialState).toLowerCase()
        ) {
          setModifier(false)
          return toast.warning("Aucun élément n'a été modifié")
        }
        await axios.put(UPDATE_API_URI, formData, config)
        setModifier(false)
        changeState()
        toast.success(`Informaticien ${inf.id_info} a été modifier`)
      } catch (error) {
        toast.error(error)
      }
    }

    handleDelete.current = deleteInfo
    handleUpdate.current = onUpdate
  }, [formData, handleDelete, handleUpdate, modifier, inf])
  return (
    <div className="single__info">
      <div className="single__container">
        {<span>Id</span>}
        <h4>{inf.id_info}</h4>
      </div>
      <div className="single__container">
        <span>Nom</span>
        {modifier ? (
          <input
            type="text"
            name="nom_info"
            value={formData["nom_info"]}
            onChange={onChange}
          />
        ) : (
          <h4>{inf.nom_informaticien.toUpperCase()}</h4>
        )}
      </div>
      <div className="single__container">
        <span>Groupe</span>
        {modifier ? (
          <select
            name="groupe_info"
            value={formData["groupe_info"]}
            onChange={onChange}
          >
            <option value="ISI">ISI</option>
          </select>
        ) : (
          <h4>{inf.groupe_info}</h4>
        )}
      </div>
      <div className="single__container">
        <span>Catégorie</span>
        {modifier ? (
          <select
            name="cat_info"
            value={formData["cat_info"]}
            onChange={onChange}
          >
            <option value="Help desk">Help desk</option>
          </select>
        ) : (
          <h4>{inf.categorie_informaticien}</h4>
        )}
      </div>
      <div className="single__container">
        <span>E-mail</span>
        {modifier ? (
          <input
            type="email"
            name="email_info"
            value={formData["email_info"]}
            onChange={onChange}
          />
        ) : (
          <h4>{inf.email_info}</h4>
        )}
      </div>
      <div className="single__container">
        <span>Téléphone</span>
        {modifier ? (
          <input
            type="number"
            name="teleph_info"
            value={formData["teleph_info"]}
            onChange={onChange}
          />
        ) : (
          <h4>0{inf.telephone_info}</h4>
        )}
      </div>
      <div className="single__container">
        {modifier ? (
          <>
            <button onClick={(e) => handleUpdate.current()}>Appliquer</button>
            <button
              onClick={(e) => {
                setModifier(false)
                setFormData(initialState)
              }}
            >
              Annuler
            </button>
          </>
        ) : (
          <>
            <button onClick={(e) => setModifier(true)}>Modifier</button>
            <button
              className="delete__btn"
              onClick={(e) => {
                confirmAlert({
                  title: "Supprimer un Informaticien!",
                  message: "Voulez vous vraiment supprimer cet informaticien?",
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
          </>
        )}
      </div>
    </div>
  )
}

export default SingleInfo
