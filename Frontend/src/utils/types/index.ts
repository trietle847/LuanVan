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
  address: string;
  password: string
};

export type TypeCourt = {
  id: number;
  name: string;
  imageUrl?: string | null;
  price: Price;
};

export type Court = {
  id: number;
  typeCourtId: number
  name: string;
  description: string;
  type: TypeCourt;
  images: Image[];
};

export type Image = {
  id: number
  courtId: number
  name: string
  createAt: string
  url: string
}

export type Price = {
  id: number;
  startTime: string
  endTime: string
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

export type Booking = {
  id: number
  
}