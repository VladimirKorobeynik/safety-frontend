<template>
  <div class="device-section">
    <app-section>
      <div class="section-title">
        <h2>{{ $t('smartDeviceSectionTitle') }}</h2>
      </div>
      <div class="section-content">
        <div class="inner-device-image">
          <img :src="require('@/assets/' + deviceImageEn)" alt="" />
        </div>
      </div>
    </app-section>
  </div>
</template>

<script>

export default {
  name: "device-section",
  components: {},
  data() {
    return {
      deviceImageEn: localStorage.getItem('userLanguage') === 'en' ? 'device-section-image-en.png' : 'device-section-image-uk.png',
    }
  }
};
</script>

<style lang="scss" scoped>
.device-section {
  .section-title {
    h2 {
      margin: 0;
      font-size: 30px;
      color: #0b0f62;
    }
  }
}
.section-content {
    padding: 50px 0;
  .inner-device-image {
    display: flex;
    position: relative;
    justify-content: center;
    img {
      max-width: 80%;
      max-height: 80%;
    }
    .smoke-sensor-info,
    .humidity-sensor-info,
    .gas-sensor-info,
    .motion-sensor-info {
      position: absolute;
      text-align: left;
      color: #4a4949;
      font-weight: bold;
      font-size: 15px;
    }

    .smoke-sensor-info {
      left: 16%;
      top: 2%;
    }
    .humidity-sensor-info {
      right: 11%;
      top: 3%;
    }
    .gas-sensor-info {
      left: 11%;
      bottom: 20%;
    }
    .motion-sensor-info {
      right: 28.5%;
      bottom: 0;
    }
  }
}
</style>