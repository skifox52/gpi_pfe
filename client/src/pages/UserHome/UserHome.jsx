import "./UserHome.scss"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"
import Navbar from "../../components/Navbar/Navbar"
import UserDetails from "../../components/UserDetails/UserDetails"
import { AiFillPlusSquare, AiOutlineUnorderedList } from "react-icons/ai"
import RequestForm from "../../components/RequestForm/RequestForm"

function UserHome() {
  const { user, isError, message, isLoading } = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()
  useEffect(() => {
    if (!user || user === null) {
      navigate("/login")
    }
    if (isError) {
      toast.error(message)
    }
  }, [isError, isLoading, user, message, navigate])
  if (isLoading) return <Spinner />

  const addOnclick = (e) => {
    e.target.classList.add("full__width")
    document.querySelector(".view").classList.add("no__width")
    document.querySelector(".request__form").classList.add("show")
  }

  return (
    <div className="user-home">
      <Navbar />
      <UserDetails />
      <div className="container">
        <RequestForm />
        <div className="add half__width" onClick={addOnclick}>
          <h1>
            Ajouter une requète <AiFillPlusSquare className="plus__icon" />
          </h1>
        </div>
        <div className="view half__width">
          <h1>
            Afficher mes requètes{" "}
            <AiOutlineUnorderedList className="plus__icon" />
          </h1>
        </div>
      </div>
    </div>
  )
}

export default UserHome
