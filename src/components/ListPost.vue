<template>
  <div class="posts-page bg-light min-vh-100">
    <div class="container">
      <LogoHeader />
    </div>

    <div class="posts-header bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3">
              <i class="fas fa-newspaper me-3"></i>Bài viết
            </h1>
            <p class="lead mb-0">
              Khám phá kiến thức công nghệ mới nhất từ cộng đồng TechVerse
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <router-link to="/create-post" class="btn btn-success btn-lg rounded-pill">
              <i class="fas fa-pen-fancy me-2"></i>Tạo bài viết
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <div class="row">
        <div class="col-lg-9">
          <div class="row g-4">
            <div class="col-md-6" v-for="post in paginatedPosts" :key="post.id">
              <PostCard :post="post" />
            </div>
          </div>

          <nav aria-label="Post pagination" class="mt-5">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-lg-3">
          <div class="card border-0 shadow-sm sticky-top" style="top: 100px;">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0 fw-bold">
                <i class="fas fa-filter me-2"></i>Bộ lọc bài viết
              </h5>
            </div>
            <div class="card-body">
              <div class="mb-4">
                <h6 class="fw-bold mb-3">Danh mục</h6>
                <div class="list-group list-group-flush">
                  <button 
                    v-for="category in categories" 
                    :key="category"
                    @click="filterByCategory(category)"
                    class="list-group-item list-group-item-action border-0 px-0"
                    :class="{ 'active': selectedCategory === category }"
                  >
                    {{ category }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Thảo luận ở cuối trang -->
    <div class="container mt-5">
      <h5>Thảo luận</h5>
      <div class="mb-3">
        <select v-model="sortOption" class="form-select w-auto" @change="sortComments">
          <option value="time">Sắp xếp theo thời gian</option>
          <option value="postTitle">Sắp xếp theo bài viết</option>
        </select>
      </div>
      <div v-if="comments.length" class="mb-4">
        <ul class="list-group">
          <li v-for="(comment, index) in sortedComments" :key="index" class="list-group-item">
            <p v-if="comment.postTitle" class="mb-1" style="color: #003087; font-weight: bold;">{{ comment.postTitle }}</p>
            <p class="mb-1">{{ comment.text }}</p>
            <small class="text-muted" v-if="comment.author">Đăng bởi {{ comment.author }} vào {{ comment.time }}</small>
            <small class="text-muted" v-else>Vào {{ comment.time }}</small>
          </li>
        </ul>
      </div>
      <div v-else class="mb-4">
        <p class="text-muted">Chưa có thảo luận nào. Hãy là người đầu tiên!</p>
      </div>
      <label for="discussion" class="form-label d-flex justify-content-between align-items-center">
        Thêm thảo luận:
        <button class="btn btn-primary ms-2" @click="openPostSelection">Thảo luận về bài viết</button>
      </label>
      <select v-if="showPostSelection" v-model="selectedPost" class="form-select mb-2" id="postSelection">
        <option value="" disabled>Chọn bài viết</option>
        <option v-for="post in posts" :key="post.id" :value="post">{{ post.title }}</option>
      </select>
      <textarea v-model="newComment" class="form-control mb-2" rows="3" id="discussion" name="discussion" placeholder="Viết thảo luận của bạn tại đây..."></textarea>
      <button v-if="selectedPost" class="btn btn-danger discussion-btn" @click="clearPostSelection">Xóa lựa chọn</button>
      <button class="btn btn-primary discussion-btn" @click="submitComment">Gửi</button>
    </div>
  </div>
</template>

<script>
import LogoHeader from '../components/LogoHeader.vue'
import PostCard from '../components/PostCard.vue'

export default {
  name: 'ListPost',
  components: {
    LogoHeader,
    PostCard
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Học Vue.js 3 từ cơ bản đến nâng cao',
          excerpt: 'Hướng dẫn chi tiết về cách sử dụng Vue.js 3 với Composition API.',
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Nguyễn Văn A',
          publishDate: '15/06/2025',
          readTime: 8,
          category: 'Frontend',
          tags: ['vuejs', 'javascript', 'frontend'],
          views: 1250,
          comments: []
        },
        {
          id: 2,
          title: 'Tìm hiểu về Node.js và Express',
          excerpt: 'Giới thiệu cách xây dựng API với Node.js và Express.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Trần Thị B',
          publishDate: '14/06/2025',
          readTime: 10,
          category: 'Backend',
          tags: ['nodejs', 'express', 'backend'],
          views: 980,
          comments: []
        },
        {
          id: 3,
          title: 'Giới thiệu Docker cho người mới bắt đầu',
          excerpt: 'Học cách sử dụng Docker để container hóa ứng dụng.',
          image: 'https://images.unsplash.com/photo-1600585154665-7f6c9b2c8f7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Lê Văn C',
          publishDate: '13/06/2025',
          readTime: 12,
          category: 'DevOps',
          tags: ['docker', 'devops', 'container'],
          views: 750,
          comments: []
        },
        {
          id: 4,
          title: 'React Hooks: Cách sử dụng hiệu quả',
          excerpt: 'Tìm hiểu cách sử dụng React Hooks để quản lý state và side effects.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Phạm Văn D',
          publishDate: '12/06/2025',
          readTime: 7,
          category: 'Frontend',
          tags: ['react', 'hooks', 'frontend'],
          views: 1100,
          comments: []
        },
        {
          id: 5,
          title: 'Học Python cơ bản trong 30 ngày',
          excerpt: 'Hành trình học Python từ con số 0 đến thành thạo.',
          image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Nguyễn Thị E',
          publishDate: '11/06/2025',
          readTime: 15,
          category: 'Programming',
          tags: ['python', 'programming', 'beginner'],
          views: 2000,
          comments: []
        },
        {
          id: 6,
          title: 'Tối ưu hóa hiệu suất website',
          excerpt: 'Các kỹ thuật tối ưu hóa tốc độ tải trang web.',
          image: 'https://images.unsplash.com/photo-1551288049-bcc17c7c2644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Trần Văn F',
          publishDate: '10/06/2025',
          readTime: 9,
          category: 'Frontend',
          tags: ['optimization', 'web', 'frontend'],
          views: 850,
          comments: []
        },
        {
          id: 7,
          title: 'Giới thiệu Kubernetes cho người mới',
          excerpt: 'Học cách triển khai ứng dụng với Kubernetes.',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Lê Thị G',
          publishDate: '09/06/2025',
          readTime: 11,
          category: 'DevOps',
          tags: ['kubernetes', 'devops', 'cloud'],
          views: 600,
          comments: []
        },
        {
          id: 8,
          title: 'Học SQL từ cơ bản đến nâng cao',
          excerpt: 'Hướng dẫn sử dụng SQL để quản lý cơ sở dữ liệu.',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Phạm Văn H',
          publishDate: '08/06/2025',
          readTime: 13,
          category: 'Database',
          tags: ['sql', 'database', 'query'],
          views: 1400,
          comments: []
        },
        {
          id: 9,
          title: 'Bảo mật ứng dụng web',
          excerpt: 'Các phương pháp bảo vệ ứng dụng web khỏi tấn công.',
          image: 'https://images.unsplash.com/photo-1554260570-9147fd3e6894?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Nguyễn Văn I',
          publishDate: '07/06/2025',
          readTime: 10,
          category: 'Security',
          tags: ['security', 'web', 'cybersecurity'],
          views: 950,
          comments: []
        },
        {
          id: 10,
          title: 'Thiết kế UI/UX cho người mới bắt đầu',
          excerpt: 'Học cách thiết kế giao diện người dùng thân thiện.',
          image: 'https://images.unsplash.com/photo-1551288049-bcc17c7c2644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Trần Thị K',
          publishDate: '06/06/2025',
          readTime: 8,
          category: 'UI/UX',
          tags: ['uiux', 'design', 'interface'],
          views: 1200,
          comments: []
        },
        {
          id: 11,
          title: 'Học TypeScript trong 7 ngày',
          excerpt: 'Hướng dẫn sử dụng TypeScript để phát triển ứng dụng.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Lê Văn L',
          publishDate: '05/06/2025',
          readTime: 9,
          category: 'Frontend',
          tags: ['typescript', 'javascript', 'frontend'],
          views: 870,
          comments: []
        },
        {
          id: 12,
          title: 'Giới thiệu GraphQL',
          excerpt: 'Học cách sử dụng GraphQL để xây dựng API.',
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Phạm Thị M',
          publishDate: '04/06/2025',
          readTime: 11,
          category: 'Backend',
          tags: ['graphql', 'api', 'backend'],
          views: 650,
          comments: []
        },
        {
          id: 13,
          title: 'Học AWS cơ bản',
          excerpt: 'Hướng dẫn sử dụng Amazon Web Services cho người mới.',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Nguyễn Văn N',
          publishDate: '03/06/2025',
          readTime: 12,
          category: 'Cloud',
          tags: ['aws', 'cloud', 'devops'],
          views: 780,
          comments: []
        },
        {
          id: 14,
          title: 'Học Flutter để phát triển ứng dụng di động',
          excerpt: 'Hướng dẫn sử dụng Flutter để xây dựng ứng dụng cross-platform.',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Trần Văn O',
          publishDate: '02/06/2025',
          readTime: 10,
          category: 'Mobile',
          tags: ['flutter', 'mobile', 'crossplatform'],
          views: 920,
          comments: []
        },
        {
          id: 15,
          title: 'Tìm hiểu về Machine Learning',
          excerpt: 'Giới thiệu cơ bản về Machine Learning và ứng dụng.',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Lê Thị P',
          publishDate: '01/06/2025',
          readTime: 14,
          category: 'AI/ML',
          tags: ['machinelearning', 'ai', 'data'],
          views: 1100,
          comments: []
        },
        {
          id: 16,
          title: 'Học MongoDB cơ bản',
          excerpt: 'Hướng dẫn sử dụng MongoDB để quản lý cơ sở dữ liệu NoSQL.',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f128504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Phạm Văn Q',
          publishDate: '31/05/2025',
          readTime: 9,
          category: 'Database',
          tags: ['mongodb', 'nosql', 'database'],
          views: 700,
          comments: []
        },
        {
          id: 17,
          title: 'Giới thiệu CI/CD với Jenkins',
          excerpt: 'Học cách thiết lập pipeline CI/CD với Jenkins.',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Nguyen Thi R',
          publishDate: '30/05/2025',
          readTime: 11,
          category: 'DevOps',
          tags: ['cicd', 'jenkins', 'devops'],
          views: 820,
          comments: []
        },
        {
          id: 18,
          title: 'Học Angular cơ bản',
          excerpt: 'Hướng dẫn sử dụng Angular để xây dựng ứng dụng web.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          author: 'Trần Văn S',
          publishDate: '29/05/2025',
          readTime: 10,
          category: 'Frontend',
          tags: ['angular', 'javascript', 'frontend'],
          views: 950,
          comments: []
        }
      ],
      categories: ['Tất cả', 'Frontend', 'Backend', 'DevOps', 'Programming', 'Database', 'Security', 'UI/UX', 'Cloud', 'Mobile', 'AI/ML'],
      selectedCategory: 'Tất cả',
      currentPage: 1,
      postsPerPage: 6,
      newComment: '',
      comments: [
        { text: 'Bài viết rất chi tiết!', postTitle: 'Học Python cơ bản trong 30 ngày', author: 'Nguyễn Văn A', time: '06:00:00 20/06/2025' },
        { text: 'Rất hữu ích!', postTitle: 'Tìm hiểu về Node.js và Express', author: 'Trần Thị B', time: '07:15:00 20/06/2025' },
        { text: 'Cần thêm ví dụ thực tế.', postTitle: 'Giới thiệu Docker cho người mới bắt đầu', author: 'Lê Văn C', time: '08:00:00 20/06/2025' },
        { text: 'Tuyệt vời!', postTitle: 'React Hooks: Cách sử dụng hiệu quả', author: 'Phạm Văn D', time: '08:30:00 20/06/2025' },
        { text: 'Hay lắm!', author: 'Nguyễn Thị E', time: '08:45:00 20/06/2025' },
        { text: 'Cảm ơn tác giả!', postTitle: 'Tối ưu hóa hiệu suất website', author: 'Trần Văn F', time: '08:50:00 20/06/2025' }
      ],
      selectedPost: null,
      showPostSelection: false,
      sortOption: 'time'
    }
  },
  computed: {
    filteredPosts() {
      if (this.selectedCategory === 'Tất cả') {
        return this.posts
      }
      return this.posts.filter(post => post.category === this.selectedCategory)
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return this.filteredPosts.slice(start, end)
    },
    sortedComments() {
      return [...this.comments].sort((a, b) => {
        if (this.sortOption === 'time') {
          return new Date(b.time) - new Date(a.time)
        } else if (this.sortOption === 'postTitle') {
          return (a.postTitle || '').localeCompare(b.postTitle || '')
        }
        return 0
      })
    }
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategory = category
      this.currentPage = 1
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    submitComment() {
      if (this.newComment.trim() !== '') {
        const user = JSON.parse(localStorage.getItem('user')) || {}
        const comment = {
          text: this.newComment.trim(),
          time: new Date().toLocaleString('vi-VN', { hour12: false })
        }
        if (user.username) {
          comment.author = user.username
        }
        if (this.selectedPost) {
          comment.postTitle = this.selectedPost.title
        }
        this.comments.push(comment)
        this.newComment = ''
        this.showPostSelection = false
        this.selectedPost = null
      }
    },
    openPostSelection() {
      this.showPostSelection = true
    },
    clearPostSelection() {
      this.selectedPost = null
      this.showPostSelection = false
    },
    sortComments() {
      // Trigger sorting by updating sortOption
    }
  },
  mounted() {
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || []
    this.posts = [...this.posts, ...userPosts]
  }
}
</script>

