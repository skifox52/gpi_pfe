import "./StatutRequete.scss"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import axios from "axios"

function StatutRequete() {
  const API_URI = "/request/all"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const [state, setState] = useState("enattente")
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const enattenteRef = useRef(null)
  const accepterRef = useRef(null)
  const refuserRef = useRef(null)
  const encoursRef = useRef(null)
  //UseEffect
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(API_URI, config)
        setRequests(response.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error)
      }
    }
    fetchRequests()
    if (state === "enattente") {
      accepterRef.current && accepterRef.current.classList.remove("active")
      refuserRef.current && refuserRef.current.classList.remove("active")
      encoursRef.current && encoursRef.current.classList.remove("active")
      enattenteRef.current && enattenteRef.current.classList.add("active")
    }
    if (state === "accepter") {
      enattenteRef.current && enattenteRef.current.classList.remove("active")
      refuserRef.current && refuserRef.current.classList.remove("active")
      encoursRef.current && encoursRef.current.classList.remove("active")
      accepterRef.current && accepterRef.current.classList.add("active")
    }
    if (state === "refuser") {
      accepterRef.current && accepterRef.current.classList.remove("active")
      enattenteRef.current && enattenteRef.current.classList.remove("active")
      encoursRef.current && encoursRef.current.classList.remove("active")
      refuserRef.current && refuserRef.current.classList.add("active")
    }
    if (state === "encours") {
      accepterRef.current && accepterRef.current.classList.remove("active")
      enattenteRef.current && enattenteRef.current.classList.remove("active")
      refuserRef.current && refuserRef.current.classList.remove("active")
      encoursRef.current && encoursRef.current.classList.add("active")
    }
  }, [enattenteRef, accepterRef, refuserRef, encoursRef, state])
  const enAttente = [...requests].filter(
    (request) => request.statut === "En attente"
  )
  const refuser = [...requests].filter(
    (request) => request.statut === "Refuser"
  )
  const accepter = [...requests].filter(
    (request) => request.statut === "Accepter"
  )
  const encours = [...requests].filter(
    (request) => request.statut === "En cours"
  )
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="statut__requete">
      <div className="statut__container">
        <div
          ref={enattenteRef}
          className="en__attente__container active"
          onClick={(e) => {
            if (state === "enattente") return
            setState("enattente")
          }}
        >
          <h3>En attente</h3>
        </div>
        <div
          ref={encoursRef}
          className="en__cours__container"
          onClick={(e) => {
            if (state === "encours") return
            setState("encours")
          }}
        >
          <h3>En cours de traitement</h3>
        </div>
        <div
          ref={accepterRef}
          className="accepter__container"
          onClick={(e) => {
            if (state === "accepter") return
            setState("accepter")
          }}
        >
          <h3>Accepter</h3>
        </div>
        <div
          ref={refuserRef}
          className="refuser__container"
          onClick={(e) => {
            if (state === "refuser") return
            setState("refuser")
          }}
        >
          <h3>Refuser</h3>
        </div>
      </div>
      <div className="container">
        {state === "enattente" ? (
          <>
            {enAttente.map((request) => (
              <div key={request.id_requete} className="single">
                <span>Identifiant requète</span>
                <p>{request.id_requete}</p>
                <span>Type requète</span>
                <p>{request.type_requete}</p>
                <span>Matériel</span>
                <p>{request.nom_mat}</p>
                <span>Titre reqète</span>
                <p>{request.titre_requete}</p>
                <span>Description requète</span>
                <p>{request.description_requete}</p>
                <span>Urgence requète</span>
                <p>{request.urgence_requete}</p>
              </div>
            ))}
          </>
        ) : state === "refuser" ? (
          <>
            {refuser.map((request) => (
              <div key={request.id_requete} className="single">
                <span>Identifiant requète</span>
                <p>{request.id_requete}</p>
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
              </div>
            ))}
          </>
        ) : state === "accepter" ? (
          <>
            {accepter.map((request) => (
              <div key={request.id_requete} className="single">
                <span>Identifiant requète</span>
                <p>{request.id_requete}</p>
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
              </div>
            ))}
          </>
        ) : (
          <>
            {encours.map((request) => (
              <div key={request.id_requete} className="single">
                <span>Identifiant requète</span>
                <p>{request.id_requete}</p>
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
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default StatutRequete
