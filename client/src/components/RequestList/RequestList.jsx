import "./RequestList.scss"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { IoMdClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { reset, fetchRequest } from "../../features/request/request"

function RequestList({ requestRefFunction }) {
  const requestRef = useRef(null)
  const dispatch = useDispatch()
  const { request, message, status } = useSelector((state) => state.request)
  useEffect(() => {
    requestRefFunction(requestRef)
    if (status === "error") toast.error(message)
    dispatch(fetchRequest())

    return () => {
      dispatch(reset())
    }
  }, [requestRef])
  return (
    <div className="request__list" ref={requestRef}>
      <IoMdClose
        className="close__btn"
        onClick={(e) => {
          document.querySelector(".view").classList.remove("full__width__view")
          document.querySelector(".add").classList.remove("no__width__view")
          document
            .querySelector(".request__list")
            .classList.remove("show__view")
        }}
      />
      <div className="request__list__container">
        {/* {request.map((request) => (
          <div className="single__request" key={request.id_requete}>
            <h2>{request.titre_requete}</h2>
            <h3>{request.type_requete}</h3>
            <h4>{request.date_requete.split("T")[0]}</h4>
            <span>{request.heure_requete}</span>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default RequestList
