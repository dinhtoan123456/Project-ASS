<template>
  <div>
    <!-- Enhanced Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-lg sticky-top">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold text-primary fs-3 d-flex align-items-center">
          <i class="fas fa-microchip me-2 text-info"></i>
          <span class="gradient-text">TechVerse</span>
        </router-link>
        
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto ms-lg-4">
            <li class="nav-item">
              <router-link to="/posts" class="nav-link fw-medium px-3 nav-hover">Bài viết</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/videos" class="nav-link fw-medium px-3 nav-hover">Video</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link fw-medium px-3 nav-hover">Giới thiệu</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/events" class="nav-link fw-medium px-3 nav-hover">Sự kiện</router-link>
            </li>
          </ul>

          <!-- Enhanced Account dropdown -->
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle btn btn-gradient rounded-pill px-4 text-white" 
                 role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user-circle me-2"></i>Tài khoản
              </a>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow-xl rounded-3">
                <template v-if="currentUser">
                  <li class="px-4 py-3 bg-gradient-light rounded-top">
                    <div class="d-flex align-items-center">
                      <div class="avatar-circle me-3">
                        <i class="fas fa-user text-white"></i>
                      </div>
                      <div>
                        <span class="fw-bold text-primary d-block">{{ currentUser.name }}</span>
                        <small class="text-muted">{{ currentUser.email }}</small>
                      </div>
                    </div>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <router-link to="/profile" class="dropdown-item py-3 rounded">
                      <i class="fas fa-user me-3 text-primary"></i>Trang cá nhân
                    </router-link>
                  </li>
                  <li>
                    <a class="dropdown-item py-3 text-danger rounded" href="#" @click.prevent="handleLogout">
                      <i class="fas fa-sign-out-alt me-3"></i>Đăng xuất
                    </a>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <router-link to="/login" class="dropdown-item py-3 rounded">
                      <i class="fas fa-sign-in-alt me-3 text-primary"></i>Đăng nhập
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/register" class="dropdown-item py-3 rounded">
                      <i class="fas fa-user-plus me-3 text-success"></i>Đăng ký
                    </router-link>
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Enhanced Hero Banner -->
    <section class="hero-banner text-white position-relative overflow-hidden">
      <div class="hero-gradient-overlay"></div>
      <div class="hero-particles"></div>
      <div class="container position-relative z-index-3">
        <div class="row align-items-center min-vh-75">
          <div class="col-lg-8 mx-auto text-center">
            <div class="hero-content animate-fade-in-up">
              <h1 class="display-3 fw-bold mb-4 hero-title">
                Chào mừng đến với
                <span class="text-gradient d-block">Blog Công Nghệ</span>
              </h1>
              <p class="lead fs-4 mb-5 opacity-90 mx-auto" style="max-width: 600px;">
                Nơi chia sẻ kiến thức, xu hướng và kỹ năng về công nghệ thông tin dành cho mọi người.
              </p>
              <div class="d-flex flex-column flex-sm-row gap-4 justify-content-center mb-5">
                <router-link to="/posts" class="btn btn-light btn-lg rounded-pill px-5 py-3 btn-hover-effect">
                  <i class="fas fa-book-open me-2"></i>Khám phá bài viết
                </router-link>
                <router-link to="/videos" class="btn btn-outline-light btn-lg rounded-pill px-5 py-3 btn-hover-effect">
                  <i class="fas fa-play me-2"></i>Xem video
                </router-link>
              </div>
              
              <!-- Stats Section -->
              <div class="row g-4 mt-4">
                <div class="col-md-4">
                  <div class="stat-item">
                    <h3 class="fw-bold mb-0">500+</h3>
                    <p class="mb-0 opacity-80">Bài viết</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="stat-item">
                    <h3 class="fw-bold mb-0">1000+</h3>
                    <p class="mb-0 opacity-80">Thành viên</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="stat-item">
                    <h3 class="fw-bold mb-0">50+</h3>
                    <p class="mb-0 opacity-80">Video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Main Content -->
    <main class="py-5 bg-light">
      <div class="container">
        <div class="row g-5">
          <!-- Posts Section -->
          <div class="col-lg-8">
            <div class="section-header d-flex align-items-center justify-content-between mb-5">
              <div>
                <h2 class="h3 fw-bold text-dark mb-2 d-flex align-items-center">
                  <div class="icon-circle bg-primary me-3">
                    <i class="fas fa-newspaper text-white"></i>
                  </div>
                  Bài viết mới nhất
                </h2>
                <p class="text-muted mb-0">Cập nhật những kiến thức mới nhất về công nghệ thông tin</p>
              </div>
              <router-link to="/posts" class="btn btn-outline-primary rounded-pill px-4">
                Xem tất cả <i class="fas fa-arrow-right ms-1"></i>
              </router-link>
            </div>

            <div class="row g-4">
              <div class="col-md-6" v-for="(post, index) in posts" :key="index">
                <PostCard :post="post" />
              </div>
            </div>

            <!-- Loading skeleton -->
            <div v-if="isLoading" class="row g-4">
              <div class="col-md-6" v-for="i in 4" :key="i">
                <div class="card border-0 shadow-sm h-100">
                  <div class="skeleton skeleton-img"></div>
                  <div class="card-body p-4">
                    <div class="skeleton skeleton-title mb-3"></div>
                    <div class="skeleton skeleton-text mb-2"></div>
                    <div class="skeleton skeleton-text mb-4" style="width: 80%;"></div>
                    <div class="d-flex justify-content-between">
                      <div class="skeleton skeleton-btn"></div>
                      <div class="skeleton skeleton-time"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Sidebar -->
          <div class="col-lg-4">
            <!-- Categories Card -->
            <div class="card border-0 shadow-lg mb-5 card-hover">
              <div class="card-header bg-gradient-primary text-white border-0 py-4">
                <h5 class="mb-0 fw-bold d-flex align-items-center">
                  <i class="fas fa-tags me-3"></i>Danh mục bài viết
                </h5>
              </div>
              <div class="card-body p-0">
                <div class="list-group list-group-flush">
                  <a 
                    v-for="(cat, index) in categories" 
                    :key="index"
                    href="#" 
                    class="list-group-item list-group-item-action border-0 py-4 px-4 category-item d-flex align-items-center"
                  >
                    <div class="category-icon me-3">
                      <i class="fas fa-folder text-primary"></i>
                    </div>
                    <div class="flex-grow-1">
                      <span class="fw-medium">{{ cat.name }}</span>
                      <small class="text-muted d-block">{{ cat.count }} bài viết</small>
                    </div>
                    <i class="fas fa-chevron-right text-primary"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Featured Posts Card -->
            <div class="card border-0 shadow-lg mb-5 card-hover">
              <div class="card-header bg-gradient-secondary text-white border-0 py-4">
                <h5 class="mb-0 fw-bold d-flex align-items-center">
                  <i class="fas fa-star me-3"></i>Bài viết nổi bật
                </h5>
              </div>
              <div class="card-body p-0">
                <div class="list-group list-group-flush">
                  <a 
                    v-for="(post, i) in featuredPosts" 
                    :key="i"
                    href="#" 
                    class="list-group-item list-group-item-action border-0 py-4 px-4 featured-item"
                  >
                    <div class="d-flex align-items-start">
                      <div class="featured-number me-3">
                        <span class="badge bg-primary rounded-circle">{{ i + 1 }}</span>
                      </div>
                      <div class="flex-grow-1">
                        <h6 class="fw-medium mb-1 line-clamp-2">{{ post.title }}</h6>
                        <small class="text-muted">
                          <i class="fas fa-clock me-1"></i>{{ post.readTime }} phút đọc
                        </small>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- Enhanced Newsletter Signup -->
            <div class="card border-0 shadow-lg newsletter-card">
              <div class="card-body p-5 text-center position-relative">
                <div class="newsletter-bg"></div>
                <div class="position-relative z-index-2">
                  <div class="newsletter-icon mb-4">
                    <i class="fas fa-envelope-open text-white fs-1"></i>
                  </div>
                  <h5 class="fw-bold mb-3 text-white">Đăng ký nhận tin</h5>
                  <p class="text-white-75 mb-4">
                    Nhận những bài viết mới nhất và tips hữu ích về công nghệ
                  </p>
                  <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                    <div class="input-group mb-3">
                      <input 
                        type="email" 
                        class="form-control border-0 shadow-sm rounded-start-pill px-4" 
                        placeholder="Email của bạn"
                        v-model="email"
                        required
                      />
                      <button class="btn btn-light rounded-end-pill px-4" type="submit" :disabled="isSubscribing">
                        <i class="fas fa-paper-plane" v-if="!isSubscribing"></i>
                        <div class="spinner-border spinner-border-sm" v-else></div>
                      </button>
                    </div>
                  </form>
                  <small class="text-white-75">
                    <i class="fas fa-shield-alt me-1"></i>
                    Chúng tôi không spam. Hủy đăng ký bất cứ lúc nào.
                  </small>
                </div>
              </div>
            </div>

            <!-- Notification Toast -->
            <div v-if="showNotification" class="toast-notification">
              <div class="toast-content">
                <i class="fas fa-check-circle text-success me-2"></i>
                Đăng ký nhận tin thành công!
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Enhanced Footer -->
    <footer class="bg-dark text-white py-5 mt-5">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-4">
            <div class="footer-brand mb-4">
              <h5 class="fw-bold mb-3 d-flex align-items-center">
                <i class="fas fa-microchip me-2 text-info"></i>TechVerse
              </h5>
              <p class="text-white-75 mb-4">
                Cộng đồng Công nghệ thông tin hàng đầu Việt Nam, nơi chia sẻ kiến thức, xu hướng và kỹ năng về công nghệ thông tin dành cho mọi người.
              </p>
            </div>
            <div class="social-links d-flex gap-3">
              <a href="#" class="social-link">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          <div class="col-lg-2 col-md-3 col-6">
            <h6 class="fw-bold mb-4 text-white">Nội dung</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Bài viết</a></li>
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Video</a></li>
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Podcast</a></li>
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Khóa học</a></li>
            </ul>
          </div>
          
          <div class="col-lg-2 col-md-3 col-6">
            <h6 class="fw-bold mb-4 text-white">Về chúng tôi</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Giới thiệu</a></li>
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Liên hệ</a></li>
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Sự kiện</a></li>
              <li class="mb-3"><a href="#" class="text-white-75 text-decoration-none hover-underline">Tuyển dụng</a></li>
            </ul>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <h6 class="fw-bold mb-4 text-white">Liên hệ</h6>
            <div class="contact-info">
              <div class="contact-item d-flex align-items-center mb-3">
                <div class="contact-icon me-3">
                  <i class="fas fa-envelope"></i>
                </div>
                <span class="text-white-75">info@techverse.vn</span>
              </div>
              <div class="contact-item d-flex align-items-center mb-3">
                <div class="contact-icon me-3">
                  <i class="fas fa-phone"></i>
                </div>
                <span class="text-white-75">+84 123 456 789</span>
              </div>
              <div class="contact-item d-flex align-items-start">
                <div class="contact-icon me-3 mt-1">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <span class="text-white-75">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>
        
        <hr class="my-5 border-secondary">
        
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="text-white-75 mb-0">© 2025 TechVerse. Tất cả quyền được bảo lưu.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="footer-links d-inline-flex gap-4">
              <a href="#" class="text-white-75 text-decoration-none hover-underline">Chính sách bảo mật</a>
              <a href="#" class="text-white-75 text-decoration-none hover-underline">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import PostCard from './PostCard.vue'

