import { useState, useEffect } from "react"
import axios from "axios"
import "./InfoHome.scss"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"
import SingleInfoHome from "../../components/SingleInfoHome/SingleInfoHome"

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
  if (isLoading) return <Spinner />
  return (
    <div className="info__home">
      <div className="info__container">
        <h1>Requètes</h1>
        <div className="request__container">
          {req.length > 0
            ? req.map((r) => <SingleInfoHome r={r} key={r.id_accorder} />)
            : "Aucune requète assignée"}
        </div>
      </div>
    </div>
  )
}

export default InfoHome
