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
  const userId = useSelector((state) => state.auth.user?.userId)
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const initialState = {
    nom: user.Nom,
    prenom: user.Prénom,
    email: user.Email,
    tel_mob: user.Téléphone_portable,
    tel: user.Téléphone,
    role: user.Role,
    departement: user.Departement,
    code_dep: parseInt(user.Code_dep),
    mdp: "",
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
        if (
          !formData["email"]
            .toString()
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          return toast.warn("Adress mail non valide")
        }
        if (formData["tel_mob"].length < 10) {
          return toast.warn("Vérifier le numéro du téléphone portable")
        }
        if (
          formData["nom"] === "" ||
          formData["prenom"] === "" ||
          formData["tel"] === "" ||
          formData["tel_mob"] === ""
        ) {
          return toast.warn("Remplissez vos champs")
        }
        if (
          JSON.stringify(formData).toLowerCase() ===
          JSON.stringify(initialState).toLowerCase()
        ) {
          setModifier(false)
          return toast.warning("Aucun élément n'a été modifié")
        }
        if (formData["mdp"] === "") delete formData["mdp"]

        if (formData["mdp"]?.length < 8) {
          setModifier(false)
          return toast.warning(
            "Le mot de passe doit contenir au minimum 8 caractères!"
          )
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
  }, [formData, initialState, modifier, user, handleClick, handleDelete])

  return (
    <article className="single-user" key={user.id_util + 1}>
      <span>Id</span>
      <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>{user.Id}</p>
      <span>Nom</span>
      {modifier ? (
        <input
          type="text"
          name="nom"
          value={formData["nom"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Nom.toUpperCase()}</p>
      )}
      <span>Prénom</span>
      {modifier ? (
        <input
          type="text"
          name="prenom"
          value={formData["prenom"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Prénom}</p>
      )}
      <span>Département</span>
      {modifier ? (
        <select
          name="code_dep"
          value={formData["code_dep"]}
          onChange={onChange}
        >
          <option value="2">Département réseaux et témécoms</option>
          <option value="3">Hébargement et Datacenter</option>
          <option value="4">
            Département systèmes et services informatiques
          </option>
          <option value="5">Département support informatique</option>
          <option value="6">Département exploitation</option>
          <option value="7">Département de recrutement</option>
          <option value="8">Département de formation</option>
          <option value="9">
            Département de supervision de la comptabilité
          </option>
        </select>
      ) : (
        <p style={{ fontWeight: "300", fontSize: "0.8em" }}>
          {user.Departement}
        </p>
      )}
      <span>Role</span>
      {modifier ? (
        <select name="role" value={formData["role"]} onChange={onChange}>
          <option value="admin">Administrateur</option>
          <option value="utilisateur">Utilisateur</option>
          <option value="informaticien">Informaticien</option>
        </select>
      ) : (
        <p>{user.Role.toUpperCase()}</p>
      )}
      <span>E-mail</span>
      {modifier ? (
        <input
          type="email"
          name="email"
          value={formData["email"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Email}</p>
      )}
      <span>Mot de passe</span>
      {modifier ? (
        <input
          type="password"
          name="mdp"
          value={formData["mdp"]}
          placeholder="Mot de passe..."
          onChange={onChange}
        />
      ) : (
        <p>********</p>
      )}
      <span>Téléphone portable</span>
      {modifier ? (
        <input
          type="number"
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
          type="number"
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
            {userId !== user.Id && (
              <button
                className="delete__btn"
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
            )}
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
