<template>
  <div class="admin-users" v-if="tabId === 0">
    <app-modal
      v-if="this.showCreateUserModal"
      @close="this.showCreateUserModal = false"
      @approve="createUser()"
      :btnText="$t('create')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("createUser") }}</h3>
      </template>
      <template #body>
        <div class="form-block horizontal-form">
          <div class="left-side">
            <div class="input-wrap">
              <label for="smartDevBind">{{ $t("role") }}</label>
              <select
                name="smartDevBind"
                id="smartDevBind"
                v-model="this.createUserObj.role_id"
              >
                <option
                  :value="role.role_id"
                  v-for="role in this.roles"
                  :key="role"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
            <div class="input-wrap">
              <label for="userName">{{ $t("name") }}</label>
              <input
                type="text"
                id="userName"
                v-model="this.createUserObj.name"
              />
            </div>
            <div class="input-wrap">
              <label for="userSurname">{{ $t("surname") }}</label>
              <input
                type="text"
                id="userSurname"
                v-model="this.createUserObj.surname"
              />
            </div>
            <div class="input-wrap">
              <label for="userNumber">{{ $t("number") }}</label>
              <input
                type="text"
                id="userNumber"
                v-model="this.createUserObj.number"
              />
            </div>
          </div>
          <div class="right-side">
            <div class="input-wrap">
              <label for="userAddress">{{ $t("address") }}</label>
              <input
                type="text"
                id="userAddress"
                v-model="this.createUserObj.address"
              />
            </div>
            <div class="input-wrap">
              <label for="userEmail">{{ $t("emailAddress") }}</label>
              <input
                type="text"
                id="userEmail"
                v-model="this.createUserObj.email"
              />
            </div>
            <div class="input-wrap">
              <label for="userBirthday">{{ $t("birthday") }}</label>
              <input
                type="text"
                id="userBirthday"
                v-model="this.createUserObj.birthday"
              />
            </div>
            <div class="input-wrap">
              <label for="userBirthday">{{ $t("password") }}</label>
              <input
                type="password"
                id="userPassword"
                v-model="this.createUserObj.password"
              />
            </div>
          </div>
        </div>
        <div
          class="checkbox-input-wrap"
          style="text-align: left; display: flex; align-items: center"
        >
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            v-model="this.createUserObj.is_active"
          />
          <label for="isActive">{{ $t("isActive") }}</label>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
    <app-modal
      v-if="this.showUpdateUserModal"
      @close="this.showUpdateUserModal = false"
      @approve="updateUser"
      :btnText="$t('save')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("updateUser") }}</h3>
      </template>
      <template #body>
        <div class="form-block horizontal-form">
          <div class="left-side">
            <div class="input-wrap">
              <label for="smartDevBind">{{ $t("role") }}</label>
              <select
                name="smartDevBind"
                id="smartDevBind"
                v-model="this.updateUserObj.role_id"
              >
                <option
                  :value="role.role_id"
                  v-for="role in this.roles"
                  :key="role"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
            <div class="input-wrap">
              <label for="userName">{{ $t("name") }}</label>
              <input
                type="text"
                id="userName"
                v-model="this.updateUserObj.name"
              />
            </div>
            <div class="input-wrap">
              <label for="userSurname">{{ $t("surname") }}</label>
              <input
                type="text"
                id="userSurname"
                v-model="this.updateUserObj.surname"
              />
            </div>
            <div class="input-wrap">
              <label for="userNumber">{{ $t("number") }}</label>
              <input
                type="text"
                id="userNumber"
                v-model="this.updateUserObj.number"
              />
            </div>
          </div>
          <div class="right-side">
            <div class="input-wrap">
              <label for="userAddress">{{ $t("address") }}</label>
              <input
                type="text"
                id="userAddress"
                v-model="this.updateUserObj.address"
              />
            </div>
            <div class="input-wrap">
              <label for="userEmail">{{ $t("emailAddress") }}</label>
              <input
                type="text"
                id="userEmail"
                v-model="this.updateUserObj.email"
              />
            </div>
            <div class="input-wrap">
              <label for="userBirthday">{{ $t("birthday") }}</label>
              <input
                type="text"
                id="userBirthday"
                v-model="this.updateUserObj.birthday"
              />
            </div>
          </div>
        </div>
        <div
          class="checkbox-input-wrap"
          style="text-align: left; display: flex; align-items: center"
        >
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            v-model="this.updateUserObj.is_active"
          />
          <label for="isActive">{{ $t("isActive") }}</label>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
    <div class="control-panel">
      <div class="search-block">
        <input
          type="text"
          @keyup="getAllUsers"
          class="search-input"
          v-model="this.searchUserString"
          :placeholder="$t('search') + ' ...'"
        />
      </div>
      <div class="create-block export-block">
        <button class="create-btn export-btn" @click="exportUsersToExcel">
          {{ $t("exportExcel") }}
        </button>
      </div>
      <div class="create-block">
        <button class="create-btn" @click="this.showCreateUserModal = true">
          {{ $t("createUser") }}
        </button>
      </div>
    </div>
    <div class="list-wrap">
      <table class="list-items">
        <thead class="list-header">
          <th class="id-block head-block">ID</th>
          <th class="fullname-block head-block">{{ $t("fullname") }}</th>
          <th class="number-block head-block">{{ $t("number") }}</th>
          <th class="birthday-block head-block">{{ $t("birthday") }}</th>
          <th class="email-block head-block">{{ $t("emailAddress") }}</th>
          <th class="role-block head-block">{{ $t("role") }}</th>
          <th class="status-block head-block">{{ $t("status") }}</th>
          <th class="status-block head-block">{{ $t("action") }}</th>
        </thead>
        <tbody class="content-list">
          <tr class="row-item" v-for="user in users" :key="user">
            <td class="head-block">{{ user.user_id }}</td>
            <td class="head-block user-block">
              <div class="inner-wrap">
                <div
                  class="icon-user"
                  :style="{ background: this.generateRandomRGBColor() }"
                >
                  <p>{{ user.name[0] + "" + user.surname[0] }}</p>
                </div>
                <div class="fullname-user">
                  <p>{{ user.name + " " + user.surname }}</p>
                </div>
              </div>
            </td>
            <td class="head-block">{{ user.number }}</td>
            <td class="head-block">
              {{ user.birthday.split("-").reverse().join("-") }}
            </td>
            <td class="head-block">{{ user.email }}</td>
            <td class="head-block">{{ user.role }}</td>
            <td class="head-block">
              <div v-if="user.is_active == true" class="active-status">
                <p>{{ $t("active") }}</p>
              </div>
              <div v-if="user.is_active == false" class="inactive-status">
                <p>{{ $t("inActive") }}</p>
              </div>
            </td>
            <td class="head-block">
              <app-tool-menu
                :pos="'vertical'"
                class="menu"
                @edit="openUserEditModal(user.user_id)"
                @delete="deleteUser(user.user_id)"
              ></app-tool-menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="admin-houses" v-if="tabId === 1">
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
        <div class="form-block">
          <div class="input-wrap">
            <label for="userFullname">{{ $t("user") }}</label>
            <select
              name="user"
              id="userFullname"
              v-model="this.createHouseObj.user_id"
            >
              <option
                :value="user.user_id"
                v-for="user in this.users"
                :key="user"
              >
                {{ `${user.name} ${user.surname}` }}
              </option>
            </select>
          </div>
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
      @approve="updateHouse"
      :btnText="$t('save')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("editHouse") }}</h3>
      </template>
      <template #body>
        <div class="form-block">
          <div class="input-wrap">
            <label for="userFullname">{{ $t("user") }}</label>
            <select
              name="user"
              id="userFullname"
              v-model="this.updateHouseObj.user_id"
            >
              <option
                :value="user.user_id"
                v-for="user in this.users"
                :key="user"
              >
                {{ `${user.name} ${user.surname}` }}
              </option>
            </select>
          </div>
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
    <div class="control-panel">
      <div class="search-block">
        <input
          type="text"
          @keyup="getHouses"
          class="search-input"
          v-model="this.houseSearchStr"
          :placeholder="$t('search') + ' ...'"
        />
      </div>
      <div class="create-block export-block">
        <button class="create-btn export-btn" @click="exportHousesToExcel">
          {{ $t("exportExcel") }}
        </button>
      </div>
      <div class="create-block">
        <button class="create-btn" @click="this.showCreateHouseModal = true">
          {{ $t("createHouse") }}
        </button>
      </div>
    </div>
    <div class="list-wrap">
      <table class="list-items">
        <thead class="list-header">
          <th class="head-block">ID</th>
          <th class="head-block">{{ $t("user") }}</th>
          <th class="head-block">{{ $t("name") }}</th>
          <th class="head-block">{{ $t("address") }}</th>
          <th class="head-block">{{ $t("rooms") }}</th>
          <th class="head-block">{{ $t("windows") }}</th>
          <th class="head-block">{{ $t("doors") }}</th>
          <th class="head-block">{{ $t("action") }}</th>
        </thead>
        <tbody class="content-list">
          <tr class="row-item" v-for="house in houses" :key="house">
            <td class="head-block">{{ house.house_id }}</td>
            <td class="head-block">{{ house.user_fullname }}</td>
            <td class="head-block">{{ house.name }}</td>
            <td class="head-block">{{ house.address }}</td>
            <td class="head-block">{{ house.count_rooms }}</td>
            <td class="head-block">{{ house.count_windows }}</td>
            <td class="head-block">{{ house.count_doors }}</td>
            <td class="head-block">
              <app-tool-menu
                :pos="'vertical'"
                class="menu"
                @edit="openEditHouseModal(house.house_id)"
                @delete="deleteHouse(house.house_id)"
              ></app-tool-menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="admin-sensors" v-if="tabId === 2">
     <app-modal
      v-if="this.showImportDeviceModal"
      @close="this.showImportDeviceModal = false"
      @approve="uploadImportDevice"
      :btnText="$t('import')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("importDevices") }}</h3>
      </template>
      <template #body>
        <div class="form-block">
          <div class="input-wrap">
            <label for="devicesFile">{{ $t("xlsxFile") }}</label>
            <input
              type="file"
              id="devicesFile"
              @change="handleFileUpload($event)"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
    <app-modal
      v-if="this.showCreateDeviceModal"
      @close="this.showCreateDeviceModal = false"
      @approve="createDevice"
      :btnText="$t('create')"
    >
      <template #header>
        <h3 style="margin: 0">{{ $t("createDevice") }}</h3>
      </template>
      <template #body>
        <div class="form-block">
          <div class="input-wrap">
            <label for="deviceNumber">{{ $t("serialNumber") }}</label>
            <input
              type="text"
              id="deviceNumber"
              v-model="this.createDeviceObj.smart_device_number"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <h3>My footer</h3>
      </template>
    </app-modal>
    <div class="control-panel">
      <div class="search-block">
        <input
          type="text"
          @keyup="getDevices"
          class="search-input"
          v-model="this.deviceSearchStr"
          :placeholder="$t('search') + ' ...'"
        />
      </div>
      <div class="create-block export-block">
        <button class="create-btn import-btn" @click="showImportDeviceModal = true">
          {{ $t("importExcel") }}
        </button>
        <button class="create-btn export-btn" @click="exportDeviceToExcel">
          {{ $t("exportExcel") }}
        </button>
      </div>
      <div class="create-block">
        <button class="create-btn" @click="this.showCreateDeviceModal = true">
          {{ $t("createDevice") }}
        </button>
      </div>
    </div>
    <div class="list-wrap">
      <table class="list-items">
        <thead class="list-header">
          <th class="head-block">ID</th>
          <th class="head-block">{{ $t("serialNumber") }}</th>
          <th class="head-block">{{ $t("gasSensors") }}</th>
          <th class="head-block">{{ $t("humiditySensors") }}</th>
          <th class="head-block">{{ $t("smokeSensors") }}</th>
          <th class="head-block">{{ $t("motionSensors") }}</th>
          <th class="head-block">{{ $t("bought") }}</th>
          <th class="head-block">{{ $t("activated") }}</th>
          <th class="head-block">{{ $t("action") }}</th>
        </thead>
        <tbody class="content-list">
          <tr class="row-item" v-for="device in smartDevices" :key="device">
            <td class="head-block">{{ device.smt_dev_id }}</td>
            <td class="head-block">{{ device.smart_device_number }}</td>
            <td class="head-block">{{ device.count_gas_sensors }}</td>
            <td class="head-block">{{ device.count_humidity_sensors }}</td>
            <td class="head-block">{{ device.count_smoke_sensors }}</td>
            <td class="head-block">{{ device.count_motion_sensors }}</td>
            <td class="head-block">
              <div v-if="device.is_bought == true" class="bought-status">
                <p>+</p>
              </div>
              <div v-if="device.is_bought == false" class="not-bought-status">
                <p>-</p>
              </div>
            </td>
            <td class="head-block">
              <div v-if="device.is_activated == true" class="active-status">
                <p>{{ $t("activated") }}</p>
              </div>
              <div v-if="device.is_activated == false" class="inactive-status">
                <p>{{ $t("notActivated") }}</p>
              </div>
            </td>
            <td class="head-block">
              <app-tool-menu
                :pos="'vertical'"
                class="menu"
                @edit="openDeviceEditModal(device.smt_dev_id)"
                @delete="deleteDevice(device.smt_dev_id)"
              ></app-tool-menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import User from "@/services/User";
