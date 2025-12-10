// src/app/models/orders.ts
export interface OrderItem {
  title: string;
  quantity: number;
  price: number;
  sku: string;
  variant_id: string;
}
export interface OrderCustomer {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
}
export interface Order {
  id: number;
  order_number: string;
  total_price: number;
  tags: string;
  financial_status: string;
  created_at: string;
  created_at_formatted: string;
  customer: OrderCustomer | null;
  total_items: number;
  items: OrderItem[];
}
