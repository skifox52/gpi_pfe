import "./UserHome.scss"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"
import Navbar from "../../components/Navbar/Navbar"
import UserDetails from "../../components/UserDetails/UserDetails"
import { AiFillPlusSquare, AiOutlineUnorderedList } from "react-icons/ai"
import RequestForm from "../../components/RequestForm/RequestForm"
import RequestList from "../../components/RequestList/RequestList"

function UserHome() {
  //Query selectors
  const [viewClick, setViewClick] = useState(false)
  const [addClick, setAddClick] = useState(false)
  const addContainer = useRef(null)
  const viewContainer = useRef(null)

  //UseSelectors
  const { user, isError, message, isLoading } = useSelector(
    (state) => state.auth
  )
  //onClick functions
  const onClickForm = (e) => {
    setAddClick(true)
  }
  //SetState functions
  const setFormModal = () => {
    setAddClick(false)
  }

  const navigate = useNavigate()

  useEffect(() => {
    //<Document>

    //</Document>
    if (!user || user === null) {
      navigate("/login")
    }
    if (isError) {
      toast.error(message)
    }
  }, [isError, isLoading, user, message, navigate, addContainer, viewContainer])
  if (isLoading) return <Spinner />

  return (
    <div className="user-home">
      <Navbar />
      <UserDetails />
      <div className="container">
        {addClick && <RequestForm setFormModal={setFormModal} />}
        {viewClick && <RequestList />}
        <div className="add" onClick={onClickForm} ref={addContainer}>
          <h1>
            Ajouter une requète <AiFillPlusSquare className="plus__icon" />
          </h1>
        </div>
        <div className="view" ref={viewContainer}>
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
