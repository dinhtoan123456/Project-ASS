<template>
  <div class="logo-header-container">
    <router-link to="/" class="navbar-brand fw-bold text-primary fs-3 d-flex align-items-center text-decoration-none">
      <i class="fas fa-microchip me-2 text-info"></i>
      <span class="gradient-text">TechVerse</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LogoHeader'
}
</script>

<style scoped>
.logo-header-container {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  margin-bottom: 1rem;
}

.navbar-brand {
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  transform: translateY(-2px);
}

.navbar-brand:hover .fas {
  transform: scale(1.1);
}

.fas {
  transition: all 0.3s ease;
}

.gradient-text {
  background: linear-gradient(135deg, #007bff, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.navbar-brand:hover .gradient-text {
  background: linear-gradient(135deg, #28a745, #20c997);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.5rem !important;
  }
  
  .fas {
    font-size: 1.3rem !important;
  }
}
</style>
