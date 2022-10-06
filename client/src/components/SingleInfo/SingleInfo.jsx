import "./SingleInfo.scss"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import autoAnimate from "@formkit/auto-animate"

function SingleInfo({ inf, changeState }) {
  const [isOpen, setIsOpen] = useState(false)
  const parent = useRef(null)
  const API_URI = `/acc/count/${inf.Id}`
  const DETAILS_URI = `/acc/details/${inf.Id}`
  const token = useSelector((state) => state.auth.user?.token)
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const [count, setCount] = useState(null)
  const [details, setDetails] = useState([])
  const cancelToken = axios.CancelToken.source()

  useEffect(() => {
    const countRequest = axios.get(API_URI, config, {
      cancelToken: cancelToken.token,
    })
    const detailsRequest = axios.get(DETAILS_URI, config, {
      cancelToken: cancelToken.token,
    })
    axios
      .all([countRequest, detailsRequest])
      .then(([res1, res2]) => {
        setCount(res1.data[0]["COUNT(*)"])
        setDetails(res2.data)
      })
      .catch((err) => {
        if (axios.isCancel()) {
          console.log("canceled")
        }
        toast.error(err)
      })

    parent.current && autoAnimate(parent.current)

    return () => {
      cancelToken.cancel()
      setCount(null)
      setDetails([])
    }
  }, [parent])
  return (
    <div className="single__info" ref={parent}>
      <div className="container" onClick={(e) => setIsOpen(!isOpen)}>
        <div className="single__container">
          {<span>Id</span>}
          <h4>{inf.Id}</h4>
        </div>
        <div className="single__container">
          <span>Nom</span>
          <h4>{inf.Nom.toUpperCase()}</h4>
        </div>
        <div className="single__container">
          <span>Prénom</span>
          <h4>{inf.Prénom}</h4>
        </div>
        <div className="single__container">
          <span>E-mail</span>
          <h4>{inf.Email}</h4>
        </div>
        <div className="single__container">
          <span>Telephone mobile</span>
          <h4>0{inf.Téléphone_portable}</h4>
        </div>
        <div className="single__container">
          <span>Téléphone</span>
          <h4>0{inf.Téléphone}</h4>
        </div>
        <div className="single__container">
          <span>Requètes en cours</span>
          <h4>{count ?? <span>Loading...</span>}</h4>
        </div>
      </div>
      {isOpen && (
        <div className="info__details__container">
          {details.length > 0 ? (
            details.map((det) => (
              <div className="info__details" key={det.id_accorder}>
                <div className="single__detail">
                  <span>Id requète</span>
                  <h5>{det.id_requete}</h5>
                </div>
                <div className="single__detail">
                  <span>Date et heure d'attribution</span>
                  <h5>
                    {det.date_acc.split("").splice(0, 10)}{" "}
                    {det.date_acc.split("").splice(11, 8)}
                  </h5>
                </div>
                <div className="single__detail">
                  <span>Utilisateur</span>
                  <h5>
                    {det.nom_util} {det.prenom_util} [{det.role}]
                  </h5>
                </div>
                <div className="single__detail">
                  <span>Statut de requète</span>
                  <h5>{det.statut}</h5>
                </div>
                <div className="single__detail">
                  <span>Type de requète</span>
                  <h5>{det.type_requete}</h5>
                </div>
                <div className="single__detail">
                  <span>Urgence de requète</span>
                  <h5>{det.urgence_requete}</h5>
                </div>
                <div className="single__detail">
                  <span>Date et heure de requète</span>
                  <h5>
                    {det.date_requete.slice(0, 10)} {det.heure_requete}
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune requête n'a été attribuée!</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SingleInfo
