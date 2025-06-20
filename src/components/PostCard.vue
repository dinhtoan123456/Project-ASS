<template>
<article class="post-card card border-0 shadow-sm h-100 overflow-hidden">
    <div class="post-image-container position-relative overflow-hidden">
      <img 
        :src="post.image" 
        class="card-img-top post-image" 
        :alt="post.title"
        loading="lazy"
      />
      <div class="image-overlay"></div>
      <div class="post-meta-overlay position-absolute top-0 start-0 p-3">
        <span class="badge bg-primary rounded-pill">
          <i class="fas fa-clock me-1"></i>{{ post.readTime || 5 }} phút
        </span>
      </div>
      <div class="post-category-overlay position-absolute top-0 end-0 p-3" v-if="post.category">
        <span class="badge bg-success rounded-pill">{{ post.category }}</span>
      </div>
    </div>
    
    <div class="card-body p-4 d-flex flex-column">
      <div class="post-header mb-3">
        <h5 class="card-title fw-bold text-dark mb-2 line-clamp-2 post-title">
          {{ post.title }}
        </h5>
        <div class="post-meta d-flex align-items-center text-muted small mb-2">
          <div class="author-info d-flex align-items-center me-3">
            <div class="author-avatar me-2">
              <i class="fas fa-user-circle text-primary"></i>
            </div>
            <span>{{ post.author || 'Energy Pilates' }}</span>
          </div>
          <div class="post-time">
            <i class="fas fa-calendar me-1"></i>{{ post.time || formatDate(post.createdAt) }}
          </div>
        </div>
      </div>
      
      <div class="post-content flex-grow-1">
        <p class="card-text text-muted mb-3 line-clamp-3 post-excerpt">
          {{ post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'Khám phá nội dung thú vị trong bài viết này...') }}
        </p>
      </div>
      
      <div class="post-footer d-flex align-items-center justify-content-between mt-auto">
        <router-link 
          :to="`/post/${post.id}`" 
          class="btn btn-primary btn-sm rounded-pill px-4 btn-hover-effect d-flex align-items-center"
        >
          <span>Xem chi tiết</span>
          <i class="fas fa-arrow-right ms-2 arrow-icon"></i>
        </router-link>
        
        <div class="post-actions d-flex align-items-center gap-2">
          <button 
            class="btn btn-outline-secondary btn-sm rounded-circle action-btn"
            @click="toggleLike"
            :class="{ 'liked': isLiked }"
          >
            <i class="fas fa-heart" :class="{ 'text-danger': isLiked }"></i>
          </button>
          <button 
            class="btn btn-outline-secondary btn-sm rounded-circle action-btn"
            @click="toggleBookmark"
            :class="{ 'bookmarked': isBookmarked }"
          >
            <i class="fas fa-bookmark" :class="{ 'text-warning': isBookmarked }"></i>
          </button>
          <button 
            class="btn btn-outline-secondary btn-sm rounded-circle action-btn"
            @click="sharePost"
          >
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Reading Progress Indicator -->
    <div class="reading-progress position-absolute bottom-0 start-0 w-100">
      <div class="progress" style="height: 3px;">
        <div class="progress-bar bg-primary" :style="{ width: readingProgress + '%' }"></div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({
        id: 1,
        title: 'Tiêu đề bài viết',
        content: 'Nội dung bài viết...',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        author: 'Energy Pilates',
        time: '1 giờ trước',
        readTime: 5
      })
    }
  },
  data() {
    return {
      isLiked: false,
      isBookmarked: false,
      readingProgress: 0
    }
  },
  mounted() {
    this.loadUserInteractions()
    this.simulateReadingProgress()
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '1 giờ trước'
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return '1 ngày trước'
      if (diffDays < 7) return `${diffDays} ngày trước`
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} tuần trước`
      return `${Math.ceil(diffDays / 30)} tháng trước`
    },
    
    loadUserInteractions() {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || []
      const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts')) || []
      
      this.isLiked = likedPosts.includes(this.post.id)
      this.isBookmarked = bookmarkedPosts.includes(this.post.id)
    },
    
    toggleLike() {
      this.isLiked = !this.isLiked
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || []
      
      if (this.isLiked) {
        likedPosts.push(this.post.id)
      } else {
        const index = likedPosts.indexOf(this.post.id)
        if (index > -1) likedPosts.splice(index, 1)
      }
      
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
      
      // Animate heart
      this.$el.querySelector('.fa-heart').style.transform = 'scale(1.3)'
      setTimeout(() => {
        this.$el.querySelector('.fa-heart').style.transform = 'scale(1)'
      }, 200)
    },
    
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked
      const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts')) || []
      
      if (this.isBookmarked) {
        bookmarkedPosts.push(this.post.id)
      } else {
        const index = bookmarkedPosts.indexOf(this.post.id)
        if (index > -1) bookmarkedPosts.splice(index, 1)
      }
      
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts))
    },
    
    sharePost() {
      if (navigator.share) {
        navigator.share({
          title: this.post.title,
          text: this.post.excerpt || this.post.content?.substring(0, 100),
          url: `${window.location.origin}/post/${this.post.id}`
        })
      } else {
        // Fallback to copying URL
        const url = `${window.location.origin}/post/${this.post.id}`
        navigator.clipboard.writeText(url).then(() => {
          // Show success message
          this.showToast('Đã sao chép liên kết bài viết!')
        })
      }
    },
    
    showToast(message) {
      // Create toast notification
      const toast = document.createElement('div')
      toast.className = 'toast-notification-inline'
      toast.innerHTML = `
        <div class="toast-content-inline">
          <i class="fas fa-check-circle text-success me-2"></i>
          ${message}
        </div>
      `
      document.body.appendChild(toast)
      
      setTimeout(() => {
        toast.remove()
      }, 3000)
    },
    
    simulateReadingProgress() {
      // Simulate reading progress based on scroll or time
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 10
        this.readingProgress = Math.min(progress, 100)
        
        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 500)
    }
  }
}
</script>

<style scoped>
.post-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
}

.post-image-container {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  border-radius: 20px 20px 0 0;
}

.post-card:hover .post-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.post-card:hover .image-overlay {
  opacity: 1;
}

.post-meta-overlay .badge,
.post-category-overlay .badge {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9) !important;
  color: #333 !important;
  font-weight: 600;
  padding: 8px 12px;
  font-size: 0.75rem;
}

.post-category-overlay .badge {
  background: rgba(40, 167, 69, 0.9) !important;
  color: white !important;
}

.card-body {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
}

.post-title {
  color: #2c3e50;
  line-height: 1.4;
  transition: color 0.3s ease;
  font-size: 1.1rem;
  font-weight: 700;
}

.post-card:hover .post-title {
  color: #28a745;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}

.author-avatar {
  font-size: 1.2rem;
}

.post-meta {
  font-size: 0.85rem;
  color: #6c757d;
}

.post-excerpt {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #495057;
}

.btn-hover-effect {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.btn-hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
}

.btn-hover-effect:hover .arrow-icon {
  transform: translateX(5px);
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.action-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
  background: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  border-color: #28a745;
  background: #f8f9fa;
}

.action-btn.liked {
  border-color: #dc3545;
  background: #fff5f5;
}

.action-btn.bookmarked {
  border-color: #ffc107;
  background: #fffbf0;
}

.action-btn i {
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.action-btn:hover i {
  transform: scale(1.1);
}

.reading-progress {
  z-index: 2;
}

.progress {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0;
}

.progress-bar {
  background: linear-gradient(90deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

/* Post Footer Styling */
.post-footer {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
}

/* Hover Effects */
.post-card:hover .post-meta-overlay .badge,
.post-card:hover .post-category-overlay .badge {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Animation for interactions */
@keyframes heartPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.action-btn.liked .fa-heart {
  animation: heartPulse 0.6s ease;
}

/* Toast notification styles */
.toast-notification-inline {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1050;
  animation: slideInUp 0.3s ease;
}

.toast-content-inline {
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

/* Responsive Design */
@media (max-width: 768px) {
  .post-image-container {
    height: 180px;
  }
  
  .post-title {
    font-size: 1rem;
  }
  
  .post-excerpt {
    font-size: 0.85rem;
  }
  
  .btn-hover-effect {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
  
  .action-btn {
    width: 32px;
    height: 32px;
  }
  
  .post-actions {
    gap: 0.5rem !important;
  }
}

@media (max-width: 576px) {
  .post-card {
    border-radius: 15px;
  }
  
  .post-image {
    border-radius: 15px 15px 0 0;
  }
  
  .post-image-container {
    height: 160px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .post-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .btn-hover-effect {
    text-align: center;
    justify-content: center;
  }
  
  .post-actions {
    justify-content: center;
  }
}

/* Enhanced hover states */
.post-card:hover .author-avatar i {
  color: #28a745;
  transform: scale(1.1);
}

.post-card:hover .post-meta {
  color: #495057;
}

/* Loading state */
.post-card.loading {
  pointer-events: none;
}

.post-card.loading .post-image {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>