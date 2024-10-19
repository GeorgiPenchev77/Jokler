<template>
  <div id="app">
    <!-- Sidebar Navigation -->
    <div class="sidebar" :class="{ hidden: isSidebarHidden }">
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="!getCurrentUser()">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-else>
            <button @click="signOut">Sign out</button>
          </li>
          <li>
            <router-link to="/profile">Profile</router-link>
          </li>
          <li>
            <router-link to="/trending">Trending Topics</router-link>
          </li>
        </ul>
      </div>
      <!-- Button to toggle sidebar (Only for smaller windows) -->
      <button @click="toggleSidebar" class="toggle-btn">
        {{ isSidebarHidden ? 'Show Menu' : 'Hide Menu' }}
      </button>
    <div id="Home">
      <router-link to="/"></router-link>
    </div>
    <!-- Render the content of the current page view -->
    <div class="main-content">
      <router-view />
    </div>
  </div>

</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'app',
  data() {
    return {
      isSidebarHidden: true, // Initialize sidebar as hidden
    };
  },
  methods: {
    getCurrentUser() {
      const user = Cookies.get('username')
      return user
    },
    signOut() {
      Cookies.set('username', '')
      location.reload()
    },
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    },
    currentSizeSettings() {
      if (window.innerWidth > 780) {
        // Show sidebar by  when when the window is bigger/full size
        this.isSidebarHidden = false;
      }
      else{
        // Hide sidebar by default everytime the window goes small
        this.isSidebarHidden = true;
      }
    }
  },
  mounted() {
    // Listener when the screen rezises (e.g want the sidebar to be visible when going back bigger window even after pressing hide sidebar in the smaller window)
    window.addEventListener('resize', this.currentSizeSettings);
  },
  watch: {
    // Check settings whenever we navigate to new page
    '$route'() {
      this.currentSizeSettings();
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: black;
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center; /* Horizontally center the entire content */
}

.toggle-btn {
  display: none;
  position:fixed; /* Should be changed to follow the bar's edge */
  top: 10px;
  left: 10px;
  z-index: 10; /* Stays on top */
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  cursor: pointer;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
  min-height: 100vh;
  transition: transform 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar ul {
  list-style-type: square;
  padding: 10px;
  position: sticky;
  top: 20px;
}

.sidebar ul li {
  margin: 20px 10px;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
}

.sidebar {
    transform: translateX(-100%); /* Hide the bar completely when hidden. ps. might be modified later to match the toggle button) */
  }

.sidebar:not(.hidden) {
  transform: translateX(0);
}

.main-content {
  flex-grow: 1;
  justify-content: center;
  margin-left: 250px;
  padding: 20px;
}

/* Adjust page for sreens with size of =< 780px */
@media (max-width: 780px) {

  .toggle-btn {
    display: block;
  }

  .main-content {
    margin-left: 0; /* No margin when sidebar is hidden */
  }
}
</style>
