"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { Navbar } from "@/components/Navbar";
import { ResourceUploadWarningModal } from "@/components/ResourceUploadWarningModal";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import resourceService from "@/services/resourceService";
import { OrderResourceFields, OrderItemWithFields, ResourceFieldDefinition, DynamicResourceSubmission } from "@/types/resource";

export default function ResourceUploadPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [orderData, setOrderData] = useState<OrderResourceFields | null>(null);
  const [formData, setFormData] = useState<Record<string, string | number | File>>({});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (params.id && isAuthenticated) {
      loadResourceFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, isAuthenticated]);

  const loadResourceFields = async () => {
    try {
      setLoading(true);
      const orderId = parseInt(params.id as string);
      const data = await resourceService.getOrderResourceFields(orderId);
      setOrderData(data);
      
      // Initialize form data with existing values
      const initialData: Record<string, string | number | File> = {};
      data.items.forEach((item) => {
        item.fields.forEach((field) => {
          const key = `${item.order_item_id}_${field.id}`;
          if (field.submitted && field.value) {
            initialData[key] = field.value;
          }
        });
      });
      setFormData(initialData);
    } catch (err) {
      console.error("Error loading resource fields:", err);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (itemId: number, fieldId: number, value: string | number) => {
    const key = `${itemId}_${fieldId}`;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (itemId: number, fieldId: number, file: File | null) => {
    const key = `${itemId}_${fieldId}`;
    if (file) {
      setFormData((prev) => ({ ...prev, [key]: file }));
    } else {
      setFormData((prev) => {
        const newData = { ...prev };
        delete newData[key];
        return newData;
      });
    }
  };

  const handleSubmit = async () => {
    if (!orderData) return;

    setUploading(true);
    try {
      // Submit resources for each order item separately
      for (const item of orderData.items) {
        const submissions: DynamicResourceSubmission[] = [];

        item.fields.forEach((field) => {
          const key = `${item.order_item_id}_${field.id}`;
          const value = formData[key];

          if (value !== undefined && value !== null && value !== "") {
            const submission: DynamicResourceSubmission = {
              field_definition_id: field.id,
            };

            if (field.field_type === "text" || field.field_type === "phone" || field.field_type === "date") {
              submission.text_value = value as string;
            } else if (field.field_type === "number") {
              submission.number_value = typeof value === 'string' ? parseInt(value) : value as number;
            } else if (field.field_type === "image" || field.field_type === "document") {
              if (value instanceof File) {
                submission.file_value = value;
              }
            }

            submissions.push(submission);
          }
        });

        // Only submit if there are submissions for this item
        if (submissions.length > 0) {
          await resourceService.submitDynamicResources(
            orderData.order_id,
            item.order_item_id,
            submissions
          );
        }
      }
      
      setHasUploaded(true);
      alert("Resources uploaded successfully!");
      router.push("/profile");
    } catch (err) {
      console.error("Upload error:", err);
      const error = err as { response?: { data?: { error?: string; errors?: Record<string, string> } } };
      const errorMessage = error.response?.data?.error || 
        (error.response?.data?.errors ? Object.values(error.response.data.errors).join(', ') : "Failed to upload resources. Please try again.");
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const renderField = (item: OrderItemWithFields, field: ResourceFieldDefinition) => {
    const key = `${item.order_item_id}_${field.id}`;
    const value = formData[key];

    switch (field.field_type) {
      case "text":
      case "phone":
        return (
          <input
            type={field.field_type === "phone" ? "tel" : "text"}
            value={typeof value === 'string' ? value : ""}
            onChange={(e) => handleInputChange(item.order_item_id, field.id, e.target.value)}
            maxLength={field.max_length}
            required={field.is_required}
            className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            placeholder={field.help_text || `Enter ${field.field_name}`}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={typeof value === 'number' ? value : typeof value === 'string' ? value : ""}
            onChange={(e) => handleInputChange(item.order_item_id, field.id, e.target.value)}
            min={field.min_value}
            max={field.max_value}
            required={field.is_required}
            className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            placeholder={field.help_text || `Enter ${field.field_name}`}
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={typeof value === 'string' ? value : ""}
            onChange={(e) => handleInputChange(item.order_item_id, field.id, e.target.value)}
            required={field.is_required}
            className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
          />
        );

      case "image":
      case "document":
        return (
          <div>
            <input
              type="file"
              onChange={(e) => handleFileChange(item.order_item_id, field.id, e.target.files?.[0] || null)}
              accept={field.allowed_extensions?.map((ext) => `.${ext}`).join(",")}
              required={field.is_required && !field.submitted}
              className="hidden"
              id={`file-${key}`}
            />
            <label
              htmlFor={`file-${key}`}
              className="flex items-center justify-center gap-3 w-full px-4 py-6 border-4 border-dashed border-brand-purple rounded-xl cursor-pointer hover:bg-brand-purple/10 transition-colors"
            >
              <Upload size={24} className="text-brand-purple" />
              <span className="font-bold">
                {value instanceof File
                  ? value.name
                  : field.submitted
                  ? "File uploaded ✓ (Click to replace)"
                  : `Upload ${field.field_name}`}
              </span>
            </label>
            {field.help_text && (
              <p className="text-sm text-gray-600 mt-2">{field.help_text}</p>
            )}
            {field.max_file_size_mb && (
              <p className="text-xs text-gray-500 mt-1">
                Max size: {field.max_file_size_mb}MB
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold text-red-600">{error || "Order not found"}</p>
        <button
          onClick={() => router.push("/profile")}
          className="button-cutout bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black px-8 py-4 text-xl"
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture bg-brand-gray">
      {/* Hero Section */}
      <div className="bg-texture bg-brand-purple text-white relative min-h-[30vh] py-20 px-4">
        <Navbar />
        <div className="max-w-6xl mx-auto pt-20">
          <SlideIn>
            <button
              onClick={() => {
                if (!hasUploaded) {
                  setShowWarningModal(true);
                } else {
                  router.push("/profile");
                }
              }}
              className="mb-6 text-brand-lime hover:text-white font-bold text-lg transition-colors"
            >
              ← Back to Profile
            </button>
          </SlideIn>
          <SlideIn>
            <Heading as="h1" className="text-5xl mb-4">
              Upload Required Resources
            </Heading>
          </SlideIn>
          <SlideIn>
            <p className="text-2xl opacity-90">
              Order #{orderData.order_number}
            </p>
          </SlideIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="space-y-8">
          {orderData.items.map((item) => (
            <SlideIn key={item.order_item_id}>
              <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-black">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Heading as="h2" className="text-3xl mb-2">
                      {item.item_name}
                    </Heading>
                    <p className="text-gray-600 capitalize">
                      {item.item_type} • Quantity: {item.quantity}
                    </p>
                  </div>
                  {item.resources_uploaded && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                      <CheckCircle size={20} />
                      <span className="font-bold">Completed</span>
                    </div>
                  )}
                </div>

                {item.fields.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No resources required for this item</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {item.fields.map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-bold mb-2">
                          {field.field_name}
                          {field.is_required && <span className="text-red-600 ml-1">*</span>}
                        </label>
                        {renderField(item, field)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SlideIn>
          ))}
        </div>

        {/* Submit Button */}
        <SlideIn>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black px-12 py-4 text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Submit All Resources"}
            </button>
          </div>
        </SlideIn>

        {/* Info Box */}
        <SlideIn>
          <div className="mt-8 bg-brand-lime/20 rounded-2xl p-6 border-4 border-black">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-brand-purple flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-lg mb-2">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Please fill in all required fields marked with *</li>
                  <li>Ensure files meet the size and format requirements</li>
                  <li>You can update your submissions anytime before processing</li>
                </ul>
              </div>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* Warning Modal */}
      <ResourceUploadWarningModal
        isOpen={showWarningModal}
        onClose={() => {
          setShowWarningModal(false);
          router.push("/profile");
        }}
        onProceed={() => setShowWarningModal(false)}
      />
    </div>
  );
}
