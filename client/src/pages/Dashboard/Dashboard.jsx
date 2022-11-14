import Aside from "../../components/Aside/Aside"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"
import "./Dashboard.scss"

function Dashboard() {
  const navigate = useNavigate()
  const { user, isError, isLoading, message } = useSelector(
    (state) => state.auth
  )

  //UseEffect
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [user, isError, isLoading, message, navigate])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="dashboard-page">
      <div className="dashboard-aside">
        <Aside />
      </div>
      <div className="dashboard-container">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
