import React from "react";
import { NavLink, Link } from "react-router-dom";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.data.id) {
      return (
        <div className="card list">
          <div className="card-header">
            {this.props.data.id} {this.props.data.title}
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.props.data.title}</h5>
            <p className="card-text">{this.props.data.price}</p>
            <p className="card-text">{this.props.data.duration}</p>
            <p className="card-text">{this.props.data.description}</p>

            <button className="btn btn-primary" onClick={()=>{this.props.addToCart(this.props.data)}}>
              Add To Cart
            </button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
