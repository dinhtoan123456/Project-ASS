<template>
  <div class="about-page bg-light min-vh-100">
    <!-- Logo Header -->
    <div class="container">
      <LogoHeader />
    </div>

    <div class="about-header bg-gradient-primary py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3" style="color: #0000FF;">Giới thiệu về TechVerse</h1>
            <p class="lead mb-0" style="color: #0000FF;">
              Nền tảng chia sẻ kiến thức công nghệ hàng đầu Việt Nam
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="about-illustration">
              <i class="fas fa-rocket fa-5x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <!-- Mission Section -->
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
          <div class="card border-0 shadow-lg p-5">
            <h2 class="h3 fw-bold mb-4 text-primary">Sứ mệnh của chúng tôi</h2>
            <p class="lead mb-4">
              TechVerse được tạo ra với sứ mệnh giúp cộng đồng developer Việt Nam phát triển 
              và cập nhật những xu hướng công nghệ mới nhất.
            </p>
            <p class="text-muted">
              Chúng tôi tin rằng công nghệ có thể thay đổi thế giới, và kiến thức công nghệ 
              phải được chia sẻ một cách miễn phí và dễ tiếp cận cho mọi người.
            </p>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="h3 fw-bold text-center mb-5">Giá trị cốt lõi</h2>
          <div class="row g-4">
            <div class="col-md-4" v-for="(value, index) in coreValues" :key="index">
              <div class="card border-0 shadow-sm h-100 text-center p-4 value-card">
                <div class="value-icon mb-3">
                  <i :class="value.icon" class="fa-3x text-primary"></i>
                </div>
                <h5 class="fw-bold mb-3">{{ value.title }}</h5>
                <p class="text-muted">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="h3 fw-bold text-center mb-5">Đội ngũ của chúng tôi</h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3" v-for="(member, index) in teamMembers" :key="index">
              <div class="card border-0 shadow-sm text-center team-card">
                <div class="card-body p-4">
                  <div class="team-avatar mb-3">
                    <img :src="member.avatar" :alt="member.name" class="rounded-circle" width="80" height="80">
                  </div>
                  <h5 class="fw-bold mb-1">{{ member.name }}</h5>
                  <p class="text-primary mb-2">{{ member.position }}</p>
                  <p class="text-muted small mb-3">{{ member.description }}</p>
                  <div class="social-links">
                    <a v-for="(social, platform) in member.social" :key="platform" 
                       :href="social" class="btn btn-outline-primary btn-sm rounded-circle me-2" target="_blank">
                      <i :class="`fab fa-${platform}`"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technologies Section -->
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="h3 fw-bold text-center mb-5">Công nghệ chúng tôi sử dụng</h2>
          <div class="card border-0 shadow-lg p-5">
            <div class="row g-4">
              <div class="col-md-6 col-lg-3" v-for="(tech, index) in technologies" :key="index">
                <div class="tech-item text-center p-3 tech-card" @mouseover="animateTechIcon(index)">
                  <div class="tech-icon mb-3" :ref="`techIcon${index}`">
                    <i :class="tech.icon" class="fa-3x" :style="{ color: tech.color }"></i>
                  </div>
                  <h6 class="fw-bold mb-2">{{ tech.name }}</h6>
                  <p class="text-muted small mb-0">{{ tech.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="card border-0 bg-primary text-white">
            <div class="card-body p-5">
              <h2 class="h3 fw-bold text-center mb-5">Thành tựu của chúng tôi</h2>
              <div class="row g-4 text-center">
                <div class="col-md-3" v-for="(stat, index) in stats" :key="index">
                  <div class="stat-item">
                    <div class="stat-icon mb-3">
                      <i :class="stat.icon" class="fa-2x"></i>
                    </div>
                    <h3 class="fw-bold mb-2" :ref="`statNumber${index}`">{{ stat.number }}</h3>
                    <p class="mb-0 opacity-90">{{ stat.label }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="card border-0 shadow-lg">
            <div class="card-body p-5 text-center">
              <h2 class="h3 fw-bold mb-4">Liên hệ với chúng tôi</h2>
              <p class="text-muted mb-4">
                Bạn có câu hỏi hoặc muốn hợp tác? Hãy liên hệ với chúng tôi!
              </p>
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="contact-item">
                    <div class="contact-icon mb-3">
                      <i class="fas fa-envelope fa-2x text-primary"></i>
                    </div>
                    <h6 class="fw-bold">Email</h6>
                    <p class="text-muted">contact@techverse.vn</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="contact-item">
                    <div class="contact-icon mb-3">
                      <i class="fas fa-phone fa-2x text-primary"></i>
                    </div>
                    <h6 class="fw-bold">Điện thoại</h6>
                    <p class="text-muted">+84 123 456 789</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="contact-item">
                    <div class="contact-icon mb-3">
                      <i class="fas fa-map-marker-alt fa-2x text-primary"></i>
                    </div>
                    <h6 class="fw-bold">Địa chỉ</h6>
                    <p class="text-muted">Biên Hòa, Việt Nam</p>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div class="social-links">
                  <a href="#" class="btn btn-primary btn-lg rounded-circle me-3">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="btn btn-info btn-lg rounded-circle me-3">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="btn btn-danger btn-lg rounded-circle me-3">
                    <i class="fab fa-youtube"></i>
                  </a>
                  <a href="#" class="btn btn-dark btn-lg rounded-circle">
                    <i class="fab fa-github"></i>
                  </a>
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
  name: 'GioiThieu',
  components: {
    LogoHeader
  },
  data() {
    return {
      coreValues: [
        {
          icon: 'fas fa-share-alt',
          title: 'Chia sẻ kiến thức',
          description: 'Chúng tôi tin rằng kiến thức cần được chia sẻ để cộng đồng phát triển.'
        },
        {
          icon: 'fas fa-rocket',
          title: 'Đổi mới sáng tạo',
          description: 'Luôn cập nhật và ứng dụng những công nghệ mới nhất.'
        },
        {
          icon: 'fas fa-users',
          title: 'Cộng đồng',
          description: 'Xây dựng một cộng đồng developer mạnh mẽ và hỗ trợ lẫn nhau.'
        }
      ],
      teamMembers: [
        {
          name: 'Nguyễn Văn A',
          position: 'Founder & CEO',
          description: 'Full-stack developer với 10+ năm kinh nghiệm',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
          social: {
            github: '#',
            linkedin: '#',
            twitter: '#'
          }
        },
        {
          name: 'Trần Thị B',
          position: 'CTO',
          description: 'Chuyên gia về AI và Machine Learning',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
          social: {
            github: '#',
            linkedin: '#'
          }
        },
        {
          name: 'Lê Văn C',
          position: 'Lead Developer',
          description: 'Frontend specialist, UI/UX enthusiast',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
          social: {
            github: '#',
            twitter: '#'
          }
        },
        {
          name: 'Phạm Thị D',
          position: 'Content Manager',
          description: 'Chuyên gia về content và marketing',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
          social: {
            linkedin: '#',
            twitter: '#'
          }
        }
      ],
      technologies: [
        {
          name: 'Vue.js',
          icon: 'fab fa-vuejs',
          color: '#4FC08D',
          description: 'Progressive framework'
        },
        {
          name: 'Node.js',
          icon: 'fab fa-node-js',
          color: '#339933',
          description: 'JavaScript runtime'
        },
        {
          name: 'Python',
          icon: 'fab fa-python',
          color: '#3776AB',
          description: 'AI & Backend'
        },
        {
          name: 'Docker',
          icon: 'fab fa-docker',
          color: '#2496ED',
          description: 'Containerization'
        },
        {
          name: 'AWS',
          icon: 'fab fa-aws',
          color: '#FF9900',
          description: 'Cloud platform'
        },
        {
          name: 'JavaScript',
          icon: 'fab fa-js-square',
          color: '#F7DF1E',
          description: 'Core language'
        },
        {
          name: 'React',
          icon: 'fab fa-react',
          color: '#61DAFB',
          description: 'UI library'
        },
        {
          name: 'Git',
          icon: 'fab fa-git-alt',
          color: '#F05032',
          description: 'Version control'
        }
      ],
      stats: [
        {
          icon: 'fas fa-users',
          number: '10K+',
          label: 'Thành viên'
        },
        {
          icon: 'fas fa-newspaper',
          number: '500+',
          label: 'Bài viết'
        },
        {
          icon: 'fas fa-video',
          number: '100+',
          label: 'Video'
        },
        {
          icon: 'fas fa-download',
          number: '1M+',
          label: 'Lượt tải'
        }
      ]
    };
  },
  mounted() {
    this.animateOnScroll();
  },
  methods: {
    animateTechIcon(index) {
      const icon = this.$refs[`techIcon${index}`];
      if (icon && icon[0]) {
        icon[0].style.transform = 'scale(1.2) rotate(360deg)';
        icon[0].style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          icon[0].style.transform = 'scale(1) rotate(0deg)';
        }, 500);
      }
    },
    animateOnScroll() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      // Animate cards
      document.querySelectorAll('.value-card, .team-card, .tech-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
      });
    }
  }
};
</script>

<style scoped>
.value-card, .team-card, .tech-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover, .team-card:hover, .tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.team-avatar img {
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.tech-icon {
  transition: all 0.3s ease;
}

.tech-card:hover .tech-icon {
  transform: scale(1.1);
}

.social-links a {
  transition: transform 0.3s ease;
}

.social-links a:hover {
  transform: translateY(-3px);
}

.stat-item {
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
}

.stat-item:nth-child(2) { animation-delay: 0.2s; }
.stat-item:nth-child(3) { animation-delay: 0.4s; }
.stat-item:nth-child(4) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-item {
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
}

.contact-icon {
  transition: transform 0.3s ease;
}

.contact-item:hover .contact-icon {
  transform: scale(1.1);
}
</style>