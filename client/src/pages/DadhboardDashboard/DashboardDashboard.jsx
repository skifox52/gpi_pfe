import "./DashboardDashboard.scss"
import {} from "react-chartjs-2"
import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import DashboardCard from "../../components/DasboardCard/DashboardCard"

function DashboardDashboard() {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const USER_URI = "/dashboard/countUser"
  const REQ_URI = "/dashboard/countReq"
  const cancelToken = axios.CancelToken.source()
  const [utilisateur, setUtilisateur] = useState({
    Informaticien: null,
    Administrateur: null,
    Utilisateur: null,
  })
  const [requete, setRequete] = useState({
    Accepter: null,
    Refuser: null,
    "En attente": null,
    "En cours": null,
  })
  const data1 = {
    labels: ["Administrateurs", "Utilisateurs", "Informaticiens"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          utilisateur["Administrateur"],
          utilisateur["Informaticien"],
          utilisateur["Utilisateur"],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
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
          requete["Accepter"],
          requete["Refuser"],
          requete["En attente"],
          requete["En cours"],
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
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
          Informaticien: res[0].data.infoCount["count(*)"],
          Administrateur: res[0].data.adminCount["count(*)"],
          Utilisateur: res[0].data.userCount["count(*)"],
        })
        setRequete({
          Accepter: res[1].data.accepterCount["count(*)"],
          Refuser: res[1].data.refuserCount["count(*)"],
          "En attente": res[1].data.enAttenteCount["count(*)"],
          "En cours": res[1].data.enCoursCount["count(*)"],
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
        Accepter: null,
        Refuser: null,
        "En attente": null,
        "En cours": null,
      })
    }
  }, [])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="dashboard__dashboard">
      <h1>Dashboard</h1>
      <div className="cards__container">
        <div className="card__user">
          <DashboardCard payload={utilisateur} title={"Type d'utilisateurs"} />
        </div>
        <div className="card__request">
          <DashboardCard payload={requete} title={"Type de requètes"} />
        </div>
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
