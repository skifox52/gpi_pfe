import "./RequestForm.scss"
import { IoMdClose } from "react-icons/io"
import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { reset, fetchMateriel } from "../../features/materiel/materiel"
import { postRequest } from "../../features/request/request"
import { useSelector, useDispatch } from "react-redux"

function RequestForm({ getModal }) {
  const myForm = useRef(null)
  const formRef = useRef(null)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState()
  const { materiel, message, status } = useSelector((state) => state.materiel)
  const request = useSelector((state) => state.request)
  const setFormModal = () => {
    formRef.current.close()
  }
  //UseEffect
  useEffect(() => {
    dispatch(fetchMateriel())
    if (request.status === "error") toast.error(request.message)
    if (status === "error") {
      toast.error(message)
    }
    getModal(formRef)

    if (request.status === "success" && formRef.current.hasAttribute("open")) {
      toast.success("Votre requète a été envoyer!")
    }
    return () => {
      dispatch(reset())
    }
  }, [dispatch, formRef, request.status, request.message])
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(postRequest(formData))
    myForm.current.reset()
  }
  return (
    <dialog className="request__form" ref={formRef}>
      <h1>Ajouter une requète</h1>
      <IoMdClose className="close__btn" onClick={setFormModal} />
      <form onSubmit={onSubmit} ref={myForm}>
        <div className="form__control">
          <select
            name="id_mat"
            id="mat"
            required
            onChange={onChange}
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Selectionnez un materiel
            </option>
            {materiel.map((mat) => (
              <option value={mat.id_mat} key={mat.id_mat}>
                {mat.nom_mat} - {mat.marque_mat}
              </option>
            ))}
          </select>
        </div>
        <div className="form__control">
          <select
            name="type_requete"
            id="type"
            required
            onChange={onChange}
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Selectionnez le type
            </option>
            <option value="reparation">Réparation</option>
            <option value="demande">Demande de materiel</option>
          </select>
        </div>
        <div className="form__control">
          <select
            name="urgence"
            required
            onChange={onChange}
            defaultValue="default"
          >
            <option value="default" hidden disabled>
              Urgence
            </option>
            <option value="haute">Haute</option>
            <option value="basse">Basse</option>
          </select>
        </div>
        <div className="form__control">
          <input
            type="text"
            name="titre"
            placeholder="Titre de quete..."
            required
            onChange={onChange}
          />
        </div>
        <div className="form__control">
          <input
            type="text"
            name="description"
            placeholder="Description de quete..."
            required
            onChange={onChange}
          />
        </div>

        <div className="form__control">
          <button type="submit" className="submit__btn">
            Envoyer
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default RequestForm
