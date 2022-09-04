import "./RequestList.scss"
import { useEffect, useState, useRef } from "react"
import { toast } from "react-toastify"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import autoAnimate from "@formkit/auto-animate"
import { useSelector } from "react-redux"
import axios from "axios"

function RequestList() {
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
  }, [parent])
  const sortedRequests =
    request.length > 0
      ? request.sort((a, b) => b.id_requete - a.id_requete)
      : []
  console.log(sortedRequests)
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

      {isOpen &&
        sortedRequests.map((req) => (
          <div className="single__request" key={req.id_requete + 1}>
            {req.type_requete}
          </div>
        ))}
    </div>
  )
}

export default RequestList
