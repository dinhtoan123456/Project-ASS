<template>
  <div class="create-post-page bg-light min-vh-100">
    <LogoHeader />
    
    <div class="create-post-header bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1 class="display-4 fw-bold mb-3">
              <i class="fas fa-pen-fancy me-3"></i>Tạo bài viết mới
            </h1>
            <p class="lead mb-0">
              Chia sẻ kiến thức và kinh nghiệm của bạn với cộng đồng TechVerse
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 shadow-lg">
            <div class="card-body p-5">
              <form @submit.prevent="submitPost">
                <!-- Post Image Upload -->
                <div class="mb-4">
                  <label class="form-label fw-bold">Ảnh bìa bài viết</label>
                  <div class="image-upload-area" @click="triggerImageUpload" @dragover.prevent @drop.prevent="handleImageDrop">
                    <div v-if="!postForm.image" class="upload-placeholder">
                      <i class="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
                      <h5>Nhấp để tải ảnh lên</h5>
                      <p class="text-muted">Hoặc kéo thả ảnh vào đây</p>
                      <small class="text-muted">Hỗ trợ JPG, PNG, GIF (tối đa 5MB)</small>
                    </div>
                    <div v-else class="uploaded-image">
                      <img :src="postForm.image" alt="Preview" class="img-fluid rounded">
                      <div class="image-overlay">
                        <button type="button" class="btn btn-danger btn-sm" @click.stop="removeImage">
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref="imageInput" 
                    @change="handleImageUpload" 
                    accept="image/*" 
                    style="display: none;"
                  />
                  <div v-if="errors.image" class="text-danger mt-2">{{ errors.image }}</div>
                </div>

                <!-- Post Title -->
                <div class="mb-4">
                  <label class="form-label fw-bold">Tiêu đề bài viết *</label>
                  <input 
                    type="text" 
                    class="form-control form-control-modern" 
                    v-model="postForm.title"
                    :class="{ 'is-invalid': errors.title }"
                    placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                    maxlength="100"
                  />
                  <div class="form-text">{{ postForm.title.length }}/100 ký tự</div>
                  <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                </div>

                <!-- Post Excerpt -->
                <div class="mb-4">
                  <label class="form-label fw-bold">Mô tả ngắn</label>
                  <textarea 
                    class="form-control form-control-modern" 
                    rows="3"
                    v-model="postForm.excerpt"
                    placeholder="Viết mô tả ngắn gọn về nội dung bài viết..."
                    maxlength="200"
                  ></textarea>
                  <div class="form-text">{{ postForm.excerpt.length }}/200 ký tự</div>
                </div>

                <!-- Post Category -->
                <div class="mb-4">
                  <label class="form-label fw-bold">Danh mục *</label>
                  <select 
                    class="form-control form-control-modern" 
                    v-model="postForm.category"
                    :class="{ 'is-invalid': errors.category }"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Full-stack">Full-stack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="DevOps">DevOps</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Database">Database</option>
                    <option value="Security">Security</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Tools">Tools</option>
                  </select>
                  <div v-if="errors.category" class="invalid-feedback">{{ errors.category }}</div>
                </div>

                <!-- Post Tags -->
                <div class="mb-4">
                  <label class="form-label fw-bold">Tags</label>
                  <div class="tags-input">
                    <div class="tags-display d-flex flex-wrap gap-2 mb-2">
                      <span 
                        v-for="(tag, index) in postForm.tags" 
                        :key="index"
                        class="badge bg-primary px-3 py-2 tag-item"
                      >
                        {{ tag }}
                        <button type="button" class="btn-close btn-close-white ms-2" @click="removeTag(index)"></button>
                      </span>
                    </div>
                    <input 
                      type="text" 
                      class="form-control form-control-modern" 
                      v-model="currentTag"
                      @keypress.enter.prevent="addTag"
                      @keypress.comma.prevent="addTag"
                      placeholder="Nhập tag và nhấn Enter hoặc dấu phẩy..."
                    />
                    <small class="form-text text-muted">Nhấn Enter hoặc dấu phẩy để thêm tag</small>
                  </div>
                </div>

                <!-- Post Content -->
                <div class="mb-4">
                  <label class="form-label fw-bold">Nội dung bài viết *</label>
                  <div class="content-editor">
                    <!-- Toolbar -->
                    <div class="editor-toolbar border rounded-top p-2 bg-light">
                      <div class="btn-group btn-group-sm me-2">
                        <button type="button" class="btn btn-outline-secondary" @click="formatText('bold')">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="formatText('italic')">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="formatText('underline')">
                          <i class="fas fa-underline"></i>
                        </button>
                      </div>
                      <div class="btn-group btn-group-sm me-2">
                        <button type="button" class="btn btn-outline-secondary" @click="insertHeading">
                          <i class="fas fa-heading"></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="insertList">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="insertLink">
                          <i class="fas fa-link"></i>
                        </button>
                      </div>
                      <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-outline-secondary" @click="insertCode">
                          <i class="fas fa-code"></i>
                        </button>
                      </div>
                    </div>
                    
                    <!-- Content textarea -->
                    <textarea 
                      ref="contentEditor"
                      class="form-control" 
                      rows="15"
                      v-model="postForm.content"
                      :class="{ 'is-invalid': errors.content }"
                      placeholder="Viết nội dung bài viết của bạn ở đây... 

