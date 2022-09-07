import "./SingleUser.scss"
import { useState } from "react"

function SingleUtilisateur({ user }) {
  const [modifier, setModifier] = useState(false)
  const initialState = {
    nom: user.Nom,
    prénom: user.Prénom,
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
  return (
    <article className="single-user" key={user.id_util + 1}>
      <span>Nom</span>
      {modifier ? (
        <input
          type="text"
          name="nom"
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
          name="prénom"
          value={formData["prénom"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Prénom}</p>
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
      <span>Téléphone portable</span>
      {modifier ? (
        <input
          type="number"
          name="tel_mob"
          value={formData["tel_mob"]}
          onChange={onChange}
        />
      ) : (
        <p>{user.Téléphone_portable}</p>
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
        <p>{user.Téléphone}</p>
      )}

      {modifier ? (
        <div className="btn__container__container">
          <div className="btn__container">
            <button className="appliquer__btn">Appliquer</button>
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
