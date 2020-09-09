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

  static async list(args = { desc: "" }) {
    const { desc } = args;

    const resps = [];

    for (const category of categories) {
      if (category.desc.toLowerCase().includes(desc.toLowerCase()))
        resps.push(category);
    }

    return resps;
  }
}
