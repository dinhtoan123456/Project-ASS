<template>
  <div class="events-page bg-light min-vh-100">
    <div class="container">
      <LogoHeader />
    </div>

    <div class="events-header bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3 custom-events-title">
              <i class="fas fa-calendar-alt me-3"></i>Sự kiện công nghệ
            </h1>
            <p class="lead mb-0">
              Tham gia các workshop, hội thảo và meetup công nghệ hấp dẫn
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="event-stats d-flex gap-3 justify-content-lg-end mt-3 mt-lg-0">
              <div class="stat-card bg-white bg-opacity-20 rounded-3 p-3 text-center">
                <h4 class="fw-bold mb-0 text-dark">{{ upcomingEvents.length }}</h4>
                <small class="text-dark">Sự kiện sắp tới</small>
              </div>
              <div class="stat-card bg-white bg-opacity-20 rounded-3 p-3 text-center">
                <h4 class="fw-bold mb-0 text-dark">{{ events.length }}</h4>
                <small class="text-dark">Tổng sự kiện</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <div class="row">
        <div class="col-lg-3 mb-4">
          <div class="card border-0 shadow-sm sticky-top" style="top: 100px;">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0 fw-bold">
                <i class="fas fa-filter me-2"></i>Bộ lọc sự kiện
              </h5>
            </div>
            <div class="card-body">
              <div class="mb-4">
                <h6 class="fw-bold mb-3 filter-heading">Loại sự kiện</h6>
                <div class="event-categories">
                  <button 
                    v-for="category in eventCategories" 
                    :key="category"
                    @click="filterEvents(category)"
                    class="btn btn-outline-primary btn-sm mb-2 me-2 w-100"
                    :class="{ 'active': selectedCategory === category }"
                  >
                    {{ category }}
                  </button>
                </div>
              </div>
              <div class="mb-4">
                <h6 class="fw-bold mb-3 filter-heading">Thời gian</h6>
                <div class="time-filters">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="timeFilter" value="all" v-model="timeFilter" @change="filterByTime">
                    <label class="form-check-label">Tất cả</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="timeFilter" value="today" v-model="timeFilter" @change="filterByTime">
                    <label class="form-check-label">Hôm nay</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="timeFilter" value="week" v-model="timeFilter" @change="filterByTime">
                    <label class="form-check-label">Tuần này</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="timeFilter" value="month" v-model="timeFilter" @change="filterByTime">
                    <label class="form-check-label">Tháng này</label>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <h6 class="fw-bold mb-3 filter-heading">Thông báo</h6>
                <button @click="subscribeNotifications" class="btn btn-success w-100">
                  <i class="fas fa-bell me-2"></i>Đăng ký nhận thông báo
                </button>
              </div>
            </div>
          </div>
          <div class="card border-0 shadow-sm mt-4">
            <div class="card-header bg-secondary text-white">
              <h6 class="mb-0 fw-bold">
                <i class="fas fa-calendar me-2"></i>{{ currentMonth }} {{ currentYear }}
              </h6>
            </div>
            <div class="card-body p-2">
              <div class="mini-calendar">
                <div class="calendar-header d-flex justify-content-between text-center small fw-bold mb-2">
                  <div class="cal-day">CN</div>
                  <div class="cal-day">T2</div>
                  <div class="cal-day">T3</div>
                  <div class="cal-day">T4</div>
                  <div class="cal-day">T5</div>
                  <div class="cal-day">T6</div>
                  <div class="cal-day">T7</div>
                </div>
                <div class="calendar-body">
                  <div v-for="week in calendarWeeks" :key="week" class="calendar-week d-flex">
                    <div 
                      v-for="day in week" 
                      :key="day.date"
                      class="cal-day text-center p-1 small"
                      :class="{
                        'text-muted': !day.isCurrentMonth,
                        'bg-primary text-white rounded': day.isToday,
                        'has-event': hasEventOnDay(day.date)
                      }"
                    >
                      {{ day.day }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="h4 fw-bold mb-0 section-heading">Tất cả sự kiện ({{ filteredEvents.length }})</h2>
              <select class="form-select" style="width: auto;" v-model="sortBy" @change="sortEvents">
                <option value="date">Sắp xếp theo ngày</option>
                <option value="popular">Phổ biến nhất</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>

            <div class="row g-4" v-if="filteredEvents.length > 0">
              <div class="col-md-6" v-for="event in filteredEvents" :key="event.id">
                <div class="card border-0 shadow-lg event-card featured">
                  <div class="position-relative overflow-hidden">
                    <img :src="event.image" class="card-img-top" :alt="event.title" style="height: 200px; object-fit: cover;">
                    <div class="event-date-badge position-absolute top-0 start-0 m-3">
                      <div class="badge bg-primary p-3 rounded-3 text-center">
                        <div class="fw-bold fs-5">{{ formatDay(event.date) }}</div>
                        <div class="small">{{ formatMonth(event.date) }}</div>
                      </div>
                    </div>
                    <div class="event-status-badge position-absolute top-0 end-0 m-3">
                      <span class="badge fs-6 rounded-pill" 
                            :class="{
                              'bg-success': event.status === 'confirmed',
                              'bg-warning': event.status === 'pending',
                              'bg-danger': event.status === 'cancelled'
                            }">
                        {{ getStatusText(event.status) }}
                      </span>
                    </div>
                  </div>
                  <div class="card-body p-4">
                    <div class="event-category mb-2">
                      <span class="badge bg-light text-dark">{{ event.category }}</span>
                    </div>
                    <h5 class="card-title fw-bold mb-3 event-title">{{ event.title }}</h5>
                    <p class="card-text text-muted mb-3">{{ event.description }}</p>
                    <div class="event-details mb-3">
                      <div class="d-flex align-items-center mb-2">
                        <i class="fas fa-clock text-primary me-2"></i>
                        <span class="small">{{ event.time }}</span>
                      </div>
                      <div class="d-flex align-items-center mb-2">
                        <i class="fas fa-map-marker-alt text-primary me-2"></i>
                        <span class="small">{{ event.location }}</span>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-users text-primary me-2"></i>
                        <span class="small">{{ event.attendees }}/{{ event.maxAttendees }} người tham gia</span>
                      </div>
                    </div>
                    <button @click="registerEvent(event)" 
                            class="btn btn-primary w-100 rounded-pill"
                            :disabled="event.attendees >= event.maxAttendees">
                      <i class="fas fa-ticket-alt me-2"></i>
                      {{ event.attendees >= event.maxAttendees ? 'Đã hết chỗ' : 'Đăng ký tham gia' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-5">
              <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
              <h4 class="text-muted">Không có sự kiện nào</h4>
              <p class="text-muted">Thử thay đổi bộ lọc để xem thêm sự kiện</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="registrationModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Đăng ký tham gia sự kiện</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedEvent">
              <h6 class="fw-bold">{{ selectedEvent.title }}</h6>
              <p class="text-muted">{{ selectedEvent.description }}</p>
              
              <form @submit.prevent="submitRegistration">
                <div class="mb-3">
                  <label class="form-label">Họ và tên</label>
                  <input type="text" class="form-control" v-model="registrationForm.name" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="registrationForm.email" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Số điện thoại</label>
                  <input type="tel" class="form-control" v-model="registrationForm.phone" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Ghi chú (tùy chọn)</label>
                  <textarea class="form-control" rows="3" v-model="registrationForm.notes"></textarea>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary" @click="submitRegistration" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ isSubmitting ? 'Đang đăng ký...' : 'Xác nhận đăng ký' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoHeader from '../components/LogoHeader.vue'

export default {
  name: 'SuKien',
  components: {
    LogoHeader
  },
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'Vue.js 3 Workshop - From Basics to Advanced',
          description: 'Học Vue.js 3 từ cơ bản đến nâng cao với các chuyên gia từ Google',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-06-20',
          time: '09:00 - 17:00',
          location: 'TechHub Vietnam, TP.HCM',
          category: 'Workshop',
          status: 'confirmed',
          attendees: 45,
          maxAttendees: 50,
          price: 500000
        },
        {
          id: 2,
          title: 'AI & Machine Learning Meetup',
          description: 'Khám phá xu hướng AI và Machine Learning mới nhất',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-06-22',
          time: '14:00 - 18:00',
          location: 'Saigon Innovation Hub',
          category: 'Meetup',
          status: 'confirmed',
          attendees: 120,
          maxAttendees: 150,
          price: 0
        },
        {
          id: 3,
          title: 'Docker & Kubernetes Workshop',
          description: 'Học cách triển khai ứng dụng với Docker và Kubernetes',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-06-25',
          time: '08:30 - 16:30',
          location: 'Hanoi Tech Center',
          category: 'Workshop',
          status: 'confirmed',
          attendees: 30,
          maxAttendees: 40,
          price: 600000
        },
        {
          id: 4,
          title: 'React Native Mobile Development Meetup',
          description: 'Tìm hiểu cách xây dựng ứng dụng di động với React Native',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-06-27',
          time: '15:00 - 19:00',
          location: 'Da Nang Startup Hub',
          category: 'Meetup',
          status: 'pending',
          attendees: 80,
          maxAttendees: 100,
          price: 0
        },
        {
          id: 5,
          title: 'Web Security Conference 2025',
          description: 'Thảo luận về các kỹ thuật bảo mật web hiện đại',
          image: 'https://images.unsplash.com/photo-1554260570-9147fd3e6894?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-06-30',
          time: '09:00 - 17:00',
          location: 'TP.HCM Convention Center',
          category: 'Conference',
          status: 'confirmed',
          attendees: 200,
          maxAttendees: 250,
          price: 1000000
        },
        {
          id: 6,
          title: 'TypeScript Advanced Webinar',
          description: 'Nâng cao kỹ năng TypeScript với các chuyên gia hàng đầu',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-07-01',
          time: '19:00 - 21:00',
          location: 'Online (Zoom)',
          category: 'Webinar',
          status: 'confirmed',
          attendees: 150,
          maxAttendees: 200,
          price: 200000
        },
        {
          id: 7,
          title: 'DevOps with AWS Workshop',
          description: 'Học cách triển khai CI/CD với AWS',
          image: 'https://images.unsplash.com/photo-1623479322729-28b25b6f1287?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-07-03',
          time: '08:00 - 16:00',
          location: 'Hanoi AWS Center',
          category: 'Workshop',
          status: 'confirmed',
          attendees: 25,
          maxAttendees: 35,
          price: 700000
        },
        {
          id: 8,
          title: 'Flutter Development Meetup',
          description: 'Khám phá Flutter để phát triển ứng dụng di động',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-07-05',
          time: '13:00 - 17:00',
          location: 'TP.HCM Startup Hub',
          category: 'Meetup',
          status: 'confirmed',
          attendees: 90,
          maxAttendees: 120,
          price: 0
        },
        {
          id: 9,
          title: 'GraphQL API Development Webinar',
          description: 'Học cách xây dựng API với GraphQL',
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-07-07',
          time: '18:00 - 20:00',
          location: 'Online (Google Meet)',
          category: 'Webinar',
          status: 'pending',
          attendees: 100,
          maxAttendees: 150,
          price: 150000
        },
        {
          id: 10,
          title: 'Tech Innovation Conference',
          description: 'Khám phá các xu hướng công nghệ mới nhất',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
          date: '2025-07-10',
          time: '08:00 - 18:00',
          location: 'Hanoi Convention Center',
          category: 'Conference',
          status: 'confirmed',
          attendees: 300,
          maxAttendees: 400,
          price: 1200000
        }
      ],
      eventCategories: ['Tất cả', 'Workshop', 'Meetup', 'Webinar', 'Conference'],
      selectedCategory: 'Tất cả',
      timeFilter: 'all',
      sortBy: 'date',
      selectedEvent: null,
      registrationForm: {
        name: '',
        email: '',
        phone: '',
        notes: ''
      },
      isSubmitting: false,
      currentMonth: 'Tháng 6',
      currentYear: 2025,
      calendarWeeks: []
    }
  },
  computed: {
    upcomingEvents() {
      const today = new Date()
      return this.events.filter(event => new Date(event.date) >= today)
    },
    filteredEvents() {
      let filtered = this.events
      
      if (this.selectedCategory !== 'Tất cả') {
        filtered = filtered.filter(event => event.category === this.selectedCategory)
      }
      
      const today = new Date()
      switch (this.timeFilter) {
        case 'today':
          filtered = filtered.filter(event => {
            const eventDate = new Date(event.date)
            return eventDate.toDateString() === today.toDateString()
          })
          break
        case 'week':
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(event => {
            const eventDate = new Date(event.date)
            return eventDate >= today && eventDate <= weekFromNow
          })
          break
        case 'month':
          const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
          filtered = filtered.filter(event => {
            const eventDate = new Date(event.date)
            return eventDate >= today && eventDate <= monthFromNow
          })
          break
      }
      
      return filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'popular':
            return b.attendees - a.attendees
          case 'newest':
            return new Date(b.date) - new Date(a.date)
          default:
            return new Date(a.date) - new Date(b.date)
        }
      })
    }
  },
  mounted() {
    this.generateCalendar()
  },
  methods: {
    filterEvents(category) {
      this.selectedCategory = category
    },
    filterByTime() {},
    sortEvents() {},
    formatDay(dateString) {
      return new Date(dateString).getDate()
    },
    formatMonth(dateString) {
      const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
      return months[new Date(dateString).getMonth()]
    },
    getStatusText(status) {
      const statusMap = {
        'confirmed': 'Xác nhận',
        'pending': 'Chờ xác nhận',
        'cancelled': 'Đã hủy'
      }
      return statusMap[status] || status
    },
    registerEvent(event) {
      this.selectedEvent = event
      this.registrationForm = {
        name: '',
        email: '',
        phone: '',
        notes: ''
      }
      const modal = new bootstrap.Modal(document.getElementById('registrationModal'))
      modal.show()
    },
    submitRegistration() {
      this.isSubmitting = true
      setTimeout(() => {
        this.isSubmitting = false
        const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'))
        modal.hide()
        this.showToast('Đăng ký sự kiện thành công!')
        this.selectedEvent.attendees++
      }, 2000)
    },
    subscribeNotifications() {
      this.showToast('Đã đăng ký nhận thông báo sự kiện!')
    },
    generateCalendar() {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      this.calendarWeeks = []
      let currentWeek = []
      for (let i = 0; i < firstDay.getDay(); i++) {
        currentWeek.push({
          day: '',
          date: null,
          isCurrentMonth: false,
          isToday: false
        })
      }
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day)
        currentWeek.push({
          day: day,
          date: date,
          isCurrentMonth: true,
          isToday: date.toDateString() === today.toDateString()
        })
        if (currentWeek.length === 7) {
          this.calendarWeeks.push(currentWeek)
          currentWeek = []
        }
      }
      while (currentWeek.length < 7 && currentWeek.length > 0) {
        currentWeek.push({
          day: '',
          date: null,
          isCurrentMonth: false,
          isToday: false
        })
      }
      if (currentWeek.length > 0) {
        this.calendarWeeks.push(currentWeek)
      }
    },
    hasEventOnDay(date) {
      if (!date) return false
      const dateString = date.toISOString().split('T')[0]
      return this.events.some(event => event.date === dateString)
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
.custom-events-title {
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.section-heading {
  color: #2c3e50 !important;
}

.filter-heading {
  color: #495057 !important;
}

.event-title {
  color: #2c3e50 !important;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #007bff, #0056b3) !important;
}

.event-card {
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
}

.event-card.featured {
  border: 2px solid #007bff;
}

.event-date-badge .badge {
  background: rgba(0,123,255,0.9) !important;
  backdrop-filter: blur(10px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mini-calendar .cal-day {
  flex: 1;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mini-calendar .cal-day:hover {
  background: #f8f9fa;
  border-radius: 4px;
}

.mini-calendar .has-event {
  background: #e3f2fd;
  border-radius: 4px;
  font-weight: bold;
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
  .custom-events-title {
    font-size: 2rem;
  }
  
  .event-stats {
    justify-content: center !important;
  }
  
  .stat-card {
    min-width: 100px;
  }
}
</style>