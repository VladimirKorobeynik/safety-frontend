<template>
  <div class="get-started-section">
    <div class="section-title">
      <h2>{{ $t('getStartedTitle') }}</h2>
    </div>
    <div class="section-content">
      <div class="get-started-list">
        <div class="get-started-card">
          <div class="card-image">
            <div class="card-number">
              <p>1</p>
            </div>
            <img
              src="@/assets/get-started-account.png"
              class="account-icon"
              alt=""
            />
          </div>
          <div class="card-content">
            <h4>{{ $t('firstCard1') }}</h4>
            <p>{{ $t('firstCard2') }}</p>
            <app-button class="get-started-btn">{{ $t('firstCard3') }}</app-button>
          </div>
        </div>
        <div class="get-started-card">
          <div class="card-image">
            <div class="card-number">
              <p>2</p>
            </div>
            <img src="@/assets/get-started-device.png" alt="" />
          </div>
          <div class="card-content">
            <h4>{{ $t('secondCard1') }}</h4>
            <p>
            {{ $t('secondCard2') }}
            </p>
          </div>
          <div class="link-block">
              <a href="">{{ $t('secondCard3') }}</a>
              <img src="@/assets/arrow.png" alt="" />
            </div>
        </div>
        <div class="get-started-card">
          <div class="card-image">
            <div class="card-number">
              <p>3</p>
            </div>
            <img
              src="@/assets/get-started-phone.png"
              class="phone-icon"
              alt=""
            />
          </div>
          <div class="card-content">
            <h4>{{ $t('thirdCard1') }}</h4>
            <p>
           {{ $t('thirdCard2') }}
            </p>
          </div>
          <div class="link-block">
              <a href="">{{ $t('thirdCard3') }}</a>
              <img src="@/assets/arrow.png" alt="" />
            </div>
        </div>
        <div class="get-started-card">
          <div class="card-image">
            <div class="card-number">
              <p>4</p>
            </div>
            <img src="@/assets/get-started-house.png" alt="" />
          </div>
          <div class="card-content">
            <h4>{{ $t('forthCard1') }}</h4>
            <p>
            {{ $t('forthCard2') }}
            </p>
          </div>
           <div class="link-block">
              <p>{{ $t('forthCard3') }}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "get-started-section",
  components: {},
};
</script>

<style lang="scss" scoped>
.get-started-section {
  .section-title {
    margin-bottom: 30px;
    h2 {
      margin: 0;
      font-size: 30px;
      color: #0b0f62;
    }
  }
  .section-content {
    background-image: url("../../assets/get-started-section-bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
    padding: 150px 0;
    .get-started-list {
      display: flex;
      justify-content: space-around;
      padding: 0 80px;
      .get-started-card {
        flex-basis: 19%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #fff;
        border-radius: 25px;
        padding: 12px;
        .card-image {
          height: 150px;
          background: #8dafff;
          border-radius: 20px;
          position: relative;
          p {
            margin: 0;
          }
          img {
            width: 100px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
          .accoutn-icon {
            width: 70px;
          }
          .phone-icon {
            width: 70px;
          }
          .card-number {
            font-size: 40px;
            font-weight: bold;
            color: #dae5ff;
            position: absolute;
            left: 20px;
            bottom: 20px;
          }
        }
        .card-content {
          text-align: left;
          h4 {
            color: #4A4949;
          }
          p {
            color: #686868;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .get-started-btn {
            width: 100%;
            margin: 0 auto;
          }
        }
         .link-block {
            display: flex;
            align-items: center;
            margin-left: 5px;
            a {
              color: #686868;
              text-decoration: none;
              margin-right: 6px;
              transition: all 0.5s;
            }
            p {
                margin: 0;
            }
          }
          .link-block:hover {
            a {
                margin-right: 14px;
            }
          }
      }
    }
  }
}
</style>