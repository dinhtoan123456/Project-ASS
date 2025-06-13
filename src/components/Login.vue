<template>
  <div class="login-container">
    <div class="card p-4 shadow-sm">
      <h3 class="text-center mb-3">Đăng nhập</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <input v-model="form.email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input v-model="form.password" type="password" class="form-control" placeholder="Mật khẩu" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Đăng nhập</button>
      </form>
      <div class="text-center mt-2">
        <router-link to="/register">Chưa có tài khoản? Đăng ký</router-link>
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
      form: { email: '', password: '' }
    };
  },
  methods: {
    handleLogin() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        u => u.email === this.form.email && u.password === this.form.password
      );
      this.message = user ? 'Đăng nhập thành công!' : 'Sai tài khoản hoặc mật khẩu.';
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
