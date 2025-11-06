import api from '@/lib/api';
import { OrderResourceFields, DynamicResourceSubmission } from '@/types/resource';

class ResourceService {
  /**
   * Get required resource fields for an order
   */
  async getOrderResourceFields(orderId: number): Promise<OrderResourceFields> {
    const response = await api.get<OrderResourceFields>(`/orders/${orderId}/resource-fields/`);
    return response.data;
  }

  /**
   * Submit dynamic resources for an order item
   */
  async submitDynamicResources(
    orderId: number, 
    orderItemId: number,
    submissions: DynamicResourceSubmission[]
  ): Promise<{
    success: boolean;
    message: string;
    submissions_count: number;
    order_status: string;
    all_resources_uploaded: boolean;
    pending_items: unknown[];
  }> {
    const formData = new FormData();
    
    // Add order_item_id as required by backend
    formData.append('order_item_id', orderItemId.toString());
    
    // Add each field as field_{field_id}
    submissions.forEach((submission) => {
      const fieldKey = `field_${submission.field_definition_id}`;
      
      if (submission.text_value !== undefined) {
        formData.append(fieldKey, submission.text_value);
      } else if (submission.number_value !== undefined) {
        formData.append(fieldKey, submission.number_value.toString());
      } else if (submission.file_value) {
        formData.append(fieldKey, submission.file_value);
      }
    });

    const response = await api.post(
      `/orders/${orderId}/submit-resources/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
}

const resourceService = new ResourceService();
export default resourceService;
