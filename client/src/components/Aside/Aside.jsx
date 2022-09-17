import React from "react"
import "./Aside.scss"
import { Link } from "react-router-dom"
import {
  FaUser,
  FaRegComment,
  FaRegFileAlt,
  FaServer,
  FaUserCog,
  FaFolderOpen,
} from "react-icons/fa"
import { RiGitPullRequestFill } from "react-icons/ri"

function Aside() {
  return (
    <>
      <div className="aside">
        <ul>
          <li>
            <Link to="/dashboard/utilisateurs">
              <FaUser /> Utilisateurs
            </Link>
          </li>
          <li>
            <Link to="/dashboard/statut-requete">
              <FaRegComment /> Statut Requetes
            </Link>
          </li>
          <li>
            <Link to="/dashboard/requetes">
              <RiGitPullRequestFill /> Requetes
            </Link>
          </li>
          <li>
            <Link to="/dashboard/prise-en-charge">
              <FaRegFileAlt /> Prise en charge
            </Link>
          </li>
          <li>
            <Link to="/dashboard/materiels-categorie">
              <FaServer /> Matériels et catégorie
            </Link>
          </li>
          <li>
            <Link to="/dashboard/informaticien">
              <FaUserCog /> Informaticien
            </Link>
          </li>
          <li>
            <Link to="/dashboard/document">
              <FaFolderOpen /> Document
            </Link>
          </li>
        </ul>

        <p className="copy">SAYHI Abdelfattah &copy; 2022</p>
      </div>
    </>
  )
}

export default Aside
