import "./SingleInfoHome.scss"

function SingleInfoHome({ r }) {
  const onClickAccepter = (e) => {
    const response = window.confirm(
      `En cliquant sur 'OK', vous confirmez que vous avez effectué la requète N°${r.id_requete}`
    )
    if (response) {
    } else {
    }
  }
  const onClickAnnuler = (e) => {
    let message
    do {
      message = prompt("Raison du refus?")
    } while (message !== null && message === "")
  }
  return (
    <div className="single__request" key={r.id_accorder}>
      <div className="first__item">
        <h4>{r.id_accorder}</h4>
        <span>{r.date_acc.split("").splice(0, 10)}</span>
        <span>{r.date_acc.split("").splice(11, 5)}</span>
      </div>
      <div className="item">
        <span>Id requète</span>
        <h4>{r.id_requete}</h4>
      </div>
      <div className="item">
        <span>Nom et prénom d'utilisateur</span>
        <h4>
          {r.nom_util} {r.prenom_util} [ {r.role} ]
        </h4>
      </div>
      <div className="item">
        <span>Date et heure requète</span>
        <h4>
          {r.date_requete.split("").splice(0, 10)}{" "}
          {r.date_requete.split("").splice(11, 5)}
        </h4>
      </div>
      <div className="item">
        <span>Type de requète</span>
        <h4>{r.type_requete}</h4>
      </div>
      <div className="item">
        <span>Matériel</span>
        <h4>{r.nom_mat}</h4>
      </div>
      <div className="item">
        <span>Urgence requète</span>
        <h4>{r.urgence_requete}</h4>
      </div>
      <div className="item">
        <span>Statut requète</span>
        <h4>{r.statut}</h4>
      </div>
      <div className="button__container">
        <button onClick={onClickAccepter}>
          Requête
          <br />
          accomplie
        </button>
        <button onClick={onClickAnnuler} className="annuler">
          Requête
          <br />
          refusée
        </button>
      </div>
    </div>
  )
}

export default SingleInfoHome
