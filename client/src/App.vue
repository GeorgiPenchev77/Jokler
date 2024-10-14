<template>

  <div id="app">
    <!-- Sidebar Navigation -->
  <div class="sidebar">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/profile">Profile</router-link>
        </li>
      </ul>
    </div>
    <div id="Home">
      <router-link to="/"></router-link>
    </div>
    <!-- Render the content of the current page view -->
    <div class="main-content">
      <router-view />
    </div>
  </div>

</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: black;
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center; /* Horizontally center the entire content */
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

.main-content {
  flex-grow: 1;
  justify-content: center;
  margin-left: 250px;
  padding: 20px;
}

/* Adjust page for sreens with size of =< 780px */
@media (max-width: 780px) {
  .sidebar {
    transform: translateX(-100%); /* Hide sidebar */
  }

  .main-content {
    margin-left: 0; /* No margin when sidebar is hidden */
  }
}
</style>
