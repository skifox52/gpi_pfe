import React from "./SearchBar.scss"
import { BsSearch } from "react-icons/bs"
import { AiOutlineUserAdd } from "react-icons/ai"

function SearchBar({ users }) {
  return (
    <div className="search__bar">
      <div className="input__container">
        <BsSearch className="search__icon" />
        <input
          type="text"
          name="seach"
          placeholder="Recherche..."
          maxLength={15}
        />
      </div>
      <div className="add__container">
        <AiOutlineUserAdd className="add__icon" />
        <button className="add__btn">Ajouter un utilisateur</button>
      </div>
      <div className="info__container">
        <h3 style={{ letterSpacing: "1px" }}>Nombre d'utilisateurs:</h3>
        <h4 style={{ marginTop: ".4em" }}>{users.length}</h4>
      </div>
    </div>
  )
}

export default SearchBar
