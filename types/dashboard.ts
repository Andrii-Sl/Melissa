export interface Profile {

  full_name?:string;

  first_name?:string;

  last_name?:string;

  phone?:string;

  email?:string;

  delivery_address?:string;

  billing_address?:string;
}

export interface GarageCar {

  id:number;

  car:string;

  car_name?:string;

  vin:string;
}

export interface RequestItem {

  id:number;

  car:string;

  vin:string;

  part_name:string;

  quantity:number;

  created_at?:string;
}

export interface OfferItem {

  id:number;

  brand:string;

  article:string;

  price:number;

  delivery_days:number;

  product_image?:string;

  description?:string;
}

export interface OrderItem {

  id:number;

  part_name:string;

  article:string;

  status:string;

  created_at:string;

  product_image?:string;

  offer_price:number;

  delivery_address?:string;

  payment_method?:string;

  track_number?:string;
}