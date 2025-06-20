<template>
  <div class="login-container d-flex justify-content-center align-items-center min-vh-100">
    <div class="login-background"></div>
    <div class="login-particles"></div>
    
    <div class="card login-card p-0 shadow-xl position-relative">
      <div class="card-body p-5">
        <!-- Header -->
        <div class="text-center mb-4">
          <div class="login-logo mb-3">
            <i class="fas fa-leaf text-success fs-1"></i>
          </div>
          <h2 class="mb-2 fw-bold text-white">Đăng nhập</h2>
          <p class="text-white-75 mb-0">Chào mừng bạn quay trở lại với Energy Pilates</p>
        </div>
        
        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form" novalidate>
          <div class="mb-4">
            <div class="input-group-modern">
              <div class="input-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <input 
                v-model="form.email" 
                type="email" 
                class="form-control-modern" 
                placeholder="Nhập email của bạn"
                required
                :class="{ 'is-invalid': errors.email }"
              />
            </div>
            <div v-if="errors.email" class="invalid-feedback d-block">
              {{ errors.email }}
            </div>
          </div>
          
          <div class="mb-4">
            <div class="input-group-modern">
              <div class="input-icon">
                <i class="fas fa-lock"></i>
              </div>
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                class="form-control-modern" 
                placeholder="Nhập mật khẩu"
                required
                :class="{ 'is-invalid': errors.password }"
              />
              <div class="password-toggle" @click="togglePassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </div>
            </div>
            <div v-if="errors.password" class="invalid-feedback d-block">
              {{ errors.password }}
            </div>
          </div>
          
          <!-- Remember Me & Forgot Password -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="rememberMe" id="rememberMe">
              <label class="form-check-label text-white-75" for="rememberMe">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a href="#" class="text-warning text-decoration-none fw-medium" @click.prevent="forgotPassword">
              Quên mật khẩu?
            </a>
          </div>
          
          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn btn-gradient w-100 mb-4 btn-lg"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">
              <i class="fas fa-sign-in-alt me-2"></i>Đăng nhập
            </span>
            <span v-else>
              <div class="spinner-border spinner-border-sm me-2"></div>
              Đang xử lý...
            </span>
          </button>
          
          <!-- Register Link -->
          <div class="text-center">
            <p class="text-white-75 mb-0">
              Chưa có tài khoản? 
              <router-link to="/register" class="text-warning text-decoration-none fw-bold">
                Đăng ký ngay
              </router-link>
            </p>
          </div>
        </form>
        
        <!-- Alert Messages -->
        <div v-if="message" class="alert-modern mt-4" :class="messageType">
          <div class="alert-icon">
            <i :class="messageType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'"></i>
          </div>
          <div class="alert-content">
            {{ message }}
          </div>
          <button class="alert-close" @click="clearMessage">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      message: '',
      messageType: '',
      showPassword: false,
      rememberMe: false,
      isLoading: false
    }
  },
  mounted() {
    this.checkRememberedLogin()
  },
  methods: {
    validateForm() {
      this.errors = {}
      
      if (!this.form.email) {
        this.errors.email = 'Email không được để trống'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Email không đúng định dạng'
      }
      
      if (!this.form.password) {
        this.errors.password = 'Mật khẩu không được để trống'
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    async handleLogin() {
      if (!this.validateForm()) return
      
      this.isLoading = true
      this.clearMessage()
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const users = JSON.parse(localStorage.getItem('users')) || []
        const user = users.find(u => 
          u.email.toLowerCase() === this.form.email.toLowerCase() && 
          u.password === this.form.password
        )

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          
          if (this.rememberMe) {
            localStorage.setItem('rememberedLogin', JSON.stringify({
              email: this.form.email,
              timestamp: Date.now()
            }))
          }
          
          this.showMessage('Đăng nhập thành công! Chuyển hướng...', 'success')
          
          setTimeout(() => {
            this.$router.push('/main')
          }, 1000)
        } else {
          this.showMessage('Email hoặc mật khẩu không chính xác', 'error')
        }
      } catch (error) {
        this.showMessage('Có lỗi xảy ra. Vui lòng thử lại', 'error')
      } finally {
        this.isLoading = false
      }
    },
    
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    
    forgotPassword() {
      this.showMessage('Tính năng đặt lại mật khẩu sẽ sớm được cập nhật', 'info')
    },
    
    showMessage(text, type) {
      this.message = text
      this.messageType = type
      
      if (type === 'success' || type === 'info') {
        setTimeout(() => {
          this.clearMessage()
        }, 3000)
      }
    },
    
    clearMessage() {
      this.message = ''
      this.messageType = ''
    },
    
    checkRememberedLogin() {
      const remembered = JSON.parse(localStorage.getItem('rememberedLogin'))
      if (remembered && Date.now() - remembered.timestamp < 30 * 24 * 60 * 60 * 1000) { // 30 days
        this.form.email = remembered.email
        this.rememberMe = true
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #28a745 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.login-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent);
  background-size: 300px 300px;
  animation: float 15s infinite linear;
}

@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-300px, -300px); }
}

