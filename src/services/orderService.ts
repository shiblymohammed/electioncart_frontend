import api from '@/lib/api';
import { Order, CreateOrderResponse, PaymentVerificationRequest, PaymentVerificationResponse } from '@/types/order';

class OrderService {
  /**
   * Get all orders for the current user
   */
  async getMyOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>('/orders/my-orders/');
    return response.data;
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: number): Promise<Order> {
    const response = await api.get<Order>(`/orders/${id}/`);
    return response.data;
  }

  /**
   * Create a new order from cart
   */
  async createOrder(): Promise<CreateOrderResponse> {
    const response = await api.post<CreateOrderResponse>('/orders/create/');
    return response.data;
  }

  /**
   * Verify payment
   */
  async verifyPayment(orderId: number, data: PaymentVerificationRequest): Promise<PaymentVerificationResponse> {
    const response = await api.post<PaymentVerificationResponse>(`/orders/${orderId}/payment-success/`, data);
    return response.data;
  }
}

const orderService = new OrderService();
export default orderService;
