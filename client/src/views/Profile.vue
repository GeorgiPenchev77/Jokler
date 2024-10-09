<template>
    <div class="sidebar" >
      <ul>
        <li @click="navigateTo('home')">Home</li>
        <li @click="navigateTo('create')">Create post</li>
        <li @click="navigateTo('profile')">Profile</li>
        <!-- Add more pages as needed -->
      </ul>
    </div >
    <div>
      <h1>Your Profile</h1>
      <p>Welcome to your profile page!</p>
      <div>
        Name
      </div>
      <div>
        <input v-model="username" placeholder="Change username">
        <button class="button buttonSaveUsername">Save</button>
      </div>
      <div>
        Password
      </div>
      <div>
        <input v-model="Password" placeholder="Change password">
        <button class="button buttonSavePassword">Save</button>
      </div>
      <!-- Profile content -->
    </div>
</template>
  
<script>
export default {
  name: 'Profile',
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 15px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  cursor: pointer;
  padding: 10px 0;
}

.sidebar li:hover {
  background-color: #ddd;
}
</style>