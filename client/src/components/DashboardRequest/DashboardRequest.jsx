import "./DashboardRequest.scss"
import { useState, useEffect, useRef } from "react"
import autoAnimate from "@formkit/auto-animate"

function DashboardRequest({ request }) {
  const [isOpen, setIsOpen] = useState(false)
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <div
      className="dashboard__request"
      ref={parent}
      onClick={(e) => setIsOpen(!isOpen)}
    >
      <div className="preview">
        <span>ID requète</span>
        <h3>{request.id_requete}</h3>
        <p className="request__date">{request.date_requete.split("T")[0]}</p>
        <p className="request__heure">{request.heure_requete}</p>
      </div>
      {isOpen && (
        <div className="full__content">
          <span>Utilisateur</span>
          <p>
            {request.id_util} - {request.nom_util.toUpperCase()}{" "}
            {request.prenom_util}
          </p>
          <span>Matériel</span>
          <p>{request.nom_mat}</p>
          <span>Titre reqète</span>
          <p>{request.titre_requete}</p>
          <span>Type requète</span>
          <p>{request.type_requete}</p>
          <span>Description requète</span>
          <p>{request.description_requete}</p>
          <span>Urgence requète</span>
          <p>{request.urgence_requete}</p>
          <span>Statut reqète</span>
          <p
            style={
              request.statut === "En attente"
                ? { color: "#D8B635" }
                : request.statut === "Refuser"
                ? { color: "#D84635" }
                : { color: "#35D888" }
            }
          >
            {request.statut}
          </p>
        </div>
      )}
    </div>
  )
}

export default DashboardRequest
