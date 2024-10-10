<template>
  <div id="app">
    <div id="Home">
      <router-link to="/">Jokler</router-link>
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
}
</style>
