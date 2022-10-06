import "./Informaticien.scss"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import { toast } from "react-toastify"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import SingleInfo from "../../components/SingleInfo/SingleInfo"

function Informaticien() {
  const API_URI = "/users/all"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const [info, setInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const cancelToken = axios.CancelToken.source()
  const infos = useMemo(
    () =>
      info.filter((inf) => {
        return inf.Role.toLowerCase() === "informaticien"
      }),
    [info]
  )
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
      <h1>Informaticiens</h1>
      <div className="list__info">
        {infos.map((inf) => (
          <SingleInfo inf={inf} key={inf.Id} changeState={changeState} />
        ))}
      </div>
    </div>
  )
}

export default Informaticien
