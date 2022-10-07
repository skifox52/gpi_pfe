import { lazy, Suspense } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ProtectUser from "./ProtectUser"
import ProtectAdmin from "./ProtectAdmin"
import ProtectInfo from "./ProtectInfo"
import { useSelector } from "react-redux"
import "react-confirm-alert/src/react-confirm-alert.css"
import "react-toastify/dist/ReactToastify.css"
import { useLocation } from "react-router-dom"
import Spinner from "./components/Spinner/Spinner"
import DashboardSpinner from "./components/DashboardSpinner/DashboardSpinner"
import Navbar from "./components/Navbar/Navbar"
import UserDetails from "./components/UserDetails/UserDetails"
//Lazy loading imports
const Utilisateur = lazy(() => import("./pages/Utilisateur/Utilisateur"))
const Requete = lazy(() => import("./pages/Requete/Requete"))
const StatutRequete = lazy(() => import("./pages/StatutRequete/StatutRequete"))
const PriseEnCharge = lazy(() => import("./pages/PriseEnCharge/PriseEnCharge"))
const MaterielCategorie = lazy(() =>
  import("./pages/MaterielCategorie/MaterielCategorie")
)
const Informaticien = lazy(() => import("./pages/Informaticien/Informaticien"))
const Document = lazy(() => import("./pages/Document/Document"))
const UserHome = lazy(() => import("./pages/UserHome/UserHome"))
const Login = lazy(() => import("./pages/Login/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"))
const DashboardDashboard = lazy(() =>
  import("./pages/DadhboardDashboard/DashboardDashboard")
)
const InfoHome = lazy(() => import("./pages/InfoHome/InfoHome"))

function App() {
  const role = useSelector((state) => state.auth.user?.role)
  const location = useLocation()
  return (
    <>
      {role && <Navbar />}
      {role && <UserDetails />}
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          }
        />
        <Route element={<ProtectAdmin role={role} />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <DashboardDashboard />
                </Suspense>
              }
            />
            <Route
              path="utilisateurs"
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <Utilisateur />
                </Suspense>
              }
            />

            <Route
              path="statut-requete"
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <StatutRequete />
                </Suspense>
              }
            />
            <Route
              path="requetes"
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <Requete />
                </Suspense>
              }
            />
            <Route
              path="prise-en-charge"
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <PriseEnCharge />
                </Suspense>
              }
            />
            <Route
              path="materiels-categorie"
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <MaterielCategorie />
                </Suspense>
              }
            />
            <Route
              path="informaticien"
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <Informaticien />
                </Suspense>
              }
            />
            <Route
              path="document"
              element={
                <Suspense fallback={<DashboardSpinner />}>
                  <Document />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route element={<ProtectUser role={role} />}>
          <Route
            path="/utilisateur"
            element={
              <Suspense fallback={<Spinner />}>
                <UserHome />
              </Suspense>
            }
          />
        </Route>
        <Route element={<ProtectInfo role={role} />}>
          <Route
            path="/informaticien"
            element={
              <Suspense fallback={<Spinner />}>
                <InfoHome />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
