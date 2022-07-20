<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem('userLanguage') == null) {
      localStorage.setItem('userLanguage', 'en');
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
