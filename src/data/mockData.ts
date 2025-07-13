import { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Complete React Developer Course 2024",
    price: 799000,
    originalPrice: 1299000,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    shortDescription: "Học React từ cơ bản đến nâng cao với các dự án thực tế",
    longDescription:
      "Khóa học React hoàn chỉnh từ cơ bản đến nâng cao, bao gồm hooks, context, redux, testing và deployment. Phù hợp cho người mới bắt đầu và developer có kinh nghiệm muốn nâng cao kỹ năng.",
    category: "Lập trình",
    instructor: "Nguyễn Văn An",
    duration: "45 giờ",
    level: "Intermediate",
    rating: 4.8,
    reviews: 1234,
    students: 15678,
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    name: "Machine Learning với Python",
    price: 1499000,
    originalPrice: 2299000,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop",
    shortDescription: "Khóa học AI & Machine Learning thực hành với Python",
    longDescription:
      "Khóa học toàn diện về Machine Learning sử dụng Python, scikit-learn, TensorFlow và Keras. Từ algorithms cơ bản đến deep learning và neural networks.",
    category: "Trí tuệ nhân tạo",
    instructor: "Dr. Trần Thị Bình",
    duration: "60 giờ",
    level: "Advanced",
    rating: 4.9,
    reviews: 987,
    students: 8945,
    tags: ["Python", "Machine Learning", "AI", "Data Science"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    name: "English Communication for Business",
    price: 599000,
    originalPrice: 999000,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    shortDescription: "Tiếng Anh giao tiếp trong môi trường kinh doanh",
    longDescription:
      "Phát triển kỹ năng tiếng Anh giao tiếp trong môi trường doanh nghiệp. Bao gồm presentation, negotiation, meeting và email writing.",
    category: "Ngoại ngữ",
    instructor: "Sarah Johnson",
    duration: "30 giờ",
    level: "Intermediate",
    rating: 4.7,
    reviews: 2156,
    students: 23456,
    tags: ["English", "Business", "Communication", "Professional"],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
  {
    id: "4",
    name: "Digital Marketing Mastery 2024",
    price: 899000,
    originalPrice: 1599000,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    shortDescription: "Chiến lược marketing online hiệu quả",
    longDescription:
      "Khóa học marketing online toàn diện, bao gồm SEO, SEM, Social Media Marketing, Content Marketing và Analytics. Phù hợp cho marketer và business owner.",
    category: "Marketing",
    instructor: "Lê Minh Tuấn",
    duration: "40 giờ",
    level: "Beginner",
    rating: 4.6,
    reviews: 1876,
    students: 19234,
    tags: ["Marketing", "SEO", "Social Media", "Analytics"],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-22",
  },
  {
    id: "5",
    name: "UI/UX Design Complete Guide",
    price: 1199000,
    originalPrice: 1899000,
    image:
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=250&fit=crop",
    shortDescription: "Thiết kế giao diện và trải nghiệm người dùng",
    longDescription:
      "Khóa học thiết kế UI/UX hoàn chỉnh từ research, wireframe, prototype đến implementation. Sử dụng Figma, Adobe XD và các công cụ thiết kế hiện đại.",
    category: "Thiết kế",
    instructor: "Phạm Thị Lan",
    duration: "50 giờ",
    level: "Intermediate",
    rating: 4.8,
    reviews: 1543,
    students: 12678,
    tags: ["UI", "UX", "Design", "Figma", "User Experience"],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-19",
  },
  {
    id: "6",
    name: "Node.js Backend Development",
    price: 999000,
    originalPrice: 1699000,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    shortDescription: "Phát triển backend với Node.js và Express",
    longDescription:
      "Khóa học phát triển backend hoàn chỉnh với Node.js, Express, MongoDB và các công nghệ hiện đại. Bao gồm API design, authentication, testing và deployment.",
    category: "Lập trình",
    instructor: "Hoàng Văn Đức",
    duration: "55 giờ",
    level: "Intermediate",
    rating: 4.7,
    reviews: 1098,
    students: 9876,
    tags: ["Node.js", "Express", "MongoDB", "Backend", "API"],
    createdAt: "2024-01-03",
    updatedAt: "2024-01-17",
  },
  {
    id: "7",
    name: "Flutter Mobile Development",
    price: 1299000,
    originalPrice: 1999000,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    shortDescription: "Phát triển ứng dụng mobile đa nền tảng với Flutter",
    longDescription:
      "Khóa học Flutter từ cơ bản đến nâng cao, xây dựng ứng dụng mobile chuyên nghiệp cho iOS và Android. Bao gồm state management, animations, và deployment.",
    category: "Lập trình",
    instructor: "Nguyễn Thị Mai",
    duration: "48 giờ",
    level: "Intermediate",
    rating: 4.6,
    reviews: 892,
    students: 7654,
    tags: ["Flutter", "Mobile", "iOS", "Android", "Dart"],
    createdAt: "2024-01-06",
    updatedAt: "2024-01-16",
  },
  {
    id: "8",
    name: "Data Science với R",
    price: 1199000,
    originalPrice: 1799000,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    shortDescription: "Phân tích dữ liệu và thống kê với R",
    longDescription:
      "Khóa học Data Science toàn diện với R, từ xử lý dữ liệu, thống kê, visualization đến machine learning. Phù hợp cho analyst và researcher.",
    category: "Trí tuệ nhân tạo",
    instructor: "Prof. Lê Văn Khoa",
    duration: "52 giờ",
    level: "Advanced",
    rating: 4.7,
    reviews: 634,
    students: 5432,
    tags: ["R", "Data Science", "Statistics", "Analysis", "Visualization"],
    createdAt: "2024-01-09",
    updatedAt: "2024-01-21",
  },
  {
    id: "9",
    name: "IELTS Speaking Master Class",
    price: 799000,
    originalPrice: 1199000,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    shortDescription: "Luyện thi IELTS Speaking đạt band 7.0+",
    longDescription:
      "Khóa học luyện thi IELTS Speaking chuyên sâu, với phương pháp học độc quyền và mock tests thường xuyên. Cam kết đạt band 7.0 trở lên.",
    category: "Ngoại ngữ",
    instructor: "James Wilson",
    duration: "25 giờ",
    level: "Intermediate",
    rating: 4.8,
    reviews: 1567,
    students: 18765,
    tags: ["IELTS", "Speaking", "English", "Test Prep", "Fluency"],
    createdAt: "2024-01-11",
    updatedAt: "2024-01-20",
  },
  {
    id: "10",
    name: "Photoshop cho Photographer",
    price: 699000,
    originalPrice: 1099000,
    image:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=400&h=250&fit=crop",
    shortDescription: "Chỉnh sửa ảnh chuyên nghiệp với Photoshop",
    longDescription:
      "Khóa học Photoshop dành riêng cho photographer, từ cơ bản đến nâng cao. Bao gồm color grading, retouching, và các kỹ thuật chỉnh sửa chuyên nghiệp.",
    category: "Thiết kế",
    instructor: "Trần Minh Đức",
    duration: "35 giờ",
    level: "Beginner",
    rating: 4.5,
    reviews: 1234,
    students: 12345,
    tags: ["Photoshop", "Photography", "Retouching", "Color Grading", "Design"],
    createdAt: "2024-01-04",
    updatedAt: "2024-01-18",
  },
  {
    id: "11",
    name: "YouTube Content Creator Bootcamp",
    price: 899000,
    originalPrice: 1499000,
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    shortDescription: "Tạo và phát triển kênh YouTube thành công",
    longDescription:
      "Khóa học toàn diện về YouTube, từ lên ý tưởng content, quay dựng, SEO YouTube đến monetization. Chia sẻ kinh nghiệm từ các creator thành công.",
    category: "Marketing",
    instructor: "Nguyễn Thành Long",
    duration: "42 giờ",
    level: "Beginner",
    rating: 4.4,
    reviews: 987,
    students: 8765,
    tags: ["YouTube", "Content Creation", "Video Marketing", "SEO", "Creator"],
    createdAt: "2024-01-13",
    updatedAt: "2024-01-19",
  },
  {
    id: "12",
    name: "Blockchain Development Fundamentals",
    price: 1599000,
    originalPrice: 2499000,
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    shortDescription: "Phát triển ứng dụng Blockchain và Smart Contract",
    longDescription:
      "Khóa học Blockchain development từ cơ bản đến nâng cao, bao gồm Ethereum, Solidity, Web3.js và deployment. Xây dựng DApp hoàn chỉnh.",
    category: "Lập trình",
    instructor: "Phạm Văn Hưng",
    duration: "65 giờ",
    level: "Advanced",
    rating: 4.9,
    reviews: 456,
    students: 3210,
    tags: ["Blockchain", "Ethereum", "Solidity", "Smart Contract", "Web3"],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-22",
  },
];

// Mock API cho suggestions - theo yêu cầu đề bài
export const mockSuggestions: { [key: string]: string[] } = {
  user1: ["1", "2", "5"], // React, ML, UI/UX
  user2: ["3", "4", "9"], // English, Marketing, IELTS
  user3: ["6", "7", "12"], // Node.js, Flutter, Blockchain
  default: ["1", "4", "5", "8"], // Mặc định cho user mới
};

export const categories = [
  "Tất cả",
  "Lập trình",
  "Trí tuệ nhân tạo",
  "Ngoại ngữ",
  "Marketing",
  "Thiết kế",
];

export const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 500K", min: 0, max: 500000 },
  { label: "500K - 1 triệu", min: 500000, max: 1000000 },
  { label: "1 - 2 triệu", min: 1000000, max: 2000000 },
  { label: "Trên 2 triệu", min: 2000000, max: Infinity },
];

