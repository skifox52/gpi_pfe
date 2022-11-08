import { useState, useEffect, useMemo } from "react"
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
  const [state, setState] = useState(false)
  const sortedReq = useMemo(
    () =>
      [...req].sort((a, b) => {
        if (a.statut === "Accepter" || a.statut === "Refuser") {
          return 1
        } else {
          return -1
        }
      }),
    [req]
  )
  const changeState = () => {
    setIsloading(true)
    setState(!state)
  }
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
  }, [state])
  if (isLoading) return <Spinner />
  return (
    <div className="info__home">
      <div className="info__container">
        <h1>Requètes</h1>
        <div className="request__container">
          {req.length > 0
            ? sortedReq.map((r) => (
                <SingleInfoHome
                  r={r}
                  key={r.id_accorder}
                  changeState={changeState}
                />
              ))
            : "Aucune requète assignée"}
        </div>
      </div>
    </div>
  )
}

export default InfoHome
