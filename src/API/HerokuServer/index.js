import Auth from "./auth";
import Product from './product'
import User from './user'

export default class HerokuServer {
  static Auth = Auth;
  static Product = Product;
  static User = User;
}
