import Aside from "../../components/Aside/Aside"
import Navbar from "../../components/Navbar/Navbar"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Outlet, useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"
import "./Dashboard.scss"
import UserDetails from "../../components/UserDetails/UserDetails"

function Dashboard() {
  const navigate = useNavigate()
  const { user, isError, isLoading, message } = useSelector(
    (state) => state.auth
  )

  //UseEffect
  useEffect(() => {
    if (user == null) {
      navigate("/login")
    }
    if (isError) {
      toast.error(message)
    }
  }, [user, isError, isLoading, message, navigate])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="dashboard-page">
      <div className="dashboard-navbar">
        <Navbar />
      </div>
      <div className="dashboard-aside">
        <Aside />
      </div>
      <div className="dashboard-container">
        <Outlet />
      </div>
      <UserDetails />
    </div>
  )
}

export default Dashboard
