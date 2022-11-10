import "./SingleDocument.scss"

function SingleDocument({ doc }) {
  console.log(doc)
  return (
    <div className="document">
      <h4>Id document: {doc.id_doc}</h4>
      <h5>Id requète: {doc.id_req}</h5>
      <p>Statut requète: {doc.categ_doc}</p>
      <span>{doc.createdAt.toString().split("T")[0]}</span>
      <br />
      <span>
        {doc.createdAt.toString().split("T")[1].split("").splice(0, 5)}
      </span>
    </div>
  )
}

export default SingleDocument
