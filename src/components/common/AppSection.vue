<template>
  <section>
    <div class="container">
      <slot> </slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "app-section",
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20px;
  
}
</style>