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
    <app-modal
      v-if="this.showBindSmartDevModal"
      @close="this.showBindSmartDevModal = false"
      @approve="bindSmartDevToHouse()"
      :btnText="$t('bind')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("bindSmartdevice") }}</h3>
      </template>
      <template #body>
        <div class="create-house-form-block">
          <div class="input-wrap">
            <label for="smartDevBind">{{
              $t("smartDeviceSectionTitle")
            }}</label>
            <select
              name="smartDevBind"
              id="smartDevBind"
              v-model="this.smartDeviceToBind"
            >
              <option
                :value="smt"
                v-for="smt in this.unBindedSmartDevice"
                :key="smt"
              >
                {{ smt }}
              </option>
              <option v-if="this.unBindedSmartDevice.length == 0" :value="null">
                Пристоїв немає
              </option>
            </select>
          </div>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
    <app-modal
      v-if="this.showCreateHouseModal"
      @close="this.showCreateHouseModal = false"
      @approve="createHouse"
      :btnText="$t('create')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("createHouse") }}</h3>
      </template>
      <template #body>
        <div class="create-house-form-block">
          <div class="input-wrap">
            <label for="houseName">{{ $t("name") }}</label>
            <input
              type="text"
              id="houseName"
              v-model="this.createHouseObj.name"
            />
          </div>
          <div class="input-wrap">
            <label for="houseAddress">{{ $t("address") }}</label>
            <input
              type="text"
              id="houseAddress"
              v-model="this.createHouseObj.address"
            />
          </div>
          <div class="input-wrap">
            <label for="houseCountRooms">{{ $t("СountRooms") }}</label>
            <input
              type="text"
              id="houseCountRooms"
              v-model="this.createHouseObj.count_rooms"
            />
          </div>
          <div class="input-wrap">
            <label for="houseCountWindows">{{ $t("СountWindows") }}</label>
            <input
              type="text"
              id="houseCountWindows"
              v-model="this.createHouseObj.count_windows"
            />
          </div>
          <div class="input-wrap">
            <label for="houseCountDoors">{{ $t("СountDoors") }}</label>
            <input
              type="text"
              id="houseCountDoors"
              v-model="this.createHouseObj.count_doors"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
    <app-modal
      v-if="this.showUpdateHouseModal"
      @close="this.showUpdateHouseModal = false"
      @approve="editHouse"
      :btnText="$t('save')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("editHouse") }}</h3>
      </template>
      <template #body>
        <div class="create-house-form-block">
          <div class="input-wrap">
            <label for="houseName">{{ $t("name") }}</label>
            <input
              type="text"
              id="houseName"
              v-model="this.updateHouseObj.name"
            />
          </div>
          <div class="input-wrap">
            <label for="houseAddress">{{ $t("address") }}</label>
            <input
              type="text"
              id="houseAddress"
              v-model="this.updateHouseObj.address"
            />
          </div>
          <div class="input-wrap">
            <label for="houseCountRooms">{{ $t("СountRooms") }}</label>
            <input
              type="text"
              id="houseCountRooms"
              v-model="this.updateHouseObj.count_rooms"
            />
          </div>
          <div class="input-wrap">
            <label for="houseCountWindows">{{ $t("СountWindows") }}</label>
            <input
              type="text"
              id="houseCountWindows"
              v-model="this.updateHouseObj.count_windows"
            />
          </div>
          <div class="input-wrap">
            <label for="houseCountDoors">{{ $t("СountDoors") }}</label>
            <input
              type="text"
              id="houseCountDoors"
              v-model="this.updateHouseObj.count_doors"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
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
      <div class="create-house-block">
        <button
          class="create-house-btn"
          @click="this.showCreateHouseModal = true"
        >
          {{ $t("createHouse") }}
        </button>
      </div>
    </div>
    <div class="houses-content-list">
      <div class="house-row-item" v-for="house in userHouses" :key="house">
        <div class="house-header">
          <div class="circle"></div>
          <div class="house-name-block">
            <p>{{ house.name }}</p>
          </div>
          <div class="smart-device-number">
            <p v-if="house.smart_device_id != null">
              {{ $t("smtDeviceID") }}: {{ house.smart_device_id }}
            </p>
            <p v-if="house.smart_device_id == null">
              {{ $t("smtDeviceID") }}: {{ $t("smtDontBinded") }}
            </p>
          </div>
          <div
            class="bind-block"
            @click="
              this.showBindSmartDevModal = true;
              this.houseToBind = house.house_id;
            "
          >
            <img src="@/assets/bind.png" alt="" />
          </div>
          <app-tool-menu
            @edit="openEditModal(house.house_id)"
            @delete="deleteHouse(house.house_id)"
          ></app-tool-menu>
        </div>
        <div class="house-sensor-statistics">
          <div class="block-statistics">
            <div class="stat-header">
              <p>{{ $t("smoke") }}</p>
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
              <p>{{ $t("humidity") }}</p>
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
              <p>{{ $t("gas") }}</p>
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
              <p>{{ $t("motion") }}</p>
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
                <p>{{ $t("smokeSensors") }}</p>
              </div>
              <div class="info-value">
                <p>{{ house.count_smoke_sensors }}</p>
              </div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <p>{{ $t("humiditySensors") }}</p>
              </div>
              <div class="info-value">
                <p>{{ house.count_humidity_sensors }}</p>
              </div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <p>{{ $t("gasSensors") }}</p>
              </div>
              <div class="info-value">
                <p>{{ house.count_gas_sensors }}</p>
              </div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <p>{{ $t("motionSensors") }}</p>
              </div>
              <div class="info-value">
                <p>{{ house.count_motion_sensors }}</p>
              </div>
            </div>
          </div>
          <div class="house-info">
            <div class="info-block">
              <div class="info-title">
                <p>{{ $t("address") }}</p>
              </div>
              <div class="info-value">
                <p>{{ house.address }}</p>
              </div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <p>{{ $t("СountRooms") }}</p>
              </div>
              <div class="info-value">
                <p>{{ house.count_rooms }}</p>
              </div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <p>{{ $t("СountDoors") }}</p>
              </div>
              <div class="info-value">
                <p>{{ house.count_doors }}</p>
              </div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <p>{{ $t("СountWindows") }}</p>
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
  <div class="user-devices" v-if="tabId === 2">
    <app-modal
      class="activateDeviceModal"
      v-if="this.showCreateDeviceModal"
      @close="this.showCreateDeviceModal = false"
      @approve="
        activatedDeviceSuccessfully
          ? this.activateDeviceSensors()
          : this.activateSmartDeviceAndSensors()
      "
      :btnText="$t('activate')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("activateSmartDevice") }}</h3>
      </template>
      <template #body>
        <div class="create-house-form-block">
          <div class="loader-block" v-if="this.btnLoader"></div>
          <div
            class="activate-device"
            v-if="this.activatedDeviceSuccessfully == false"
          >
            <div class="input-wrap">
              <label for="deviceNumber">{{ $t("activateDeviceNumber") }}</label>
              <input
                type="text"
                id="deviceNumber"
                v-model="this.activateDeviceObj.smart_device_number"
              />
            </div>
          </div>
          <div
            class="activate-device"
            v-if="this.activatedDeviceSuccessfully == true"
          >
            <div class="input-wrap">
              <label for="deviceNumber">{{ $t("activateDeviceNumber") }}</label>
              <input
                type="text"
                id="deviceNumber"
                v-model="this.activateSensors.smart_device_id"
              />
            </div>
            <div class="input-wrap">
              <label for="sensorActivationKey">{{ $t("activationKey") }}</label>
              <input
                type="text"
                id="sensorActivationKey"
                v-model="this.activateSensors.activation_key"
              />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
    <div class="devices-control-panel">
      <div class="search-block">
        <input
          type="text"
          @keyup="getUserSensors"
          class="search-input"
          v-model="this.searchStringSensors"
          :placeholder="$t('search') + ' ...'"
        />
      </div>
      <div class="create-smart-device">
        <button
          class="create-device-btn"
          @click="this.showCreateDeviceModal = true"
        >
          {{ $t("activateSmartDevice") }}
        </button>
      </div>
    </div>
    <div class="devices-content-list">
      <div
        class="device-row-item"
        v-for="sensor in this.userSensor"
        :key="sensor"
      >
        <div class="device-id-block">
          <p>{{ sensor.smart_device_id }}</p>
        </div>
        <div class="is-binded-block">
          <p v-if="sensor.isBinded">{{ $t("binded") }}</p>
          <p v-if="!sensor.isBinded">{{ $t("notBinded") }}</p>
        </div>
        <div class="sensors-blocks">
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/smoke-icon.png" alt="" />
            </div>
            <div class="count">
              <p>{{ sensor.count_smoke_sensors }}x</p>
            </div>
          </div>
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/humidity-icon.png" alt="" />
            </div>
            <div class="count">
              <p>{{ sensor.count_humidity_sensors }}x</p>
            </div>
          </div>
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/gas-icon.png" alt="" />
            </div>
            <div class="count">
              <p>{{ sensor.count_gas_sensors }}x</p>
            </div>
          </div>
          <div class="sensor-wrap-block">
            <div class="sensor-block">
              <img src="@/assets/sensors-icons/motion-icon.png" alt="" />
            </div>
            <div class="count">
              <p>{{ sensor.count_motion_sensors }}x</p>
            </div>
          </div>
        </div>
        <div class="label-block"></div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/services/User";