export default {
  name: 'Main',
  components: {
    PostCard
  },
  data() {
    return {
      currentUser: null,
      email: '',
      showNotification: false,
      isLoading: true,
      isSubscribing: false,
      posts: [],
      featuredPosts: [],
      categories: [
        { name: 'Lập trình cơ bản', count: 25 },
        { name: 'Thiết bị công nghệ', count: 18 },
        { name: 'Bảo mật & An ninh mạng', count: 15 },
        { name: 'Công nghệ & đời sống', count: 22 },
        { name: 'Video hướng dẫn kỹ thuật', count: 12 }
      ]
    }
  },
  mounted() {
    this.loadCurrentUser()
    this.loadPosts()
  },
  methods: {
    loadCurrentUser() {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      if (user) {
        this.currentUser = user
      }
    },
    loadPosts() {
      // Simulate loading
      setTimeout(() => {
        this.posts = [
          {
            id: 1,
            title: 'Top 10 ngôn ngữ lập trình phổ biến năm 2025',
            excerpt: 'Khám phá những ngôn ngữ lập trình đang được ưa chuộng nhất trong giới lập trình viên và tại sao chúng lại quan trọng...',
            image: '/images/code.jpg',
            author: 'Tech Insights',
            time: '2 giờ trước',
            readTime: 5
          },
          {
            id: 2,
            title: 'AI và ảnh hưởng tới ngành công nghiệp phần mềm',
            excerpt: 'Trí tuệ nhân tạo đang thay đổi cách viết mã, kiểm thử và vận hành phần mềm như thế nào? Cùng tìm hiểu!',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
            author: 'Tech Insights',
            time: '1 ngày trước',
            readTime: 7
          },
          {
            id: 3,
            title: 'Hướng dẫn chọn laptop lập trình phù hợp',
            excerpt: 'Bạn là sinh viên CNTT hay lập trình viên chuyên nghiệp? Đây là hướng dẫn chọn máy tính phù hợp nhất với bạn...',
            image: '/images/laptop.jpg',
            author: 'Tech Insights',
            time: '3 ngày trước',
            readTime: 6
          },
          {
            id: 4,
            title: 'Tương lai phát triển Web: Web3, AI và XR',
            excerpt: 'Cùng dự đoán tương lai của phát triển web khi các công nghệ mới như Web3, AI và thực tế mở rộng lên ngôi...',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
            author: 'Tech Insights',
            time: '1 tuần trước',
            readTime: 8
          }
        ]
        
        this.featuredPosts = [
          { title: '5 Công cụ AI giúp lập trình nhanh hơn', readTime: 4 },
          { title: 'Hướng dẫn thiết lập môi trường Dev chuyên nghiệp', readTime: 6 },
          { title: 'Lập trình cho người mới bắt đầu: Cần chuẩn bị gì?', readTime: 5 },
          { title: 'Những sai lầm phổ biến của lập trình viên mới', readTime: 7 }
        ]
        
        this.isLoading = false
      }, 1000)
    },
    handleLogout() {
      localStorage.removeItem('currentUser')
      this.currentUser = null
      this.$router.push('/login')
    },
    async subscribeNewsletter() {
      if (!this.email.trim()) return
      
      this.isSubscribing = true
      
      // Simulate API call
      setTimeout(() => {
        const subscribers = JSON.parse(localStorage.getItem('subscribers')) || []
        if (!subscribers.includes(this.email)) {
          subscribers.push(this.email)
          localStorage.setItem('subscribers', JSON.stringify(subscribers))
        }
        
        this.email = ''
        this.isSubscribing = false
        this.showNotification = true
        
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }, 1000)
    }
  }
}
</script>

