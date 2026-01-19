export type LoginData = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
};

export type TypeCourt = {
  id: number;
  name: string;
  imageUrl?: string | null;
  price: Price;
};

export type Court = {
  id: number;
  name: string;
  imageUrl?: string;
  description: string;
  type: TypeCourt;
  // price:
};

export type Price = {
  id: number;
  isPeak: boolean;
  price: number;
};

export type BookingDetail = {
  id: number;
  date: string;
  courtId: number;
  start: string;
  end: string;
  products: SelectProduct[];
};

export type SelectProduct = {
  productId: number
  name: string
  quantity: number
};

export type ProductDetail = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  seviceId: number;
};

export type Category = {
  id: number
  name: string
}
