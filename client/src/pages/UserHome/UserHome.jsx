import "./UserHome.scss"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useReducer } from "react"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"
import Navbar from "../../components/Navbar/Navbar"
import UserDetails from "../../components/UserDetails/UserDetails"
import RequestForm from "../../components/RequestForm/RequestForm"
import RequestList from "../../components/RequestList/RequestList"

function UserHome() {
  const navigate = useNavigate()
  //UseSelectors
  const { user, isError, message, isLoading } = useSelector(
    (state) => state.auth
  )
  const [forceUpdate, setForceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    if (!user || user === null) {
      navigate("/login")
    }
    if (isError) {
      toast.error(message)
    }
  }, [isError, isLoading, user, message, navigate])
  if (isLoading) return <Spinner />
  return (
    <>
      <Navbar />
      <div className="user-home">
        <UserDetails />
        <RequestList forceUpdate={forceUpdate} />
        <RequestForm setForceUpdate={setForceUpdate} />
      </div>
    </>
  )
}

export default UserHome
