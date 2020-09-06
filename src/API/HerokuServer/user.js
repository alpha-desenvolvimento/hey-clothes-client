import { users } from "./database";

const mockUser = {
  id: null,
  email: "",
  password: "",
  name: "Cadastrar usuário",
};

export default class User {
  static async list() {
    return users;
  }
  static async get(args = { id: null }) {
    const { id } = args;

    for (const user of users) if (user.id == id) return user;
    
    return null;
  }

  static mockUser = mockUser;
}
