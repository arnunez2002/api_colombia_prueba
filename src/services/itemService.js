import requests from "services/httpService";
class ProductService {
  getItems() {
    return requests.get("/product");
  }

  getItemByID(id) {
    return requests.get(`/product/${id}`);
  }

  addItem(body) {
    return requests.post(`/buyer/addItem/`, body);
  }

  updateItem(id, body) {
    return requests.post(`/product/${id}`, body);
  }

  deleteItem(id) {
    return requests.delete(`/product/${id}`);
  }
}

export default new ProductService();
