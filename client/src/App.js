import { Route, Routes, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/Login/Login"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useLocation } from "react-router-dom"
import Requete from "./pages/Requete/Requete"
import Utilisateur from "./pages/Utilisateur/Utilisateur"
import StatutRequete from "./pages/StatutRequete/StatutRequete"
import PriseEnCharge from "./pages/PriseEnCharge/PriseEnCharge"
import MaterielCategorie from "./pages/MaterielCategorie/MaterielCategorie"
import Informaticien from "./pages/Informaticien/Informaticien"
import Document from "./pages/Document/Document"
import UserHome from "./pages/UserHome/UserHome"
import ProtectAdmin from "./ProtectAdmin"
import ProtectUser from "./ProtectUser"
import { useSelector } from "react-redux"
import "react-confirm-alert/src/react-confirm-alert.css"

function App() {
  const role = useSelector((state) => state.auth.user?.role)
  const location = useLocation()
  return (
    <>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectAdmin role={role} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="utilisateurs" element={<Utilisateur />} />
            <Route path="statut-requete" element={<StatutRequete />} />
            <Route path="requetes" element={<Requete />} />
            <Route path="prise-en-charge" element={<PriseEnCharge />} />
            <Route path="materiels-categorie" element={<MaterielCategorie />} />
            <Route path="informaticien" element={<Informaticien />} />
            <Route path="document" element={<Document />} />
          </Route>
        </Route>
        <Route element={<ProtectUser role={role} />}>
          <Route path="/utilisateur" element={<UserHome />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