import House from "@/services/House";
import Sensor from "@/services/Sensor";
import Device from "@/services/Device";
import LineChart from "./LineChart.vue";

export default {
  name: "user-content",
  components: {
    LineChart,
  },
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
      //Houses
      searchString: "",
      userHouses: this.getHousesWithStatistics(),
      showCreateHouseModal: false,
      showUpdateHouseModal: false,
      showBindSmartDevModal: false,
      createHouseObj: {
        user_id: this.userObj.user_id,
        name: "",
        address: "",
        count_rooms: 0,
        count_windows: 0,
        count_doors: 0,
      },
      updateHouseObj: {
        house_id: 0,
        user_id: this.userObj.user_id,
        name: "",
        address: "",
        count_rooms: 0,
        count_windows: 0,
        count_doors: 0,
      },
      //Sensors
      userSensor: this.getUserSensors(),
      showCreateDeviceModal: false,
      searchStringSensors: "",
      unBindedSmartDevice: [],
      smartDeviceToBind: "",
      houseToBind: "",
      activatedDeviceSuccessfully: false,
      btnLoader: false,
      activateDeviceObj: {
        user_id: this.userObj.user_id,
        smart_device_number: "",
      },
      activateSensors: {
        smart_device_id: "",
        activation_key: "",
      },
    };
  },
  methods: {
    updateUserData() {
      User.updateUserData(this.userObj.user_id, this.userDataForUpdate).then(
        (response) => {
          alert(response.data.message);
        }
      );
    },
    updateUserPassword() {
      User.updateUserPassword(
        this.userObj.user_id,
        this.userUpdatePassword
      ).then((response) => {
        alert(response.data.message);
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
    getHousesWithStatistics() {
      House.getHousesWithStatistics(
        this.userObj.user_id,
        this.searchString
      ).then((response) => {
        if (response.data.status == "Success") {
          this.userHouses = response.data.data;
        } else {
          console.log("s");
          alert(response.data.message);
        }
      });
    },
    searchHouse() {
      House.getHousesWithStatistics(
        this.userObj.user_id,
        this.searchString
      ).then((response) => {
        if (response.data.status == "Success") {
          this.userHouses = response.data.data;
        } else {
          alert(response.data.message);
        }
      });
    },
    createHouse() {
      House.createHouse(this.createHouseObj).then((response) => {
        if (response.data.status == "Success") {
          this.showCreateHouseModal = false;
          this.createHouseObj.name = "";
          this.createHouseObj.address = "";
          this.createHouseObj.count_rooms = 0;
          this.createHouseObj.count_windows = 0;
          this.createHouseObj.count_doors = 0;

          this.getHousesWithStatistics();
        } else {
          alert(response.data.message);
        }
      });
    },
    openEditModal(house_id) {
      this.showUpdateHouseModal = true;
      this.userHouses.forEach((house) => {
        if (house.house_id == house_id) {
          this.updateHouseObj.house_id = house_id;
          this.updateHouseObj.name = house.name;
          this.updateHouseObj.address = house.address;
          this.updateHouseObj.count_rooms = house.count_rooms;
          this.updateHouseObj.count_windows = house.count_windows;
          this.updateHouseObj.count_doors = house.count_doors;
        }
      });
    },
    editHouse() {
      House.updateHouse(this.updateHouseObj.house_id, this.updateHouseObj).then(
        (response) => {
          if (response.data.status == "Success") {
            this.showUpdateHouseModal = false;
            this.getHousesWithStatistics();
          } else {
            alert(response.data.message);
          }
        }
      );
    },
    deleteHouse(house_id) {
      House.deleteHouse(house_id).then((response) => {
        if (response.data.status == "Success") {
          this.getHousesWithStatistics();
        } else {
          alert(response.data.message);
        }
      });
    },
    getUserSensors() {
      Sensor.getUserSensors(
        this.userObj.user_id,
        this.searchStringSensors
      ).then((response) => {
        if (response.data.status == "Success") {
          this.userSensor = response.data.data;
          this.userSensor.forEach((element) => {
            if (!element.isBinded) {
              this.unBindedSmartDevice.push(element.smart_device_id);
            }
          });
        } else {
          alert(response.data.message);
        }
      });
    },
    bindSmartDevToHouse() {
      let bindObj = {
        smart_device_id: this.smartDeviceToBind,
        house_id: this.houseToBind,
      };

      House.bindSmartDeviceToHouse(bindObj).then((response) => {
        if (response.data.status == "Success") {
          this.showBindSmartDevModal = false;
          this.getHousesWithStatistics();
        } else {
          alert(response.data.message);
        }
      });
    },
    activateSmartDeviceAndSensors() {
      this.btnLoader = true;
      Device.activateDeviceAndSensor(this.activateDeviceObj).then(
        (response) => {
          this.btnLoader = false;
          if (response.data.status == "Success") {
            this.activateSensors.smart_device_id =
              this.activateDeviceObj.smart_device_number;
            this.activatedDeviceSuccessfully = true;
            this.showCreateDeviceModal = false;
            this.showCreateDeviceModal = true;
          } else {
            alert(response.data.message);
          }
        }
      );
    },
    activateDeviceSensors() {
      Sensor.activateDeviceSensors(this.activateSensors).then((response) => {
        if (response.data.status == "Success") {
          this.showCreateDeviceModal = false;
          this.activatedDeviceSuccessfully = false;
          this.getUserSensors();
        } else {
          alert(response.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//User Profile
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
}
//User Devices
.user-devices {
  width: 100%;
  display: flex;
  flex-direction: column;
  .devices-control-panel {
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
    .create-device-btn {
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
  .devices-content-list {
    flex-grow: 1;
    overflow-y: scroll;
    height: 400px;
    padding: 8px;
    .device-row-item {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 15px;
      padding: 0 20px;
      width: 100%;
      height: 80px;
      overflow: hidden;
      margin-bottom: 20px;
      -webkit-box-shadow: 0 0 6px rgba(180, 180, 180, 0.55);
      box-shadow: 0 0 6px rgba(180, 180, 180, 0.55);
      .device-id-block {
        width: 24%;
        p {
          margin: 0;
        }
      }
      .is-binded-block {
        margin-left: auto;
      }
      .sensors-blocks {
        width: 500px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        margin-left: auto;
        color: #0b0f62;
        .sensor-wrap-block {
          display: flex;
          align-items: center;
          .sensor-block {
            width: 45px;
            height: 45px;
            border-radius: 10px;
            background: #6b98ff;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              height: 30px;
            }
          }
          .count {
            margin: 0 10px;
          }
        }
      }
      .label-block {
        position: absolute;
        right: 0;
        width: 16px;
        height: 100%;
        border-radius: 0 15px 15px 0;
        background: #c9e9ff;
        margin-left: auto;
      }
    }
  }
}

.create-house-form-block {
  display: flex;
  flex-direction: column;
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
    }
    select {
      background-color: #ebebeb;
      border-radius: 8px;
      border: none;
      padding: 12px 8px 12px 8px;
      outline: none;
      font-size: 15px;
    }
  }
}
.activateDeviceModal {
  .loader-block {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(180, 180, 180, 0.25);
  }
  .loader-block::before {
    position: absolute;
    top: 40%;
    left: 47%;
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: transparent;
    border: 3px solid transparent;
    border-top: 3px solid #fff;
    border-left: 3px solid #fff;
    border-right: 3px solid #fff;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>