<template>
  <v-app style="background-image: 
  url(https://www.pixel4k.com/wp-content/uploads/2019/03/dark-blur-abstract-4k_1551646029.jpg);
  background-size: cover;">
    <router-view />
  </v-app>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style>

.my-app-background {
  background-image: url(https://wallpapersmug.com/download/2560x1440/6c9340/colorful-dark-neon-gome-u7-stock.jpg);
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
