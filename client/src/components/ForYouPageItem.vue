<template>
  <div>
    <div class="header">
      <h2>For You</h2>
      <div class="search-bar">
        <input
          class="form-control"
          type="text"
          placeholder="Search for a jokle"
          v-model="search"
        />
        <button class="btn" @click="findJokle">Search</button>
      </div>
    </div>
    <!-- jokle list -->
    <div class="jokle-list" v-if="!searched">
      <div v-for="Jokle in Jokles" :key="Jokle._id" class="jokle-item">
        <div class="jokle-header">
          <!-- Profile picture -->
          <img
            class="profile-pic"
            :src="Jokle.profilePic"
            alt="Profile Picture"
          />
          <div class="jokle-info">
            <strong>{{ Jokle.username }}</strong>
            <span class="handle">@{{ Jokle.handle }}</span>
            <span class="jokle-date">• {{ Jokle.date }}</span>
          </div>
        </div>
        <!-- jokle content -->
        <p class="jokle-content">{{ Jokle.content }}</p>
        <!-- Engagement section -->
        <div class="jokle-actions">
          <div class="icon">💬 {{ Jokle.comments.length }}</div>
          <div class="icon">🔁 {{ Jokle.rejokles }}</div>
          <div class="icon">😠 {{ Jokle.dislikes }}</div>
          <div class="icon">🔗</div>
        </div>
      </div>
    </div>
    <!-- Search result -->
    <div class="search-result" v-else-if="searched">
      <p>{{ filteredJokles.username }}</p>
      <p>Email: {{ filteredJokles.email }}</p>
      <button class="btn" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'For-You-Page',
  props: ['For-You-Page'],
  data() {
    return {
      Jokles: [],
      search: '',
      searched: false,
      filteredJokles: {}
    }
  },
  mounted() {
    this.getAllJokles()
  },
  methods: {
    async getAllJokles() {
      Api.get('/posts')
        .then(response => { this.Jokles = response.data })
        .catch(error => {
          console.error('Error fetching jokles:', error)
        })
    },
    async findJokle() {
      const size = this.Jokles.length
      for (let i = 0; i < size; i++) {
        if (this.Jokles[i].firstName === this.search) {
          this.filteredJokles = this.Jokles[i]
          this.searched = true
        }
      }
    },
    goBack() {
      this.searched = false
    }
  }
}
</script>

<style scoped>
/* General layout */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.form-control {
  width: 300px;
  padding: 8px;
  font-size: 14px;
}

.btn {
  padding: 8px 12px;
  background-color: darkcyan;
  color: white;
  border: none;
  cursor: pointer;
}

/* jokle list layout */
.jokle-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}

.jokle-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

/* jokle header layout */
.jokle-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.profile-pic {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.jokle-info {
  display: flex;
  gap: 5px;
  align-items: center;
}

.handle {
  color: gray;
}

.jokle-date {
  color: gray;
}

/* jokle content */
.jokle-content {
  margin: 8px 0;
  font-size: 15px;
}

/* jokle actions layout */
.jokle-actions {
  display: flex;
  justify-content: space-around;
  color: gray;
}

.icon {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
