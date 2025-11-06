"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Heading } from "@/components/Heading";
import { Order } from "@/types/order";
import orderService from "@/services/orderService";
import invoiceService from "@/services/invoiceService";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState("");
  const [downloadingInvoice, setDownloadingInvoice] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (activeTab === "orders") {
      loadOrders();
    }
  }, [activeTab]);

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const ordersData = await orderService.getMyOrders();
      setOrders(ordersData);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Error loading orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDownloadInvoice = async (orderId: number) => {
    try {
      setDownloadingInvoice(orderId);
      await invoiceService.downloadCustomerInvoice(orderId);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to download invoice";
      alert(errorMessage);
      console.error("Error downloading invoice:", err);
    } finally {
      setDownloadingInvoice(null);
    }
  };

  const canDownloadInvoice = (order: Order) => {
    // Show invoice for orders that have been paid (not pending_payment)
    const isPaid =
      order.status !== "pending_payment" &&
      order.status !== "pending_resources";
    const hasSuccessfulPayment =
      order.payment_history && order.payment_history.status === "success";

    console.log("Checking invoice for order:", order.id, {
      hasPaymentHistory: !!order.payment_history,
      paymentStatus: order.payment_history?.status,
      orderStatus: order.status,
      isPaid,
      hasSuccessfulPayment,
      canDownload: hasSuccessfulPayment || isPaid,
    });

    // Show button if payment was successful OR order is past payment stage
    return hasSuccessfulPayment || isPaid;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-brand-lime text-black";
      case "in_progress":
        return "bg-brand-blue text-white";
      case "assigned":
        return "bg-brand-orange text-white";
      default:
        return "bg-brand-purple text-white";
    }
  };

  const getStatusLabel = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     maximumFractionDigits: 0,
  //   }).format(amount);
  // };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-texture bg-brand-gray py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-texture bg-brand-purple text-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-brand-orange flex items-center justify-center border-4 border-black">
                <span className="text-4xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <Heading as="h1" className="text-3xl mb-2">
                  {user.username}
                </Heading>
                <p className="text-lg opacity-90">{user.phone_number}</p>
                <span className="inline-block mt-2 px-4 py-1 bg-brand-lime text-black font-bold rounded-full text-sm">
                  {user.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="button-cutout bg-gradient-to-b from-red-500 to-red-700 from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-white px-6 py-3 text-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b-4 border-black">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-4 px-6 font-bold text-lg transition-colors ${
                activeTab === "profile"
                  ? "bg-brand-orange text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              Profile Info
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 py-4 px-6 font-bold text-lg transition-colors ${
                activeTab === "orders"
                  ? "bg-brand-orange text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              My Orders
              {orders.length > 0 && (
                <span className="ml-2 bg-brand-lime text-black py-1 px-3 rounded-full text-sm">
                  {orders.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "profile" ? (
              <div className="space-y-6">
                <Heading as="h2" className="text-2xl mb-6">
                  Account Details
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-black font-bold">
                      {user.username}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-black font-bold">
                      {user.phone_number || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-black font-bold">
                      {user.role}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      User ID
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-black font-bold">
                      #{user.id}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Heading as="h2" className="text-2xl mb-6">
                  My Orders
                </Heading>
                {loadingOrders ? (
                  <p className="text-center py-8">Loading orders...</p>
                ) : error ? (
                  <p className="text-center py-8 text-red-600">{error}</p>
                ) : orders.length === 0 ? (
                  <p className="text-center py-8 text-gray-600">
                    No orders yet. Start shopping!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border-4 border-black rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-xl">
                              Order #{order.order_number}
                            </h3>
                            <p className="text-gray-600">
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full font-bold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-2xl font-bold text-brand-purple">
                              ₹{order.total_amount.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            {order.status === "pending_resources" && (
                              <button
                                onClick={() =>
                                  router.push(`/orders/${order.id}/upload`)
                                }
                                className="button-cutout bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black px-6 py-2 text-sm"
                              >
                                Upload Resources
                              </button>
                            )}
                            {canDownloadInvoice(order) && (
                              <button
                                onClick={() => handleDownloadInvoice(order.id)}
                                disabled={downloadingInvoice === order.id}
                                className="button-cutout bg-gradient-to-b from-brand-blue to-brand-purple from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-white px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              >
                                {downloadingInvoice === order.id ? (
                                  <>
                                    <svg
                                      className="animate-spin h-4 w-4"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                      />
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      />
                                    </svg>
                                    Downloading...
                                  </>
                                ) : (
                                  <>📄 Download Invoice</>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
