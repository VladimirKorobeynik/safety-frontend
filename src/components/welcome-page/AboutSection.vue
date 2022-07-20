<template>
  <div class="about-section">
    <app-section>
      <div class="section-title">
        <h2>{{ $t('aboutUsSectionTitle') }}</h2>
      </div>
      <div class="section-content">
        <div class="image-content">
          <img src="@/assets/about-section-image.png" alt="" />
        </div>
        <div class="main-content">
          <div class="inner-content">
            <h3>{{ $t('whatIsSafety') }}</h3>
            <p>
              {{ $t('whatIsSafety1Text') }}
            </p>
            <p>
             {{ $t('whatIsSafety2Text') }}
            </p>
            <p>
             {{ $t('whatIsSafety3Text') }}
            </p>
          </div>
        </div>
      </div>
    </app-section>
  </div>
</template>

<script>
export default {
  name: "about-section",
  components: {},
};
</script>

<style lang="scss" scoped>
.about-section {
  background-image: url("../../assets/about-section-bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: right;
  .section-title {
    h2 {
      margin: 0;
      font-size: 30px;
      color: #0b0f62;
    }
  }
}
.section-content {
  display: flex;
  min-height: 600px;
  .image-content {
    flex-basis: 50%;
    img {
      width: 600px;
    }
  }
  .main-content {
    flex-basis: 50%;
    color: #0b0f62;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .inner-content {
      width: 450px;
      margin-left: 195px;
    }
    h3 {
      text-align: center;
    }
    p {
      text-align: left;
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
</style>