import Auth from "./auth";
import Product from "./product";
import User from "./user";
import Category from "./Category";

export default class HerokuServer {
  static Auth = Auth;
  static Product = Product;
  static User = User;
  static Category = Category;
}
