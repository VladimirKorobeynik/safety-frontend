<template>
  <div class="user-profile" v-if="tabId === 0">
    <div class="user-info-block">
      <div class="user-account">
        <div class="user-block">
          <div class="user-block-image" style="background: #ffa553">
            <p
              style="text-transform: uppercase"
              v-if="
                this.userObj.name != undefined &&
                this.userObj.surname != undefined
              "
            >
              {{ `${this.userObj.name[0]}` + `${this.userObj.surname[0]}` }}
            </p>
          </div>
          <div class="user-info">
            <p class="user-fullname">
              {{ `${this.userObj.name} ${this.userObj.surname}` }}
            </p>
            <p class="user-email">{{ this.userObj.email }}</p>
          </div>
        </div>
        <div class="delete-account-block">
          <button class="delete-account-btn" @click="deleteUserAccount">
            {{ $t("deleteAccount") }}
          </button>
        </div>
      </div>
      <div class="user-edit-info-block">
        <div class="info-header">
          <p>{{ $t("editProfileInformation") }}</p>
        </div>
        <div class="user-info-inputs">
          <div class="left-column">
            <div class="input-wrap">
              <label for="nameInput">{{ $t("name") }}</label>
              <input
                type="text"
                id="nameInput"
                v-model="userDataForUpdate.name"
              />
            </div>
            <div class="input-wrap">
              <label for="surnameInput">{{ $t("surname") }}</label>
              <input
                type="text"
                id="surnameInput"
                v-model="userDataForUpdate.surname"
              />
            </div>
            <div class="input-wrap">
              <label for="numberInput">{{ $t("number") }}</label>
              <input
                type="text"
                id="numberInput"
                v-model="userDataForUpdate.number"
              />
            </div>
          </div>
          <div class="right-column">
            <div class="input-wrap">
              <label for="addressInput">{{ $t("address") }}</label>
              <input
                type="text"
                id="addressInput"
                v-model="userDataForUpdate.address"
              />
            </div>
            <div class="input-wrap">
              <label for="emailInput">{{ $t("emailAddress") }}</label>
              <input
                type="email"
                id="emailInput"
                v-model="userDataForUpdate.email"
              />
            </div>
            <div class="input-wrap">
              <label for="birthdayInput">{{ $t("birthday") }}</label>
              <input
                type="date"
                id="birthdayInput"
                v-model="userDataForUpdate.birthday"
              />
            </div>
          </div>
        </div>
        <div class="save-info-block">
          <app-button class="save-info-btn" @click="updateUserData">{{
            $t("save")
          }}</app-button>
        </div>
      </div>
    </div>
    <div class="user-password-block">
      <div class="info-header">
        <p>{{ $t("changeYourPassword") }}</p>
      </div>
      <div class="change-password-block">
        <div class="input-wrap">
          <label for="">{{ $t("oldPassword") }}</label>
          <input type="password" v-model="userUpdatePassword.old_password" />
        </div>
        <div class="input-wrap">
          <label for="">{{ $t("newPassword") }}</label>
          <input type="password" v-model="userUpdatePassword.new_password" />
        </div>
        <div class="update-password-block">
          <app-button class="update-password-btb" @click="updateUserPassword">{{
            $t("save")
          }}</app-button>
        </div>
      </div>
    </div>
  </div>
  <div class="user-houses" v-if="tabId === 1">
    <div class="houses-control-panel">
      <div class="search-block">
        <input
          type="text"
          @keyup="searchHouse"
          class="search-input"
          v-model="this.searchString"
          :placeholder="$t('search') + ' ...'"
        />
      </div>
    </div>
    <div class="houses-content-list">
      <div class="user-houses" v-for="house in operatorHouses" :key="house">
        <div class="user-info-block">
          <div class="inner-wrap">
            <div
              class="icon-user"
              :style="{ background: this.generateRandomRGBColor() }"
            >
              <p>
                {{
                  house.user_fullname.split(" ")[0][0] +
                  "" +
                  house.user_fullname.split(" ")[1][0]
                }}
              </p>
            </div>
            <div class="fullname-user">
              <p style="text-align: left">
                {{ `${house.user_fullname} (${house.user_email})` }}
              </p>
            </div>
          </div>
        </div>
        <div class="house-row-item" v-for="house in house.houses" :key="house">
          <div class="house-header">
            <div class="circle"></div>
            <div class="house-name-block">
              <p>{{ house.name }}</p>
            </div>
            <div class="smart-device-number">
              <p v-if="house.smart_device_id != null">
                {{ $t('smtDeviceID') }}: {{ house.smart_device_id }}
              </p>
              <p v-if="house.smart_device_id == null">
                {{ $t('smtDeviceID') }}: {{ $t('smtDontBinded') }}
              </p>
            </div>
            <div>
              <p></p>
            </div>
          </div>
          <div class="house-sensor-statistics">
            <div class="block-statistics">
              <div class="stat-header">
                <p>{{ $t('smoke') }}</p>
              </div>
              <div class="stat-chart">
                <line-chart
                  :dataChart="house.stat_smoke"
                  :bgColor="'rgba(218, 218, 218, 0.5)'"
                  :borderColor="'rgba(184, 184, 184, 1)'"
                ></line-chart>
              </div>
            </div>
            <div class="block-statistics">
              <div class="stat-header">
                <p>{{ $t('humidity') }}</p>
              </div>
              <div class="stat-chart">
                <line-chart
                  :dataChart="house.stat_humidity"
                  :bgColor="'rgba(173, 216, 255, 0.5)'"
                  :borderColor="'rgba(97, 186, 244, 1)'"
                ></line-chart>
              </div>
            </div>
            <div class="block-statistics">
              <div class="stat-header">
                <p>{{ $t('gas') }}</p>
              </div>
              <div class="stat-chart">
                <line-chart
                  :dataChart="house.stat_gas"
                  :bgColor="'rgba(139, 255, 151, 0.5)'"
                  :borderColor="'rgba(109, 202, 119, 1)'"
                ></line-chart>
              </div>
            </div>
            <div class="block-statistics">
              <div class="stat-header">
                <p>{{ $t('motion') }}</p>
              </div>
              <div class="stat-chart">
                <line-chart
                  :dataChart="house.stat_motion"
                  :bgColor="'rgba(255, 195, 139, 0.5)'"
                  :borderColor="'rgba(228, 172, 120, 1)'"
                ></line-chart>
              </div>
            </div>
          </div>
          <div class="house-info-block">
            <div class="sensors-info">
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('smokeSensors') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.count_smoke_sensors }}</p>
                </div>
              </div>
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('humiditySensors') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.count_humidity_sensors }}</p>
                </div>
              </div>
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('gasSensors') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.count_gas_sensors }}</p>
                </div>
              </div>
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('motionSensors') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.count_motion_sensors }}</p>
                </div>
              </div>
            </div>
            <div class="house-info">
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('address') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.address }}</p>
                </div>
              </div>
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('СountRooms') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.count_rooms }}</p>
                </div>
              </div>
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('СountDoors') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.count_doors }}</p>
                </div>
              </div>
              <div class="info-block">
                <div class="info-title">
                  <p>{{ $t('СountWindows') }}</p>
                </div>
                <div class="info-value">
                  <p>{{ house.count_windows }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/services/User";
import House from "@/services/House";
import Sensor from "@/services/Sensor";
import LineChart from "./LineChart.vue";

export default {
  name: "operator-content",
  props: {
    tabId: {
      type: Number,
      required: true,
    },
    userObj: {
      type: Object,
      required: true,
    },
  },
  components: {
    LineChart,
  },
  data() {
    return {
      userDataForUpdate: {
        name: this.userObj.name,
        surname: this.userObj.surname,
        number: this.userObj.number,
        address: this.userObj.address,
        email: this.userObj.email,
        birthday: this.userObj.birthday,
        is_active: this.userObj.is_active,
      },
      userUpdatePassword: {
        old_password: "",
        new_password: "",
      },
      operatorHouses: this.getOperatorResponsibilityHouses(),
    };
  },
  methods: {
    updateUserData() {
      User.updateUserData(this.userObj.user_id, this.userDataForUpdate).then(
        (response) => {
          if (response.data.status == "Success") {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        }
      );
    },
    updateUserPassword() {
      User.updateUserPassword(
        this.userObj.user_id,
        this.userUpdatePassword
      ).then((response) => {
        if (response.data.status == "Success") {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      });
    },
    deleteUserAccount() {
      User.deleteUser(this.userObj.user_id).then((response) => {
        if (response.data.status == "Success") {
          console.log("success");
          localStorage.removeItem("user_id");
          localStorage.removeItem("access_token");
          this.$router.push("/signIn");
        } else {
          alert(response.data.message);
        }
      });
    },
    getOperatorResponsibilityHouses() {
      House.getOperatorResponsibilityHouses(this.userObj.user_id).then(
        (response) => {
          if (response.data.status == "Success") {
            this.operatorHouses = response.data.data;
          } else {
            alert(response.data.message);
          }
        }
      );
    },
    generateRandomRGBColor() {
      let color = Math.floor(Math.random() * 360);

      return `hsla(${color}, 60%, 53%, 1)`;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .user-info-block {
    flex-basis: 59%;
  }
  .user-password-block {
    flex-basis: 39%;
  }
  .user-info-block {
    margin-right: 10px;
    .user-account {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-radius: 15px;
      -webkit-box-shadow: 0px 0px 21px 0px rgba(184, 184, 184, 0.41);
      box-shadow: 0px 0px 21px 0px rgba(184, 184, 184, 0.41);
      margin-bottom: 20px;
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
      .delete-account-block {
        display: flex;
        align-items: center;
        padding: 0 10px;
        .delete-account-btn {
          width: 150px;
          padding: 10px;
          background: #ffe0da;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: #b17878;
          font-size: 16px;
          font-weight: bold;
        }
        .delete-account-btn:hover {
          background: #ffae9e;
        }
      }
    }
    .user-edit-info-block {
      box-sizing: border-box;
      padding: 20px;
      border-radius: 15px;
      -webkit-box-shadow: 0px 0px 21px 0px rgba(184, 184, 184, 0.41);
      box-shadow: 0px 0px 21px 0px rgba(184, 184, 184, 0.41);
      .info-header {
        margin-bottom: 10px;
        text-align: left;
        p {
          margin: 0;
          color: #6a6f76;
          font-weight: bold;
        }
      }
      .user-info-inputs {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .left-column,
        .right-column {
          flex-basis: 48%;
        }
      }
      .save-info-block {
        display: flex;
        justify-content: flex-start;
        .save-info-btn {
          border-radius: 8px;
        }
      }
    }
  }
  .user-password-block {
    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px;
    -webkit-box-shadow: 0px 0px 21px 0px rgba(184, 184, 184, 0.41);
    box-shadow: 0px 0px 21px 0px rgba(184, 184, 184, 0.41);
    height: 265px;
    .info-header {
      margin-bottom: 10px;
      text-align: left;
      p {
        margin: 0;
        color: #6a6f76;
        font-weight: bold;
      }
    }
    .update-password-block {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 15px;
      .update-password-btb {
        border-radius: 8px;
      }
    }
  }
  .input-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
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
      font-family: Roboto, sans-serif;
    }
  }
}
//User houses
.user-houses {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .houses-control-panel {
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    margin-bottom: 15px;
    .search-block {
      flex-basis: 40%;
      input {
        width: 100%;
        background-color: #ededed;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        box-sizing: border-box;
        color: #9fa1ab;
        outline: none;
        font-size: 14px;
      }
    }
    .create-house-block {
      .create-house-btn {
        background-color: #4482f7;
        box-sizing: border-box;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        padding: 10px;
        cursor: pointer;
        border: 4px solid #fff;
        -webkit-box-shadow: 0 0 6px 0 rgba(98, 98, 98, 0.3);
        -moz-box-shadow: 0 0 6px 0 rgba(98, 98, 98, 0.3);
        box-shadow: 0 0 6px 0 rgba(98, 98, 98, 0.3);
        transition: all 0.5s;
      }
      .create-house-btn:hover {
        background-color: #3c76e2;
      }
    }
  }
  .houses-content-list {
    flex-grow: 1;
    overflow-y: scroll;
    height: 400px;
    padding: 8px;
    .house-row-item {
      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 15px;
      width: 100%;
      // height: 200px;
      color: #888888;
      font-size: 15px;
      text-align: left;
      overflow: hidden;
      margin-bottom: 20px;
      -webkit-box-shadow: 0 0 6px rgba(180, 180, 180, 0.55);
      box-shadow: 0 0 6px rgba(180, 180, 180, 0.55);
      .house-header {
        display: flex;
        padding: 20px 20px 0 20px;
        align-items: center;
        .circle {
          background: #4fac68;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-right: 5px;
        }
        p {
          margin: 0;
          color: #000;
          font-size: 18px;
          font-weight: bold;
        }
        .bind-block {
          padding: 5px;
          border-radius: 8px;
          margin-left: 5px;
          cursor: pointer;
          transition: all 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 16px;
            height: 16px;
          }
        }
        .bind-block:hover {
          background: rgb(244, 244, 244);
        }
        .smart-device-number {
          margin-left: 10px;
          p {
            font-size: 14px;
            color: #898a8a;
            line-height: 20px;
          }
        }
      }
      .house-sensor-statistics {
        padding: 0 20px;
        // height: 140px;
        display: flex;
        .block-statistics {
          flex-basis: 25%;
        }
      }
      .house-info-block {
        background: #ebf7ff;
        padding: 20px;
        display: flex;
        .sensors-info,
        .house-info {
          flex-basis: 50%;
          display: flex;
          .info-block {
            flex-basis: 25%;
            .info-title,
            .info-value {
              text-align: center;
              p {
                margin: 0;
              }
            }
            .info-title {
              margin-bottom: 5px;
            }
            .info-title p {
              text-transform: uppercase;
              font-size: 12px;
              color: #898a8a;
            }
            .info-value p {
              color: #000;
            }
          }
        }
      }
    }
  }
  .user-info-block {
    margin-bottom: 10px;
    .inner-wrap {
      display: flex;
      align-items: center;
      .icon-user {
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        margin-right: 15px;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        background: rgb(255, 191, 0);
        p {
          line-height: 10px;
        }
      }
    }
  }
}
</style>