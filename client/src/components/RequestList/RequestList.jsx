import "./RequestList.scss"
import { useEffect, useState, useRef, useMemo } from "react"
import { toast } from "react-toastify"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import autoAnimate from "@formkit/auto-animate"
import { useSelector } from "react-redux"
import { ImSad } from "react-icons/im"
import axios from "axios"

function RequestList({ forceUpdate }) {
  const API_URI = "/request"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const [request, setRequest] = useState([])
  const parent = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
    const fetchRequests = async () => {
      try {
        const response = await axios.get(API_URI, config)
        setRequest(response.data)
      } catch (error) {
        toast.error(error)
      }
    }
    fetchRequests()
    return () => {
      setRequest([])
    }
  }, [parent, forceUpdate])
  const sortedRequests = useMemo(() => {
    if (request.length > 0) {
      return request.sort((a, b) => b.id_requete - a.id_requete)
    } else {
      return []
    }
  }, [request])
  return (
    <div className="request__list" ref={parent}>
      <h2
        onClick={(e) => {
          setIsOpen(!isOpen)
        }}
      >
        Mes requètes
        {!isOpen ? (
          <AiOutlineArrowDown className="down__arrow" />
        ) : (
          <AiOutlineArrowUp className="up__arrow" />
        )}
      </h2>

      {isOpen && (
        <div className="requests">
          {request.length > 0 ? (
            sortedRequests.map((req) => (
              <div className="single__request" key={req.id_requete + 1}>
                <div className="container">
                  <span>Matériel</span>
                  <h3>{req.nom_mat}</h3>
                </div>
                <div className="container">
                  <span>Type de requete</span>
                  <h3>{req.type_requete}</h3>
                </div>
                <div className="container">
                  <span>Statut requete</span>
                  <h3
                    style={
                      req.statut === "En attente"
                        ? { color: "#D8B635" }
                        : req.statut === "Refuser"
                        ? { color: "#D84635" }
                        : { color: "#35D888" }
                    }
                  >
                    {req.statut}
                  </h3>
                </div>
                <p>{req.date_requete.split("T")[0]}</p>
                <p>{req.heure_requete}</p>
              </div>
            ))
          ) : (
            <h1 className="no__request">
              Vous avez aucune requète <ImSad />
            </h1>
          )}
        </div>
      )}
    </div>
  )
}

export default RequestList