Bạn có thể sử dụng:
- **Chữ đậm** hoặc *chữ nghiêng*
- # Tiêu đề lớn
- ## Tiêu đề nhỏ
- [Liên kết](url)
- `code inline`
- ```
  code block
  ```"
                      style="border-radius: 0 0 8px 8px; border-top: none; min-height: 300px; font-family: 'Times New Roman', Times, serif;"
                    ></textarea>
                  </div>
                  <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
                </div>

                <!-- Reading Time Estimate -->
                <div class="mb-4">
                  <div class="alert alert-info">
                    <i class="fas fa-clock me-2"></i>
                    Thời gian đọc ước tính: <strong>{{ estimatedReadTime }} phút</strong>
                    ({{ wordCount }} từ)
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex gap-2">
                    <button type="button" class="btn btn-outline-info rounded-pill" @click="previewPost">
                      <i class="fas fa-eye me-2"></i>Xem trước
                    </button>
                  </div>
                  
                  <div class="d-flex gap-2">
                    <router-link to="/posts" class="btn btn-outline-secondary rounded-pill">
                      <i class="fas fa-times me-2"></i>Hủy
                    </router-link>
                    <button type="submit" class="btn btn-primary btn-lg rounded-pill px-4" :disabled="isSubmitting">
                      <span v-if="isSubmitting">
                        <div class="spinner-border spinner-border-sm me-2"></div>
                        Đang đăng...
                      </span>
                      <span v-else>
                        <i class="fas fa-paper-plane me-2"></i>Đăng bài viết
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="previewModalLabel">
              <i class="fas fa-eye me-2"></i>Xem trước bài viết
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="preview-content">
              <div v-if="postForm.image" class="preview-image mb-4">
                <img :src="postForm.image" alt="Post image" class="img-fluid rounded">
              </div>
              <h1 class="preview-title" style="font-family: 'Times New Roman', Times, serif;">{{ postForm.title || 'Tiêu đề bài viết' }}</h1>
              <div class="preview-meta mb-4">
                <span class="badge bg-primary me-2">{{ postForm.category || 'Danh mục' }}</span>
                <span class="text-muted">
                  <i class="fas fa-clock me-1"></i>{{ estimatedReadTime }} phút đọc
                </span>
                <span class="text-muted ms-3">
                  <i class="fas fa-user me-1"></i>Bạn
                </span>
              </div>
              <div class="preview-excerpt text-muted mb-4" v-if="postForm.excerpt">
                {{ postForm.excerpt }}
              </div>
              <div class="preview-tags mb-4" v-if="postForm.tags.length > 0">
                <span v-for="tag in postForm.tags" :key="tag" class="badge bg-light text-dark me-2">
                  #{{ tag }}
                </span>
              </div>
              <div class="preview-content-text" v-html="getFormattedContent()" style="font-family: 'Times New Roman', Times, serif;"></div>
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
  name: 'UpPost',
  components: {
    LogoHeader
  },
  data() {
    return {
      postForm: {
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [],
        image: '',
        author: 'Bạn'
      },
      currentTag: '',
      isSubmitting: false,
      errors: {}
    }
  },
  computed: {
    wordCount() {
      return this.postForm.content.split(/\s+/).filter(word => word.length > 0).length
    },
    estimatedReadTime() {
      return Math.max(1, Math.ceil(this.wordCount / 200))
    }
  },
  methods: {
    triggerImageUpload() {
      this.$refs.imageInput.click()
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.processImageFile(file)
    },
    handleImageDrop(event) {
      const file = event.dataTransfer.files[0]
      this.processImageFile(file)
    },
    processImageFile(file) {
      if (!file) return
      if (!file.type.startsWith('image/')) {
        this.errors.image = 'Vui lòng chọn file ảnh hợp lệ'
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        this.errors.image = 'Kích thước ảnh không được vượt quá 5MB'
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        this.postForm.image = e.target.result
        this.errors.image = ''
      }
      reader.readAsDataURL(file)
    },
    removeImage() {
      this.postForm.image = ''
      this.$refs.imageInput.value = ''
    },
    addTag() {
      const tag = this.currentTag.trim().replace(',', '')
      if (tag && !this.postForm.tags.includes(tag) && this.postForm.tags.length < 10) {
        this.postForm.tags.push(tag)
        this.currentTag = ''
      }
    },
    removeTag(index) {
      this.postForm.tags.splice(index, 1)
    },
    formatText(command) {
      const textarea = this.$refs.contentEditor
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end)
      let formattedText = ''
      switch (command) {
        case 'bold':
          formattedText = `**${selectedText}**`
          break
        case 'italic':
          formattedText = `*${selectedText}*`
          break
        case 'underline':
          formattedText = `<u>${selectedText}</u>`
          break
      }
      if (formattedText) {
        this.insertTextAtCursor(formattedText, start, end)
      }
    },
    insertHeading() {
      this.insertTextAtCursor('## Tiêu đề\n\n')
    },
    insertList() {
      this.insertTextAtCursor('- Mục 1\n- Mục 2\n- Mục 3\n\n')
    },
    insertLink() {
      this.insertTextAtCursor('[Tên liên kết](url)')
    },
    insertCode() {
      this.insertTextAtCursor('```\ncode ở đây\n```\n\n')
    },
    insertTextAtCursor(text, start = null, end = null) {
      const textarea = this.$refs.contentEditor
      const cursorStart = start !== null ? start : textarea.selectionStart
      const cursorEnd = end !== null ? end : textarea.selectionEnd
      const before = this.postForm.content.substring(0, cursorStart)
      const after = this.postForm.content.substring(cursorEnd)
      this.postForm.content = before + text + after
      this.$nextTick(() => {
        textarea.focus()
        textarea.setSelectionRange(cursorStart + text.length, cursorStart + text.length)
      })
    },
    validateForm() {
      this.errors = {}
      if (!this.postForm.title.trim()) {
        this.errors.title = 'Vui lòng nhập tiêu đề bài viết'
      } else if (this.postForm.title.length > 100) {
        this.errors.title = 'Tiêu đề không được vượt quá 100 ký tự'
      }
      if (!this.postForm.category) {
        this.errors.category = 'Vui lòng chọn danh mục'
      }
      if (!this.postForm.content.trim()) {
        this.errors.content = 'Vui lòng nhập nội dung bài viết'
      } else if (this.postForm.content.length < 100) {
        this.errors.content = 'Nội dung bài viết phải có ít nhất 100 ký tự'
      }
      return Object.keys(this.errors).length === 0
    },
    async submitPost() {
      if (!this.validateForm()) {
        console.log('Validation errors:', this.errors);
        return;
      }
      this.isSubmitting = true;
      try {
        console.log('Submitting post form:', this.postForm);
        const newPost = {
          id: Date.now(),
          ...this.postForm,
          publishDate: new Date().toLocaleDateString('vi-VN'),
          views: 0,
          readTime: this.estimatedReadTime,
          createdAt: new Date().toISOString()
        };
        const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
        userPosts.unshift(newPost);
        console.log('Posts before save:', userPosts);
        localStorage.setItem('userPosts', JSON.stringify(userPosts));
        console.log('Posts after save:', localStorage.getItem('userPosts'));
        this.showToast('Đăng bài viết thành công!', 'success');
        console.log('Redirecting to /posts');
        this.$router.push('/posts');
        setTimeout(() => window.location.reload(), 100); // Reload after redirect
      } catch (error) {
        console.error('Error during submission:', error);
        this.showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
      } finally {
        this.isSubmitting = false;
      }
    },
    previewPost() {
      const modal = new bootstrap.Modal(document.getElementById('previewModal'));
      if (modal) {
        modal.show();
      } else {
        console.error('Bootstrap Modal is not available');
      }
    },
    getFormattedContent() {
      let content = this.postForm.content || 'Nội dung bài viết sẽ hiển thị ở đây...';
      content = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
        .replace(/^# (.*$)/gim, '<h2>$1</h2>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/\n/g, '<br>');
      content = content.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
      return content;
    },
    showToast(message, type = 'success') {
      const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
      const toast = document.createElement('div');
      toast.className = `toast-notification position-fixed bottom-0 end-0 m-4 p-3 ${bgClass} text-white rounded`;
      toast.style.zIndex = '9999';
      toast.innerHTML = `
        <div class="d-flex align-items-center">
          <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
          ${message}
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  }
}
</script>

<style scoped>
.create-post-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.image-upload-area {
  border: 2px dashed #dee2e6;
  border-radius: 15px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-upload-area:hover {
  border-color: #667eea;
  background-color: rgba(102, 126, 234, 0.05);
}

.uploaded-image {
  position: relative;
  max-width: 100%;
}

.uploaded-image img {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
}

.form-control-modern {
  border-radius: 10px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.form-control-modern:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.tags-input {
  border-radius: 10px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  cursor: default;
}

.tag-item .btn-close {
  font-size: 0.7rem;
  padding: 0;
  margin: 0;
  width: 16px;
  height: 16px;
}

.editor-toolbar {
  border-bottom: none !important;
}

.content-editor textarea {
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.6;
}

.preview-content {
  max-height: 70vh;
  overflow-y: auto;
}

.preview-title {
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', Times, serif;
}

.preview-meta {
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.preview-content-text {
  line-height: 1.8;
  color: #495057;
  font-family: 'Times New Roman', Times, serif;
}

.preview-content-text h2,
.preview-content-text h3 {
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.preview-content-text code {
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.preview-content-text pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.preview-content-text ul {
  padding-left: 2rem;
}

.preview-content-text li {
  margin-bottom: 0.5rem;
}

.alert {
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
  border-left: 4px solid #17a2b8;
}

.modal-content {
  border-radius: 15px;
  border: none;
}

.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px 15px 0 0;
}

.btn-close {
  filter: invert(1);
}

.upload-placeholder h5 {
  color: #495057;
}

@media (max-width: 768px) {
  .image-upload-area {
    padding: 2rem 1rem;
  }
  
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }
  
  .d-flex.justify-content-between > div {
    justify-content: center;
  }
}
</style>