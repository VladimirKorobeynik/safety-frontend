<template>
  <div class="sign-in-main-wrapper">
    <div class="left-side">
      <div class="company-block" @click="$router.push('/')">
        <h1 class="company-name">Safety</h1>
        <img src="@/assets/logo-icon-footer.png" alt="" />
      </div>
    </div>
    <div class="right-side">
      <div class="registration-link-line">
        <div class="registration-link-block">
          <p>{{ $t('dontHaveAccout') }}</p>
          <a href="" @click="$router.push('/signUp')">{{ $t('joinNow') }}</a>
        </div>
      </div>
      <div class="login-content">
        <div class="login-form-wrap">
          <div class="login-form-block">
            <div class="head-form-block">
              <div class="head-form-image">
                <img src="@/assets/logo.png" alt="icon" />
              </div>
              <div class="head-form-text">
                <h2>{{ $t('signInToSafety') }}</h2>
              </div>
            </div>
            <div class="sign-in-form">
              <div class="login-form-input-wrap">
                <label for="loginInput">{{ $t('emailAddress') }}</label>
                <input
                  type="text"
                  id="loginInput"
                  v-model="credentialObj.email"
                />
              </div>
              <div class="login-form-input-wrap">
                <div class="password-label-block">
                  <label for="passwordInput">{{ $t('password') }}</label>
                  <a href="#" class="forgot-password-link">{{ $t('forgotPassword') }}</a>
                </div>
                <input
                  type="password"
                  id="passwordInput"
                  v-model="credentialObj.password"
                />
              </div>
              <button class="sign-in-btn" @click.prevent="signIn">
                {{ $t('signIn') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/services/Auth";

export default {
  name: "SingInPage",
  data() {
    return {
      credentialObj: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      Auth.signIn(this.credentialObj).then((response) => {
        if (response.data.status == "Success") {
          localStorage.setItem("access_token", response.data.data.token);
          localStorage.setItem("user_id", response.data.data.user_id);
          this.$router.push("/dashboard");
        } else {
          alert(response.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in-main-wrapper {
  background: rgb(47, 93, 182);
  background: linear-gradient(
    163deg,
    rgba(47, 93, 182, 1) 14%,
    rgba(182, 47, 87, 0.8057816876750701) 100%
  );
  min-height: 100vh;
  display: flex;
  .left-side {
    flex-basis: 45%;
    display: flex;
    align-items: center;
    position: relative;
    &::after {
      content: "";
      display: block;
      background: #3c5caf;
      width: 50px;
      height: 50px;
      position: absolute;
      top: 0;
      right: -50px;
      z-index: 0;
    }
    &::before {
      content: "";
      display: block;
      background: #9a6087;
      width: 50px;
      height: 50px;
      position: absolute;
      bottom: 0;
      right: -50px;
      z-index: 0;
    }
  }
  .right-side {
    flex-basis: 55%;
    background-color: #fff;
    border-radius: 40px 0 0 40px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }
}

.company-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .company-name {
    color: #fff;
    font-size: 45px;
    margin: 0 10px 0 0;
    font-weight: 400;
  }
  img {
    height: 60px;
  }
}

.registration-link-line {
  padding: 20px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
  .registration-link-block {
    display: flex;
    p {
      margin: 0 5px 0 0;
    }
    a {
      text-decoration: none;
      color: #4d3cc1;
    }
  }
}

.login-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  .login-form-wrap {
    width: 350px;
  }
}

.head-form-block {
  text-align: center;
  margin-bottom: 40px;
  .head-form-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    img {
      width: 65px;
      height: 65px;
    }
  }
  h2 {
    font-size: 30px;
    font-weight: 400;
  }
}

.sign-in-form {
  margin-bottom: 15px;
  .login-form-input-wrap {
    display: flex;
    flex-direction: column;
    label {
      font-size: 15px;
      font-weight: bold;
      color: #636363;
      margin-bottom: 10px;
      text-align: left;
    }
    input {
      background-color: #ebebeb;
      border-radius: 8px;
      border: none;
      padding: 12px 8px 12px 8px;
      outline: none;
      font-size: 15px;
    }
    .password-label-block {
      display: flex;
      justify-content: space-between;
      .forgot-password-link {
        text-decoration: none;
        color: #4d3cc1;
      }
    }
  }
  .login-form-input-wrap:nth-child(1) {
    margin-bottom: 15px;
  }
  .login-form-input-wrap:nth-child(2) {
    margin-bottom: 40px;
  }
  .sign-in-btn {
    width: 100%;
    background-color: #d85888;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    transition: all 0.5s;
    height: 45px;
    .login-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .sign-in-btn:hover {
    background-color: #2f69d4;
    color: #fff;
  }
}

@media screen and (max-width: 1024px) {
  .company-block {
    .company-name {
      font-size: 34px;
    }
  }
}

@media screen and (max-width: 840px) {
  .sign-in-main-wrapper {
    .left-side {
      display: none;
    }
    .right-side {
      flex-basis: 100%;
      border-radius: 0;
    }
  }
}

@media screen and (max-width: 520px) {
  .login-content {
    .login-form-wrap {
      width: 100%;
      padding: 20px;
      .head-form-block {
        h2 {
          font-size: 25px;
        }
      }
    }
  }
}

@media screen and (max-width: 380px) {
  .sign-in-form {
    margin-bottom: 15px;
    .login-form-input-wrap:nth-child(2) {
      margin-bottom: 25px;
    }
  }
}
</style>