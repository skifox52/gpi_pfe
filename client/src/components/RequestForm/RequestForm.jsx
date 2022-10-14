import "./RequestForm.scss"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { useState, useRef, useEffect } from "react"
import autoAnimate from "@formkit/auto-animate"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"

function RequestForm({ setForceUpdate }) {
  //API
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const API_URI_GET = "/materiel/all"
  const API_URI_POST = "/request/add"
  //useState
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFromData] = useState({})
  const [materiel, setMateriel] = useState([])
  const parent = useRef(null)
  const form = useRef(null)
  //onChange function
  const onChange = (e) => {
    setFromData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
    const fetchMat = async () => {
      try {
        const response = await axios.get(API_URI_GET, config)
        setMateriel(response.data)
      } catch (error) {
        toast.error(error)
      }
    }
    fetchMat()
    return () => {
      setMateriel([])
      setFromData({})
    }
  }, [parent, form])
  //onSubmite
  const onSubmit = (e) => {
    e.preventDefault()
    const postForm = async () => {
      try {
        await axios.post(API_URI_POST, formData, config)
        return toast.success("Votre requete a été envoyé avec succès")
      } catch (error) {
        return toast.error(error)
      }
    }
    postForm()
    form.current.reset()
    setForceUpdate()
  }
  return (
    <div className="request__form" ref={parent}>
      <h2
        onClick={(e) => {
          setIsOpen(!isOpen)
        }}
      >
        Ajouter une requète
        {!isOpen ? (
          <AiOutlineArrowDown className="down__arrow" />
        ) : (
          <AiOutlineArrowUp className="up__arrow" />
        )}
      </h2>
      {isOpen && (
        <form onSubmit={onSubmit} ref={form}>
          <div className="form__control">
            <select name="id_mat" onChange={onChange} required defaultValue="">
              <option disabled hidden value="">
                Sélectionnez un materiel
              </option>
              {materiel.map((mat) => (
                <option value={mat.id_mat} key={mat.id_mat + 1}>
                  {mat.nom_mat} - {mat.marque_mat}
                </option>
              ))}
            </select>
          </div>
          <div className="form__control">
            <select
              name="type_requete"
              onChange={onChange}
              required
              defaultValue=""
            >
              <option disabled hidden value="">
                Type de requète
              </option>
              <option value="Réparation">Réparation</option>
              <option value="Demande de matériel">Demande de matériel</option>
            </select>
          </div>
          <div className="form__control">
            <select name="urgence" onChange={onChange} required defaultValue="">
              <option disabled hidden value="">
                Urgence
              </option>
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </select>
          </div>
          <div className="form__control">
            <input
              type="text"
              name="titre"
              placeholder="Titre..."
              onChange={onChange}
              required
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              name="description"
              placeholder="Description..."
              onChange={onChange}
              required
            />
          </div>
          <div className="form__control">
            <button type="submit">Envoyer la requète</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default RequestForm