.login-card {
  max-width: 450px;
  width: 100%;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  animation: slideInUp 0.6s ease;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-logo {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.text-white-75 {
  color: rgba(255, 255, 255, 0.75) !important;
}

.input-group-modern {
  position: relative;
  margin-bottom: 8px;
}

.input-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  z-index: 2;
  font-size: 1.1rem;
}

.form-control-modern {
  width: 100%;
  padding: 18px 20px 18px 55px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-control-modern::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-control-modern:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.form-control-modern.is-invalid {
  border-color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
}

.password-toggle {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease;
  font-size: 1.1rem;
}

.password-toggle:hover {
  color: white;
}

.form-check-input {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.form-check-input:checked {
  background: #28a745;
  border-color: #28a745;
}

.form-check-label {
  font-size: 0.9rem;
}

.btn-gradient {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  border-radius: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 15px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.95rem;
}

.btn-gradient:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(40, 167, 69, 0.4);
  background: linear-gradient(135deg, #20c997, #28a745);
}

.btn-gradient:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.divider-text {
  background: rgba(255, 255, 255, 0.1);
  padding: 0 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  border-radius: 20px;
}

.invalid-feedback {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: 500;
}

.alert-modern {
  border-radius: 15px;
  border: none;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  backdrop-filter: blur(10px);
  animation: slideInDown 0.3s ease;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-modern.success {
  background: rgba(40, 167, 69, 0.2);
  border: 2px solid rgba(40, 167, 69, 0.4);
  color: #d4edda;
}

.alert-modern.error {
  background: rgba(220, 53, 69, 0.2);
  border: 2px solid rgba(220, 53, 69, 0.4);
  color: #f8d7da;
}

.alert-modern.info {
  background: rgba(23, 162, 184, 0.2);
  border: 2px solid rgba(23, 162, 184, 0.4);
  color: #d1ecf1;
}

.alert-icon {
  margin-right: 12px;
  font-size: 1.2rem;
}

.alert-content {
  flex: 1;
  font-weight: 500;
}

.alert-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.alert-close:hover {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 576px) {
  .login-card {
    margin: 20px;
    max-width: none;
  }
  
  .card-body {
    padding: 2rem 1.5rem !important;
  }
  
  .form-control-modern {
    padding: 15px 15px 15px 45px;
  }
  
  .input-icon {
    left: 15px;
  }
  
  .password-toggle {
    right: 15px;
  }
}

@media (max-width: 400px) {
  .card-body {
    padding: 1.5rem 1rem !important;
  }
}

/* Focus states for accessibility */
.btn:focus,
.form-control-modern:focus,
.form-check-input:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

/* Loading animation */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>