<!-- views/Main.vue -->
<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <router-link class="navbar-brand fw-bold text-success" to="/">Energy Pilates</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><router-link class="nav-link" to="/posts">Bài viết</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/videos">Video</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/about">Giới thiệu</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/events">Sự kiện</router-link></li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Tài khoản</a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><router-link class="dropdown-item" to="/profile">Trang cá nhân</router-link></li>
              <li><router-link class="dropdown-item" to="/login">Đăng nhập</router-link></li>
              <li><router-link class="dropdown-item" to="/register">Đăng ký</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Banner -->
    <div class="banner bg-success text-white text-center py-5 mb-4">
      <h1 class="display-4">Chào mừng đến với Blog Pilates</h1>
      <p class="lead">Nơi chia sẻ kiến thức, kỹ thuật, và cảm hứng sống lành mạnh.</p>
    </div>

    <!-- Main content -->
    <div class="container">
      <div class="row">
        <!-- Post list -->
        <div class="col-md-8">
          <div class="card mb-4" v-for="(post, index) in posts" :key="index">
            <img :src="post.image" class="card-img-top" alt="image" />
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.excerpt }}</p>
              <router-link :to="`/posts/${post.id}`" class="btn btn-outline-success btn-sm">Xem thêm</router-link>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-md-4">
          <div class="card mb-3">
            <div class="card-header bg-light fw-bold">Danh mục</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="cat in categories" :key="cat">{{ cat }}</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-header bg-light fw-bold">Bài viết nổi bật</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="(p, i) in featuredPosts" :key="i">{{ p.title }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-light text-center text-muted py-4 mt-5 border-top">
      <small>&copy; 2025 Energy Pilates Blog. All rights reserved.</small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Phương pháp tập Pilates giúp phục hồi chấn thương',
          excerpt: 'Bài viết này chia sẻ các kỹ thuật hiệu quả trong Pilates để phục hồi...',
          image: 'https://via.placeholder.com/800x400'
        },
        {
          id: 2,
          title: 'Biết ơn đời, đời sẽ thương ta',
          excerpt: 'Cuộc sống cần có lòng biết ơn, hãy cùng tìm hiểu lý do vì sao...',
          image: 'https://via.placeholder.com/800x400'
        }
      ],
      categories: ['Sức khỏe', 'Dinh dưỡng', 'Chấn thương', 'Yoga', 'Motivation'],
      featuredPosts: [
        { title: 'Pilates buổi sáng tăng năng lượng' },
        { title: 'Top 5 bài tập giảm đau lưng' }
      ]
    };
  }
};
</script>

<style scoped>
.banner {
  background: linear-gradient(90deg, #38b000, #70e000);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
