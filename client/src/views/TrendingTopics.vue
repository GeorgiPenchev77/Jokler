<template>
  <div id="trending-section">
    <h1 class="heading">Top 10 Trending Hashtags</h1>

    <div id="hashtag-list">
      <div v-if="loading" class="loading">Loading hashtags...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="!loading && !error">
        <li
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
        </li>
      </ul>
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
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

#trending-section {
  background-color: #121212;  /* Dark background for sleek look */
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  margin: 0 auto; /* Center the container */
  box-sizing: border-box;
}

#hashtag-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.heading {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.hashtag-item {
  display: flex;
  justify-content: space-between; /* Space out rank and info */
  align-items: center; /* Center vertically */
  padding: 15px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.hashtag-item:hover {
  transform: scale(1.03);
}

.rank {
  margin-right: 20px;
}

.rank-number {
  font-size: 36px;
  font-weight: bold;
  font-optical-sizing:initial;
  color: #00b8d9;
}

.hashtag-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.hashtag-name {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
}

.posts-count {
  font-size: 14px;
  color: #999;
  text-align: center;
  align-self: center;
}
</style>
