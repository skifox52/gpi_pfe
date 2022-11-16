import "./DashboardCard.scss"
import { useMemo } from "react"

function DashboardCard({ payload, title }) {
  const data = useMemo(() => {
    return []
  }, [])
  useMemo(() => {
    for (const [key, value] of Object.entries(payload)) {
      data.push({ key, value })
    }
  }, [payload, data])
  return (
    <div className="dashboard__card">
      <div className="card__title">
        <h2>{title}</h2>
      </div>
      <div className="payload__container">
        {data.map((val) => (
          <div key={val.key}>
            <span>{val.key}</span>
            <p>{val.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardCard
