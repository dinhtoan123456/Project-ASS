<template>
  <div class="profile-container">
    <!-- Header Section -->
    <div class="profile-header py-3 border-bottom">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          
          <!-- Thông tin người dùng -->
          <div class="d-flex align-items-center">
            <label
              class="profile-avatar-large me-4 mb-0"
              v-if="isEditing"
            >
              <input
                ref="fileInput"
                type="file"
                @change="handleAvatarChange"
                accept="image/*"
                style="display: none"
              />
              <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="avatar-img editable-avatar" />
              <div v-else class="avatar-placeholder editable-avatar">
                <i class="fas fa-user"></i>
              </div>
            </label>

            <div v-else class="profile-avatar-large me-4">
              <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="avatar-img" />
              <div v-else class="avatar-placeholder">
                <i class="fas fa-user"></i>
              </div>
            </div>

            <div>
              <h1 class="profile-name mb-2">{{ user.name || 'Người dùng' }}</h1>
              <p class="profile-email mb-1">{{ user.email }}</p>
              <div class="profile-badges">
                <span class="badge bg-primary me-2">
                  <i class="fas fa-star me-1"></i>Thành viên
                </span>
                <span class="badge bg-success">
                  <i class="fas fa-calendar me-1"></i>Tham gia {{ formatJoinDate() }}
                </span>
              </div>
            </div>
          </div>

          <!-- Nút quay lại trang chủ -->
          <div class="position-relative z-1">
            <button
              @click="$router.push('/')"
              class="btn btn-outline-secondary rounded-pill"
              title="Quay lại trang chủ"
            >
              <i class="fas fa-home me-1"></i> Trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mt-5">
      <div class="row g-4">
        <!-- Personal Information and Other Cards -->
        <div class="col-lg-8">
          <div class="card profile-card mb-4">
            <div class="card-header bg-gradient-primary text-white">
              <h5 class="mb-0 d-flex align-items-center">
                <i class="fas fa-user-circle me-2"></i>Thông tin cá nhân
              </h5>
            </div>
            <div class="card-body p-4">
              <div class="row g-4">
                <div class="col-md-6">
                  <label class="form-label fw-medium">Họ và tên</label>
                  <input 
                    v-model="editForm.name" 
                    :disabled="!isEditing || isLocked" 
                    class="form-control form-control-modern"
                    :class="{ 'is-invalid': errors.name }"
                    placeholder="Nhập họ và tên"
                  />
                  <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-medium">Email</label>
                  <input 
                    v-model="editForm.email" 
                    disabled 
                    class="form-control form-control-modern bg-light" 
                    placeholder="Email không thể thay đổi"
                  />
                  <small class="text-muted">Email không thể thay đổi sau khi đăng ký</small>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-medium">Giới tính</label>
                  <select 
                    v-model="editForm.gender" 
                    :disabled="!isEditing || isLocked" 
                    class="form-control form-control-modern"
                    :class="{ 'is-invalid': errors.gender }"
                  >
                    <option value="" disabled>Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  <div v-if="errors.gender" class="invalid-feedback">{{ errors.gender }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-medium">Ngày tháng năm sinh</label>
                  <input 
                    v-model="editForm.dob" 
                    :disabled="!isEditing || isLocked" 
                    type="date" 
                    class="form-control form-control-modern"
                    :class="{ 'is-invalid': errors.dob }"
                  />
                  <div v-if="errors.dob" class="invalid-feedback">{{ errors.dob }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-medium">Số điện thoại</label>
                  <input 
                    v-model="editForm.phone" 
                    :disabled="!isEditing || isLocked" 
                    class="form-control form-control-modern"
                    :class="{ 'is-invalid': errors.phone }"
                    placeholder="Nhập số điện thoại"
                  />
                  <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-medium">Địa chỉ</label>
                  <input 
                    v-model="editForm.address" 
                    :disabled="!isEditing || isLocked" 
                    class="form-control form-control-modern"
                    :class="{ 'is-invalid': errors.address }"
                    placeholder="Nhập địa chỉ"
                  />
                  <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-medium">Giới thiệu</label>
                  <textarea 
                    v-model="editForm.bio" 
                    :disabled="isLocked"
                    class="form-control form-control-modern" 
                    rows="4"
                    placeholder="Viết vài dòng giới thiệu về bản thân..."
                  ></textarea>
                </div>
              </div>
              <hr class="mt-4" />
              <div class="col-md-4 text-md-end">
                <button 
                  v-if="!isEditing" 
                  @click="startEditing" 
                  class="btn btn-outline-primary btn-lg rounded-pill px-4"
                >
                  <i class="fas fa-edit me-2"></i>Chỉnh sửa hồ sơ
                </button>
                <div v-else class="text-end mt-4 d-flex gap-2 justify-content-end">
                  <button 
                    @click="saveChanges" 
                    class="btn btn-success btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2" 
                    :disabled="isSaving"
                  >
                    <i class="fas fa-save me-2" v-if="!isSaving"></i>
                    <div class="spinner-border spinner-border-sm me-2" v-else></div>
                    <span>{{ isSaving ? 'Đang lưu...' : 'Lưu' }}</span>
                  </button>
                  <button 
                    @click="cancelEditing" 
                    class="btn btn-outline-secondary btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2"
                  >
                    <i class="fas fa-times me-2"></i>
                    <span>Hủy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Stats -->
          <div class="card profile-card mb-4">
            <div class="card-header bg-gradient-secondary text-white">
              <h5 class="mb-0 d-flex align-items-center">
                <i class="fas fa-chart-line me-2"></i>Hoạt động của bạn
              </h5>
            </div>
            <div class="card-body p-4">
              <div class="row g-4 text-center">
                <div class="col-md-3 col-6">
                  <div class="stat-item">
                    <div class="stat-icon bg-primary">
                      <i class="fas fa-book-open"></i>
                    </div>
                    <h4 class="stat-number">{{ userStats.postsRead }}</h4>
                    <p class="stat-label">Bài viết đã đọc</p>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <div class="stat-item">
                    <div class="stat-icon bg-danger">
                      <i class="fas fa-heart"></i>
                    </div>
                    <h4 class="stat-number">{{ userStats.postsLiked }}</h4>
                    <p class="stat-label">Bài viết yêu thích</p>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <div class="stat-item">
                    <div class="stat-icon bg-warning">
                      <i class="fas fa-bookmark"></i>
                    </div>
                    <h4 class="stat-number">{{ userStats.postsBookmarked }}</h4>
                    <p class="stat-label">Đã lưu</p>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <div class="stat-item">
                    <div class="stat-icon bg-info">
                      <i class="fas fa-calendar-check"></i>
                    </div>
                    <h4 class="stat-number">{{ userStats.daysActive }}</h4>
                    <p class="stat-label">Ngày hoạt động</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- My Posts -->
          <div class="card profile-card mb-4">
            <div class="card-header bg-gradient-success text-white">
              <h5 class="mb-0 d-flex align-items-center">
                <i class="fas fa-pen-square me-2"></i>Bài viết của tôi
              </h5>
            </div>
            <div class="card-body p-4">
              <div v-if="myPosts.length > 0" class="row g-4">
                <div class="col-md-6" v-for="post in paginatedMyPosts" :key="post.id">
                  <div class="position-relative">
                    <PostCard :post="post" />
                    <button 
                      @click="confirmDeletePost(post.id)" 
                      class="btn btn-danger btn-sm position-absolute top-0 end-0 mt-2 me-2"
                      style="z-index: 1;"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <nav aria-label="Pagination" class="mt-5">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentMyPostsPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="changeMyPostsPage(currentMyPostsPage - 1)">
                        <i class="fas fa-chevron-left"></i>
                      </a>
                    </li>
                    <li class="page-item" v-for="page in totalMyPostsPages" :key="page" :class="{ active: currentMyPostsPage === page }">
                      <a class="page-link" href="#" @click.prevent="changeMyPostsPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentMyPostsPage === totalMyPostsPages }">
                      <a class="page-link" href="#" @click.prevent="changeMyPostsPage(currentMyPostsPage + 1)">
                        <i class="fas fa-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div v-else class="text-center py-5 text-muted">
                <i class="fas fa-pen-square fa-3x mb-3"></i>
                <p>Bạn chưa đăng bài viết nào.</p>
                <router-link to="/create-post" class="btn btn-primary rounded-pill mt-3">
                  <i class="fas fa-plus me-2"></i>Tạo bài viết mới
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Quick Actions -->
          <div class="card profile-card mb-4">
            <div class="card-header bg-gradient-success text-white">
              <h5 class="mb-0 d-flex align-items-center">
                <i class="fas fa-bolt me-2"></i>Thao tác nhanh
              </h5>
            </div>
            <div class="card-body p-4">
              <div class="d-grid gap-3">
                <router-link to="/posts" class="btn btn-outline-primary rounded-pill">
                  <i class="fas fa-newspaper me-2"></i>Xem bài viết mới
                </router-link>
                <router-link to="/profile/liked" class="btn btn-outline-danger rounded-pill">
                  <i class="fas fa-heart me-2"></i>Bài viết yêu thích
                </router-link>
                <router-link to="/profile/bookmarks" class="btn btn-outline-warning rounded-pill">
                  <i class="fas fa-bookmark me-2"></i>Bài viết đã lưu
                </router-link>
                <button @click="downloadData" class="btn btn-outline-info rounded-pill">
                  <i class="fas fa-download me-2"></i>Tải dữ liệu
                </button>
              </div>
            </div>
          </div>

          <!-- Account Settings -->
          <div class="card profile-card mb-4">
            <div class="card-header bg-gradient-dark text-white">
              <h5 class="mb-0 d-flex align-items-center">
                <i class="fas fa-cog me-2"></i>Cài đặt tài khoản
              </h5>
            </div>
            <div class="card-body p-4">
              <div class="d-grid gap-3">
                <div class="form-check form-switch">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="emailNotifications"
                    v-model="settings.emailNotifications"
                    @change="updateSettings"
                  >
                  <label class="form-check-label" for="emailNotifications">
                    Nhận email thông báo
                  </label>
                </div>
                <div class="form-check form-switch">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="newsletterSubscription"
                    v-model="settings.newsletterSubscription"
                    @change="updateSettings"
                  >
                  <label class="form-check-label" for="newsletterSubscription">
                    Đăng ký newsletter
                  </label>
                </div>
                <div class="form-check form-switch">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="darkMode"
                    v-model="settings.darkMode"
                    @change="toggleDarkMode"
                  >
                  <label class="form-check-label" for="darkMode">
                    Chế độ tối
                  </label>
                </div>
                <hr>
                <button @click="confirmLogout" class="btn btn-outline-danger rounded-pill">
                  <i class="fas fa-sign-out-alt me-2"></i>Đăng xuất
                </button>
                <button @click="confirmDeleteAccount" class="btn btn-danger rounded-pill">
                  <i class="fas fa-trash me-2"></i>Xóa tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Enhanced Alert Messages -->
    <div v-if="message" class="alert-overlay">
      <div class="alert-modern" :class="messageType">
        <div class="alert-icon">
          <i :class="getAlertIcon()"></i>
        </div>
        <div class="alert-content">
          <h5 class="alert-title">{{ getAlertTitle() }}</h5>
          <p class="alert-text">{{ message }}</p>
        </div>
        <button class="alert-close" @click="clearMessage">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from './PostCard.vue';

export default {
  name: 'Profile',
  components: {
    PostCard
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        avatar: '',
        bio: '',
        gender: '',
        dob: '',
        phone: '',
        address: '',
        joinDate: new Date()
      },
      editForm: {
        name: '',
        email: '',
        bio: '',
        gender: '',
        dob: '',
        phone: '',
        address: ''
      },
      settings: {
        emailNotifications: true,
        newsletterSubscription: true,
        darkMode: false
      },
      userStats: {
        postsRead: 0,
        postsLiked: 0,
        postsBookmarked: 0,
        daysActive: 0
      },
      isEditing: false,
      isSaving: false,
      isLocked: false,
      errors: {},
      message: '',
      messageType: '',
      currentMyPostsPage: 1,
      postsPerPage: 6
    }
  },
  computed: {
    myPosts: {
      get() {
        return JSON.parse(localStorage.getItem('userPosts')) || [];
      },
      set(newPosts) {
        localStorage.setItem('userPosts', JSON.stringify(newPosts));
      }
    },
    paginatedMyPosts() {
      const start = (this.currentMyPostsPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.myPosts.slice(start, end);
    },
    totalMyPostsPages() {
      return Math.ceil(this.myPosts.length / this.postsPerPage);
    }
  },
  mounted() {
    this.loadUserData();
    this.loadUserStats();
    this.loadSettings();
  },
  methods: {
    loadUserData() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        this.user = { ...this.user, ...currentUser };
        this.editForm = {
          name: this.user.name,
          email: this.user.email,
          bio: this.user.bio || '',
          gender: this.user.gender || '',
          dob: this.user.dob || '',
          phone: this.user.phone || '',
          address: this.user.address || ''
        };
      } else {
        this.$router.push('/login');
      }
    },
    
    loadUserStats() {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
      const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts')) || [];
      const readPosts = JSON.parse(localStorage.getItem('readPosts')) || [];
      
      this.userStats = {
        postsRead: readPosts.length,
        postsLiked: likedPosts.length,
        postsBookmarked: bookmarkedPosts.length,
        daysActive: this.calculateDaysActive()
      };
    },
    
    loadSettings() {
      const userSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
      this.settings = { ...this.settings, ...userSettings };
    },
    
    calculateDaysActive() {
      const joinDate = new Date(this.user.joinDate || new Date());
      const today = new Date();
      const diffTime = Math.abs(today - joinDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    
    formatJoinDate() {
      const date = new Date(this.user.joinDate || new Date());
      return date.toLocaleDateString('vi-VN', { 
        year: 'numeric', 
        month: 'long' 
      });
    },

    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    
    startEditing() {
      this.isEditing = true;
      this.isLocked = false;
      this.editForm = {
        name: this.user.name,
        email: this.user.email,
        bio: this.user.bio || '',
        gender: this.user.gender || '',
        dob: this.user.dob || '',
        phone: this.user.phone || '',
        address: this.user.address || ''
      };
      this.errors = {};
    },
    
    cancelEditing() {
      this.isEditing = false;
      this.isLocked = false;
      this.editForm = {
        name: this.user.name,
        email: this.user.email,
        bio: this.user.bio || '',
        gender: this.user.gender || '',
        dob: this.user.dob || '',
        phone: this.user.phone || '',
        address: this.user.address || ''
      };
      this.errors = {};
    },
    
    validateForm() {
      this.errors = {};

      if (!this.editForm.name.trim()) {
        this.errors.name = 'Tên không được để trống';
      }

      if (!this.editForm.gender) {
        this.errors.gender = 'Vui lòng chọn giới tính';
      }

      if (this.editForm.dob) {
        const today = new Date();
        const dob = new Date(this.editForm.dob);
        if (dob > today) {
          this.errors.dob = 'Ngày sinh không được lớn hơn ngày hiện tại';
        }
      }

      if (this.editForm.phone && !/^\d{10}$/.test(this.editForm.phone)) {
        this.errors.phone = 'Số điện thoại phải là 10 chữ số';
      }

      if (this.editForm.address && !this.editForm.address.trim()) {
        this.errors.address = 'Địa chỉ không được để trống';
      }

      return Object.keys(this.errors).length === 0;
    },
    
    async saveChanges() {
      if (!this.validateForm()) return;

      this.isSaving = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const updatedUser = {
          ...this.user,
          name: this.editForm.name,
          bio: this.editForm.bio,
          gender: this.editForm.gender,
          dob: this.editForm.dob,
          phone: this.editForm.phone,
          address: this.editForm.address
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === this.user.email);
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
        }

        this.user = updatedUser;
        this.isEditing = false;
        this.isLocked = true;
        this.showMessage('Cập nhật thông tin thành công!', 'success');
      } catch (error) {
        this.showMessage('Có lỗi xảy ra khi cập nhật thông tin', 'error');
      } finally {
        this.isSaving = false;
      }
    },
    
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editForm.avatar = e.target.result;
          this.user.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    
    updateSettings() {
      localStorage.setItem('userSettings', JSON.stringify(this.settings));
      this.showMessage('Cài đặt đã được cập nhật', 'success');
    },
    
    toggleDarkMode() {
      document.body.classList.toggle('dark-mode', this.settings.darkMode);
      this.updateSettings();
    },
    
    downloadData() {
      const userData = {
        profile: this.user,
        stats: this.userStats,
        settings: this.settings,
        likedPosts: JSON.parse(localStorage.getItem('likedPosts')) || [],
        bookmarkedPosts: JSON.parse(localStorage.getItem('bookmarkedPosts')) || []
      };
      
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `profile-data-${Date.now()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      this.showMessage('Dữ liệu đã được tải xuống', 'success');
    },
    
    confirmLogout() {
      if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        this.$router.push('/login');
      }
    },
    
    confirmDeleteAccount() {
      if (confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(u => u.email !== this.user.email);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        localStorage.removeItem('currentUser');
        this.showMessage('Tài khoản đã được xóa', 'success');
        setTimeout(() => {
          this.$router.push('/register');
        }, 2000);
      }
    },
    
    confirmDeletePost(postId) {
      if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
        this.deletePost(postId);
      }
    },
    
    deletePost(postId) {
      const updatedPosts = this.myPosts.filter(post => post.id !== postId);
      this.myPosts = updatedPosts;
      this.showMessage('Bài viết đã được xóa!', 'success');
    },
    
    showMessage(text, type) {
      this.message = text;
      this.messageType = type;
      setTimeout(() => {
        this.clearMessage();
      }, 3500); // Tăng thời gian hiển thị lên 3.5 giây
    },
    
    clearMessage() {
      this.message = '';
      this.messageType = '';
    },
    
    getAlertIcon() {
      switch (this.messageType) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-triangle';
        case 'info': return 'fas fa-info-circle';
        default: return 'fas fa-info-circle';
      }
    },
    
    getAlertTitle() {
      switch (this.messageType) {
        case 'success': return 'Thành công';
        case 'error': return 'Lỗi';
        case 'info': return 'Thông báo';
        default: return 'Thông báo';
      }
    },
    changeMyPostsPage(page) {
      if (page >= 1 && page <= this.totalMyPostsPages) {
        this.currentMyPostsPage = page;
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.profile-header {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.profile-avatar-large {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.editable-avatar:hover {
  opacity: 0.6;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.7);
}

.avatar-upload {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 35px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid white;
  transition: all 0.3s ease;
}

.avatar-upload:hover {
  background: #20c997;
  transform: scale(1.1);
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.profile-email {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.profile-badges .badge {
  font-size: 0.85rem;
  padding: 8px 12px;
  border-radius: 20px;
}

.profile-card {
  border: none;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #28a745, #20c997);
}

.bg-gradient-secondary {
  background: linear-gradient(135deg, #6c757d, #495057);
}

.bg-gradient-success {
  background: linear-gradient(135deg, #28a745, #20c997);
}

.bg-gradient-dark {
  background: linear-gradient(135deg, #343a40, #495057);
}

.form-control-modern {
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  background: white;
}

.form-control-modern:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.form-control-modern:disabled {
  background: #f8f9fa;
  border-color: #dee2e6;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.stat-item:hover {
  transform: translateY(-3px);
  border-color: #28a745;
  box-shadow: 0 10px 25px rgba(40, 167, 69, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  color: white;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  margin: 0;
  font-size: 0.9rem;
}

.form-check-input:checked {
  background-color: #28a745;
  border-color: #28a745;
}

.btn {
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-outline-primary:hover {
  background: #28a745;
  border-color: #28a745;
}

.alert-overlay {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1050;
  animation: slideInUp 0.4s ease-out;
}

.alert-modern {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background: white;
  max-width: 400px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border-left: 5px solid transparent;
}

.alert-modern.success {
  background: linear-gradient(135deg, #e8f5e9, #ffffff);
  border-left-color: #2e7d32;
}

.alert-modern.error {
  background: linear-gradient(135deg, #ffebee, #ffffff);
  border-left-color: #c62828;
}

.alert-modern.info {
  background: linear-gradient(135deg, #e1f5fe, #ffffff);
  border-left-color: #0288d1;
}

.alert-icon {
  font-size: 1.5rem;
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.alert-modern.success .alert-icon {
  color: #2e7d32;
}

.alert-modern.error .alert-icon {
  color: #c62828;
}

.alert-modern.info .alert-icon {
  color: #0288d1;
}

.alert-content {
  flex: 1;
}

.alert-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.alert-text {
  margin: 0;
  font-size: 0.95rem;
  color: #666;
}

.alert-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0 5px;
}

.alert-close:hover {
  color: #666;
}

.invalid-feedback {
  display: block;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Animations */
@keyframes slideInUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.alert-overlay.leaving {
  animation: fadeOut 0.3s ease forwards;
}

/* Dark mode support */
.dark-mode .profile-container {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.dark-mode .profile-card {
  background: #34495e;
  color: white;
}

.dark-mode .form-control-modern {
  background: #2c3e50;
  border-color: #34495e;
  color: white;
}

.dark-mode .stat-item {
  background: #2c3e50;
  color: white;
}

.dark-mode .alert-modern {
  background: linear-gradient(135deg, #2c3e50, #34495e);
}

.dark-mode .alert-title {
  color: #ecf0f1;
}

.dark-mode .alert-text {
  color: #bdc3c7;
}

.dark-mode .alert-close {
  color: #bdc3c7;
}

.dark-mode .alert-close:hover {
  color: #ecf0f1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header {
    padding: 2rem 0;
  }
  
  .profile-avatar-large {
    width: 80px;
    height: 80px;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .alert-overlay {
    bottom: 20px;
    right: 20px;
    left: 20px;
  }
  
  .alert-modern {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .stat-item {
    padding: 1rem;
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}
</style>