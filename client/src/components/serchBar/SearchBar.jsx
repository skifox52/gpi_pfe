import "./SearchBar.scss"
import { useState, useEffect, useRef } from "react"
import { BsSearch } from "react-icons/bs"
import { AiOutlineUserAdd } from "react-icons/ai"
import autoAnimate from "@formkit/auto-animate"
import { toast } from "react-toastify"
import axios from "axios"
import { useSelector } from "react-redux"
import useDebounce from "../../Hooks/useDebounce"

function SearchBar({ users, changeState, searchInput }) {
  const token = useSelector((state) => state.auth.user?.token)
  const API_URI_REGISTER = "/auth/register"
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const initialState = {
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    role: "",
    teleph: "",
    telephM: "",
    mdp2: "",
  }
  const [formData, setFormData] = useState(initialState)
  const debounceValue = useDebounce(search, 0)
  const { nom, prenom, email, mdp, teleph, telephM, mdp2 } = formData
  const parent = useRef(null)
  const form = useRef(null)
  //onChange
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  //onSubmit
  const onSubmit = async (e) => {
    e.preventDefault()
    if (mdp !== mdp2) {
      return toast.warning("Vérifiez vos mot de passes!")
    }
    if (mdp.length < 8) {
      return toast.warning("Mot de passe trop court!")
    }

    try {
      await axios.post(API_URI_REGISTER, formData, config)
      toast.success("Utilisatueur créer avec succée!")
      setFormData(initialState)
      form.current.reset()
      changeState()
    } catch (error) {
      return toast.error(error)
    }
  }
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
    searchInput(debounceValue)
  }, [parent, form, debounceValue])
  return (
    <div className="search__bar">
      <div className="input__container">
        <BsSearch className="search__icon" />
        <input
          type="text"
          name="seach"
          placeholder="Recherche..."
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          maxLength={15}
        />
      </div>
      <div className="add__container" ref={parent}>
        <AiOutlineUserAdd className="add__icon" />
        <button
          className="add__btn"
          onClick={(e) => {
            setIsOpen(!isOpen)
          }}
        >
          Ajouter un utilisateur
        </button>
        {isOpen && (
          <form onSubmit={onSubmit} ref={form}>
            <div className="form__control">
              <input
                type="text"
                name="nom"
                placeholder="Nom..."
                required
                value={nom}
                onChange={onChange}
              />
            </div>
            <div className="form__control">
              <input
                type="text"
                name="prenom"
                placeholder="Prénom..."
                value={prenom}
                onChange={onChange}
                required
              />
            </div>

            <div className="form__control">
              <select name="role" onChange={onChange} defaultValue="" required>
                <option hidden disabled value="">
                  Role
                </option>
                <option value="admin">Administrateur</option>
                <option value="utilisateur">Utilisateur</option>
              </select>
            </div>
            <div className="form__control">
              <input
                type="email"
                name="email"
                placeholder="E-mail..."
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form__control">
              <input
                type="password"
                value={mdp}
                onChange={onChange}
                name="mdp"
                placeholder="Mot de passe..."
                required
              />
            </div>
            <div className="form__control">
              <input
                type="password"
                value={mdp2}
                onChange={onChange}
                name="mdp2"
                placeholder="Confirme mdp..."
                required
              />
            </div>
            <div className="form__control">
              <input
                type="number"
                value={teleph}
                onChange={onChange}
                name="teleph"
                placeholder="Numéro de téléphone..."
                required
              />
            </div>
            <div className="form__control">
              <input
                type="number"
                value={telephM}
                onChange={onChange}
                name="telephM"
                placeholder="Numéro de téléphone mobile..."
                required
              />
            </div>
            <div className="form__control">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        )}
      </div>
      <div className="info__container">
        <h4 style={{ letterSpacing: "1px" }}>
          Nombre d'utilisateurs:{" "}
          <span style={{ color: "#befcff" }}>{users.length}</span>
        </h4>
      </div>
    </div>
  )
}

export default SearchBar
