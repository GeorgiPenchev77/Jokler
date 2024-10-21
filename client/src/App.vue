<template>
  <div id="app">
    <!-- Sidebar Navigation -->
    <div class="sidebar" :class="{ hidden: isSidebarHidden }">
      <button @click="handleAuthAction" class="auth-btn">
          {{ getCurrentUser() ? 'Sign out' : 'Login' }}
        </button>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
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
    handleAuthAction() {
      if (this.getCurrentUser()) {
        this.signOut()
      } else {
        this.$router.push('/login') // Redirect to login page
      }
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
      } else {
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
<style>
/* General app layout */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #121212;
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center;
}

/* Sidebar toggle button */
.toggle-btn {
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 10;
  background-color: #00a0bf;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

/* Sidebar layout */
.sidebar {
  width: 220px;
  background-color: #121212;
  color: white;
  padding: 20px;
  min-height: 100vh;
  transition: transform 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
}

/* Authentication button (Login/Sign out) */
.auth-btn {
  display: block;
  width: 100%;
  background-color: #00b8d9;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px; /* Rounded edges */
  cursor: pointer;
  margin-bottom: 20px; /* Separate from other items */
  font-size: 18px;
  font-weight: bold;
}

.auth-btn:hover {
  background-color: #00a0bf; /* Slightly darker on hover */
}

/* Sidebar links */
.sidebar ul {
  list-style-type: none;
  padding: 0;
  position: sticky;
  top: 20px;
}

.sidebar ul li {
  margin: 20px 0;
  transition: all 0.3s ease;
}

.sidebar ul li:hover {
  transform: scale(1.05);
  background-color: #444;
  border-radius: 5px;
  padding: 10px;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.sidebar ul li a:hover {
  color: #00a0bf;
}

.sidebar {
  transform: translateX(-100%);
}

.sidebar:not(.hidden) {
  transform: translateX(0);
}

/* Main content layout */
.main-content {
  flex-grow: 1;
  justify-content: center;
  margin-left: 220px;
  padding: 20px;
}

/* Responsive layout for smaller screens */
@media (max-width: 780px) {
  .toggle-btn {
    display: block;
  }

  .main-content {
    margin-left: 0;
  }
}
</style>