<style scoped>
.posts-header {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%) !important;
}

.card {
  transition: all 0.3s ease;
  border-radius: 15px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
}

.list-group-item.active {
  background-color: #e7f1ff !important;
  color: #007bff !important;
  font-weight: 500;
}

.page-link {
  border-radius: 50% !important;
  margin: 0 5px;
  color: #007bff;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
}

/* Custom styles for discussion buttons */
button.discussion-btn {
  --border-color: linear-gradient(-45deg, #ffae00, #7e03aa, #00fffb);
  --border-width: 0.125em;
  --curve-size: 0.5em;
  --blur: 30px;
  --bg: #080312;
  --color: #afffff;
  color: var(--color);
  cursor: pointer;
  position: relative;
  isolation: isolate;
  display: inline-grid;
  place-content: center;
  padding: 0.5em 1.5em;
  font-size: 17px;
  border: 0;
  text-transform: uppercase;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.6);
  clip-path: polygon(
    /* Top-left */ 0% var(--curve-size),
    var(--curve-size) 0,
    /* top-right */ 100% 0,
    100% calc(100% - var(--curve-size)),
    /* bottom-right 1 */ calc(100% - var(--curve-size)) 100%,
    /* bottom-right 2 */ 0 100%
  );
  transition: color 250ms;
}

