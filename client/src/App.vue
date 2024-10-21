<template>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  </head>
  <div id="app">
    <b-container fluid>
      <b-row  class="flex-nowrap">
        <b-col id="bar" class="col-1 collapse.show collapse-horizontal" >
            <!-- Sidebar Navigation -->
          <div class="sidebar" :class="{ hidden: isSidebarHidden }">
            <ul class="col-3">
              <button @click="handleAuthAction" class="auth-btn">
                {{ getCurrentUser() ? 'Sign out' : 'Login' }}
              </button>
              <li class="nav-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/profile">Profile</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/trending">Trending Topics</router-link>
              </li>
            </ul>
          </div>
          <div id="Home">
            <router-link to="/"></router-link>
          </div>
        </b-col>
        <b-col class="col-4">
          <!-- Button to toggle sidebar (Only for smaller windows) -->
          <button @click="toggleSidebar" class="toggle-btn" data-bs-toggle="collapse" data-bs-target="#bar">
            <span class="bi bi-layout-sidebar"></span>
          </button>
        </b-col>
        <b-col class="col-2">
          <!-- Render the content of the current page view -->
          <div class="main-content">
            <router-view />
          </div>
        </b-col>
      </b-row>
    </b-container>
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
      if (window.innerWidth > 768) {
        // Show sidebar by  when when the window is bigger/full size
        this.isSidebarHidden = false;
        let sidebar = document.getElementById("bar")
        if (sidebar.classList.contains('collapse')) {
          sidebar.classList.remove('collapse')
          sidebar.classList.add('collapse.show')
        }
      } else {
        // Hide sidebar by default everytime the window goes small
        this.isSidebarHidden = true;
        let sidebar = document.getElementById("bar")
        if (sidebar.classList.contains('collapse.show')) {
          sidebar.classList.remove('collapse.show')
          sidebar.classList.add('collapse')
        }
      }
    }
  },
  mounted() {
    // Listener when the screen rezises (e.g want the sidebar to be visible when going back bigger window even after pressing hide sidebar in the smaller window)
    //window.addEventListener('resize', this.currentSizeSettings);
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
  min-height: 100vh;
}

.col-1 {
  width: 15%;
  min-height: 100vh;
  padding: 0;
}

.col-2 {
  width: 85%;
  padding: 0;
  background-color: #ffffff;
}

.col-3 {
  width: 100%;
}

.col-4 {
  display: none;
  min-width: 30px;
  min-height: 100vh;
  width: 0%;
  padding: 0;
  background-color: #121212;
}

/* Sidebar toggle button */
.toggle-btn {
  display: none;
  width: 100%;
  background-color: #00000000;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 5px; /* Separate from other items */
  font-size: 36px;
  font-weight: bold;
}

/* Sidebar layout */
.sidebar {
  background-color: #121212;
  color: white;
  padding: 20px;
  min-height: 100%;
  transition: transform 0.3s ease-in-out;
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

/* Main content layout */
.main-content {
  flex-grow: 1;
  justify-content: center;
  padding: 20px;
}

/* Responsive layout for smaller screens */
@media (max-width: 1200px) {
  .col-1 {
    width: 20%;
  }
  .col-2 {
    width: 80%;
  }
}

@media (max-width: 992px) {
  .col-1 {
    width: 25%;
  }
  .col-2 {
    width: 75%;
  }
}

@media (max-width: 768px) {
  .toggle-btn {
    display: block; /* Show toggle button on smaller screens */
  }

  .sidebar.hidden {
    transform: translateX(-100%); /* Hide sidebar */
  }

  .sidebar:not(.hidden) {
    transform: translateX(0); /* Show sidebar */
  }
  .col-1 {
    width: 30%
  }
  .col-4 {
    width: 10%;
    display: block;
  }
  .col-2 {
    width: 90%
  }
}
</style>
