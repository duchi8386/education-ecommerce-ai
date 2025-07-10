import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { mockProducts } from '../../data/mockData';
import { ChatMessage } from '../../types';

const Chatbot: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: aiResponse.message,
        sender: 'ai',
        timestamp: new Date(),
        products: aiResponse.products,
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiMessage });
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): { message: string; products?: any[] } => {
    const input = userInput.toLowerCase();
    
    // Define keywords and their corresponding responses
    const responses = [
      {
        keywords: ['react', 'frontend', 'javascript', 'web development'],
        message: 'Tôi hiểu bạn quan tâm đến phát triển web với React! Đây là những khóa học phù hợp nhất mà tôi tìm được:',
        products: mockProducts.filter(p => 
          p.tags.some(tag => ['React', 'JavaScript', 'Frontend', 'Web Development'].includes(tag))
        ).slice(0, 2)
      },
      {
        keywords: ['python', 'machine learning', 'ai', 'data science'],
        message: 'Tuyệt vời! Python và AI đang rất hot hiện nay. Tôi đề xuất những khóa học này để bạn bắt đầu:',
        products: mockProducts.filter(p => 
          p.tags.some(tag => ['Python', 'Machine Learning', 'AI', 'Data Science'].includes(tag))
        ).slice(0, 2)
      },
      {
        keywords: ['english', 'tiếng anh', 'business', 'communication'],
        message: 'Tiếng Anh là kỹ năng rất quan trọng! Tôi có một số khóa học chất lượng để giúp bạn:',
        products: mockProducts.filter(p => 
          p.tags.some(tag => ['English', 'Business', 'Communication', 'Professional'].includes(tag))
        ).slice(0, 2)
      },
      {
        keywords: ['marketing', 'seo', 'digital marketing'],
        message: 'Marketing online là lĩnh vực đầy tiềm năng! Đây là những khóa học tôi khuyên dùng:',
        products: mockProducts.filter(p => 
          p.tags.some(tag => ['Marketing', 'SEO', 'Social Media', 'Analytics'].includes(tag))
        ).slice(0, 2)
      },
      {
        keywords: ['design', 'ui', 'ux', 'thiết kế'],
        message: 'UI/UX Design là ngành rất thú vị! Tôi tìm thấy những khóa học này dành cho bạn:',
        products: mockProducts.filter(p => 
          p.tags.some(tag => ['UI', 'UX', 'Design', 'Figma', 'User Experience'].includes(tag))
        ).slice(0, 2)
      }
    ];

    // Find matching response
    for (const response of responses) {
      if (response.keywords.some(keyword => input.includes(keyword))) {
        return response;
      }
    }

    // Generic responses
    const genericResponses = [
      {
        message: 'Chào bạn! Tôi là AI assistant của EduCommerce. Tôi có thể giúp bạn tìm kiếm khóa học phù hợp. Bạn quan tâm đến lĩnh vực nào?',
        products: mockProducts.slice(0, 3)
      },
      {
        message: 'Tôi hiểu bạn đang tìm kiếm khóa học. Đây là một số khóa học phổ biến mà tôi đề xuất:',
        products: mockProducts.sort((a, b) => b.students - a.students).slice(0, 3)
      },
      {
        message: 'Dựa trên phân tích, những khóa học này có thể phù hợp với bạn:',
        products: mockProducts.sort((a, b) => b.rating - a.rating).slice(0, 3)
      }
    ];

    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleProductClick = (product: any) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    dispatch({ type: 'SET_PRODUCT_MODAL_OPEN', payload: true });
  };

  const handleClose = () => {
    dispatch({ type: 'SET_CHAT_OPEN', payload: false });
  };

  const handleClearChat = () => {
    dispatch({ type: 'CLEAR_CHAT_MESSAGES' });
  };

  if (!state.isChatOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Tư vấn</h3>
            <p className="text-xs opacity-90">Luôn sẵn sàng hỗ trợ</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Xóa cuộc trò chuyện"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.chatMessages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Chào bạn! Tôi có thể giúp gì cho bạn?</p>
            <p className="text-xs mt-1">Ví dụ: "Tôi muốn học React" hoặc "Khóa học AI nào tốt?"</p>
          </div>
        )}
        
        {state.chatMessages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              }`}>
                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              
              {/* Message Content */}
              <div className={`rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.message}</p>
                
                {/* Products */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="bg-white rounded-lg p-3 border cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-600">{product.instructor}</p>
                            <p className="text-sm font-semibold text-primary-600">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(product.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập tin nhắn..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 