import "./SingleDocument.scss"
import { useEffect, useState } from "react"
// import pdf from "../../pdf/Document-b74e4a03-ca32-434a-8df8-3adacf7afdb6.pdf"

function SingleDocument({ doc }) {
  const [pdfUrl, setPdfUrl] = useState("")
  useEffect(() => {
    import(`../../assets/pdf/${doc.piece_jointe_doc}`).then((document) => {
      setPdfUrl(document.default)
    })
  }, [])
  return (
    <a className="document" href={pdfUrl} target="_blank" rel="noreferrer">
      <h4>Id document: {doc.id_doc}</h4>
      <p>Id requète: {doc.id_req}</p>
      <p>Statut requète: {doc.categ_doc}</p>
      <span>{doc.createdAt.toString().split("T")[0]}</span>
      <span>
        {doc.createdAt.toString().split("T")[1].split("").splice(0, 5)}
      </span>
    </a>
  )
}

export default SingleDocument
