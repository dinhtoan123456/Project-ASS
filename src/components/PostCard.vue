<template>
  <div class="card mb-4">
    <img :src="`/src/assets/${post.image}`" class="card-img-top" alt="Ảnh bài viết" />
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text"><small class="text-muted">Bởi {{ post.author }} - {{ post.time }}</small></p>
      <p class="card-text">{{ post.content.substring(0, 100) }}...</p>
      <router-link :to="`/post/${post.id}`" class="btn btn-outline-success">Xem chi tiết</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
};
</script>
