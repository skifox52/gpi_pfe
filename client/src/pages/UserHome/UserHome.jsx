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
  const [openFormModal, setOpenFormModal] = useState(null)
  const [openViewModal, setOpenViewModal] = useState(null)

  //UseSelectors
  const { user, isError, message, isLoading } = useSelector(
    (state) => state.auth
  )
  //onClick functions
  const onClickForm = (e) => {
    openFormModal.current.showModal()
  }
  const onClickView = (e) => {
    openViewModal.current.showModal()
  }
  //SetState functions
  const getModal = (modal) => {
    setOpenFormModal(modal)
  }
  const getViewModal = (modal) => {
    setOpenViewModal(modal)
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
  }, [
    isError,
    isLoading,
    user,
    message,
    navigate,

    openFormModal,
    openViewModal,
  ])
  if (isLoading) return <Spinner />
  return (
    <div className="user-home">
      <Navbar />
      <UserDetails />
      <RequestForm getModal={getModal} />
      <RequestList getViewModal={getViewModal} />
      <div className="container">
        <div className="add" onClick={onClickForm}>
          <h1>
            Ajouter une requète <AiFillPlusSquare className="plus__icon" />
          </h1>
        </div>
        <div className="view" onClick={onClickView}>
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
