import "./List.css"

function List({file_name}) {
   return (
      <li className="list-element">
         <p>{file_name}</p>
         <p>Icon</p>
      </li>
   );
}

export default List;