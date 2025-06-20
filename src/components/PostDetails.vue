<template>
  <div class="post-detail-page bg-light min-vh-100">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="mb-4">
            <button @click="$router.go(-1)" class="btn btn-outline-primary rounded-pill px-4">
              <i class="fas fa-arrow-left me-2"></i>Quay lại
            </button>
          </div>

          <article class="card border-0 shadow-lg">
            <div class="position-relative overflow-hidden">
              <img :src="post.image" class="card-img-top" :alt="post.title" style="height: 400px; object-fit: cover;">
              <div class="position-absolute top-0 start-0 p-4">
                <span class="badge bg-primary fs-6 rounded-pill">
                  <i class="fas fa-clock me-2"></i>{{ post.readTime }} phút đọc
                </span>
              </div>
              <div class="position-absolute top-0 end-0 p-4">
                <span class="badge bg-success fs-6 rounded-pill">{{ post.category }}</span>
              </div>
            </div>
            
            <div class="card-body p-5">
              <header class="mb-5">
                <h1 class="display-5 fw-bold mb-4 text-dark">{{ post.title }}</h1>
                
                <div class="post-meta d-flex flex-wrap align-items-center gap-4 mb-4 pb-4 border-bottom">
                  <div class="author-info d-flex align-items-center">
                    <div class="author-avatar me-3">
                      <i class="fas fa-user-circle text-primary fs-2"></i>
                    </div>
                    <div>
                      <h6 class="mb-0 fw-bold">{{ post.author }}</h6>
                      <small class="text-muted">Tác giả</small>
                    </div>
                  </div>
                  
                  <div class="post-date">
                    <i class="fas fa-calendar-alt text-primary me-2"></i>
                    <span>{{ post.publishDate }}</span>
                  </div>
                  
                  <div class="post-views">
                    <i class="fas fa-eye text-primary me-2"></i>
                    <span>{{ post.views }} lượt xem</span>
                  </div>
                </div>
                
                <div class="tags-section mb-4">
                  <span 
                    v-for="tag in post.tags" 
                    :key="tag"
                    class="badge bg-light text-dark me-2 mb-2 px-3 py-2 fs-6 tag-badge"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </header>

              <div class="post-content">
                <div class="lead mb-4 text-muted">{{ post.excerpt }}</div>
                
                <div class="content-text" v-html="post.content || getPostContent()"></div>
              </div>

              <div class="post-actions d-flex align-items-center justify-content-between mt-5 pt-5 border-top">
                <div class="action-buttons d-flex gap-3">
                  <button 
                    @click="toggleLike"
                    class="btn btn-outline-primary rounded-pill px-4"
                    :class="{ 'btn-primary text-white': isLiked }"
                  >
                    <i class="fas fa-heart me-2" :class="{ 'text-white': isLiked, 'text-danger': isLiked }"></i>
                    {{ isLiked ? 'Đã thích' : 'Thích bài viết' }}
                  </button>
                  
                  <button 
                    @click="toggleBookmark"
                    class="btn btn-outline-warning rounded-pill px-4"
                    :class="{ 'btn-warning text-white': isBookmarked }"
                  >
                    <i class="fas fa-bookmark me-2"></i>
                    {{ isBookmarked ? 'Đã lưu' : 'Lưu bài viết' }}
                  </button>
                </div>
                
                <div class="share-buttons">
                  <div class="dropdown">
                    <button class="btn btn-outline-secondary rounded-pill px-4" data-bs-toggle="dropdown">
                      <i class="fas fa-share-alt me-2"></i>Chia sẻ
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#" @click.prevent="sharePost('facebook')">
                          <i class="fab fa-facebook text-primary me-2"></i>Facebook
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" @click.prevent="sharePost('twitter')">
                          <i class="fab fa-twitter text-info me-2"></i>Twitter
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" @click.prevent="copyLink">
                          <i class="fas fa-link text-secondary me-2"></i>Sao chép liên kết
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div class="card border-0 shadow-lg mt-5">
            <div class="card-header bg-primary text-white py-4">
              <h5 class="mb-0 fw-bold">
                <i class="fas fa-comments me-2"></i>Bình luận ({{ post.comments.length }})
              </h5>
            </div>
            <div class="card-body p-4">
              <form @submit.prevent="addComment" class="mb-5">
                <div class="mb-3">
                  <label class="form-label fw-medium">Để lại bình luận của bạn</label>
                  <textarea 
                    v-model="newComment"
                    class="form-control" 
                    rows="4" 
                    placeholder="Viết bình luận..."
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-primary rounded-pill px-4">
                  <i class="fas fa-paper-plane me-2"></i>Gửi bình luận
                </button>
              </form>

              <div v-if="post.comments.length > 0" class="comments-list">
                <div v-for="comment in post.comments" :key="comment.id" class="comment-item border-bottom pb-4 mb-4">
                  <div class="d-flex">
                    <div class="comment-avatar me-3">
                      <i class="fas fa-user-circle text-primary fs-2"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div class="comment-header d-flex align-items-center mb-2">
                        <h6 class="mb-0 fw-bold me-3">{{ comment.author }}</h6>
                        <small class="text-muted">{{ comment.time }}</small>
                      </div>
                      <p class="comment-text mb-0">{{ comment.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-5 text-muted">
                <i class="fas fa-comment-slash fa-3x mb-3"></i>
                <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetail',
  data() {
    return {
      post: {},
      isLiked: false,
      isBookmarked: false,
      newComment: ''
    }
  },
  mounted() {
    this.loadPost()
    this.checkLikeStatus()
    this.checkBookmarkStatus()
  },
  methods: {
    loadPost() {
      const postId = this.$route.params.id
      const allPosts = [
        {
          id: 1,
          title: 'Học Vue.js 3 từ cơ bản đến nâng cao',
          excerpt: 'Hướng dẫn chi tiết về cách sử dụng Vue.js 3 với Composition API.',
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Nguyễn Văn A',
          publishDate: '15/06/2025',
          readTime: 8,
          category: 'Frontend',
          tags: ['vuejs', 'javascript', 'frontend'],
          views: 1250,
          comments: [
            { id: 1, author: 'Trần Thị B', text: 'Bài viết rất hay!', time: '2 giờ trước' },
            { id: 2, author: 'Lê Văn C', text: 'Cảm ơn tác giả!', time: '1 ngày trước' }
          ]
        },
        {
          id: 2,
          title: 'Tìm hiểu về Node.js và Express',
          excerpt: 'Giới thiệu cách xây dựng API với Node.js và Express.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Trần Thị B',
          publishDate: '14/06/2025',
          readTime: 10,
          category: 'Backend',
          tags: ['nodejs', 'express', 'backend'],
          views: 980,
          comments: [
            { id: 1, author: 'Nguyễn Văn A', text: 'Rất hữu ích!', time: '3 giờ trước' },
            { id: 2, author: 'Phạm Văn D', text: 'Mong chờ phần tiếp theo!', time: '2 ngày trước' }
          ]
        },
        {
          id: 3,
          title: 'Giới thiệu Docker cho người mới bắt đầu',
          excerpt: 'Học cách sử dụng Docker để container hóa ứng dụng.',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Lê Văn C',
          publishDate: '13/06/2025',
          readTime: 12,
          category: 'DevOps',
          tags: ['docker', 'devops', 'container'],
          views: 750,
          comments: [
            { id: 1, author: 'Trần Thị B', text: 'Docker thật tuyệt!', time: '1 giờ trước' },
            { id: 2, author: 'Nguyễn Văn A', text: 'Cần thêm ví dụ thực tế.', time: '1 ngày trước' }
          ]
        },
        {
          id: 4,
          title: 'React Hooks: Cách sử dụng hiệu quả',
          excerpt: 'Tìm hiểu cách sử dụng React Hooks để quản lý state và side effects.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Phạm Văn D',
          publishDate: '12/06/2025',
          readTime: 7,
          category: 'Frontend',
          tags: ['react', 'hooks', 'frontend'],
          views: 1100,
          comments: [
            { id: 1, author: 'Lê Văn C', text: 'Rất dễ hiểu!', time: '4 giờ trước' },
            { id: 2, author: 'Trần Thị B', text: 'Cảm ơn tác giả!', time: '2 ngày trước' }
          ]
        },
        {
          id: 5,
          title: 'Học Python cơ bản trong 30 ngày',
          excerpt: 'Hành trình học Python từ con số 0 đến thành thạo.',
          image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Nguyễn Thị E',
          publishDate: '11/06/2025',
          readTime: 15,
          category: 'Programming',
          tags: ['python', 'programming', 'beginner'],
          views: 2000,
          comments: [
            { id: 1, author: 'Phạm Văn D', text: 'Bài viết rất chi tiết!', time: '5 giờ trước' },
            { id: 2, author: 'Lê Văn C', text: 'Mong có thêm bài nâng cao!', time: '3 ngày trước' }
          ]
        },
        {
          id: 6,
          title: 'Tối ưu hóa hiệu suất website',
          excerpt: 'Các kỹ thuật tối ưu hóa tốc độ tải trang web.',
          image: 'https://images.unsplash.com/photo-1551288049-bcc17c7c2644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Trần Văn F',
          publishDate: '10/06/2025',
          readTime: 9,
          category: 'Frontend',
          tags: ['optimization', 'web', 'frontend'],
          views: 850,
          comments: [
            { id: 1, author: 'Nguyễn Thị E', text: 'Rất hữu ích cho dự án của tôi!', time: '2 giờ trước' },
            { id: 2, author: 'Phạm Văn D', text: 'Cần thêm ví dụ cụ thể.', time: '1 ngày trước' }
          ]
        },
        {
          id: 7,
          title: 'Giới thiệu Kubernetes cho người mới',
          excerpt: 'Học cách triển khai ứng dụng với Kubernetes.',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Lê Thị G',
          publishDate: '09/06/2025',
          readTime: 11,
          category: 'DevOps',
          tags: ['kubernetes', 'devops', 'cloud'],
          views: 600,
          comments: [
            { id: 1, author: 'Trần Văn F', text: 'Bài viết rất rõ ràng!', time: '3 giờ trước' },
            { id: 2, author: 'Nguyễn Thị E', text: 'Cảm ơn tác giả!', time: '2 ngày trước' }
          ]
        },
        {
          id: 8,
          title: 'Học SQL từ cơ bản đến nâng cao',
          excerpt: 'Hướng dẫn sử dụng SQL để quản lý cơ sở dữ liệu.',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Phạm Văn H',
          publishDate: '08/06/2025',
          readTime: 13,
          category: 'Database',
          tags: ['sql', 'database', 'query'],
          views: 1400,
          comments: [
            { id: 1, author: 'Lê Thị G', text: 'Rất hữu ích!', time: '1 giờ trước' },
            { id: 2, author: 'Trần Văn F', text: 'Cần thêm bài về NoSQL.', time: '1 ngày trước' }
          ]
        },
        {
          id: 9,
          title: 'Bảo mật ứng dụng web',
          excerpt: 'Các phương pháp bảo vệ ứng dụng web khỏi tấn công.',
          image: 'https://images.unsplash.com/photo-1554260570-9147fd3e6894?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Nguyễn Văn I',
          publishDate: '07/06/2025',
          readTime: 10,
          category: 'Security',
          tags: ['security', 'web', 'cybersecurity'],
          views: 950,
          comments: [
            { id: 1, author: 'Phạm Văn H', text: 'Bài viết rất hay!', time: '4 giờ trước' },
            { id: 2, author: 'Lê Thị G', text: 'Cảm ơn tác giả!', time: '2 ngày trước' }
          ]
        },
        {
          id: 10,
          title: 'Thiết kế UI/UX cho người mới bắt đầu',
          excerpt: 'Học cách thiết kế giao diện người dùng thân thiện.',
          image: 'https://images.unsplash.com/photo-1551288049-bcc17c7c2644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Trần Thị K',
          publishDate: '06/06/2025',
          readTime: 8,
          category: 'UI/UX',
          tags: ['uiux', 'design', 'interface'],
          views: 1200,
          comments: [
            { id: 1, author: 'Nguyễn Văn I', text: 'Rất thú vị!', time: '2 giờ trước' },
            { id: 2, author: 'Phạm Văn H', text: 'Cần thêm ví dụ thực tế.', time: '1 ngày trước' }
          ]
        },
        {
          id: 11,
          title: 'Học TypeScript trong 7 ngày',
          excerpt: 'Hướng dẫn sử dụng TypeScript để phát triển ứng dụng.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Lê Văn L',
          publishDate: '05/06/2025',
          readTime: 9,
          category: 'Frontend',
          tags: ['typescript', 'javascript', 'frontend'],
          views: 870,
          comments: [
            { id: 1, author: 'Trần Thị K', text: 'Rất dễ hiểu!', time: '3 giờ trước' },
            { id: 2, author: 'Nguyễn Văn I', text: 'Cảm ơn tác giả!', time: '2 ngày trước' }
          ]
        },
        {
          id: 12,
          title: 'Giới thiệu GraphQL',
          excerpt: 'Học cách sử dụng GraphQL để xây dựng API.',
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Phạm Thị M',
          publishDate: '04/06/2025',
          readTime: 11,
          category: 'Backend',
          tags: ['graphql', 'api', 'backend'],
          views: 650,
          comments: [
            { id: 1, author: 'Lê Văn L', text: 'Bài viết rất hay!', time: '1 giờ trước' },
            { id: 2, author: 'Trần Thị K', text: 'Cần thêm ví dụ thực tế.', time: '1 ngày trước' }
          ]
        },
        {
          id: 13,
          title: 'Học AWS cơ bản',
          excerpt: 'Hướng dẫn sử dụng Amazon Web Services cho người mới.',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Nguyễn Văn N',
          publishDate: '03/06/2025',
          readTime: 12,
          category: 'Cloud',
          tags: ['aws', 'cloud', 'devops'],
          views: 780,
          comments: [
            { id: 1, author: 'Phạm Thị M', text: 'Rất hữu ích!', time: '4 giờ trước' },
            { id: 2, author: 'Lê Văn L', text: 'Cảm ơn tác giả!', time: '2 ngày trước' }
          ]
        },
        {
          id: 14,
          title: 'Học Flutter để phát triển ứng dụng di động',
          excerpt: 'Hướng dẫn sử dụng Flutter để xây dựng ứng dụng cross-platform.',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Trần Văn O',
          publishDate: '02/06/2025',
          readTime: 10,
          category: 'Mobile',
          tags: ['flutter', 'mobile', 'crossplatform'],
          views: 920,
          comments: [
            { id: 1, author: 'Nguyen Van N', text: 'Flutter thật tuyệt!', time: '2 giờ trước' },
            { id: 2, author: 'Phạm Thị M', text: 'Cần thêm bài nâng cao.', time: '1 ngày trước' }
          ]
        },
        {
          id: 15,
          title: 'Tìm hiểu về Machine Learning',
          excerpt: 'Giới thiệu cơ bản về Machine Learning và ứng dụng.',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Lê Thị P',
          publishDate: '01/06/2025',
          readTime: 14,
          category: 'AI/ML',
          tags: ['machinelearning', 'ai', 'data'],
          views: 1100,
          comments: [
            { id: 1, author: 'Trần Văn O', text: 'Rất thú vị!', time: '3 giờ trước' },
            { id: 2, author: 'Nguyen Van N', text: 'Cảm ơn tác giả!', time: '2 ngày trước' }
          ]
        },
        {
          id: 16,
          title: 'Học MongoDB cơ bản',
          excerpt: 'Hướng dẫn sử dụng MongoDB để quản lý cơ sở dữ liệu NoSQL.',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Phạm Văn Q',
          publishDate: '31/05/2025',
          readTime: 9,
          category: 'Database',
          tags: ['mongodb', 'nosql', 'database'],
          views: 700,
          comments: [
            { id: 1, author: 'Lê Thị P', text: 'Rất dễ hiểu!', time: '1 giờ trước' },
            { id: 2, author: 'Trần Văn O', text: 'Cần thêm ví dụ thực tế.', time: '1 ngày trước' }
          ]
        },
        {
          id: 17,
          title: 'Giới thiệu CI/CD với Jenkins',
          excerpt: 'Học cách thiết lập pipeline CI/CD với Jenkins.',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Nguyen Thi R',
          publishDate: '30/05/2025',
          readTime: 11,
          category: 'DevOps',
          tags: ['cicd', 'jenkins', 'devops'],
          views: 820,
          comments: [
            { id: 1, author: 'Phạm Văn Q', text: 'Rất hữu ích!', time: '4 giờ trước' },
            { id: 2, author: 'Lê Thị P', text: 'Cảm ơn tác giả!', time: '2 ngày trước' }
          ]
        },
        {
          id: 18,
          title: 'Học Angular cơ bản',
          excerpt: 'Hướng dẫn sử dụng Angular để xây dựng ứng dụng web.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
          author: 'Trần Văn S',
          publishDate: '29/05/2025',
          readTime: 10,
          category: 'Frontend',
          tags: ['angular', 'javascript', 'frontend'],
          views: 950,
          comments: [
            { id: 1, author: 'Nguyen Thi R', text: 'Rất hay!', time: '2 giờ trước' },
            { id: 2, author: 'Phạm Văn Q', text: 'Cần thêm bài nâng cao.', time: '1 ngày trước' }
          ]
        }
      ]

      const userPosts = JSON.parse(localStorage.getItem('userPosts')) || []
      const post = [...allPosts, ...userPosts].find(p => p.id == postId)
      if (post) {
        this.post = post
        this.post.views++
      } else {
        this.$router.push('/posts')
      }
    },
    getPostContent() {
      return `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h2>Chương 1: Giới thiệu</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h2>Chương 2: Nội dung chính</h2>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <ul>
          <li>Điểm nổi bật 1</li>
          <li>Điểm nổi bật 2</li>
          <li>Điểm nổi bật 3</li>
        </ul>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      `
    },
    toggleLike() {
      this.isLiked = !this.isLiked
      let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || []
      if (this.isLiked) {
        likedPosts.push(this.post.id)
      } else {
        likedPosts = likedPosts.filter(id => id != this.post.id)
      }
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
    },
    checkLikeStatus() {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || []
      this.isLiked = likedPosts.includes(this.post.id)
    },
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked
      let bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts')) || []
      if (this.isBookmarked) {
        bookmarkedPosts.push(this.post.id)
      } else {
        bookmarkedPosts = bookmarkedPosts.filter(id => id != this.post.id)
      }
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts))
    },
    checkBookmarkStatus() {
      const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts')) || []
      this.isBookmarked = bookmarkedPosts.includes(this.post.id)
    },
    addComment() {
      if (this.newComment.trim()) {
        this.post.comments.push({
          id: this.post.comments.length + 1,
          author: 'Người dùng ẩn danh',
          text: this.newComment,
          time: 'Vừa xong'
        })
        this.newComment = ''
        this.showToast('Bình luận đã được gửi!')
      }
    },
    sharePost(platform) {
      const url = window.location.href
      const title = encodeURIComponent(this.post.title)
      let shareUrl
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
          break
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
          break
      }
      window.open(shareUrl, '_blank')
    },
    copyLink() {
      navigator.clipboard.writeText(window.location.href)
      this.showToast('Đã sao chép liên kết!')
    },
    showToast(message) {
      const toast = document.createElement('div')
      toast.className = 'toast-notification'
      toast.innerHTML = `
        <div class="toast-content">
          <i class="fas fa-check-circle text-success me-2"></i>
          ${message}
        </div>
      `
      document.body.appendChild(toast)
      setTimeout(() => {
        toast.remove()
      }, 3000)
    }
  }
}
</script>

<style scoped>
.post-detail-page {
  background: #f8f9fa !important;
}

.card {
  border-radius: 15px !important;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
}

.tag-badge {
  transition: all 0.2s ease;
}

.tag-badge:hover {
  background: #e7f1ff !important;
  color: #007bff !important;
}

.comment-item {
  transition: all 0.2s ease;
}

.comment-item:hover {
  background: #f8f9fa;
  border-radius: 10px;
}

.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.toast-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1050;
  animation: slideInUp 0.3s ease;
}

.toast-content {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
  font-weight: 500;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .post-meta {
    flex-direction: column;
    gap: 1rem !important;
  }

  .card-img-top {
    height: 250px !important;
  }
}
</style>