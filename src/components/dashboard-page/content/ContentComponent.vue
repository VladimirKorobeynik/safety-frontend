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
        <div
          class="notification-block"
          v-if="this.userRole == 'User' || this.userRole == 'Operator'"
        >
          <div
            class="notifications-btn"
            @click="this.isShowNotification = !this.isShowNotification"
          >
            <svg
              width="18"
              height="29"
              viewBox="0 0 23 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0348 22.0377H0.955261C0.791929 22.0372 0.631435 21.995 0.48902 21.915C0.346605 21.835 0.226997 21.72 0.141556 21.5808C0.0561142 21.4416 0.00767554 21.2828 0.000839663 21.1196C-0.00599621 20.9565 0.0289979 20.7942 0.102498 20.6484C1.28474 18.2655 1.90429 15.6431 1.91342 12.9831V9.58161C1.91342 7.04041 2.92291 4.60329 4.71981 2.80639C6.51671 1.00949 8.95383 0 11.495 0C14.0362 0 16.4733 1.00949 18.2702 2.80639C20.0671 4.60329 21.0766 7.04041 21.0766 9.58161V12.9639C21.0858 15.6239 21.7053 18.2463 22.8876 20.6292C22.9656 20.7757 23.0042 20.94 22.9996 21.106C22.9951 21.2719 22.9475 21.4338 22.8615 21.5758C22.7755 21.7178 22.6541 21.835 22.5092 21.916C22.3643 21.997 22.2008 22.0389 22.0348 22.0377ZM2.44041 20.1214H20.5496C19.6359 17.8455 19.1644 15.4163 19.1603 12.9639V9.58161C19.1603 7.54865 18.3527 5.59895 16.9152 4.16143C15.4777 2.72391 13.528 1.91632 11.495 1.91632C9.46207 1.91632 7.51237 2.72391 6.07485 4.16143C4.63733 5.59895 3.82974 7.54865 3.82974 9.58161V12.9639C3.82565 15.4163 3.35412 17.8455 2.44041 20.1214Z"
                fill="#020303"
              />
              <path
                d="M13.3594 26.8487C12.1898 27.3452 10.8709 27.3567 9.6928 26.8807C8.51472 26.4048 7.57397 25.4803 7.07751 24.3107C6.97822 24.0768 6.97591 23.813 7.07111 23.5774C7.1663 23.3418 7.3512 23.1536 7.58512 23.0543C7.81904 22.955 8.08282 22.9527 8.31843 23.0479C8.55405 23.1431 8.7422 23.328 8.84149 23.5619C9.13989 24.2632 9.70455 24.8173 10.4113 25.1023C11.1194 25.367 11.902 25.3499 12.5978 25.0545C13.2936 24.7592 13.8495 24.2081 14.151 23.5149C14.1983 23.3978 14.2682 23.2911 14.3568 23.201C14.4454 23.1109 14.5508 23.0391 14.6671 22.9897C14.7834 22.9404 14.9083 22.9144 15.0346 22.9133C15.1609 22.9122 15.2863 22.936 15.4034 22.9833C15.5206 23.0306 15.6272 23.1006 15.7173 23.1891C15.8075 23.2777 15.8792 23.3831 15.9286 23.4994C15.978 23.6157 16.0039 23.7406 16.0051 23.8669C16.0062 23.9933 15.9824 24.1186 15.935 24.2357C15.6985 24.8191 15.3492 25.3502 14.9073 25.7986C14.4653 26.2469 13.9393 26.6038 13.3594 26.8487Z"
                fill="#020303"
              />
            </svg>
            <div class="notify-count" v-if="this.notifications.length != 0">
              {{ this.notifications.length }}
            </div>
          </div>
          <div class="notification-body" v-if="this.isShowNotification">
            <div class="notify-body-inner">
              <div
                class="not-notifications"
                v-if="this.notifications.length == 0"
              >
                {{ $t("notNotification") }}
              </div>
              <div
                class="notification-item"
                v-for="notification in this.notifications.reverse()"
                :key="notification"
              >
                <div class="notify-title">
                  <p>{{ notification.title }}</p>
                  <div
                    class="delete-notify"
                    @click="deleteNotification(notification.notification_id)"
                  >
                    <img src="@/assets/close-icon.png" alt="" />
                  </div>
                </div>
                <div class="notify-content">
                  <p>{{ notification.content }}</p>
                </div>
                <div class="notify-time">
                  <p>{{ notification.created_at.substring(11, 16) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="user-block"
          @click="showLogout"
          v-if="this.user != undefined"
        >
          <div class="user-block-image" style="background: #ffa553">
            <p style="text-transform: uppercase">
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
import Notification from "@/services/Notification";
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
  data() {
    return {
      isShowLogout: false,
      isShowNotification: false,
      userRole: User.getUserRole(),
      userID: localStorage.getItem('user_id'),
      renderComponent: true,
      notifications: [],
    };
  },
  created() {
    if (User.getUserRole() != 'Admin') {
      this.getNotifications();
    }
  },
  methods: {
    setLanguage(lang) {
      localStorage.setItem("userLanguage", lang);
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    showLogout() {
      this.isShowLogout = !this.isShowLogout;
    },
    getNotifications() {
      Notification.getUserNotification(this.userID).then((response) => {
        if (response.data.status == "Success") {
          this.notifications = response.data.data;
        } else {
          alert(response.data.message);
        }
      });
    },
    deleteNotification(notification_id) {
      Notification.deleteUserNotification(notification_id).then((response) => {
        if (response.data.status == "Success") {
          this.getNotifications();
        } else {
          alert(response.data.message);
        }
      });
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
      .notification-block {
        position: relative;
        display: flex;
        align-items: center;
        .notifications-btn {
          width: 40px;
          height: 40px;
          background: #fff;
          border-radius: 10px;
          margin: auto 0;
          margin-right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          // position: inherit;
          cursor: pointer;
          .notify-count {
            width: 20px;
            height: 20px;
            background: #e76161;
            border-radius: 50%;
            color: #fff;
            position: absolute;
            top: 5px;
            right: 14px;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          img {
            height: 25px;
          }
        }
        .notification-body {
          background: #fff;
          position: absolute;
          z-index: 100;
          bottom: 0;
          border-radius: 20px;
          bottom: -316px;
          padding: 10px;
          box-shadow: 0px 0px 21px 0px rgb(184 184 184 / 41%);
          .notify-body-inner {
            overflow: scroll;
            height: 300px;
            width: 300px;
            .not-notifications {
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #4a4a4a;
            }
            .notification-item {
              border: 1px solid rgb(202, 202, 202);
              border-radius: 10px;
              padding: 10px;
              margin-bottom: 10px;
              .notify-title {
                text-align: left;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 5px;
                display: flex;
                justify-content: space-between;
                p {
                  margin: 0;
                }
                .delete-notify {
                  cursor: pointer;
                  img {
                    width: 14px;
                    height: 14px;
                  }
                }
              }
              .notify-content {
                text-align: left;
                font-size: 12px;
                color: #939393;
              }
              .notify-time {
                text-align: right;
                p {
                  margin: 0;
                }
              }
            }
          }
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