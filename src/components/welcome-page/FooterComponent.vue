<template>
  <footer>
    <div class="footer-container">
      <h3>Safety</h3>
      <img src="@/assets/logo-icon-footer.png" alt="" />
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-component",
};
</script>

<style lang="scss" scoped>
footer {
  background-image: url("../../assets/footer-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  display: flex;
  align-items: center;
  .footer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    h3 {
      color: #fff;
      font-size: 30px;
      font-weight: 400;
      margin: 0;
      margin-right: 10px;
    }
    img {
        height: 50px;
    }
  }
}
</style>