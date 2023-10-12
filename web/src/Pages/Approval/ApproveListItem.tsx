import { Title } from "Pages/Search/TitleItem/Title.interface"
import { Link } from "react-router-dom"
import './style.scss';


export  function ApproveListItem(title: Title & { page: string, post_date: Date, isAccepted?: boolean, }) {
  return <>
    <Link to={title.page}>{title.name}</Link>
    <span id="date">
      {`${title.post_date.getDate() >= 9 ? "" : 0}`}{title.post_date.getDate()}.{`${title.post_date.getMonth() >= 9 ? "" : 0}`}{title.post_date.getUTCMonth() + 1}.{title.post_date.getFullYear()} 
    </span>
    {(title.isAccepted || title.isAccepted === undefined) && <span className="acceptance-status">{title.isAccepted === undefined ? "Approve": "Approved"}</span>}
    {(!title.isAccepted || title.isAccepted === undefined) && <span className="acceptance-status">{title.isAccepted === undefined ? "Deny": "Denied"}</span>}
    </>
  
}
