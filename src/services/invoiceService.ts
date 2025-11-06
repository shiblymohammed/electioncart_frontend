const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'election_cart_token';

export const downloadCustomerInvoice = async (orderId: number): Promise<void> => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/invoice/download/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to download invoice' }));
    throw new Error(error.error || 'Failed to download invoice');
  }
  
  // Get filename from Content-Disposition header
  const contentDisposition = response.headers.get('Content-Disposition');
  const filename = contentDisposition
    ? contentDisposition.split('filename=')[1].replace(/"/g, '')
    : `invoice-${orderId}.pdf`;
  
  // Download the PDF
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

const invoiceService = {
  downloadCustomerInvoice,
};

export default invoiceService;
