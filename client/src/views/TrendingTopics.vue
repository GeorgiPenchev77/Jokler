<template>
  <div class="trending-container">
    <h1 class="heading">Top 10 Trending Hashtags</h1>

    <div v-if="loading" class="loading">Loading hashtags...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error" class="hashtags-list">
      <div
        v-for="(hashtag, index) in topHashtags.slice(0, 10)"
        :key="hashtag._id"
        class="hashtag-item"
      >
        <div class="rank">
          <span class="rank-number">{{ formatRank(index + 1) }}</span>
        </div>
        <div class="hashtag-info">
          <div class="hashtag-name">#{{ hashtag.tag }}</div>
          <div class="posts-count">{{ hashtag.postCount }} posts</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Api } from '@/Api'

const topHashtags = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await Api.get('/hashtags?sortBy=related_posts&order=desc')
    topHashtags.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch trending hashtags'
    console.error('Failed to fetch trending hashtags:', err)
  } finally {
    loading.value = false
  }
})

const formatRank = (index) => {
  return index < 10 ? `0${index}` : index
}
</script>

<style scoped>
/* General container styles */
.trending-container {
  background-color: #121212;  /* Dark background for sleek look */
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  max-width: 600px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Loading and error states */
.loading {
  text-align: center;
  font-size: 16px;
  color: #999;
}

.error {
  text-align: center;
  font-size: 16px;
  color: #e74c3c;
}

/* Hashtags list styling */
.hashtags-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Individual hashtag item styling */
.hashtag-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.hashtag-item:hover {
  transform: scale(1.03);  /* Slight zoom on hover */
}

/* Rank number styling */
.rank {
  margin-right: 20px;
}

.rank-number {
  font-size: 30px;
  font-weight: bold;
  color: #00b8d9; /* Accent color for the rank */
}

/* Hashtag info */
.hashtag-info {
  display: flex;
  flex-direction: column;
}

.hashtag-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.posts-count {
  font-size: 14px;
  color: #999;
}
</style>
