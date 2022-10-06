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
    axios
      .get(API_URI, config, { cancelToken: cancelToken.token })
      .then((response) => {
        setCount(response.data[0]["COUNT(*)"])
      })
      .catch((err) => {
        if (axios.isCancel()) console.log("canceled")
        toast.error(err)
      })

    axios
      .get(DETAILS_URI, config, { cancelToken: cancelToken.token })
      .then((response) => {
        setDetails(response.data)
      })
      .catch((err) => {
        if (axios.isCancel()) console.log("canceled")
        toast.error(err)
      })
    parent.current && autoAnimate(parent.current)

    return () => {
      cancelToken.cancel()
      setCount(null)
      setDetails([])
    }
  }, [parent])
  console.log(details)

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
      {isOpen && <div className="info__details">hello world</div>}
    </div>
  )
}

export default SingleInfo
