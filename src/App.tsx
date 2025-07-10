import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";
import Chatbot from "./components/features/Chatbot";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
