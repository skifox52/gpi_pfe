import "./Requete.scss"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import DashboardRequest from "../../components/DashboardRequest/DashboardRequest"
import { toast } from "react-toastify"

function Requete() {
  const API_URI = "/request/all"
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const response = await axios.get(API_URI, config)
        setRequests(response.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error)
      }
    }
    getAllRequests()
    return () => {
      setRequests([])
    }
  }, [])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="requete__page">
      {requests
        .sort((a, b) => b.id_requete - a.id_requete)
        .map((request) => (
          <DashboardRequest request={request} key={request.id_requete} />
        ))}
    </div>
  )
}

export default Requete