import House from "@/services/House";
import Device from "@/services/Device";

export default {
  name: "admin-content",
  props: {
    tabId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      users: this.getAllUsers(),
      roles: this.getRoles(),
      showCreateUserModal: false,
      showUpdateUserModal: false,
      searchUserString: "",
      createUserObj: {
        role_id: 1,
        name: "",
        surname: "",
        number: "",
        address: "",
        email: "",
        birthday: "",
        password: "",
        is_active: true,
      },
      updateUserObj: {
        user_id: 1,
        role_id: 1,
        name: "",
        surname: "",
        number: "",
        address: "",
        email: "",
        birthday: "",
        is_active: true,
      },
      //Houses
      houseSearchStr: "",
      houses: this.getHouses(),
      showUpdateHouseModal: false,
      showCreateHouseModal: false,
      createHouseObj: {
        user_id: 0,
        name: "",
        address: "",
        count_rooms: 0,
        count_windows: 0,
        count_doors: 0,
      },
      updateHouseObj: {
        house_id: 0,
        user_id: 0,
        name: "",
        address: "",
        count_rooms: 0,
        count_windows: 0,
        count_doors: 0,
      },
      //Devices
      deviceSearchStr: "",
      smartDevices: this.getDevices(),
      showCreateDeviceModal: false,
      showImportDeviceModal: false,
      importDeviceFile: '',
      createDeviceObj: {
        smart_device_number: "",
      },
    };
  },
  methods: {
    getRoles() {
      User.getAllRoles().then((response) => {
        if (response.data.status == "Success") {
          this.roles = response.data.data;
        } else {
          alert(response.data.message);
        }
      });
    },
    getAllUsers() {
      User.getAllUsers(this.searchUserString).then((response) => {
        if (response.data.status == "Success") {
          this.users = response.data.data;
        } else {
          alert(response.data.message);
        }
      });
    },
    exportUsersToExcel() {
      User.exportUsers().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    },
    createUser() {
      User.createUser(this.createUserObj).then((response) => {
        if (response.data.status == "Success") {
          this.showCreateUserModal = false;
          this.getAllUsers();
        } else {
          alert(response.data.message);
        }
      });
    },
    openUserEditModal(user_id) {
      this.showUpdateUserModal = true;
      this.users.forEach((user) => {
        if (user.user_id == user_id) {
          this.updateUserObj.user_id = user_id;

          this.roles.forEach((element) => {
            if (element.name == user.role) {
              this.updateUserObj.role_id = element.role_id;
            }
          });
          this.updateUserObj.name = user.name;
          this.updateUserObj.surname = user.surname;
          this.updateUserObj.number = user.number;
          this.updateUserObj.address = user.address;
          this.updateUserObj.email = user.email;
          this.updateUserObj.birthday = user.birthday;
          this.updateUserObj.is_active = Boolean(user.is_active);
        }
      });
      console.log(this.updateUserObj);
    },
    updateUser() {
      User.updateUserData(this.updateUserObj.user_id, this.updateUserObj).then(
        (response) => {
          if (response.data.status == "Success") {
            this.showUpdateUserModal = false;
            this.getAllUsers();
          } else {
            alert(response.data.message);
          }
        }
      );
    },
    deleteUser(user_id) {
      User.deleteUser(user_id).then((response) => {
        if (response.data.status == "Success") {
          this.showCreateUserModal = false;
          this.getAllUsers();
        } else {
          alert(response.data.message);
        }
      });
    },
    generateRandomRGBColor() {
      let color = Math.floor(Math.random() * 360);

      return `hsla(${color}, 60%, 53%, 1)`;
    },
    //House
    getHouses() {
      House.getAllHouse(this.houseSearchStr).then((response) => {
        if (response.data.status == "Success") {
          this.houses = response.data.data;
        } else {
          alert(response.data.message);
        }
      });
    },
    exportHousesToExcel() {
      House.exportHouses().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "houses.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    },
    createHouse() {
      House.createHouse(this.createHouseObj).then((response) => {
        if (response.data.status == "Success") {
          this.showCreateHouseModal = false;
          this.createHouseObj.user_id = 0;
          this.createHouseObj.name = "";
          this.createHouseObj.address = "";
          this.createHouseObj.count_rooms = 0;
          this.createHouseObj.count_windows = 0;
          this.createHouseObj.count_doors = 0;

          this.getHouses();
        } else {
          alert(response.data.message);
        }
      });
    },
    openEditHouseModal(house_id) {
      this.showUpdateHouseModal = true;
      this.houses.forEach((house) => {
        if (house.house_id == house_id) {
          this.updateHouseObj.house_id = house_id;
          this.updateHouseObj.user_id = house.user_id;
          this.updateHouseObj.name = house.name;
          this.updateHouseObj.address = house.address;
          this.updateHouseObj.count_rooms = house.count_rooms;
          this.updateHouseObj.count_windows = house.count_windows;
          this.updateHouseObj.count_doors = house.count_doors;
        }
      });
    },
    updateHouse() {
      House.updateHouse(this.updateHouseObj.house_id, this.updateHouseObj).then(
        (response) => {
          if (response.data.status == "Success") {
            this.showUpdateHouseModal = false;
            this.getHouses();
          } else {
            alert(response.data.message);
          }
        }
      );
    },
    deleteHouse(house_id) {
      House.deleteHouse(house_id).then((response) => {
        if (response.data.status == "Success") {
          this.getHouses();
        } else {
          alert(response.data.message);
        }
      });
    },
    //Device
    getDevices() {
      Device.getAllDevices(this.deviceSearchStr).then((response) => {
        if (response.data.status == "Success") {
          this.smartDevices = response.data.data;
        } else {
          alert(response.data.message);
        }
      });
    },
    createDevice() {
      Device.createDevice(this.createDeviceObj).then((response) => {
        if (response.data.status == "Success") {
          this.showCreateDeviceModal = false;
          this.getDevices();
        } else {
          alert(response.data.message);
        }
      });
    },
    deleteDevice(device_id) {
      Device.deleteDevice(device_id).then((response) => {
        if (response.data.status == "Success") {
          this.getDevices();
        } else {
          alert(response.data.message);
        }
      });
    },
    exportDeviceToExcel() {
      Device.exportDevices().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "devices.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    },
    uploadImportDevice() {
      let formData = new FormData();
      formData.append('file', this.importDeviceFile);

      Device.importDevices(formData).then((response) => {
        if (response.data.status == "Success") {
          this.showImportDeviceModal = false;
          this.getDevices();
        } else {
          alert(response.data.message);
        }
      });
    },
    handleFileUpload(event) {
      this.importDeviceFile = event.target.files[0]
    }
  },
};
</script>

<style lang="scss" scoped>
.admin-users {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.admin-houses {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.admin-sensors {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.control-panel {
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
  .export-block {
    margin-left: auto;
    margin-right: 10px;
    display: flex;
    .import-btn {
      margin-right: 10px;
    }
    .export-btn, .import-btn {
      background-color: #e1fbd8 !important;
      color: #1b3738 !important;
    }
    .export-btn:hover, .import-btn:hover {
      background-color: #cbe3c3 !important;
    }
  }
  .create-block {
    .create-btn {
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
    .create-btn:hover {
      background-color: #3c76e2;
    }
  }
}

.list-wrap {
  width: 100%;
  overflow-y: scroll;
  height: 400px;
  flex-grow: 1;
  .list-items {
    border-spacing: 0 10px;
    padding: 0 8px;
    width: 100%;
    position: relative;
    .list-header {
      position: sticky;
      top: 0;
      overflow: hidden;
      z-index: 10;
      background: #4482f7;
      margin-bottom: 10px;
      padding: 8px 0;
      margin: 0 8px 10px 8px;
      border-radius: 8px;
      th {
        padding: 8px;
      }
      th:first-child {
        border-radius: 10px 0 0 10px;
      }
      th:last-child {
        border-radius: 0 10px 10px 0;
      }
      .head-block {
        color: #fff;
        font-weight: bold;
      }
    }

    .content-list {
      padding: 8px;
      .row-item {
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 15px;
        width: 100%;
        height: 80px;
        color: #888888;
        font-size: 15px;
        text-align: left;
        overflow: hidden;
        margin-bottom: 15px;
        -webkit-box-shadow: 0 0 6px rgba(180, 180, 180, 0.55);
        box-shadow: 0 0 6px rgba(180, 180, 180, 0.55);
        .head-block {
          color: rgb(55, 55, 55);
          font-weight: bold;
          text-align: center;
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
          .active-status {
            margin: 0 auto;
            width: 100px;
            border-radius: 8px;
            background: #d8f5f3;
            padding: 6px;
            p {
              color: #74bbb1;
              font-weight: bold;
              margin: 0;
            }
          }
          .inactive-status {
            margin: 0 auto;
            width: 100px;
            border-radius: 8px;
            background: #f8d6da;
            padding: 6px;
            p {
              color: #ce7b81;
              font-weight: bold;
              margin: 0;
            }
          }
          .bought-status {
            margin: 0 auto;
            width: 30px;
            border-radius: 8px;
            background: #d8f5f3;
            padding: 6px;
            p {
              color: #74bbb1;
              font-weight: bold;
              margin: 0;
            }
          }
          .not-bought-status {
            margin: 0 auto;
            width: 30px;
            border-radius: 8px;
            background: #efefef;
            padding: 6px;
            p {
              color: #c9c9c9;
              font-weight: bold;
              margin: 0;
            }
          }
          .inner-wrap {
            display: flex;
            align-items: center;
            height: 100%;
          }
          .menu.tools-menu {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
}

.horizontal-form {
  flex-direction: row !important;
  justify-content: space-between !important;
  .left-side,
  .right-side {
    flex-basis: 48%;
  }
}

.form-block {
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
</style>