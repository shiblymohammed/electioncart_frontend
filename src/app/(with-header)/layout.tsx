import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartModal } from "@/components/CartModal";
import { PendingResourcesModal } from "@/components/PendingResourcesModal";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <CartProvider>
      <Navbar />
      {children}
      <Footer />
      <CartModal />
      <PendingResourcesModal />
    </CartProvider>
  );
}
