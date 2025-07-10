import React from 'react';
import { Search, Play, BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  const stats = [
    { icon: BookOpen, label: 'Khóa học', value: '10,000+' },
    { icon: Users, label: 'Học viên', value: '500K+' },
    { icon: Award, label: 'Chứng chỉ', value: '50K+' },
    { icon: TrendingUp, label: 'Tỷ lệ hoàn thành', value: '95%' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                Nền tảng học tập #1 Việt Nam
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Học tập thông minh với
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  AI hỗ trợ
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-primary-100 leading-relaxed">
                Khám phá hàng nghìn khóa học chất lượng cao với sự hỗ trợ của trí tuệ nhân tạo. 
                Tìm khóa học phù hợp, học tập hiệu quả và phát triển kỹ năng của bạn.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors group">
                <Search className="h-5 w-5 mr-2" />
                Khám phá ngay
                <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
                <Play className="h-5 w-5 mr-2" />
                Xem demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                  <div className="text-primary-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg transform rotate-[-5deg]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">React Development</div>
                    <div className="text-xs text-gray-500">15,234 học viên</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg transform rotate-[5deg]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">AI & Machine Learning</div>
                    <div className="text-xs text-gray-500">8,945 học viên</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-2xl transform rotate-3 scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 