<template>
    <div b-container class="float-container" fluid>
    <!-- Sidebar Section -->
    <div class="sidebar" >
      <ul>
        <li @click="navigateTo('home')">Home</li>
        <li @click="navigateTo('create')">Create post</li>
        <li @click="navigateTo('profile')">Profile</li>
        <!-- Add more pages as needed -->
      </ul>
    </div >

    <!-- Main Content Section -->
    <div class="main-page" >
      <!-- Latest posts Feed -->
      <section v-if="currentPage === 'home'" class="for-you-page">
        <h2 class="main-title">Trending in Gotham</h2>
        <ul>
          <li v-for="post in posts" :key="post._id">
            <div class="post">
              <span class="date">Date:{{ post.date }}</span>
              <p>{{ post.content }}</p>
              <p>Type:{{ post.type }}</p>
              <p>Rejokles:{{ post.rejokles }}</p>
              <p>Dislikes:{{ post.dislikes }}</p>
            </div>
          </li>
        </ul>
      </section>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  data() {
    return {
      posts: [], // Holds latest posts
      newpostContent: '', // Content for new post
      currentPage: 'home' // Tracks current page for switching between views
    }
  },
  methods: {
    // Fetch latest posts from backend (API)
    async fetchLatestposts() {
      Api.get('/posts').then(response => { this.posts = response.data }).catch(error => {
        console.error('Error fetching posts:', error)
      })
    },
    // Navigate to different sections
    navigateTo(page) {
      this.currentPage = page
    }
  },
  mounted() {
    // Fetch latest posts when component mounts
    this.fetchLatestposts()
  }
}
</script>

<style scoped>
.div{
  display: inline-block;
}

.float-container {
  padding: 20px;
  border: 3px solid #fff;
  display: flex;
}

.sidebar {
  width: 10%; /* Fixed width for sidebar */
  background-color: pink; /* Light background color */
  padding: 20px; /* Some padding inside the sidebar */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.651); /* Optional shadow for a little depth */
  position: sticky;
}

.sidebar ul {
  list-style: disc;
  padding: 0px;
}

.sidebar ul li {
  cursor: pointer;
  margin-bottom: 10px;
  border: solid gray;
  text-align:justify;
}

.sidebar ul li:hover {
  background-color: #ddd;
}

.main-page {
  flex: 1;
  padding: 20px; /* Add padding to the main content */
  background-color: #ba1c1c; /* Optional: background color for main content */
}

.main-title {
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-shadow: 2px 0 5px rgba(0, 0, 0, 0.651);
}

.for-you-page ul {
  list-style: none;
  padding: 0;
}

.post {
  background-color: pink;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow:  0 5px rgba(0, 0, 0, 0.651);

}

.date {
  font-size: 0.9em;
  color: #888;
}

</style>
