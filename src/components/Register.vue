<template>
  <div class="login-container">
    <div class="card p-4 shadow-sm">
      <h3 class="text-center mb-3">Đăng ký</h3>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <input v-model="form.email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input v-model="form.password" type="password" class="form-control" placeholder="Mật khẩu" required />
        </div>
        <div class="mb-3">
          <input v-model="form.confirmPassword" type="password" class="form-control" placeholder="Xác nhận mật khẩu" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Đăng ký</button>
      </form>
      <div class="text-center mt-2">
        <router-link to="/login">Đã có tài khoản? Đăng nhập</router-link>
      </div>
      <div v-if="message" class="alert alert-info mt-3 text-center p-2">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      form: { email: '', password: '', confirmPassword: '' }
    };
  },
  methods: {
    handleRegister() {
      const { email, password, confirmPassword } = this.form;
      if (!email || !password || !confirmPassword) {
        this.message = "Vui lòng nhập đầy đủ thông tin.";
        return;
      }
      if (password !== confirmPassword) {
        this.message = "Mật khẩu không khớp.";
        return;
      }
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.email === email)) {
        this.message = "Email đã được đăng ký.";
        return;
      }
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      this.message = "Đăng ký thành công! Bạn có thể đăng nhập.";
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 3rem auto;
}
</style>
