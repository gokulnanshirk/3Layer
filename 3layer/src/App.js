import React from "react";
import Category from "./components/home/category";
import List from "./components/home/list";
import Item from "./components/home/item";
import axios from "axios";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],
      products: [],
      listItems: [],
      list: [],
      item: []
    };
    this.handleListOnClick = this.handleListOnClick.bind(this);
    this.handleCategoryOnClick = this.handleCategoryOnClick.bind(this);
    this.addToCart=this.addToCart.bind(this);
  }
  componentDidMount() {
    let status = 2;

    let listItems = axios.get(
      `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_get_3layer/${status}/list_items`
    );
    listItems.then(res => {
      console.log("api category", res.data);
      this.setState({
        listItems: res.data
      });
      console.log("all itesm", this.state.listItems);
    });

    let apiData = axios.get(
      `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_get_3layer/${status}/category`
    );
    apiData.then(res => {
      console.log("api category", res.data);
      this.setState({
        categories: res.data
      });
    });

    // let courses = axios.get(
    //   `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_get_3layer/${status}/courses`
    // );
    // courses.then(res => {
    //   console.log("api course", res);
    //   this.setState({
    //     courses: res.data
    //   });
    // });

    // let products = axios.get(
    //   `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_get_3layer/${status}/products`
    // );
    // products.then(res => {
    //   console.log("api products", res);

    //   this.setState({
    //     products: res.data
    //   });
    // });
  }
  handleListOnClick(course) {
    this.setState({
      item: (this.state.item = course)
    });
  }
  // handling list display on category click
  handleCategoryOnClick(category) {
    this.state.categories.map(scategory => {
      if (category.id === scategory.id) {
        this.setState({
          list: (this.state.list = this.state.listItems.filter(item=>
                item.category_id === scategory.id
          ))
        });
      }
    });
  }
  btnStyle(item) {
    console.log("Add to cart", item);
    if (item == 1) return "disabled";
  }
  addToCart(category) {
    let selectedCategory;

    this.state.categories.map(scategory=>{
      if (category.id === scategory.id) {
        selectedCategory=scategory;
        console.log("add to cart , selected category",selectedCategory,category)
     
      }
      let cart_items = axios
      .get(
        `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_update_3layer_status/1/list_items/${category.id}`
      )
      .then(res => {
        console.log("api update", res,cart_items);
      });

    })
    
  }
  render() {
    return (
      <div className="fluid-container category">
        <div className="row align-items-start">
          <div className="col-2 ">
            <h6>Category</h6>
            <Category
              category={this.state.categories}
              click={this.handleCategoryOnClick}
            />
          </div>
          <div className="col-3 ">
            <h6>List</h6>
            <List data={this.state.list} click={this.handleListOnClick} />
          </div>
          <div className="col-7 ">
            <h6>Item</h6>
            <Item addToCart={this.addToCart} data={this.state.item} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
