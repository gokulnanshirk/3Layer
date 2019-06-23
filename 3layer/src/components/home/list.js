import React from "react";

export default class List extends React.Component {
  render() {
    return (
      <div >
        <ul className="list-group list">
          {this.props.data.map(item => (
            <li
              onClick={() => {
                this.props.click(item);
              }}
              key={item.id}
              className="list-group-item zoomdetail"
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
