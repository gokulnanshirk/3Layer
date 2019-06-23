import React from "react";
import "../../index.css";
import axios from "axios";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }
  removeCartItem(i) {
    let cart_items = axios
      .get(
        `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_update_3layer_status/0/list_items/${
          i.id
        }`
      )
      .then(res => {
        console.log("api update", res);
      });
    this.setState({
      cart: this.state.cart.filter(item => item.title !== i.title)
    });
  }
  componentDidMount() {
    let status = 1;

    let cart_products = axios.get(
      `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_get_3layer_cart/${status}/list_items`
    );
    cart_products.then(res => {
      console.log("api category", res.data);
      this.setState({
        cart: this.state.cart.concat(res.data)
      });
      console.log("cart", this.state.cart);
    });
  }

  render() {
    if (this.state.cart.length > 0) {
      return (
        <div className="fluid-container category">
          {this.state.cart.map(i => (
            <div key={i.key} className="card list">
              <div className="card-header">
                {i.id} {i.title}
              </div>
              <div className="card-body">
                <h5 className="card-title">{i.title}</h5>
                <p className="card-text">{i.price}</p>
                <p className="card-text">{i.duration}</p>
                <p className="card-text">{i.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.removeCartItem(i);
                  }}
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <h1 className="fluid-container category">No Items In Cart</h1>;
    }
  }
}
