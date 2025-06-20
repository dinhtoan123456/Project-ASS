<template>
  <div class="register-container d-flex justify-content-center align-items-center min-vh-100">
    <div class="register-background"></div>
    <div class="register-particles"></div>
    
    <div class="card register-card p-0 shadow-xl position-relative">
      <div class="card-body p-5">
        <!-- Header -->
        <div class="text-center mb-4">
          <div class="register-logo mb-3">
            <i class="fas fa-user-plus text-success fs-1"></i>
          </div>
          <h2 class="mb-2 fw-bold text-white">Đăng ký tài khoản</h2>
          <p class="text-white-75 mb-0">Tham gia cộng đồng Technology Blog ngay hôm nay</p>
        </div>
        
        <!-- Progress Steps -->
        <div class="progress-steps mb-4">
          <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
            <div class="step-icon">
              <i class="fas fa-user"></i>
            </div>
            <span class="step-label">Thông tin</span>
          </div>
          <div class="step-connector"></div>
          <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
            <div class="step-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <span class="step-label">Bảo mật</span>
          </div>
          <div class="step-connector"></div>
          <div class="step" :class="{ active: currentStep >= 3 }">
            <div class="step-icon">
              <i class="fas fa-check"></i>
            </div>
            <span class="step-label">Hoàn thành</span>
          </div>
        </div>
        
        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="register-form" novalidate>
          <!-- Step 1: Personal Information -->
          <div v-show="currentStep === 1" class="step-content">
            <h5 class="text-white mb-4 text-center">Thông tin cá nhân</h5>
            
            <div class="mb-4">
              <div class="input-group-modern">
                <div class="input-icon">
                  <i class="fas fa-user"></i>
                </div>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="form-control-modern" 
                  placeholder="Họ và tên"
                  :class="{ 'is-invalid': errors.name }"
                  @input="validateField('name')"
                />
              </div>
              <div v-if="errors.name" class="invalid-feedback d-block">{{ errors.name }}</div>
            </div>
            
            <div class="mb-4">
              <div class="input-group-modern">
                <div class="input-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <input 
                  v-model="form.email" 
                  type="email" 
                  class="form-control-modern" 
                  placeholder="Địa chỉ email"
                  :class="{ 'is-invalid': errors.email }"
                  @input="validateField('email')"
                />
              </div>
              <div v-if="errors.email" class="invalid-feedback d-block">{{ errors.email }}</div>
            </div>
            
            <div class="mb-4">
              <div class="input-group-modern">
                <div class="input-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  class="form-control-modern" 
                  placeholder="Số điện thoại (tùy chọn)"
                  :class="{ 'is-invalid': errors.phone }"
                  @input="validateField('phone')"
                />
              </div>
              <div v-if="errors.phone" class="invalid-feedback d-block">{{ errors.phone }}</div>
            </div>
            
            <button 
              type="button" 
              @click="nextStep" 
              class="btn btn-gradient w-100 btn-lg"
              :disabled="!isStep1Valid"
            >
              Tiếp theo <i class="fas fa-arrow-right ms-2"></i>
            </button>
          </div>
          
          <!-- Step 2: Security -->
          <div v-show="currentStep === 2" class="step-content">
            <h5 class="text-white mb-4 text-center">Thiết lập bảo mật</h5>
            
            <div class="mb-4">
              <div class="input-group-modern">
                <div class="input-icon">
                  <i class="fas fa-lock"></i>
                </div>
                <input 
                  v-model="form.password" 
                  :type="showPassword ? 'text' : 'password'" 
                  class="form-control-modern" 
                  placeholder="Mật khẩu"
                  :class="{ 'is-invalid': errors.password }"
                  @input="validateField('password')"
                />
                <div class="password-toggle" @click="togglePassword">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </div>
              </div>
              <div v-if="errors.password" class="invalid-feedback d-block">{{ errors.password }}</div>
              
              <!-- Password Strength Indicator -->
              <div class="password-strength mt-2">
                <div class="strength-bar">
                  <div class="strength-fill" :style="{ width: passwordStrength.percentage + '%' }" :class="passwordStrength.class"></div>
                </div>
                <small class="text-white-75">{{ passwordStrength.text }}</small>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="input-group-modern">
                <div class="input-icon">
                  <i class="fas fa-lock"></i>
                </div>
                <input 
                  v-model="form.confirmPassword" 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  class="form-control-modern" 
                  placeholder="Xác nhận mật khẩu"
                  :class="{ 'is-invalid': errors.confirmPassword }"
                  @input="validateField('confirmPassword')"
                />
                <div class="password-toggle" @click="toggleConfirmPassword">
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </div>
              </div>
              <div v-if="errors.confirmPassword" class="invalid-feedback d-block">{{ errors.confirmPassword }}</div>
            </div>
            
            <div class="d-flex gap-3">
              <button type="button" @click="prevStep" class="btn btn-outline-light btn-lg flex-fill">
                <i class="fas fa-arrow-left me-2"></i>Quay lại
              </button>
              <button 
                type="button" 
                @click="nextStep" 
                class="btn btn-gradient btn-lg flex-fill"
                :disabled="!isStep2Valid"
              >
                Tiếp theo <i class="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
          
          <!-- Step 3: Terms & Completion -->
          <div v-show="currentStep === 3" class="step-content">
            <h5 class="text-white mb-4 text-center">Hoàn tất đăng ký</h5>
            
            <!-- Terms and Conditions -->
            <div class="terms-section mb-4">
              <div class="form-check mb-3">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  v-model="form.agreeTerms" 
                  id="agreeTerms"
                  :class="{ 'is-invalid': errors.agreeTerms }"
                >
                <label class="form-check-label text-white-75" for="agreeTerms">
                  Tôi đồng ý với 
                  <a href="#" class="text-warning" @click.prevent="showTerms">điều khoản sử dụng</a> 
                  và 
                  <a href="#" class="text-warning" @click.prevent="showPrivacy">chính sách bảo mật</a>
                </label>
              </div>
              
              <div class="form-check mb-3">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  v-model="form.subscribeNewsletter" 
                  id="subscribeNewsletter"
                >
                <label class="form-check-label text-white-75" for="subscribeNewsletter">
                  Nhận tin tức và cập nhật từ Energy Pilates (tùy chọn)
                </label>
              </div>
              
              <div v-if="errors.agreeTerms" class="invalid-feedback d-block">{{ errors.agreeTerms }}</div>
            </div>
            
            <!-- Final Actions -->
            <div class="d-flex gap-3">
              <button type="button" @click="prevStep" class="btn btn-outline-light btn-lg flex-fill">
                <i class="fas fa-arrow-left me-2"></i>Quay lại
              </button>
              <button 
                type="submit" 
                class="btn btn-gradient btn-lg flex-fill"
                :disabled="isLoading || !form.agreeTerms"
              >
                <span v-if="!isLoading">
                  <i class="fas fa-user-plus me-2"></i>Tạo tài khoản
                </span>
                <span v-else>
                  <div class="spinner-border spinner-border-sm me-2"></div>
                  Đang xử lý...
                </span>
              </button>
            </div>
          </div>
        </form>
        
        <!-- Login Link -->
        <div class="text-center mt-4">
          <p class="text-white-75 mb-0">
            Đã có tài khoản? 
            <router-link to="/login" class="text-warning text-decoration-none fw-bold">
              Đăng nhập ngay
            </router-link>
          </p>
        </div>
        
        <!-- Alert Messages -->
        <div v-if="message" class="alert-modern mt-4" :class="messageType">
          <div class="alert-icon">
            <i :class="getAlertIcon()"></i>
          </div>
          <div class="alert-content">{{ message }}</div>
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
  name: 'Register',
  data() {
    return {
      currentStep: 1,
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        subscribeNewsletter: true
      },
      errors: {},
      message: '',
      messageType: '',
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false
    }
  },
  computed: {
    isStep1Valid() {
      return this.form.name.trim() && 
             this.form.email.trim() && 
             this.isValidEmail(this.form.email) &&
             !this.errors.name && 
             !this.errors.email && 
             !this.errors.phone
    },
    isStep2Valid() {
      return this.form.password && 
             this.form.confirmPassword && 
             this.form.password === this.form.confirmPassword &&
             this.form.password.length >= 6 &&
             !this.errors.password && 
             !this.errors.confirmPassword
    },
    passwordStrength() {
      const password = this.form.password
      if (!password) return { percentage: 0, class: '', text: '' }
      
      let score = 0
      let feedback = []
      
      // Length check
      if (password.length >= 8) score += 20
      else feedback.push('ít nhất 8 ký tự')
      
      // Uppercase check
      if (/[A-Z]/.test(password)) score += 20
      else feedback.push('chữ hoa')
      
      // Lowercase check
      if (/[a-z]/.test(password)) score += 20
      else feedback.push('chữ thường')
      
      // Number check
      if (/\d/.test(password)) score += 20
      else feedback.push('số')
      
      // Special character check
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20
      else feedback.push('ký tự đặc biệt')
      
      let strength = ''
      let className = ''
      
      if (score < 40) {
        strength = 'Yếu'
        className = 'weak'
      } else if (score < 60) {
        strength = 'Trung bình'
        className = 'medium'
      } else if (score < 80) {
        strength = 'Mạnh'
        className = 'strong'
      } else {
        strength = 'Rất mạnh'
        className = 'very-strong'
      }
      
      if (feedback.length > 0) {
        strength += ` (cần: ${feedback.join(', ')})`
      }
      
      return {
        percentage: score,
        class: className,
        text: strength
      }
    }
  },
  methods: {
    validateField(field) {
      switch (field) {
        case 'name':
          if (!this.form.name.trim()) {
            this.errors.name = 'Họ và tên không được để trống'
          } else if (this.form.name.trim().length < 2) {
            this.errors.name = 'Họ và tên phải có ít nhất 2 ký tự'
          } else {
            delete this.errors.name
          }
          break
          
        case 'email':
          if (!this.form.email.trim()) {
            this.errors.email = 'Email không được để trống'
          } else if (!this.isValidEmail(this.form.email)) {
            this.errors.email = 'Email không đúng định dạng'
          } else {
            delete this.errors.email
          }
          break
          
        case 'phone':
          if (this.form.phone && !this.isValidPhone(this.form.phone)) {
            this.errors.phone = 'Số điện thoại không đúng định dạng'
          } else {
            delete this.errors.phone
          }
          break
          
        case 'password':
          if (!this.form.password) {
            this.errors.password = 'Mật khẩu không được để trống'
          } else if (this.form.password.length < 6) {
            this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
          } else {
            delete this.errors.password
          }
          break
          
        case 'confirmPassword':
          if (!this.form.confirmPassword) {
            this.errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
          } else if (this.form.password !== this.form.confirmPassword) {
            this.errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
          } else {
            delete this.errors.confirmPassword
          }
          break
      }
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    isValidPhone(phone) {
      const phoneRegex = /^[0-9+\-\s()]+$/
      return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, '').length >= 10
    },
    
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },
    
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    
    validateForm() {
      this.errors = {}
      
      // Validate all fields
      this.validateField('name')
      this.validateField('email')
      this.validateField('phone')
      this.validateField('password')
      this.validateField('confirmPassword')
      
      if (!this.form.agreeTerms) {
        this.errors.agreeTerms = 'Bạn phải đồng ý với điều khoản sử dụng'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    async handleRegister() {
      if (!this.validateForm()) return
      
      this.isLoading = true
      this.clearMessage()
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const users = JSON.parse(localStorage.getItem('users')) || []
        
        // Check if user already exists
        if (users.find(u => u.email.toLowerCase() === this.form.email.toLowerCase())) {
          this.showMessage('Email này đã được đăng ký', 'error')
          this.currentStep = 1
          return
        }
        
        // Create new user
        const newUser = {
          id: Date.now(),
          name: this.form.name.trim(),
          email: this.form.email.toLowerCase().trim(),
          phone: this.form.phone.trim(),
          password: this.form.password,
          avatar: '',
          bio: '',
          joinDate: new Date().toISOString(),
          subscribeNewsletter: this.form.subscribeNewsletter,
          isVerified: false
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        // Add to newsletter if subscribed
        if (this.form.subscribeNewsletter) {
          const subscribers = JSON.parse(localStorage.getItem('subscribers')) || []
          if (!subscribers.includes(newUser.email)) {
            subscribers.push(newUser.email)
            localStorage.setItem('subscribers', JSON.stringify(subscribers))
          }
        }
        
        this.showMessage('Đăng ký thành công! Đang chuyển hướng...', 'success')
        
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
        
      } catch (error) {
        this.showMessage('Có lỗi xảy ra. Vui lòng thử lại', 'error')
      } finally {
        this.isLoading = false
      }
    },
    
    showTerms() {
      this.showMessage('Điều khoản sử dụng sẽ được hiển thị trong phiên bản tiếp theo', 'info')
    },
    
    showPrivacy() {
      this.showMessage('Chính sách bảo mật sẽ được hiển thị trong phiên bản tiếp theo', 'info')
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
    
    getAlertIcon() {
      switch (this.messageType) {
        case 'success': return 'fas fa-check-circle'
        case 'error': return 'fas fa-exclamation-triangle'
        case 'info': return 'fas fa-info-circle'
        default: return 'fas fa-info-circle'
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.register-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.register-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent);
  background-size: 350px 350px;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-350px, -350px); }
}

.register-card {
  max-width: 500px;
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

.register-logo {
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

/* Progress Steps */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.step.active {
  opacity: 1;
}

.step.completed {
  opacity: 1;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.step.active .step-icon {
  background: rgba(40, 167, 69, 0.8);
  border-color: #28a745;
  transform: scale(1.1);
}

.step.completed .step-icon {
  background: #28a745;
  border-color: #28a745;
}

.step-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.step.active .step-label {
  color: white;
  font-weight: 600;
}

.step-connector {
  width: 60px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 1rem;
  margin-bottom: 32px;
}

/* Form Styling */
.step-content {
  animation: fadeInSlide 0.4s ease;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

/* Password Strength Indicator */
.password-strength {
  margin-top: 8px;
}

.strength-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  background: #dc3545;
}

.strength-fill.medium {
  background: #ffc107;
}

.strength-fill.strong {
  background: #28a745;
}

.strength-fill.very-strong {
  background: #20c997;
}

/* Terms Section */
.terms-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-check-input {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-top: 0.2rem;
}

.form-check-input:checked {
  background: #28a745;
  border-color: #28a745;
}

.form-check-input.is-invalid {
  border-color: #dc3545;
}

.form-check-label {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Buttons */
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

.btn-outline-light {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 15px;
  font-weight: 600;
  padding: 15px;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
}

/* Alert Messages */
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

.invalid-feedback {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 576px) {
  .register-card {
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
  
  .progress-steps {
    margin-bottom: 1.5rem;
  }
  
  .step-connector {
    width: 40px;
    margin: 0 0.5rem;
    margin-bottom: 32px;
  }
  
  .step-label {
    font-size: 0.7rem;
  }
}

@media (max-width: 400px) {
  .card-body {
    padding: 1.5rem 1rem !important;
  }
  
  .step-icon {
    width: 35px;
    height: 35px;
  }
  
  .step-connector {
    width: 30px;
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