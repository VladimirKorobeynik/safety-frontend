<template>
  <button class="get-started-btn">
    <slot>

    </slot>
  </button>
</template>

<script>
export default {
    name: 'app-button'
}
</script>

<style lang="scss" scoped>
 .get-started-btn {
      width: 130px;
      padding: 12px 0;
      border-radius: 20px;
      transition: all 0.5s;
      border: 1px solid #4482f7;
      background: #4482f7;
      color: #fff;
      border: none;
      cursor: pointer;
    }
    .get-started-btn:hover {
      background: #3b72d7;
      color: rgb(249, 249, 249);
    }
</style>