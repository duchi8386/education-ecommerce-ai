# EduCommerce AI - Sàn Giáo Dục Thương Mại Điện Tử

Nền tảng giáo dục thương mại điện tử hiện đại tích hợp trí tuệ nhân tạo, giúp người dùng tìm kiếm và khám phá các khóa học phù hợp một cách thông minh và hiệu quả.

## 🚀 Tính năng chính

### ✅ Yêu cầu bắt buộc
- ✅ **Hiển thị danh sách sản phẩm**: Giao diện hiện đại với thông tin đầy đủ (tên, giá, ảnh, mô tả ngắn)
- ✅ **Tìm kiếm và lọc**: Thanh tìm kiếm và bộ lọc theo giá, danh mục, mức độ
- ✅ **Gợi ý thông minh AI**: API mô phỏng với các thuật toán gợi ý dựa trên hành vi người dùng
- ✅ **Modal chi tiết sản phẩm**: Hiển thị thông tin chi tiết với giao diện đẹp mắt
- ✅ **Chức năng yêu thích**: Lưu trữ và quản lý danh sách sản phẩm yêu thích
- ✅ **Responsive design**: Tối ưu cho mọi thiết bị (desktop, tablet, mobile)

### 🎁 Tính năng nâng cao (Điểm cộng)
- ✅ **Lịch sử xem**: Theo dõi và quản lý sản phẩm đã xem
- ✅ **Loading skeleton**: Trải nghiệm người dùng mượt mà khi tải dữ liệu
- ✅ **Xử lý lỗi**: Thông báo khi API thất bại
- ✅ **Chatbot AI tư vấn**: Tư vấn sản phẩm thông minh bằng AI
- ✅ **Gợi ý nâng cao**: Nhiều loại gợi ý (cá nhân hóa, thịnh hành, tương tự)

## 🛠 Công nghệ sử dụng

- **Framework**: Next.js 15 với TypeScript
- **Routing**: Next.js App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Headless UI React
- **HTTP Client**: Axios
- **State Management**: React Context + useReducer
- **Build Tool**: Next.js
- **Package Manager**: npm

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0

### Hướng dẫn cài đặt

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd education-ecommerce-ai
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng ở môi trường development**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại `http://localhost:3000`

4. **Build cho production**
   ```bash
   npm run build
   ```

5. **Chạy production server**
   ```bash
   npm run start
   ```

## 🏗 Cấu trúc dự án

```
app/                      # Next.js App Router
├── favorites/           # Trang yêu thích
│   └── page.tsx
├── history/            # Trang lịch sử
│   └── page.tsx
├── layout.tsx          # Layout chính
├── page.tsx            # Trang chủ
└── globals.css         # Global styles

src/
├── components/         # Components tái sử dụng
│   ├── features/       # Components tính năng chính
│   │   ├── AIRecommendations.tsx
│   │   ├── Chatbot.tsx
│   │   └── HeroSection.tsx
│   ├── layout/         # Components layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/             # Components UI cơ bản
│       ├── ProductCard.tsx
│       ├── ProductModal.tsx
│       ├── SearchBar.tsx
│       ├── FilterSidebar.tsx
│       └── SkeletonCard.tsx
├── context/            # React Context
│   └── AppContext.tsx
├── data/              # Mock data
│   └── mockData.ts
└── types/             # Type definitions
    └── index.ts
```

## 🎨 Thiết kế UI/UX

### Màu sắc chủ đạo
- **Primary**: Blue (`#3b82f6`)
- **Secondary**: Gray (`#64748b`)
- **Accent**: Purple-Blue gradient

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: Adaptive font sizes

### Animations
- Smooth transitions (200ms)
- Hover effects
- Loading animations
- Skeleton loaders

## 🤖 Tính năng AI

### 1. Gợi ý thông minh
- **Cá nhân hóa**: Dựa trên lịch sử xem và sở thích
- **Thịnh hành**: Khóa học phổ biến nhất
- **Tương tự**: Dựa trên khóa học đã xem

### 2. Chatbot tư vấn
- Hiểu ngữ cảnh tiếng Việt
- Gợi ý sản phẩm phù hợp
- Giao diện chat thân thiện

### 3. Mock API Logic
```typescript
// AI Recommendations trong components/features/AIRecommendations.tsx
const handleGetRecommendations = async () => {
  // Mock API call với delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Logic gợi ý dựa trên:
  // - Lịch sử xem (personalized)
  // - Số lượng học viên (trending)  
  // - Danh mục tương tự (similar)
};

// Chatbot Response trong components/features/Chatbot.tsx
const generateAIResponse = (userInput: string) => {
  // Phân tích keywords và trả về response phù hợp
  // Kèm theo danh sách sản phẩm được gợi ý
};
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Tối ưu hóa
- Mobile-first approach
- Touch-friendly interactions
- Optimized images
- Fast loading

## 🔧 Scripts có sẵn

```bash
# Development
npm run dev          # Chạy dev server

# Build & Production
npm run build        # Build cho production
npm run start        # Chạy production server

# Code quality  
npm run lint         # Kiểm tra lỗi ESLint
npm run type-check   # Kiểm tra TypeScript
```

## 📚 Hướng dẫn sử dụng

### 1. Trang chủ
- Xem danh sách khóa học
- Tìm kiếm theo từ khóa
- Lọc theo danh mục, giá, mức độ
- Xem gợi ý AI

### 2. Chi tiết khóa học
- Click "Xem chi tiết" để mở modal
- Thông tin đầy đủ về khóa học
- Thêm vào yêu thích
- Chia sẻ khóa học

### 3. Yêu thích
- Quản lý danh sách khóa học yêu thích
- Xem tổng giá trị và tiết kiệm
- Thêm vào giỏ hàng

### 4. Lịch sử
- Xem các khóa học đã xem
- Tìm kiếm trong lịch sử
- Sắp xếp theo thời gian

### 5. Chatbot AI
- Click icon chat để mở
- Hỏi về khóa học quan tâm
- Nhận gợi ý cá nhân hóa

## 🎯 Điểm nổi bật

### UX/UI Excellence
- **Modern Design**: Giao diện hiện đại, professional
- **Smooth Animations**: Chuyển động mượt mà, tự nhiên
- **Intuitive Navigation**: Điều hướng trực quan, dễ sử dụng
- **Responsive**: Hoạt động tốt trên mọi thiết bị

### Performance
- **Fast Loading**: Tối ưu hóa tốc độ tải
- **Lazy Loading**: Tải hình ảnh khi cần
- **Efficient State**: Quản lý state hiệu quả
- **Modern Build**: Next.js với tối ưu hóa build tự động

### AI Integration
- **Smart Recommendations**: Thuật toán gợi ý thông minh
- **Natural Language**: Chatbot hiểu tiếng Việt tự nhiên
- **Contextual Suggestions**: Gợi ý theo ngữ cảnh
- **Learning System**: Học từ hành vi người dùng

## 🧪 Testing

### Manual Testing
1. Kiểm tra responsive trên các thiết bị
2. Test tất cả tính năng tìm kiếm/lọc
3. Verify localStorage hoạt động
4. Test AI recommendations
5. Kiểm tra chatbot responses

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - Chi tiết xem file LICENSE

## 👨‍💻 Tác giả

Được phát triển như một bài kiểm tra Front-end về sàn giáo dục thương mại điện tử tích hợp AI.

---

**Lưu ý**: Đây là ứng dụng demo sử dụng mock data và logic AI được mô phỏng. Trong thực tế, cần tích hợp với backend APIs, database thật và các mô hình AI thực tế. 