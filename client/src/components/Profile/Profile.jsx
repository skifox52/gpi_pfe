import "./Profile.scss"
import { FaUserAlt } from "react-icons/fa"

function Profile() {
  return (
    <button
      className="profile-btn"
      title="Profil"
      onClick={(e) => {
        document.querySelector(".user-details").showModal()
      }}
    >
      <FaUserAlt /> Profil
    </button>
  )
}

export default Profile
