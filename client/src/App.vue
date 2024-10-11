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
    <router-view/>
  </div>

</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: black;
  text-align: center;
  font-size: 16px;
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 20px 0;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}
</style>
