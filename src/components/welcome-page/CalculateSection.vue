<template>
  <div class="calculate-section">
    <div class="section-title">
      <h2>{{ $t('calculateTitle') }}</h2>
      <p>{{ $t('calculate1') }}</p>
    </div>
    <div class="section-content">
      <div class="calculate-zone">
        <div class="fields-block">
          <div class="field-wrap">
            <label for="countWindows">{{ $t('СountWindows') }}</label>
            <input
              type="text"
              class="count-windows"
              id="countWindows"
              placeholder="value"
              @input="countWindows = Number($event.target.value)"
            />
          </div>
          <div class="field-wrap">
            <label for="countDoors">{{ $t('СountDoors') }}</label>
            <input
              type="text"
              class="count-doors"
              id="countDoors"
              placeholder="value"
              @input="countDoors = Number($event.target.value)"
            />
          </div>
          <div class="field-wrap">
            <label for="countRooms">{{ $t('СountRooms') }}</label>
            <input
              type="text"
              class="count-rooms"
              id="countRooms"
              placeholder="value"
              @input="countRooms = Number($event.target.value)"
            />
          </div>
        </div>
        <div class="equal-block"><p>=</p></div>
        <div class="sensors-blocks">
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/smoke-icon.png" alt="" />
            </div>
            <div class="count">
               <div v-if="countRooms > 0">
                 <p>{{ countRooms + 1 }}x</p>
              </div>
              <div v-else>
                <p>{{ 0 }}x</p>
              </div>
            </div>
          </div>
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/humidity-icon.png" alt="" />
            </div>
            <div class="count">
              <div v-if="countRooms > 0">
                <p>{{ 2 }}x</p>
              </div>
              <div v-else>
                <p>{{ 0 }}x</p>
              </div>
            </div>
          </div>
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/gas-icon.png" alt="" />
            </div>
            <div class="count">
              <div v-if="countRooms > 0">
                <p>{{ 1 }}x</p>
              </div>
              <div v-else>
                <p>{{ 0 }}x</p>
              </div>
            </div>
          </div>
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/motion-icon.png" alt="" />
            </div>
            <div class="count">
              <p>{{ countWindows + countDoors }}x</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calculate-section",
  components: {},
  data() {
    return {
      countWindows: 0,
      countRooms: 0,
      countDoors: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.calculate-section {
  .section-title {
    h2 {
      margin: 0;
      font-size: 30px;
      color: #0b0f62;
    }
    p {
      color: #636363;
      font-weight: bold;
    }
  }
}
.section-content {
  display: flex;
  justify-content: center;
  padding: 35px 0;
  .calculate-zone {
    display: flex;
    align-items: center;
    .fields-block {
      display: flex;
      .field-wrap {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0 10px;
        label {
          margin-bottom: 5px;
          text-align: left;
          color: #636363;
          font-weight: bold;
        }
        input {
          width: 100px;
          background: #ebebeb;
          border-radius: 8px;
          border: none;
          padding: 10px 0 10px 10px;
          outline: none;
          font-size: 15px;
        }
      }
    }
    .equal-block {
      font-size: 40px;
      color: #0b0f62;
      font-weight: bold;
      margin: 0 20px;
    }
    .sensors-blocks {
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: bold;
      color: #0b0f62;
      .sensor-wrap-block {
        display: flex;
        align-items: center;
        .sensor-block {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          background: #6b98ff;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            height: 50px;
          }
        }
        .count {
          margin: 0 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .section-content {
    .calculate-zone {
      flex-direction: column;
      .equal-block {
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>