<style scoped>
/* Enhanced Styling */
.gradient-text {
  background: linear-gradient(45deg, #28a745, #20c997);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-gradient {
  background: linear-gradient(45deg, #28a745, #20c997);
  border: none;
  transition: all 0.3s ease;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
}

.nav-hover {
  position: relative;
  transition: all 0.3s ease;
}

.nav-hover::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(45deg, #28a745, #20c997);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
}

.nav-hover:hover::after {
  width: 100%;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #28a745, #20c997);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  border-radius: 15px;
  padding: 10px;
  min-width: 280px;
}

.bg-gradient-light {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

/* Hero Section */
.hero-banner {
  background: linear-gradient(135deg, #28a745 0%, #20c997 50%, #17a2b8 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.hero-particles::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent);
  background-size: 200px 200px;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-200px, -200px); }
}

.min-vh-75 {
  min-height: 75vh;
}

.z-index-3 {
  z-index: 3;
}

.hero-content {
  animation-delay: 0.2s;
}

.hero-title {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  line-height: 1.2;
}

.text-gradient {
  background: linear-gradient(45deg, #fff, #f8f9fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-hover-effect {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-hover-effect:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.btn-outline-light:hover {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-color: white;
}

.stat-item {
  padding: 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255,255,255,0.15);
}

/* Main Content */
.section-header {
  margin-bottom: 2rem;
}

.icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #28a745, #20c997);
}

.bg-gradient-secondary {
  background: linear-gradient(135deg, #6c757d, #495057);
}

.category-item {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.category-item:hover {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef) !important;
  border-left-color: #28a745;
  transform: translateX(5px);
}

.category-icon {
  width: 40px;
  height: 40px;
  background: rgba(40, 167, 69, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-item {
  transition: all 0.3s ease;
}

.featured-item:hover {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef) !important;
  transform: translateX(5px);
}

.featured-number .badge {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Newsletter */
.newsletter-card {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  overflow: hidden;
  position: relative;
}

.newsletter-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.newsletter-icon {
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(10px);
}

.text-white-75 {
  color: rgba(255,255,255,0.75) !important;
}

.newsletter-form .form-control {
  height: 50px;
  border: none;
  background: rgba(255,255,255,0.9);
}

.newsletter-form .btn {
  height: 50px;
  min-width: 60px;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1050;
  animation: slideInUp 0.3s ease;
}

.toast-content {
  background: #28a745;
  color: white;
  padding: 15px 25px;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
  font-weight: 500;
}

/* Loading Skeletons */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

.skeleton-img {
  height: 200px;
  border-radius: 12px 12px 0 0;
}

.skeleton-title {
  height: 24px;
}

.skeleton-text {
  height: 16px;
}

.skeleton-btn {
  height: 36px;
  width: 100px;
  border-radius: 18px;
}

.skeleton-time {
  height: 16px;
  width: 80px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Footer */
.footer-brand h5 {
  font-size: 1.5rem;
}

.social-links {
  gap: 15px;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-3px);
  color: white;
}

.footer-links a:hover,
.hover-underline:hover {
  color: white !important;
  text-decoration: underline !important;
}

.contact-icon {
  width: 35px;
  height: 35px;
  background: rgba(40, 167, 69, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #28a745;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .stat-item {
    margin-bottom: 1rem;
  }
  
  .toast-notification {
    bottom: 20px;
    right: 20px;
    left: 20px;
  }
  
  .dropdown-menu {
    min-width: 250px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .newsletter-form .form-control,
  .newsletter-form .btn {
    height: 45px;
  }
}
</style>