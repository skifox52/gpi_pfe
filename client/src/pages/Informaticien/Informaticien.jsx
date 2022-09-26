import InfoFofm from "../../components/InfoForm/InfoFofm"
import "./Informaticien.scss"
function Informaticien() {
  return (
    <div className="informaticien__container">
      <div className="add__info">
        <InfoFofm />
      </div>
      <div className="list__info"></div>
    </div>
  )
}

export default Informaticien
