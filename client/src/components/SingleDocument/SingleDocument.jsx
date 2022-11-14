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
    <div className="document">
      <h4>
        Id document: <p>{doc.id_doc}</p>
      </h4>
      <h4>
        Id requète: <p>{doc.id_req}</p>
      </h4>
      <h4>
        Statut requète: <p>{doc.categ_doc}</p>
      </h4>
      <h4>
        Date: <p>{doc.createdAt.toString().split("T")[0]}</p>
      </h4>
      <a href={pdfUrl} target="_blank" rel="noreferrer">
        Afficher le document
      </a>
    </div>
  )
}

export default SingleDocument
