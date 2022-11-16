import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import SingleDocument from "../../components/SingleDocument/SingleDocument"
import axios from "axios"
import "./Document.scss"
import { toast } from "react-toastify"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
function Document() {
  const API_URI = "/document"
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const cancelToken = axios.CancelToken.source()
  const [isLoading, setIsLoading] = useState(true)
  const [document, setDocument] = useState([])
  useEffect(() => {
    axios
      .get(API_URI, config, { cancelToken: cancelToken.token })
      .then((res) => {
        setDocument(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (axios.isCancel()) toast.info("Request canceled!")
        toast.error(err)
        setIsLoading(false)
      })

    return () => {
      cancelToken.cancel()
      setDocument([])
    }
  }, [])
  if (isLoading) return <DashboardSpinner />
  return (
    <div className="container">
      <h1>Documents</h1>
      <div className="document__container">
        {document.length === 0 ? (
          <h1>Aucun document enregistré!</h1>
        ) : (
          document.map((doc) => <SingleDocument key={doc.id_doc} doc={doc} />)
        )}
      </div>
    </div>
  )
}

export default Document
