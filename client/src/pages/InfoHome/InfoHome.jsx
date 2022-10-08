import { useState, useEffect } from "react"
import axios from "axios"
import "./InfoHome.scss"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"

function InfoHome() {
  const [isLoading, setIsloading] = useState(true)
  const id = useSelector((state) => state.auth.user?.userId)
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const API_URI = `/acc/details/${id}`
  const [req, setReq] = useState([])
  const cancelToken = axios.CancelToken.source()
  useEffect(() => {
    axios
      .get(API_URI, config, { cancelToken: cancelToken.token })
      .then((response) => {
        setReq(response.data)
        setIsloading(false)
      })
      .catch((err) => {
        if (axios.isCancel()) {
          console.log("canceled")
          setIsloading(false)
        }
        toast.error(err)
        setIsloading(false)
      })
    return () => {
      cancelToken.cancel()
      setReq([])
    }
  }, [])
  console.log(req)
  if (isLoading) return <Spinner />
  return (
    <div className="info__home">
      <div className="info__container">
        <h1>Requètes</h1>
        <div className="request__container">
          {req.length > 0
            ? req.map((r) => (
                <div className="single__request" key={r.id_accorder}>
                  <div className="first__item">
                    <h4>{r.id_accorder}</h4>
                    <span>{r.date_acc}</span>
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
                </div>
              ))
            : "Aucune requète assignée"}
        </div>
      </div>
    </div>
  )
}

export default InfoHome
