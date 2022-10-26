import {Link} from "react-router-dom";

export const LinksList = ({links}) => {
  if (!links.length) {
    return <p className="center">There is no Links Yet</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>No</th>
        <th>Original Link</th>
        <th>Minified Link</th>
      </tr>
      </thead>

      <tbody>
      { links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}