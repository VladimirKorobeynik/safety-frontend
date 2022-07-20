<template>
  <div class="main-section">
    <header-component></header-component>
    <div class="section-content">
      <div class="main-content">
        <h1>{{ $t("mainText1") }}<br /><strong>{{ $t("mainText2") }}</strong> <br />{{ $t("mainText3") }}</h1>
        <p>{{ $t("mainTextGoal") }}</p>
        <app-button>{{ $t("getStarted") }}</app-button>
      </div>
      <div class="image-content">
        <img src="@/assets/welcome-section-image.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/welcome-page/HeaderComponent.vue";

export default {
  name: "main-section",
  components: {
    HeaderComponent,
  },
};
</script>

<style lang="scss" scoped>

.main-section {
  background-image: url('../../assets/welcome-section-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: 0;
  min-height: 900px;
}
.section-content {
  display: flex;
  justify-content: space-around;
  min-height: 600px;
  .main-content {
    flex-basis: 50%;
    text-align: left;
    padding-left: 120px;
    margin: auto 0;
    h1 {
      font-size: 52px;
      color: #0b0f62;
      font-weight: 400;
      strong {
        font-size: 70px;
        font-weight: bold;
      }
    }
    p {
      color: #0b0f62;
      margin-bottom: 20px;
    }
  }
  .image-content {
    flex-basis: 50%;
    img {
      width: 600px;
    }
  }
}


@media screen and (max-width: 1050px) {
  .section-content {
    .image-content {
      display: none;
    }
    .main-content {
      flex-basis: 100%;
      padding-left: 0;
      text-align: center;
    }
  }
}

@media screen and (max-width: 768px) {
  .main-section {
    min-height: 600px;
  }
  .section-content {
    .main-content {
      m
      h1 {
        font-size: 42px;
        strong {
          font-size: 52px;
        }
      }
    }
  }
}
</style>