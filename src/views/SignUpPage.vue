<template>
  <div class="register-main-wrapper">
    <div class="left-side">
      <div class="company-block" @click="$router.push('/')">
        <h1 class="company-name">Safety</h1>
        <img src="@/assets/logo-icon-footer.png" alt="" />
      </div>
    </div>
    <div class="right-side">
      <div class="sign-in-link-line">
        <div class="sign-in-link-block">
          <p>{{ $t('alreadyMember') }}</p>
          <a href="#" @click="$router.push('/signIn')">{{ $t('login') }}</a>
        </div>
      </div>
      <div class="register-content">
        <div class="register-form-wrap">
          <div class="register-form-block">
            <div class="head-form-block">
              <div class="head-form-image">
                <img src="@/assets/logo.png" alt="icon" />
              </div>
              <div class="head-form-text">
                <h2>{{ $t('joinToSafety') }}</h2>
              </div>
            </div>
            <form class="register-form">
              <div class="user-fullname-fields">
                <div class="register-form-input-wrap">
                  <label for="nameInput">{{ $t('name') }}</label>
                  <input
                    type="text"
                    id="nameInput"
                    v-model="registerObj.name"
                  />
                </div>
                <div class="register-form-input-wrap">
                  <label for="surnameInput">{{ $t('surname') }}</label>
                  <input
                    type="text"
                    id="surnameInput"
                    v-model="registerObj.surname"
                  />
                </div>
              </div>
              <div class="register-form-input-wrap">
                <div class="password-label-block">
                  <label for="emailInput">{{ $t('emailAddress') }}</label>
                </div>
                <input
                  type="email"
                  id="emailInput"
                  v-model="registerObj.email"
                />
              </div>
              <div class="register-form-input-wrap">
                <div class="password-label-block">
                  <label for="passwordInput">{{ $t('password') }}</label>
                </div>
                <input
                  type="password"
                  id="passwordInput"
                  v-model="registerObj.password"
                />
              </div>
              <div class="user-policy-block">
                <input
                  type="checkbox"
                  class="policy-checkbox"
                  id="policyCheckbox"
                />
                <label for="policyCheckbox"></label>
                <div class="policy-text-block">
                  <p>
                    {{ $t('policy1') }}
                    <a href="#">{{ $t('policy2') }}</a>,
                    <a href="#">{{ $t('policy3') }}</a>, {{ $t('policy4') }}
                    <a href="#">{{ $t('policy5') }}</a>.
                  </p>
                </div>
              </div>
              <button class="register-btn" @click.prevent="signUp">
               {{ $t('createAccount') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/services/Auth";

export default {
  data() {
    return {
      registerObj: {
        name: "",
        surname: "",
        number: "",
        address: "",
        birthday: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signUp() {
      Auth.signUp(this.registerObj).then((response) => {
        console.log(response);
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
.register-main-wrapper {
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

.sign-in-link-line {
  padding: 20px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
  .sign-in-link-block {
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

.register-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  .register-form-wrap {
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
    margin-bottom: 0;
  }
}

.register-form {
  margin-bottom: 15px;
  .user-fullname-fields {
    display: flex;
    justify-content: space-between;
    .register-form-input-wrap {
      flex-basis: 48%;
    }
  }
  .register-form-input-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
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
  .user-policy-block {
    display: flex;
    align-items: center;
    margin: 18px 0;
    .policy-checkbox {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
    .policy-checkbox + label {
      display: inline-flex;
      align-items: center;
      user-select: none;
      margin-right: 11px;
      &::before {
        content: "";
        width: 16px;
        height: 16px;
        border: 2px solid #bcbcbc;
        border-radius: 4px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 80% 80%;
      }
    }
    .policy-checkbox:checked + label::before {
      background-image: url("../assets/checkmarkIcon.svg");
      background-color: #2b6ef5;
      border: 2px solid #2b6ef5;
    }
    .policy-text-block {
      p {
        margin: 0;
        font-size: 13px;
        a {
          color: #4d3cc1;
          text-decoration: none;
        }
      }
    }
  }
  .register-btn {
    width: 100%;
    background-color: #d85888;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    transition: all 0.5s;
    height: 45px;
    .register-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .register-btn:hover {
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
  .register-main-wrapper {
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
  .register-content {
    .register-form-wrap {
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
  .register-form {
    margin-bottom: 15px;
    .user-policy-block {
      .policy-text-block {
        p {
          font-size: 12px;
          line-height: 14px;
        }
      }
    }
  }
}
</style>