import "./DashboardDashboard.scss"
import {} from "react-chartjs-2"
import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

function DashboardDashboard() {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const USER_URI = "/dashboard/countUser"
  const REQ_URI = "/dashboard/countReq"
  const cancelToken = axios.CancelToken.source()
  const [utilisateur, setUtilisateur] = useState({
    info: null,
    admin: null,
    user: null,
  })
  const [requete, setRequete] = useState({
    accepter: null,
    refuser: null,
    enAttente: null,
    enCours: null,
  })
  const data1 = {
    labels: ["Administrateurs", "Utilisateurs", "Informaticiens"],
    datasets: [
      {
        label: "# of Votes",
        data: [utilisateur.admin, utilisateur.info, utilisateur.user],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }
  const data2 = {
    labels: ["Accepter", "Refuser", "En attente", "En cours"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          requete.accepter,
          requete.refuser,
          requete.enAttente,
          requete.enCours,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  useEffect(() => {
    const userResponse = axios.get(USER_URI, config, {
      cancelToken: cancelToken.token,
    })
    const reqReponse = axios.get(REQ_URI, config, {
      cancelToken: cancelToken.token,
    })
    Promise.all([userResponse, reqReponse])
      .then((res) => {
        setUtilisateur({
          info: res[0].data.infoCount["count(*)"],
          admin: res[0].data.adminCount["count(*)"],
          user: res[0].data.userCount["count(*)"],
        })
        setRequete({
          accepter: res[1].data.accepterCount["count(*)"],
          refuser: res[1].data.refuserCount["count(*)"],
          enAttente: res[1].data.enAttenteCount["count(*)"],
          enCours: res[1].data.enCoursCount["count(*)"],
        })
        setIsLoading(false)
      })
      .catch((err) => {
        if (axios.isCancel()) toast.info("Request canceled!")
        setIsLoading(false)
        toast.error(err)
      })
    return () => {
      cancelToken.cancel()
      setUtilisateur({ info: null, admin: null, user: null })
      setRequete({
        accepter: null,
        refuser: null,
        enAttente: null,
        enCours: null,
      })
    }
  }, [])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="dashboard__dashboard">
      <h1>Dashboard</h1>
      <div className="cards__container">
        <div className="card__user"></div>
        <div className="card__request"></div>
      </div>
      <div className="chart__container">
        <div className="chart__user__container">
          <Doughnut data={data1} />
        </div>
        <div className="chart__requete__container">
          <Doughnut data={data2} />
        </div>
      </div>
    </div>
  )
}

export default DashboardDashboard
