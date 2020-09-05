import { produtos } from "./database";

export default class Product {
  static async get(id) {
    for (const prod of produtos) {
      if (prod.id == id) return prod;
    }
    return null;
  }
  static mockProd = {
    id: null,
    name: "Novo produto",
    price: 0.0,
    branch: "",
    pictures: [],
  };

  static async list(args = { name: "" }) {
    const { name } = args;

    const resps = [];

    for (const prod of produtos) {
      if (prod.name.toLowerCase().includes(name.toLowerCase()))
        resps.push(prod);
    }

    return resps;
  }
}
