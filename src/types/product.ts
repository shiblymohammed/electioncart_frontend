export interface PackageItem {
  id: number;
  name: string;
  quantity: number;
}

export interface ProductImage {
  id: number;
  image: string;
  image_url: string;
  thumbnail: string;
  thumbnail_url: string;
  is_primary: boolean;
  order: number;
  alt_text: string;
  uploaded_at?: string;
}

export interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  items: PackageItem[];
  features?: string[];
  deliverables?: string[];
  is_active: boolean;
  is_popular?: boolean;
  popular_order?: number;
  created_at: string;
  images?: ProductImage[];
  primary_image?: ProductImage;
}

export interface Campaign {
  id: number;
  name: string;
  price: number;
  unit: string;
  description: string;
  features?: string[];
  deliverables?: string[];
  is_active: boolean;
  is_popular?: boolean;
  popular_order?: number;
  created_at: string;
  images?: ProductImage[];
  primary_image?: ProductImage;
}

export type Product = Package | Campaign;

export function isPackage(product: Product): product is Package {
  return 'items' in product;
}

export function isCampaign(product: Product): product is Campaign {
  return 'unit' in product;
}
