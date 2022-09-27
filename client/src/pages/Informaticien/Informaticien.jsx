import InfoFofm from "../../components/InfoForm/InfoFofm"
import "./Informaticien.scss"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import SingleInfo from "../../components/SingleInfo/SingleInfo"

function Informaticien() {
  const API_URI = "/info"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const [info, setInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const cancelToken = axios.CancelToken.source()
  //State
  const [state, setState] = useState(false)
  const changeState = () => {
    setState(!state)
  }
  useEffect(() => {
    axios
      .get(API_URI, config, { cancelToken: cancelToken.token })
      .then((res) => {
        setInfo(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (axios.isCancel(err)) toast.info("Request canceled!")
        toast.error(err)
        setIsLoading(false)
      })

    return () => {
      cancelToken.cancel()
      setInfo([])
    }
  }, [state])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="informaticien__container">
      <div className="add__info">
        <InfoFofm changeState={changeState} />
      </div>
      <div className="list__info">
        {info.map((inf) => (
          <SingleInfo inf={inf} key={inf.id_info} changeState={changeState} />
        ))}
      </div>
    </div>
  )
}

export default Informaticien
