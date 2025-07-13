# EduCommerce AI - Sàn Giáo Dục Thương Mại Điện Tử

Nền tảng giáo dục thương mại điện tử hiện đại tích hợp trí tuệ nhân tạo, giúp người dùng tìm kiếm và khám phá các khóa học phù hợp một cách thông minh và hiệu quả.

## 🎯 Mô tả dự án

Dự án này được phát triển theo yêu cầu kiểm tra Front-end, xây dựng giao diện cho sàn giáo dục thương mại điện tử với tính năng AI gợi ý sản phẩm thông minh. Người dùng có thể tìm kiếm, lọc, yêu thích các khóa học và nhận gợi ý từ AI dựa trên hành vi và sở thích cá nhân.

## 🚀 Tính năng chính

### ✅ Yêu cầu bắt buộc
- ✅ **Hiển thị danh sách sản phẩm**: Giao diện hiện đại với thông tin đầy đủ (tên, giá, ảnh, mô tả ngắn)
- ✅ **Tìm kiếm và lọc**: Thanh tìm kiếm và bộ lọc theo giá, danh mục, mức độ
- ✅ **Gợi ý thông minh AI**: Nút "Gợi ý sản phẩm phù hợp" gọi API `/api/suggestions?userId=xxx`
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
- **Icons**: Lucide React (v0.468.0+)
- **UI Components**: Headless UI React
- **HTTP Client**: Axios
- **State Management**: React Context + useReducer
- **Build Tool**: Next.js
- **Package Manager**: npm

## 🔧 Mock API

Dự án sử dụng mock API với 2 endpoint chính:

### 1. API Products
```typescript
// URL: /api/products
export const fetchProducts = async (): Promise<Product[]>
```

### 2. API Suggestions (Theo yêu cầu đề bài)
```typescript
// URL: /api/suggestions?userId=xxx
export const fetchSuggestions = async (userId: string): Promise<{
  products: Product[];
  reasons: string[];
  confidence: number;
}>
```

### 3. Các API khác
- `fetchProductById(id: string)`: Lấy chi tiết sản phẩm
- `searchProducts(query: string)`: Tìm kiếm sản phẩm

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
│   │   ├── AIRecommendations.tsx  # Gợi ý AI
│   │   ├── Chatbot.tsx            # Chatbot AI
│   │   └── HeroSection.tsx        # Hero section
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
├── data/              # Mock data và API
│   └── mockData.ts
└── types/             # Type definitions
    └── index.ts
```

## 🤖 Tính năng AI

### 1. Gợi ý thông minh
- **Nút "Gợi ý sản phẩm phù hợp"**: Gọi API `/api/suggestions?userId=xxx`
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
const handleGetSuggestions = async () => {
  // Mock API call với delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
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
- **Bấm "Gợi ý sản phẩm phù hợp"** để nhận gợi ý AI

### 2. Gợi ý AI
- Bấm nút "Gợi ý sản phẩm phù hợp" trong section AI
- Hệ thống sẽ gọi API `/api/suggestions?userId=xxx`
- Hiển thị sản phẩm gợi ý với lý do và độ tin cậy

### 3. Chi tiết khóa học
- Click "Xem chi tiết" để mở modal
- Thông tin đầy đủ về khóa học
- Thêm vào yêu thích

### 4. Yêu thích
- Quản lý danh sách khóa học yêu thích
- Xem tổng giá trị và tiết kiệm

### 5. Lịch sử
- Xem các khóa học đã xem
- Tìm kiếm trong lịch sử
- Sắp xếp theo thời gian

### 6. Chatbot AI
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
4. Test API suggestions với nút "Gợi ý sản phẩm phù hợp"
5. Kiểm tra chatbot responses

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Demo

**Live Demo**: [Vercel/Netlify URL]

### Test Cases
- Truy cập trang chủ
- Bấm "Gợi ý sản phẩm phù hợp" để test API suggestions
- Tìm kiếm và lọc sản phẩm
- Thêm/xóa yêu thích
- Xem chi tiết sản phẩm
- Chat với AI bot

## 📄 License

MIT License - Chi tiết xem file LICENSE

## 👨‍💻 Tác giả

Được phát triển như một bài kiểm tra Front-end về sàn giáo dục thương mại điện tử tích hợp AI.

---

**Lưu ý**: Đây là ứng dụng demo sử dụng mock data và logic AI được mô phỏng. Trong thực tế, cần tích hợp với backend APIs, database thật và các mô hình AI thực tế. 