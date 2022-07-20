<template>
  <div v-if="renderComponent" class="dashboard-main-content">
    <div class="content-header">
      <div class="content-tab-name">
        <h2>{{ $t(menuItemText) }}</h2>
      </div>
      <div class="control-user-block">
        <div class="lang-block">
          <select
            name="lang"
            v-model="$i18n.locale"
            class="lang-select"
            id="langSelect"
            @change="this.setLanguage($event.target.value)"
          >
            <option :key="`locale-en`" :value="`en`">English</option>
            <option :key="`locale-ua`" :value="`ua`">Ukrainian</option>
          </select>
        </div>
        <div class="user-block" @click="showLogout">
          <div class="user-block-image" style="background: #ffa553">
            <p
              style="text-transform: uppercase"
              v-if="
                this.user.name != undefined && this.user.surname != undefined
              "
            >
              {{ `${this.user.name[0]}` + `${this.user.surname[0]}` }}
            </p>
          </div>
          <div class="user-info">
            <p class="user-fullname">
              {{ `${this.user.name} ${this.user.surname}` }}
            </p>
            <p class="user-email">{{ this.user.email }}</p>
          </div>
        </div>
        <div class="logout-block" v-if="isShowLogout">
          <button class="logout-btn" @click="logOut">{{ $t("logout") }}</button>
        </div>
      </div>
    </div>
    <div class="main-tab-content">
      <user-content
        v-if="userRole === 'User'"
        :tabId="menuItemId"
        :userObj="user"
      ></user-content>
      <admin-content
        v-if="userRole === 'Admin'"
        :tabId="menuItemId"
      ></admin-content>
      <operator-content
        v-if="userRole === 'Operator'"
        :tabId="menuItemId"
        :userObj="user"
      ></operator-content>
    </div>
  </div>
</template>

<script>
import Auth from "@/services/Auth";
import User from "@/services/User";
import UserContent from "./user-content/UserContent.vue";
import AdminContent from "./user-content/AdminContent.vue";
import OperatorContent from "./user-content/OperatorContent.vue";

export default {
  name: "content-component",
  components: {
    UserContent,
    AdminContent,
    OperatorContent,
  },
  data() {
    return {
      isShowLogout: false,
      userRole: User.getUserRole(),
      renderComponent: true,
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    menuItemId: {
      type: Number,
      required: true,
    },
    menuItemText: {
      type: String,
      required: true,
    },
  },
  methods: {
    setLanguage(lang) {
      localStorage.setItem("userLanguage", lang);
         this.renderComponent = false;
        
        this.$nextTick(() => {
          // А потом покажем снова
          this.renderComponent = true;
        });
    },
    showLogout() {
      this.isShowLogout = !this.isShowLogout;
    },
    generateRandomRGBColor() {
      let color = Math.floor(Math.random() * 360);
      return `hsla(${color}, 100%, 65%, 1)`;
    },
    logOut() {
      Auth.logOut();
      localStorage.removeItem("user_id");
      localStorage.removeItem("access_token");
      this.$router.push("/signIn");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-main-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .content-tab-name {
      h2 {
        font-size: 20px;
        color: #4a4a4a;
      }
    }
    .control-user-block {
      display: flex;
      justify-content: space-between;
      position: relative;
      .lang-block {
        width: 100px;
        height: 40px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        margin: auto 0;
        margin-right: 20px;
        color: #949191;
        select {
          width: 100%;
          height: 100%;
          border: none;
          padding: 0 10px;
          outline: none;
          cursor: pointer;
        }
      }
      .user-block {
        width: 240px;
        display: flex;
        padding: 10px;
        border-radius: 10px;
        background: #fff;
        cursor: pointer;
      }
      .user-block-image {
        margin-right: 10px;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        p {
          line-height: 10px;
        }
      }
      .user-info {
        .user-fullname {
          color: #000;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .user-email {
          color: #949191;
          font-size: 12px;
        }
        p {
          text-align: left;
          margin: 0;
        }
      }
      .logout-block {
        height: 40px;
        width: 130px;
        right: 0;
        bottom: -50px;
        position: absolute;
        background: #fff;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.07);

        .logout-btn {
          width: 100%;
          height: 100%;
          background: #fff;
          color: #c85e5e;
          border: none;
          cursor: pointer;
          transition: all 0.5s;
        }
        .logout-btn:hover {
          background: rgb(251, 251, 251);
        }
      }
    }
  }
  .main-tab-content {
    background: #fff;
    border-radius: 20px;
    display: flex;
    flex-grow: 1;
    padding: 20px;
  }
}
</style>