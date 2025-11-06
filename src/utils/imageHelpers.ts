import { ProductImage } from '@/types/product';

/**
 * Get the primary image URL from a product
 * Falls back to first image if no primary image is set
 */
export function getPrimaryImageUrl(
  primaryImage?: ProductImage,
  images?: ProductImage[]
): string | null {
  // First try primary image
  if (primaryImage?.image_url) {
    return primaryImage.image_url;
  }
  
  // Fall back to first image
  if (images && images.length > 0) {
    return images[0].image_url;
  }
  
  return null;
}

/**
 * Get the primary thumbnail URL from a product
 * Falls back to first thumbnail if no primary image is set
 */
export function getPrimaryThumbnailUrl(
  primaryImage?: ProductImage,
  images?: ProductImage[]
): string | null {
  // First try primary image thumbnail
  if (primaryImage?.thumbnail_url) {
    return primaryImage.thumbnail_url;
  }
  
  // Fall back to first image thumbnail
  if (images && images.length > 0) {
    return images[0].thumbnail_url;
  }
  
  return null;
}

/**
 * Get alt text for an image
 * Falls back to product name if no alt text
 */
export function getImageAltText(
  primaryImage?: ProductImage,
  images?: ProductImage[],
  fallbackName?: string
): string {
  // Try primary image alt text
  if (primaryImage?.alt_text) {
    return primaryImage.alt_text;
  }
  
  // Try first image alt text
  if (images && images.length > 0 && images[0].alt_text) {
    return images[0].alt_text;
  }
  
  // Fall back to product name
  return fallbackName || 'Product image';
}
