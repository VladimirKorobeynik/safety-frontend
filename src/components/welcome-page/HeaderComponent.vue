<template>
  <header>
    <div class="header-container">
      <div class="logo-block">
        <a href="#">
          <h2 class="logo-title">Safety</h2>
          <div class="logo-icon">
            <img src="@/assets/logo.png" alt="Safety" />
          </div>
        </a>
      </div>
      <div class="nav">
        <div class="nav-block">
          <ul class="nav-list">
            <li><a href="#">{{ $t("navHome") }}</a></li>
            <li><a href="#">{{ $t("navAbout") }}</a></li>
            <li><a href="#">{{ $t("navApplicaiton") }}</a></li>
            <li><a href="#">{{ $t("navDevice") }}</a></li>
          </ul>
        </div>
        <div class="lang-block">
          <select
            name="lang"
            v-model="$i18n.locale"
            class="lang-select"
            id="langSelect"
            @change="this.setLanguage($event.target.value)"
          >
            <option :key="`locale-en`" :value="`en`">
              EN
            </option>
             <option :key="`locale-ua`" :value="`ua`" >
              UA
            </option>
          </select>
        </div>
        <div class="authentication-block">
          <button class="auth-btn header-btn" @click="$router.push('/signIn')">
            {{ $t("signIn") }}
          </button>
          <button class="reg-btn header-btn" @click="$router.push('/signUp')">
          {{ $t("signUp") }}
          </button>
        </div>
      </div>
      <div ref="burger" class="burger_menu">
        <input
          @change="controllMobileNavSide()"
          type="checkbox"
          id="burgerMenu"
        />
        <label for="burgerMenu">
          <div class="burger_line first_line"></div>
          <div class="burger_line second_line"></div>
          <div class="burger_line third_line"></div>
          <div class="burger_line fourth_line"></div>
        </label>
      </div>
    </div>
  </header>

  <div class="nav-side" id="navSide">
    <div class="nav-head">
      <a href="#">
        <h2 class="logo-title">Safety</h2>
        <div class="logo-icon">
          <img src="@/assets/logo.png" alt="Safety" />
        </div>
      </a>
      <div @click="closeNavMenu()" class="close-side-nav" id="closeNavSide">
        <img src="@/assets/close-icon.png" alt="Close" />
      </div>
    </div>
    <div class="nav-body">
      <button class="mobile-nav-btn">Sign In</button>
      <button class="mobile-nav-btn">Sign Up</button>
    </div>
  </div>

  <div @click="closeNavMenu()" class="cover-block" id="coverBlock"></div>
</template>

