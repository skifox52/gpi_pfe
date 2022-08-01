import "./Navbar.scss"
import Logout from "../Logout/Logout"
import logo from "../../assets/sonatrach.svg"
import Profile from "../Profile/Profile"

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <img src={logo} alt="logo-sonatrach" className="logo-svg" />
        </li>
        <li>
          <Profile />
          {/* </li>
        <li> */}
          <Logout />
        </li>
      </ul>
    </div>
  )
}

export default Navbar