// Mock API Functions theo yêu cầu đề bài

/**
 * Mock API: Lấy tất cả sản phẩm
 * URL: /api/products
 */
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
};

/**
 * Mock API: Lấy gợi ý sản phẩm cho user
 * URL: /api/suggestions?userId=xxx
 */
export const fetchSuggestions = async (
  userId: string = "default"
): Promise<{
  products: Product[];
  reasons: string[];
  confidence: number;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Lấy danh sách ID gợi ý cho user
  const suggestionIds = mockSuggestions[userId] || mockSuggestions["default"];

  // Lấy products tương ứng
  const suggestedProducts = mockProducts.filter((product) =>
    suggestionIds.includes(product.id)
  );

  // Tạo lý do gợi ý dựa trên AI logic
  const reasons = suggestedProducts.map((product) => {
    const reasonTypes = [
      `Phù hợp với sở thích ${product.category} của bạn`,
      `${product.students.toLocaleString()} học viên đã tin tưởng`,
      `Rating ${product.rating}/5 từ ${product.reviews} đánh giá`,
      `Giảm giá ${Math.round(
        (((product.originalPrice || product.price) - product.price) /
          (product.originalPrice || product.price)) *
          100
      )}%`,
      `Được nhiều người cùng sở thích lựa chọn`,
    ];
    return reasonTypes[Math.floor(Math.random() * reasonTypes.length)];
  });

  return {
    products: suggestedProducts,
    reasons,
    confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
  };
};

/**
 * Mock API: Lấy chi tiết sản phẩm
 * URL: /api/products/:id
 */
export const fetchProductById = async (id: string): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.find((product) => product.id === id) || null;
};

/**
 * Mock API: Tìm kiếm sản phẩm
 * URL: /api/products/search?q=keyword
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      product.instructor.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
  );
};