<script>
export default {
  name: "header-component",
  components: {},
  methods: {
    controllMobileNavSide() {
      let burger = document.getElementById("burgerMenu");
      let navSide = document.getElementById("navSide");
      let coverBlock = document.getElementById("coverBlock");

      if (burger.checked) {
        coverBlock.style.zIndex = 15;
        coverBlock.style.opacity = 1;
        navSide.style.minWidth = "250px";
        navSide.style.maxWidth = "250px";
      }
    },
    closeNavMenu() {
      let burger = document.getElementById("burgerMenu");
      let navSide = document.getElementById("navSide");
      let coverBlock = document.getElementById("coverBlock");

      burger.checked = !burger.checked;
      coverBlock.style.zIndex = -10;
      coverBlock.style.opacity = 0;
      navSide.style.minWidth = "0px";
      navSide.style.maxWidth = "0px";
    },
    setLanguage(lang) {
       localStorage.setItem('userLanguage', lang);
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  background: transparent;
}

.header-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  height: 70px;
  .logo-block {
    display: flex;
    align-items: center;
    .logo-icon {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .logo-title {
      color: #000;
      font-weight: 400;
      margin: 0;
      margin-right: 10px;
    }
    a {
      display: flex;
      align-items: center;
    }
  }
  .nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .nav-list {
      padding-left: 0;
      list-style-type: none;
      display: flex;
      margin: 0;
      li {
        margin: 0 20px;
      }
    }
    .lang-block {
      margin: 0 20px;
      .lang-select {
        border: none;
        cursor: pointer;
        outline: none;
        background: transparent;
      }
    }
    .authentication-block {
      .header-btn {
        width: 130px;
        padding: 12px 0;
        border-radius: 20px;
        transition: all 0.5s;
        border: none;
        cursor: pointer;
      }
      .auth-btn {
        margin-right: 20px;
        border: 1px solid #455cad;
        background: transparent;
      }
      .auth-btn:hover {
        -webkit-box-shadow: inset 0px 0px 0px 1px #455cad;
        box-shadow: inset 0px 0px 0px 1px #455cad;
      }
      .reg-btn {
        border: 1px solid #4482f7;
        background: #4482f7;
        color: #fff;
      }
      .reg-btn:hover {
        background: #3b72d7;
        color: rgb(248, 248, 248);
      }
    }
  }
  a {
    color: #000;
    font-weight: 400;
    text-decoration: none;
  }
}

/* Burger menu */

.burger_menu {
  width: 34px;
  height: 34px;
  position: relative;
  display: none;
}

.burger_menu label {
  position: relative;
  display: block;
  height: 100%;
}

.burger_menu input#burgerMenu {
  display: none;
}

.burger_menu .burger_line {
  width: 100%;
  height: 3px;
  background-color: rgb(71, 71, 71);
  position: absolute;
  transition: all 0.5s;
}

.burger_menu label .second_line,
.third_line {
  top: 50%;
  transform: translateY(-50%);
}

.burger_menu label .first_line {
  opacity: 1;
  top: 5px;
}

.burger_menu label .fourth_line {
  opacity: 1;
  bottom: 5px;
}

#burgerMenu:checked ~ label .first_line {
  opacity: 0;
}

#burgerMenu:checked ~ label .fourth_line {
  opacity: 0;
}

#burgerMenu:checked ~ label .second_line {
  transform: rotate(45deg);
}

#burgerMenu:checked ~ label .third_line {
  transform: rotate(-45deg);
}

/* Nav side */

.nav-side {
  height: 100%;
  position: absolute;
  max-width: 0;
  min-width: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 20;
  overflow: hidden;
  transition: all 0.5s;
}

.nav-side .nav-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px;
  background-color: #d4e1fb;
  .logo-icon {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .logo-title {
    color: #000;
    font-weight: 400;
    margin: 0;
    margin-right: 10px;
  }
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
}

.nav-side .nav-head a {
  font-size: 18px;
  font-weight: bold;
}

.nav-side .nav-body {
  display: flex;
  flex-direction: column;
}

.nav-side .nav-body .nav-link {
  padding: 10px 15px;
  border-bottom: 1px solid #ccc;
  text-decoration: none;
  color: #666666;
}

.close-side-nav {
  height: 20px;
  width: 20px;
}

.close-side-nav img {
  max-width: 100%;
  max-height: 100%;
}

.cover-block {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -10;
  opacity: 0;
}

.mobile-nav-btn {
  background: #8dafff;
  width: 100%;
  border-radius: 0 !important;
  padding: 20px 40px !important;
  border: none !important;
  border-bottom: 1px solid #fff !important;
  color: #fff;
  font-weight: bold;
}

.mobile-nav-btn:hover {
  background: #267ddd;
}

@media screen and (max-width: 970px) {
  .header-container {
    .nav {
      .nav-list {
        li {
          margin: 0 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .header-container {
    .nav {
      .nav-block {
        display: none;
      }
      .lang-block {
        margin-left: auto;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .header-container {
    align-items: center;
  }

  .header-container .logo-image {
    width: 60px;
    height: 60px;
  }
  .authentication-block {
    display: none;
  }

  .burger_menu {
    display: block;
  }
}
</style>