import React from "react";
import "../../index.css";

export default class Category extends React.Component {
  render() {
    return (
      <div>
        <ul className="list-group list">
          {this.props.category.map(cat => (
            <li
              onClick={() => {
                this.props.click(cat);
              }}
              key={cat.id}
              className="list-group-item zoomdetail"
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
