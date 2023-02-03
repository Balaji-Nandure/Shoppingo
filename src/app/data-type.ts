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
  quantity: number | undefined;
}

export interface cart {
  userId: number;
  productId: number;
  catagory: string;
  color: string;
  description: string;
  image: string;
  name: string;
  price: string;
  id: number | undefined;
  quantity: number | undefined;
}
