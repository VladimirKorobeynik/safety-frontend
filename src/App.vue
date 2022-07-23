<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    // this.setupStream();

    if (localStorage.getItem("userLanguage") == null) {
      localStorage.setItem("userLanguage", "en");
    }
  },
  methods: {
    setupStream() {
      // Not a real URL, just using for demo purposes
      let es = new EventSource('http://127.0.0.1:8000/api');

      es.addEventListener(
        "message",
        (event) => {
          let data = JSON.parse(event.data);
          this.stockData = data.stockData;
        },
        false
      );

      es.addEventListener(
        "error",
        (event) => {
          if (event.readyState == EventSource.CLOSED) {
            console.log("Event was closed");
            console.log(EventSource);
          }
        },
        false
      );
    },
  },
};
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
