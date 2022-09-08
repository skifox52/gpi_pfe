import React from "react"
import "./Login.scss"
import logo from "../../assets/sonatrach.svg"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"

function Login() {
  //form data
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  })
  const { id: userId, password: userPassword } = formData

  //Get AUTH-STATE
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  //useEffect

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if ((isSuccess || user) && user.role === "admin") {
      navigate("/dashboard")
    }
    if ((isSuccess || user) && user.role === "utilisateur") {
      navigate("/utilisateur")
    }
    dispatch(reset())
  }, [user, isSuccess, isError, message, dispatch, navigate])

  //onChange function
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  //onSubmit function
  const onSubmit = (e) => {
    e.preventDefault()
    if (!userId || !userPassword) {
      return toast.info("Remplissez vos champs...")
    }

    dispatch(login(formData))
  }

  //Spinner
  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="login-page">
      <h1 className="title">Gestionnaire de parc informatique</h1>
      <img src={logo} alt="logo-sonatrach" className="logo" />
      <form action="/" onSubmit={onSubmit}>
        <h1>Authentification</h1>
        <input
          type="number"
          id="id"
          name="id"
          placeholder="Idnetifiant..."
          onChange={onChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe..."
          onChange={onChange}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login
