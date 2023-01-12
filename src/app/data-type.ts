export interface signup {
  name: string;
  password: string;
  email: string;
}

export interface login {
  password: string;
  email: string;
}

export interface Product {
  catagory: string;
  color: string;
  description: string;
  image: string;
  name: string;
  price: string;
  id: number;
}
