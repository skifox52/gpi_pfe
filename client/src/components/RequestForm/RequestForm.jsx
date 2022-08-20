import "./RequestForm.scss"
import { IoMdClose } from "react-icons/io"

function RequestForm() {
  return (
    <div className="request__form">
      <IoMdClose
        className="close__btn"
        onClick={(e) => {
          document.querySelector(".add").classList.remove("full__width")
          document.querySelector(".view").classList.remove("no__width")
          document.querySelector(".request__form").classList.remove("show")
        }}
      />
      <form>
        <div className="form__control">
          <select name="mat" id="mat">
            <option value="" disabled selected hidden>
              Selectionnez votre materiel
            </option>
            <option value="First">Value</option>
          </select>
        </div>
        <div className="form__control">
          <input type="text" name="type" placeholder="Type de quete..." />
        </div>
        <div className="form__control">
          <input type="text" name="titre" placeholder="Titre de quete..." />
        </div>
        <div className="form__control">
          <input
            type="text"
            name="description"
            placeholder="Description de quete..."
          />
        </div>
        <div className="form__control">
          <select name="urgence">
            <option value="" hidden selected disabled>
              Urgence
            </option>
            <option value="haute">Haute</option>
            <option value="basse">Basse</option>
          </select>
        </div>
        <div className="form__control">
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  )
}

export default RequestForm
