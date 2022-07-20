<template>
  <div class="application-section">
    <app-section>
      <div class="section-title">
        <h2>{{ $t('applicationSectionTitle') }}</h2>
      </div>
      <div class="section-content">
        <div class="main-content">
          <div class="inner-content">
            <h3>{{ $t('whatIsOurApplication') }}</h3>
            <p>
                {{ $t('whatIsOurApplication1') }}
            </p>
            <p>{{ $t('whatIsOurApplication2') }}</p>
            <ul>
              <li>
               {{ $t('whatIsOurApplication3') }}
              </li>
              <li>
               {{ $t('whatIsOurApplication4') }}
              </li>
              <li>
                {{ $t('whatIsOurApplication5') }}
              </li>
            </ul>
            <app-button>{{ $t('downloadApp') }}</app-button>
          </div>
        </div>
        <div class="image-content">
          <img src="@/assets/application-section-image.png" alt="" />
        </div>
      </div>
    </app-section>
  </div>
</template>

<script>
import AppSection from "@/components/common/AppSection.vue";
export default {
  name: "application-section",
  components: {
    AppSection,
  },
};
</script>

<style lang="scss" scoped>
.application-section {
  background-image: url("../../assets/application-section-bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: left;
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
  min-height: 700px;
  .image-content {
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 600px;
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
      width: 500px;
      margin-right: 150px;
      text-align: left;
      ul {
        li {
          margin-bottom: 20px;
        }
      }
    }

    p {
      text-align: left;
    }
  }
}
</style>