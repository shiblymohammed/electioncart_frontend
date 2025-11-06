export interface OrderItem {
  id: number;
  item_type: 'package' | 'campaign';
  item_details: {
    id: number;
    name: string;
    price: number;
    [key: string]: unknown;
  };
  quantity: number;
  price: number;
  resources_uploaded: boolean;
}

export interface PaymentHistory {
  id: number;
  status: 'pending' | 'success' | 'failed';
  payment_method: string;
  transaction_id: string;
  amount: number;
  currency: string;
  payment_date: string;
  invoice_number: string;
  invoice_generated_at?: string;
}

export interface Order {
  id: number;
  order_number: string;
  user: number;
  total_amount: number;
  status: 'pending_payment' | 'pending_resources' | 'ready_for_processing' | 'assigned' | 'in_progress' | 'completed';
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  payment_completed_at?: string;
  assigned_to?: number;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  payment_history?: PaymentHistory;
}

export interface CreateOrderResponse {
  order: Order;
  razorpay_order_id: string;
  razorpay_key_id: string;
  amount: number;
}

export interface PaymentVerificationRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  order: Order;
}
