import { categories } from "./database";

export default class Category {
  static async get(id) {
    for (const category of categories) {
      if (category.id == id) return category;
    }
    return null;
  }
  static mockCategory = {
    id: null,
    desc: "Nova categoria",
  };

  static async list(args = { name: "" }) {
    const { name } = args;

    const resps = [];

    for (const category of categories) {
      if (category.name.toLowerCase().includes(name.toLowerCase()))
        resps.push(category);
    }

    return resps;
  }
}
