import { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/features/Chatbot";
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
        <AppProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Chatbot />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
