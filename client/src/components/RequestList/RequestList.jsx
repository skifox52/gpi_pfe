// import "./RequestList.scss"
// import { useEffect, useRef } from "react"
// import { toast } from "react-toastify"
// import { IoMdClose } from "react-icons/io"
// import { useDispatch, useSelector } from "react-redux"
// // import { reset, fetchRequest } from "../../features/request/request"

// function RequestList({ getViewModal }) {
//   const requestRef = useRef(null)
//   const dispatch = useDispatch()
//   const { request, message, status } = useSelector((state) => state.request)

//   //Functions
//   const sortedData = [...request].sort((a, b) => {
//     return b.id_requete - a.id_requete
//   })
//   const closeViewModal = (e) => {
//     requestRef.current.close()
//   }
//   useEffect(() => {
//     getViewModal(requestRef)
//     if (status === "error") toast.error(message)
//     dispatch(fetchRequest())

//     return () => {
//       dispatch(reset())
//     }
//   }, [requestRef, message, getViewModal, dispatch])

//   return (
//     <dialog className="request__list" ref={requestRef}>
//       <IoMdClose className="close__btn" onClick={closeViewModal} />
//       <h1>Mes requètes</h1>
//       <div className="request__list__container">
//         {request.length > 0 ? (
//           sortedData.map((request) => (
//             <div className="single__request" key={request.id_requete + 1}>
//               <h2>{request.titre_requete}</h2>
//               <h3>{request.type_requete}</h3>
//               <h4>{request.date_requete?.split("T")[0]}</h4>
//               <span>{request.heure_requete}</span>
//               {request.statut === "En attente" ? (
//                 <p style={{ color: "#EBF077" }}>{request.statut}</p>
//               ) : request.statut === "Refusé" ? (
//                 <p style={{ color: "#D85B5B" }}>{request.statut}</p>
//               ) : (
//                 <p style={{ color: "#8CEC70" }}>{request.statut}</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <h1>Aucune requète en cours</h1>
//         )}
//       </div>
//     </dialog>
//   )
// }

// export default RequestList
