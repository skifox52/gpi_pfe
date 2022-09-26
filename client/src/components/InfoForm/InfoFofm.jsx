import "./InfoForm.scss"
import { useState, useEffect, useRef } from "react"
import autoAnimate from "@formkit/auto-animate"
import { BiMessageSquareAdd } from "react-icons/bi"
import axios from "axios"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

function InfoFofm() {
  const parent = useRef(null)
  const form = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const API_URI = "/info"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const initialFormValue = {
    cat_info: "",
    nom_info: "",
    email_info: "",
    teleph_info: "",
    groupe_info: "",
  }
  const [formData, setFormData] = useState(initialFormValue)

  //onChange
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault()
    axios
      .post(API_URI, formData, config)
      .then((res) => {
        toast.success("Informaticien ajouter")
        setFormData(initialFormValue)
        form.current.reset()
      })
      .catch((err) => toast.error(err))
  }
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent, form, config])
  return (
    <div className="info__comp" ref={parent}>
      <h2
        onClick={(e) => {
          setIsOpen(!isOpen)
        }}
      >
        Ajouter un informaticien <BiMessageSquareAdd className="icon" />
      </h2>
      {isOpen && (
        <form onSubmit={onSubmit} ref={form}>
          <div className="form__control">
            <select
              name="cat_info"
              defaultValue=""
              required
              onChange={onChange}
            >
              <option value="" hidden disabled>
                Catégorie
              </option>
              <option value="Help desk">Help Desk</option>
            </select>
          </div>
          <div className="form__control">
            <input
              type="text"
              name="nom_info"
              placeholder="Nom infomarticien..."
              required
              onChange={onChange}
            />
          </div>
          <div className="form__control">
            <input
              type="email"
              name="email_info"
              placeholder="E-mail.."
              required
              onChange={onChange}
            />
          </div>
          <div className="form__control">
            <input
              type="number"
              name="teleph_info"
              required
              placeholder="Téléphone..."
              onChange={onChange}
            />
          </div>
          <div className="form__control">
            <select
              name="groupe_info"
              defaultValue=""
              required
              onChange={onChange}
            >
              <option value="">Groupe</option>
              <option value="ISI">ISI</option>
            </select>
          </div>
          <div className="form__control">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default InfoFofm
