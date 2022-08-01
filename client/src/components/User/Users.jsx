import "./User.scss"

function Users({ user }) {
  return (
    <article className="single-user">
      <span>Nom</span>
      <p>{user.Nom}</p>
      <span>Prénom</span>
      <p>{user.Prénom}</p>
      <span>E-mail</span>
      <p>{user.Email}</p>
    </article>
  )
}

export default Users
