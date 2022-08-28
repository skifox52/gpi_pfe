import "./RequestList.scss"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { IoMdClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { reset, fetchRequest } from "../../features/request/request"

function RequestList({ getViewModal }) {
  const requestRef = useRef(null)
  const dispatch = useDispatch()
  const { request, message, status } = useSelector((state) => state.request)

  //Functions
  const closeViewModal = (e) => {
    requestRef.current.close()
  }
  useEffect(() => {
    getViewModal(requestRef)
    if (status === "error") toast.error(message)
    dispatch(fetchRequest())

    return () => {
      dispatch(reset())
    }
  }, [requestRef, message])
  return (
    <dialog className="request__list" ref={requestRef}>
      <IoMdClose className="close__btn" onClick={closeViewModal} />
      <div className="request__list__container">
        {request.length > 0 ? (
          request.map((request) => (
            <div className="single__request" key={request.id_requete}>
              <h2>{request.titre_requete}</h2>
              <h3>{request.type_requete}</h3>
              <h4>{request.date_requete.split("T")[0]}</h4>
              <span>{request.heure_requete}</span>
            </div>
          ))
        ) : (
          <h1>Aucune requète en cours</h1>
        )}
      </div>
    </dialog>
  )
}

export default RequestList
