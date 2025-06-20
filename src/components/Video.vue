<template>
  <div class="videos-page bg-light min-vh-100">
    <!-- Logo Header -->
    <div class="container">
      <LogoHeader />
    </div>

    <div class="videos-header bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3 custom-videos-title">
              <i class="fas fa-play-circle me-3"></i>Video Tutorials
            </h1>
            <p class="lead mb-0">
              Học công nghệ qua video hướng dẫn chi tiết từ các chuyên gia
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="stats-cards d-flex gap-3 justify-content-lg-end mt-3 mt-lg-0">
              <div class="stat-card bg-white bg-opacity-20 rounded-3 p-3 text-center">
                <h4 class="fw-bold mb-0 text-dark">{{ totalVideos }}</h4>
                <small class="text-dark">Video</small>
              </div>
              <div class="stat-card bg-white bg-opacity-20 rounded-3 p-3 text-center">
                <h4 class="fw-bold mb-0 text-dark">50+</h4>
                <small class="text-dark">Giờ học</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <div class="row">
        <!-- Sidebar Filters -->
        <div class="col-lg-3 mb-4">
          <div class="card border-0 shadow-sm sticky-top" style="top: 100px;">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0 fw-bold">
                <i class="fas fa-filter me-2"></i>Bộ lọc
              </h5>
            </div>
            <div class="card-body">
              <!-- Category Filter -->
              <div class="mb-4">
                <h6 class="fw-bold mb-3 filter-heading">Danh mục</h6>
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

              <!-- Duration Filter -->
              <div class="mb-4">
                <h6 class="fw-bold mb-3 filter-heading">Thời lượng</h6>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" value="all" v-model="selectedDuration" @change="filterVideos">
                  <label class="form-check-label">Tất cả</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" value="short" v-model="selectedDuration" @change="filterVideos">
                  <label class="form-check-label">Dưới 10 phút</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" value="medium" v-model="selectedDuration" @change="filterVideos">
                  <label class="form-check-label">10-30 phút</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" value="long" v-model="selectedDuration" @change="filterVideos">
                  <label class="form-check-label">Trên 30 phút</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Videos Grid -->
        <div class="col-lg-9">
          <!-- Popular Videos Section -->
          <div class="mb-5">
            <h2 class="h4 fw-bold mb-4 d-flex align-items-center section-heading">
              <i class="fas fa-fire text-danger me-2"></i>Video phổ biến
            </h2>
            <div class="row g-4">
              <div class="col-md-6" v-for="video in popularVideos" :key="video.id">
                <div class="card border-0 shadow-sm h-100 video-card">
                  <div class="position-relative video-thumbnail">
                    <img :src="video.thumbnail" class="card-img-top" :alt="video.title" style="height: 200px; object-fit: cover;">
                    <div class="play-overlay position-absolute top-50 start-50 translate-middle">
                      <button class="btn btn-primary btn-lg rounded-circle play-btn" @click="playVideo(video)">
                        <i class="fas fa-play"></i>
                      </button>
                    </div>
                    <div class="video-duration position-absolute bottom-0 end-0 m-2">
                      <span class="badge bg-dark">{{ video.duration }}</span>
                    </div>
                    <div class="video-quality position-absolute top-0 start-0 m-2">
                      <span class="badge bg-success">{{ video.quality }}</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title fw-bold line-clamp-2 video-title">{{ video.title }}</h5>
                    <p class="card-text text-muted line-clamp-2">{{ video.description }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="video-stats">
                        <small class="text-muted">
                          <i class="fas fa-eye me-1"></i>{{ video.views }} lượt xem
                        </small>
                      </div>
                      <span class="badge bg-primary">{{ video.category }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- All Videos Section -->
          <div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="h4 fw-bold mb-0 section-heading">Tất cả video ({{ filteredVideos.length }})</h2>
              <select class="form-select" style="width: auto;" v-model="sortBy" @change="filterVideos">
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="popular">Phổ biến nhất</option>
                <option value="duration">Thời lượng</option>
              </select>
            </div>

            <div class="row g-4" v-if="filteredVideos.length > 0">
              <div class="col-md-6" v-for="video in filteredVideos" :key="video.id">
                <div class="card border-0 shadow-sm h-100 video-card">
                  <div class="position-relative video-thumbnail">
                    <img :src="video.thumbnail" class="card-img-top" :alt="video.title" style="height: 200px; object-fit: cover;">
                    <div class="play-overlay position-absolute top-50 start-50 translate-middle">
                      <button class="btn btn-primary btn-lg rounded-circle play-btn" @click="playVideo(video)">
                        <i class="fas fa-play"></i>
                      </button>
                    </div>
                    <div class="video-duration position-absolute bottom-0 end-0 m-2">
                      <span class="badge bg-dark">{{ video.duration }}</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title fw-bold line-clamp-2 video-title">{{ video.title }}</h5>
                    <p class="card-text text-muted line-clamp-2">{{ video.description }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="video-stats">
                        <small class="text-muted">
                          <i class="fas fa-eye me-1"></i>{{ video.views }} • {{ video.uploadDate }}
                        </small>
                      </div>
                      <span class="badge bg-primary">{{ video.category }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-5">
              <i class="fas fa-video-slash fa-3x text-muted mb-3"></i>
              <h4 class="text-muted">Không tìm thấy video nào</h4>
              <p class="text-muted">Thử thay đổi bộ lọc để xem thêm video</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <div class="modal fade" id="videoModal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ currentVideo.title }}</h5>
            <button type="button" class="btn-close" @click="closeVideo"></button>
          </div>
          <div class="modal-body p-0">
            <div class="video-player-container position-relative">
              <video 
                ref="videoPlayer"
                class="w-100"
                controls
                :poster="currentVideo.thumbnail"
                @loadedmetadata="onVideoLoaded"
                @timeupdate="onTimeUpdate"
                @ended="onVideoEnded"
              >
                <source :src="currentVideo.videoUrl" type="video/mp4">
                Trình duyệt của bạn không hỗ trợ video.
              </video>
              
              <!-- Custom Controls -->
              <div class="video-controls position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-3">
                <div class="progress mb-2" style="height: 4px;">
                  <div class="progress-bar bg-primary" :style="{ width: progressPercent + '%' }"></div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="control-buttons d-flex align-items-center gap-3">
                    <button class="btn btn-link text-white p-0" @click="togglePlay">
                      <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'" class="fs-5"></i>
                    </button>
                    <button class="btn btn-link text-white p-0" @click="replayVideo">
                      <i class="fas fa-redo fs-6"></i>
                    </button>
                    <div class="volume-control d-flex align-items-center">
                      <button class="btn btn-link text-white p-0 me-2" @click="toggleMute">
                        <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'" class="fs-6"></i>
                      </button>
                      <input type="range" class="form-range" min="0" max="1" step="0.1" v-model="volume" @input="changeVolume" style="width: 80px;">
                    </div>
                  </div>
                  <div class="time-display">
                    <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
                  </div>
                  <div class="settings-controls d-flex align-items-center gap-2">
                    <select class="form-select form-select-sm" v-model="playbackRate" @change="changePlaybackRate" style="width: auto;">
                      <option value="0.5">0.5x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                    <button class="btn btn-link text-white p-0" @click="toggleFullscreen">
                      <i class="fas fa-expand"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoHeader from '../components/LogoHeader.vue'

export default {
  name: 'Video',
  components: {
    LogoHeader
  },
  data() {
    return {
      videos: [
        {
          id: 1,
          title: 'Vue.js 3 Composition API - Hướng dẫn từ A đến Z',
          description: 'Học cách sử dụng Composition API trong Vue.js 3 để viết code sạch hơn và dễ bảo trì hơn.',
          thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          duration: '25:30',
          category: 'Vue.js',
          views: '15.2K',
          uploadDate: '3 ngày trước',
          quality: 'HD',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 2,
          title: 'React vs Vue.js - So sánh chi tiết 2024',
          description: 'Phân tích ưu nhược điểm của React và Vue.js để chọn framework phù hợp cho dự án.',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          duration: '18:45',
          category: 'Comparison',
          views: '8.7K',
          uploadDate: '1 tuần trước',
          quality: 'FHD',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      ],
      categories: ['Tất cả', 'Vue.js', 'React', 'Angular', 'JavaScript', 'TypeScript', 'Node.js'],
      selectedCategory: 'Tất cả',
      selectedDuration: 'all',
      sortBy: 'newest',
      currentVideo: {},
      isPlaying: false,
      isMuted: false,
      volume: 1,
      currentTime: 0,
      duration: 0,
      playbackRate: 1
    }
  },
  computed: {
    totalVideos() {
      return this.videos.length
    },
    popularVideos() {
      return this.videos.filter(video => parseInt(video.views.replace('K', '000')) > 10000)
    },
    filteredVideos() {
      let filtered = this.videos
      
      if (this.selectedCategory !== 'Tất cả') {
        filtered = filtered.filter(video => video.category === this.selectedCategory)
      }
      
      if (this.selectedDuration !== 'all') {
        filtered = filtered.filter(video => {
          const duration = this.parseDuration(video.duration)
          switch (this.selectedDuration) {
            case 'short': return duration < 10
            case 'medium': return duration >= 10 && duration <= 30
            case 'long': return duration > 30
            default: return true
          }
        })
      }
      
      return filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'popular':
            return parseInt(b.views.replace('K', '000')) - parseInt(a.views.replace('K', '000'))
          case 'duration':
            return this.parseDuration(a.duration) - this.parseDuration(b.duration)
          case 'oldest':
            return new Date(a.uploadDate) - new Date(b.uploadDate)
          default: // newest
            return new Date(b.uploadDate) - new Date(a.uploadDate)
        }
      })
    },
    progressPercent() {
      return this.duration ? (this.currentTime / this.duration) * 100 : 0
    }
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategory = category
    },
    filterVideos() {
      // Trigger reactivity
    },
    parseDuration(duration) {
      const parts = duration.split(':')
      return parseInt(parts[0]) + (parseInt(parts[1]) / 60)
    },
    playVideo(video) {
      this.currentVideo = video
      // Show modal (assuming Bootstrap is available)
      const modal = new bootstrap.Modal(document.getElementById('videoModal'))
      modal.show()
    },
    closeVideo() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.pause()
      }
      this.isPlaying = false
    },
    togglePlay() {
      const video = this.$refs.videoPlayer
      if (video.paused) {
        video.play()
        this.isPlaying = true
      } else {
        video.pause()
        this.isPlaying = false
      }
    },
    toggleMute() {
      const video = this.$refs.videoPlayer
      video.muted = !video.muted
      this.isMuted = video.muted
    },
    changeVolume() {
      const video = this.$refs.videoPlayer
      video.volume = this.volume
    },
    changePlaybackRate() {
      const video = this.$refs.videoPlayer
      video.playbackRate = this.playbackRate
    },
    replayVideo() {
      const video = this.$refs.videoPlayer
      video.currentTime = 0
      video.play()
      this.isPlaying = true
    },
    toggleFullscreen() {
      const video = this.$refs.videoPlayer
      if (video.requestFullscreen) {
        video.requestFullscreen()
      }
    },
    onVideoLoaded() {
      const video = this.$refs.videoPlayer
      this.duration = video.duration
    },
    onTimeUpdate() {
      const video = this.$refs.videoPlayer
      this.currentTime = video.currentTime
    },
    onVideoEnded() {
      this.isPlaying = false
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
.custom-videos-title {
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.section-heading {
  color: #2c3e50 !important;
}

.filter-heading {
  color: #495057 !important;
}

.video-title {
  color: #2c3e50 !important;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #007bff, #0056b3) !important;
}

.video-card {
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
}

.video-thumbnail {
  position: relative;
  overflow: hidden;
}

.play-overlay {
  opacity: 0;
  transition: all 0.3s ease;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-btn {
  width: 60px;
  height: 60px;
  background: rgba(0,123,255,0.9) !important;
  border: none;
  transition: all 0.3s ease;
}

.play-btn:hover {
  background: rgba(0,123,255,1) !important;
  transform: scale(1.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-controls {
  backdrop-filter: blur(10px);
}

.form-range {
  background: transparent;
}

.form-range::-webkit-slider-thumb {
  background: #007bff;
  border: none;
}

@media (max-width: 768px) {
  .custom-videos-title {
    font-size: 2rem;
  }
  
  .stats-cards {
    justify-content: center !important;
  }
  
  .stat-card {
    min-width: 100px;
  }
  
  .play-btn {
    width: 50px;
    height: 50px;
  }
  
  .video-controls {
    padding: 1rem !important;
  }
  
  .control-buttons {
    gap: 1rem !important;
  }
}
</style>