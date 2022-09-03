import "./MaterielCategorie.scss"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { toast } from "react-toastify"
import DashboardSpinner from "../../components/DashboardSpinner/DashboardSpinner"
import axios from "axios"

function MaterielCategorie() {
  const API_URI = "/materiel/all"
  const [hardwareAnimation] = useAutoAnimate()
  const [softwareAnimation] = useAutoAnimate()
  const [reseauAnimation] = useAutoAnimate()
  const [bureautiqueAnimation] = useAutoAnimate()
  const [hardware, setHardware] = useState(false)
  const [software, setSoftware] = useState(false)
  const [reseau, setReseau] = useState(false)
  const [bureautique, setBureautique] = useState(false)
  const [myMat, setMyMat] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector((state) => state.auth.user?.token)
  const config = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    const fetchMat = async () => {
      try {
        const response = await axios.get(API_URI, config)
        setMyMat(response.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error)
      }
    }
    fetchMat()
    return () => {
      setMyMat([])
    }
  }, [isLoading])

  const softwareCat = [...myMat].filter((cat) => cat.categorie === "Software")
  const hardwareCat = [...myMat].filter((cat) => cat.categorie === "Hardware")
  const reseauCat = [...myMat].filter((cat) => cat.categorie === "Réseau")
  const bureautiqueCat = [...myMat].filter(
    (cat) => cat.categorie === "Bureatique"
  )
  return (
    <div className="categorie__materiel">
      {isLoading && <DashboardSpinner />}
      <h1>Materiel et catégorie</h1>
      <div className="categorie__container">
        <ul>
          <li>
            <div
              className="single__categorie"
              ref={hardwareAnimation}
              onClick={(e) => {
                setHardware(!hardware)
              }}
            >
              <h2>
                Hardware{" "}
                {!hardware ? (
                  <AiOutlineArrowDown className="show__btn" />
                ) : (
                  <AiOutlineArrowUp className="hide__btn" />
                )}
              </h2>
              {hardware && (
                <div className="content">
                  {hardwareCat.map((cat) => (
                    <div className="single__mat" key={cat.id_mat + 1}>
                      <h5>Id : </h5>
                      <h4>{cat.id_mat}</h4>
                      <h5>Catégorie : </h5>
                      <h4>{cat.categorie}</h4>
                      <h5>Nom : </h5>
                      <h4>{cat.nom_mat}</h4>
                      <h5>Marque : </h5>
                      <h4>{cat.marque_mat}</h4>
                      <h5>Modèle : </h5>
                      <h4>{cat.modele_mat}</h4>
                      <h5>Fabricant: </h5>
                      <h4>{cat.fabricant_mat}</h4>
                      <h5>Caractéristique : </h5>
                      <h4>{cat.caracteristique_mat}</h4>
                      <h5>Commentaire : </h5>
                      <h4>{cat.commentaire_mat}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li>
            <div
              className="single__categorie"
              ref={softwareAnimation}
              onClick={(e) => {
                setSoftware(!software)
              }}
            >
              <h2>
                Software{" "}
                {!software ? (
                  <AiOutlineArrowDown className="show__btn" />
                ) : (
                  <AiOutlineArrowUp className="hide__btn" />
                )}
              </h2>
              {software && (
                <div className="content">
                  {softwareCat.map((cat) => (
                    <div className="single__mat" key={cat.id_mat + 1}>
                      <h5>Id : </h5>
                      <h4>{cat.id_mat}</h4>
                      <h5>Catégorie : </h5>
                      <h4>{cat.categorie}</h4>
                      <h5>Nom : </h5>
                      <h4>{cat.nom_mat}</h4>
                      <h5>Marque : </h5>
                      <h4>{cat.marque_mat}</h4>
                      <h5>Modèle : </h5>
                      <h4>{cat.modele_mat}</h4>
                      <h5>Fabricant: </h5>
                      <h4>{cat.fabricant_mat}</h4>
                      <h5>Caractéristique : </h5>
                      <h4>{cat.caracteristique_mat}</h4>
                      <h5>Commentaire : </h5>
                      <h4>{cat.commentaire_mat}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li>
            <div
              className="single__categorie"
              ref={reseauAnimation}
              onClick={(e) => {
                setReseau(!reseau)
              }}
            >
              <h2>
                Réseau{" "}
                {!reseau ? (
                  <AiOutlineArrowDown className="show__btn" />
                ) : (
                  <AiOutlineArrowUp className="hide__btn" />
                )}
              </h2>
              {reseau && (
                <div className="content">
                  {reseauCat.map((cat) => (
                    <div className="single__mat" key={cat.id_mat + 1}>
                      <h5>Id : </h5>
                      <h4>{cat.id_mat}</h4>
                      <h5>Catégorie : </h5>
                      <h4>{cat.categorie}</h4>
                      <h5>Nom : </h5>
                      <h4>{cat.nom_mat}</h4>
                      <h5>Marque : </h5>
                      <h4>{cat.marque_mat}</h4>
                      <h5>Modèle : </h5>
                      <h4>{cat.modele_mat}</h4>
                      <h5>Fabricant: </h5>
                      <h4>{cat.fabricant_mat}</h4>
                      <h5>Caractéristique : </h5>
                      <h4>{cat.caracteristique_mat}</h4>
                      <h5>Commentaire : </h5>
                      <h4>{cat.commentaire_mat}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li>
            <div
              className="single__categorie"
              ref={bureautiqueAnimation}
              onClick={(e) => {
                setBureautique(!bureautique)
              }}
            >
              <h2>
                Bureautique{" "}
                {!bureautique ? (
                  <AiOutlineArrowDown className="show__btn" />
                ) : (
                  <AiOutlineArrowUp className="hide__btn" />
                )}
              </h2>
              {bureautique && (
                <div className="content">
                  {bureautiqueCat.map((cat) => (
                    <div className="single__mat" key={cat.id_mat + 1}>
                      <h5>Id : </h5>
                      <h4>{cat.id_mat}</h4>
                      <h5>Catégorie : </h5>
                      <h4>{cat.categorie}</h4>
                      <h5>Nom : </h5>
                      <h4>{cat.nom_mat}</h4>
                      <h5>Marque : </h5>
                      <h4>{cat.marque_mat}</h4>
                      <h5>Modèle : </h5>
                      <h4>{cat.modele_mat}</h4>
                      <h5>Fabricant: </h5>
                      <h4>{cat.fabricant_mat}</h4>
                      <h5>Caractéristique : </h5>
                      <h4>{cat.caracteristique_mat}</h4>
                      <h5>Commentaire : </h5>
                      <h4>{cat.commentaire_mat}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MaterielCategorie
