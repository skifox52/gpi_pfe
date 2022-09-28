import "./PriseEnCharge.scss"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"

function PriseEnCharge() {
  const POST_API_URI = "/pec"
  const REQUETE_API_URI = "/pec/req"
  const INFO_API_URI = "/pec/info"
  const [isLoading, setIsLoading] = useState(true)
  const [requete, setRequete] = useState([])
  const [info, setInfo] = useState([])
  const [state, setState] = useState(true)
  const [formData, setFormData] = useState({ request: "", informaticien: "" })
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onAccepter = async (e) => {
    try {
      if (formData["request"] === "" || formData["informaticien"] === "")
        return toast.warning("Selectionnez une requète et un informaticien")
      setIsLoading(true)
      await axios.post(POST_API_URI, formData, config)
      setIsLoading(false)
      setState(!state)
      toast.success("Requète en cours!")
    } catch (error) {
      setIsLoading(false)
      setState(!state)
      toast.error(error)
    }
  }

  const onReject = async (e) => {
    try {
      if (formData["request"] === "")
        return toast.warning("Choisssez une requète!")
      setIsLoading(true)
      await axios.put(POST_API_URI, { request: formData["request"] }, config)
      setIsLoading(false)
      setState(!state)
      toast.error("Requète refusée")
    } catch (error) {
      setIsLoading(false)
      setState(!state)
      toast.error(error)
    }
  }
  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    const requeteRequest = axios.get(REQUETE_API_URI, config, {
      CancelToken: cancelToken.token,
    })
    const infoRequest = axios.get(INFO_API_URI, config, {
      cancelToken: cancelToken.token,
    })
    axios
      .all([requeteRequest, infoRequest])
      .then(([res1, res2]) => {
        setRequete(res1.data)
        setInfo(res2.data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request Canceled")
          setIsLoading(false)
        }
        toast.error(err)
        setIsLoading(false)
      })

    return () => {
      cancelToken.cancel()
      setInfo([])
      setRequete([])
    }
  }, [state])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="prise__en__charge">
      <div className="req__container">
        <h1>Requète en attente</h1>
        <select name="request" defaultValue="" onChange={onChange}>
          <option value="" disabled hidden>
            Choisissez une requète
          </option>
          {requete.map((req) => (
            <option value={req.id_requete} key={req.id_requete}>
              {req.id_requete} - {req.nom_mat} | {req.type_requete} {"<"}
              {req.urgence_requete.toUpperCase()}
              {">"}
            </option>
          ))}
        </select>
      </div>
      <div className="info__container">
        <h1>Liste des informaticiens</h1>
        <select name="informaticien" defaultValue="" onChange={onChange}>
          <option value="" disabled hidden>
            Choisissez un informaticien
          </option>
          {info.map((info) => (
            <option value={info.id_info} key={info.id_info}>
              {info.id_info} - {info.nom_informaticien.toUpperCase()} {"[ "}
              {info.categorie_informaticien}
              {" ]"}
            </option>
          ))}
        </select>
      </div>
      <div className="buttons__container">
        <button className="accepter" onClick={onAccepter}>
          Accepter la requète
        </button>
        <button className="refuser" onClick={onReject}>
          Refuser la requète
        </button>
      </div>
    </div>
  )
}

export default PriseEnCharge
