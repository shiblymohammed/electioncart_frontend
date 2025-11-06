export interface ResourceFieldDefinition {
  id: number;
  field_name: string;
  field_type: 'image' | 'text' | 'number' | 'document' | 'phone' | 'date';
  is_required: boolean;
  order: number;
  help_text: string;
  max_file_size_mb?: number;
  max_length?: number;
  min_value?: number;
  max_value?: number;
  allowed_extensions?: string[];
  submitted: boolean;
  submission_id?: number;
  value?: string | number | null;
}

export interface OrderItemWithFields {
  order_item_id: number;
  item_type: string;
  item_name: string;
  quantity: number;
  resources_uploaded: boolean;
  fields: ResourceFieldDefinition[];
}

export interface OrderResourceFields {
  order_id: number;
  order_number: string;
  status: string;
  items: OrderItemWithFields[];
}

export interface DynamicResourceSubmission {
  field_definition_id: number;
  text_value?: string;
  number_value?: number;
  file_value?: File;
}
