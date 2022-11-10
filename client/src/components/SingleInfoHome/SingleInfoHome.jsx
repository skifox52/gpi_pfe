import "./SingleInfoHome.scss"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"

function SingleInfoHome({ r, changeState }) {
  const API_URI_POST = "/pdf"
  const API_URI_DOCUMENT = "/document"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const user = useSelector((state) => state.auth.user)
  const { id_requete, type_requete, nom_mat, nom_util, prenom_util } = r
  //POST PDF
  //Acceoter
  const postPdfAccepter = async () => {
    try {
      const response = await axios.post(
        API_URI_POST,
        {
          titre: `Requète N°${id_requete}`,
          etat: "Accepter",
          id_req: id_requete,
          type_req: type_requete,
          materiel: nom_mat,
          nom_client: nom_util,
          prenom_client: prenom_util,
          info_nom: user.nom_util,
          statut: "Accepter",
        },
        config
      )
      await axios.post(
        API_URI_DOCUMENT,
        {
          categ_doc: "Accepter",
          commentaire_doc: "Pas de commentaire",
          piece_jointe_doc: `Document-${response.data}.pdf`,
        },
        config
      )
      await changeState()
      toast.success("Requète résolu!")
    } catch (error) {
      toast.error(error)
    }
  }
  //Refuser
  const postPdfRefuser = async (message) => {
    try {
      const response = await axios.post(
        API_URI_POST,
        {
          titre: `Requète N°${id_requete}`,
          etat: "Refuser",
          id_req: id_requete,
          type_req: type_requete,
          materiel: nom_mat,
          nom_client: nom_util,
          prenom_client: prenom_util,
          info_nom: user.nom_util,
          statut: "Refuser",
          commentaire: message,
        },
        config
      )
      await axios.post(
        API_URI_DOCUMENT,
        {
          categ_doc: "Refuser",
          commentaire_doc: message,
          piece_jointe_doc: `Document-${response.data}.pdf`,
        },
        config
      )
      changeState()
      toast.success("Requète résolu!")
    } catch (error) {
      toast.error(error)
    }
  }
  const onClickAccepter = (e) => {
    const response = window.confirm(
      `En cliquant sur 'OK', vous confirmez que vous avez effectué la requète N°${r.id_requete}`
    )
    if (response) {
      postPdfAccepter()
    } else {
      return
    }
  }
  const onClickAnnuler = (e) => {
    let message
    do {
      message = prompt("Raison du refus?")
    } while (message !== null && message === "")
    if (message) {
      postPdfRefuser(message)
    }
  }

  return (
    <div className="single__request" key={r.id_accorder}>
      <div className="first__item">
        <h4>{r.id_accorder}</h4>
        <span>{r.date_acc.split("").splice(0, 10)}</span>
        <span>{r.date_acc.split("").splice(11, 5)}</span>
      </div>
      <div className="item">
        <span>Id requète</span>
        <h4>{r.id_requete}</h4>
      </div>
      <div className="item">
        <span>Nom et prénom d'utilisateur</span>
        <h4>
          {r.nom_util} {r.prenom_util} [ {r.role} ]
        </h4>
      </div>
      <div className="item">
        <span>Date et heure requète</span>
        <h4>
          {r.date_requete.split("").splice(0, 10)}{" "}
          {r.date_requete.split("").splice(11, 5)}
        </h4>
      </div>
      <div className="item">
        <span>Type de requète</span>
        <h4>{r.type_requete}</h4>
      </div>
      <div className="item">
        <span>Matériel</span>
        <h4>{r.nom_mat}</h4>
      </div>
      <div className="item">
        <span>Urgence requète</span>
        <h4>{r.urgence_requete}</h4>
      </div>
      <div className="item">
        <span>Statut requète</span>
        <h4>{r.statut}</h4>
      </div>
      {r.statut === "Accepter" || r.statut === "Refuser" ? (
        <p className="resolved">{`Requète résolu`}</p>
      ) : (
        <div className="button__container">
          <button onClick={onClickAccepter}>
            Accepter
            <br />
            Requête
          </button>
          <button onClick={onClickAnnuler} className="annuler">
            Refuser
            <br />
            Requête
          </button>
        </div>
      )}
    </div>
  )
}

export default SingleInfoHome
