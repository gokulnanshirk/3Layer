import React from "react";
import axios from "axios";
import "../../index.css";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      items: [],
      productListDdl: [],
      selectedCategory: []
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }
  componentDidMount() {
    let apiData = axios.get(
      `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_get_3layer/2/category`
    );
    apiData.then(res => {
      console.log("api category", res.data);
      this.setState({
        categories: this.state.categories.concat(res.data)
      });
    });

    let listItems = axios.get(
      `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_get_3layer/2/list_items`
    );
    listItems.then(res => {
      console.log("api category", res.data);
      this.setState({
        items: res.data
      });
      console.log("all items in Admin", this.state.items);
    });
  }
  addCategory() {
    let category = document.getElementById("category").value;
    console.log(category);
    let apiData = axios.get(
      `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_add_category/${category}`
    );
    apiData.then(res => {
      console.log("api category", res.data);
    });
    this.componentDidMount();
    document.getElementById("category").value = "";
  }
  addItem() {
    let selectedCategory = document.getElementById("selCategory").value;
    let selectedCategory_id;
    this.state.categories.map(cat => {
      if (cat.name == selectedCategory) {
        selectedCategory_id = cat.id;
      }
    });
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    console.log(selectedCategory_id, title, price, description);
    let obj = {
      category_id: selectedCategory_id,
      title: title,
      price: price,
      description: description
    };
    let apiData = axios.post(
      `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_add_item/${title}/${selectedCategory_id}/${price}/${description}`,
      JSON.stringify(obj)
    );
    apiData.then(res => {
      console.log("api category", res.data);
    });
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
  }
  render() {
    return (
      <div className="fluid-container category">
        <div className="row">
          <div className="col-6 ">
            <form>
              <div className="form-group ">
                <h6>Add a New Category</h6>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  id="category"
                  placeholder="New Category"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  this.addCategory();
                }}
                className="btn btn-primary"
              >
                Add Category
              </button>
            </form>
          </div>
          <div className="col-6 ">
            <form>
              <div className="form-group ">
                <div className="form-group ">
                  <h6>Add Product under a Category</h6>
                  <select className="list" id="selCategory">
                    <option value="default">Select a Category</option>
                    {this.state.categories.map(cat => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title of the Product"
                />
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Price of the Product"
                />
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Description about the product"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  this.addItem();
                }}
                className="btn btn-primary"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h6>Remove a Category</h6>
            <div className="form-group ">
              <form>
                <select className="list" id="remove_selCategory_cat">
                  <option value="default">Select a Category</option>
                  {this.state.categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <br />
                <button
                  type="button"
                  onClick={() => {
                    this.removeCategory();
                  }}
                  className="btn btn-warning"
                >
                  Remove
                </button>
              </form>
            </div>
          </div>
          <div className="col-4">
            <h6>Remove a Product</h6>
            <div className="form-group ">
              <form>
                <select
                  className="list"
                  onChange={() => {
                    this.handleCategoryChange();
                  }}
                  id="remove_selCategory"
                >
                  <option value="default">Select a Category</option>
                  {this.state.categories.map(cat => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <br />
                <select className="list" id="remove_selProduct">
                  <option value="default">Select a Product</option>
                  {this.state.productListDdl.map(prod => (
                    <option key={prod.id} value={prod.id}>
                      {prod.title}
                    </option>
                  ))}
                </select>
                <br />
                <button
                  type="button"
                  onClick={() => {
                    this.removeProduct();
                  }}
                  className="btn btn-warning"
                >
                  Remove
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleCategoryChange() {
    let category = document.getElementById("remove_selCategory").value;
    this.state.categories.map(cat => {
      if (cat.name == category) {
        this.setState(
          {
            selectedCategory: cat
          },
          () =>
            this.setState({
              productListDdl: this.state.items.filter(
                item => item.category_id == this.state.selectedCategory.id
              )
            })
        );
      }
    });
  }
  removeProduct() {
    let cat = document.getElementById("remove_selProduct").value;
    console.log(cat);
    let result = axios
      .get(
        `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_update_3layer_status/2/list_items/${cat}`
      )
      .then(res => {
        console.log("api update", res, result);
      });
    document.getElementById("remove_selProduct").value = "Done";
  }
  removeCategory() {
    let cat = document.getElementById("remove_selCategory_cat").value;
    console.log(cat);
    let result = axios
      .get(
        `http://vivartha.com.md-96.webhostbox.net/vivartha.com/ionic/codeignitor/index.php/model_controller/api_update_3layer_status/2/category/${cat}`
      )
      .then(res => {
        console.log("api update", res, result);
      });
    document.getElementById("remove_selCategory_cat").value = "Done";
  }
}
