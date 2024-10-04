<template>
  <div class="home-container">
    <!-- Sidebar Section -->
    <aside class="sidebar" >
      <ul>
        <li @click="navigateTo('home')">Home</li>
        <li @click="navigateTo('create')">Create Jokle</li>
        <li @click="navigateTo('profile')">Profile</li>
        <!-- Add more pages as needed -->
      </ul>
    </aside>

    <!-- Main Content Section -->
    <main class="main-content">
      <!-- Latest Jokles Feed -->
      <section v-if="currentPage === 'home'" class="latest-jokles">
        <h2>Latest Jokles</h2>
        <ul>
          <li v-for="jokle in jokles" :key="jokle._id">
            <div class="jokle">
              <p>{{ jokle.content }}</p>
              <span class="date">{{ jokle.date }}</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- Jokle Creation Form -->
      <section v-if="currentPage === 'create'" class="create-jokle">
        <h2>Create a Jokle</h2>
        <form @submit.prevent="createJokle">
          <textarea v-model="newJokleContent" placeholder="What's on your mind?" required></textarea>
          <button type="submit">Post Jokle</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  data() {
    return {
      jokles: [], // Holds latest Jokles
      newJokleContent: '', // Content for new Jokle
      currentPage: 'home' // Tracks current page for switching between views
    }
  },
  methods: {
    // Fetch latest Jokles from backend (API)
    async fetchLatestJokles() {
      Api.get('/posts').then(response => { this.jokles = response.data }).catch(error => {
        console.error('Error fetching Jokles:', error)
      })
    },

    // Create a new Jokle and post it to the backend (API)
    async createJokle() {
      try {
        const response = await fetch('http://localhost:3001/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: this.newJokleContent })
        })

        if (response.ok) {
          this.newJokleContent = '' // Reset the form
          this.fetchLatestJokles() // Reload the latest Jokles
        } else {
          console.error('Failed to post Jokle')
        }
      } catch (error) {
        console.error('Error posting Jokle:', error)
      }
    },

    // Navigate to different sections
    navigateTo(page) {
      this.currentPage = page
    }
  },
  mounted() {
    // Fetch latest Jokles when component mounts
    this.fetchLatestJokles()
  }
}
</script>