/* Preserve Bootstrap colors while applying custom styles */
button.discussion-btn.btn-danger {
  --bg: #dc3545; /* Red color from btn-danger */
}

button.discussion-btn.btn-primary {
  --bg: #007bff; /* Blue color from btn-primary */
}

button.discussion-btn::after,
button.discussion-btn::before {
  content: "";
  position: absolute;
  inset: 0;
}

button.discussion-btn::before {
  background: var(--border-color);
  background-size: 300% 300%;
  animation: move-bg7234 5s ease infinite;
  z-index: -2;
}

@keyframes move-bg7234 {
  0% {
    background-position: 31% 0%;
  }
  50% {
    background-position: 70% 100%;
  }
  100% {
    background-position: 31% 0%;
  }
}

button.discussion-btn::after {
  background: var(--bg);
  z-index: -1;
  clip-path: polygon(
    /* Top-left */ var(--border-width)
      calc(var(--curve-size) + var(--border-width) * 0.5),
    calc(var(--curve-size) + var(--border-width) * 0.5) var(--border-width),
    /* top-right */ calc(100% - var(--border-width)) var(--border-width),
    calc(100% - var(--border-width))
      calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)),
    /* bottom-right 1 */
      calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5))
      calc(100% - var(--border-width)),
    /* bottom-right 2 */ var(--border-width) calc(100% - var(--border-width))
  );
  transition: clip-path 500ms;
}

button.discussion-btn:where(:hover, :focus)::after {
  clip-path: polygon(
    /* Top-left */ calc(100% - var(--border-width))
      calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)),
    calc(100% - var(--border-width)) var(--border-width),
    /* top-right */ calc(100% - var(--border-width)) var(--border-width),
    calc(100% - var(--border-width))
      calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)),
    /* bottom-right 1 */
      calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5))
      calc(100% - var(--border-width)),
    /* bottom-right 2 */
      calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5))
      calc(100% - var(--border-width))
  );
  transition: 200ms;
}

button.discussion-btn:where(:hover, :focus) {
  color: #fff;
}

/* Specific adjustments for spacing between buttons */
button.discussion-btn + button.discussion-btn {
  margin-left: 10px; /* Adds space between the two buttons */
}
</style>