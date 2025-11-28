// src/app/models/orders.ts
export interface OrderItem {
  title: string;
  quantity: number;
  price: number;
  sku: string;
  variant_id: string;
}

export interface Order {
  id: number;
  order_number: string;
  total_price: number;
  tags: string;
  financial_status: string;
  
  // Fecha original en ISO (la que viene de Shopify)
  created_at: string;  

  // Fecha formateada desde el backend (dd/MM/yyyy HH:mm)
  created_at_formatted: string;
  
  customer: string;
  total_items: number;
  items: OrderItem[];
}
