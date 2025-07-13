import { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import { ToastProvider } from "@/context/ToastContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/features/Chatbot";
import ToastContainer from "@/components/ui/ToastContainer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Education E-commerce AI",
  description: "Nền tảng thương mại điện tử giáo dục với AI",
  keywords: "education, e-commerce, AI, learning, courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <ToastProvider>
          <AppProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Chatbot />
            </div>
            <ToastContainer />
          </AppProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
