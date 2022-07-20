<template>
  <div class="menu">
    <div class="menu-items">
      <div class="user-menu" v-if="this.userRole == 'User'">
        <div
          class="menu-item"
          @click="disableItemsMenu(elem)"
          v-for="elem in arrMenuItemsUser"
          :key="elem"
        >
          <div
            class="main-menu-item"
            v-if="elem.idItem < this.arrMenuItemsUser.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/dashboard-menu-icons/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ $t(elem.text) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-menu" v-if="this.userRole == 'Admin'">
        <div
          class="menu-item"
          @click="disableItemsMenu(elem)"
          v-for="elem in arrMenuItemsAdmin"
          :key="elem"
          v-bind:class="{ activeMenuItem: elem.isActive }"
        >
          <div
            class="main-menu-item"
            v-if="elem.idItem < this.arrMenuItemsAdmin.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/dashboard-menu-icons/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ $t(elem.text) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="operator-menu" v-if="this.userRole == 'Operator'">
        <div
          class="menu-item"
          @click="disableItemsMenu(elem)"
          v-for="elem in arrMenuItemsOperator"
          :key="elem"
          v-bind:class="{ activeMenuItem: elem.isActive }"
        >
          <div
            class="main-menu-item"
            v-if="elem.idItem < this.arrMenuItemsOperator.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/dashboard-menu-icons/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ $t(elem.text) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/services/User";

export default {
  name: "sidebar-menu",
  data() {
    return {
      userRole: User.getUserRole(),
      arrMenuItemsUser: [
        {
          idItem: 0,
          icon: "user-icon.png",
          text: "menuProfile",
          color: "#FF9090",
          isActive: true,
        },
        {
          idItem: 1,
          icon: "house-icon.png",
          text: "menuHouses",
          color: "#F6BB83",
          isActive: false,
        },
        {
          idItem: 2,
          icon: "sensor-icon.png",
          text: "menuSmartDevices",
          color: "#A9D8AE",
          isActive: false,
        },
      ],
      arrMenuItemsAdmin: [
        {
          idItem: 0,
          icon: "user-icon.png",
          text: "menuUsers",
          color: "#FF9090",
          isActive: true,
        },
        {
          idItem: 1,
          icon: "house-icon.png",
          text: "menuHouses",
          color: "#F6BB83",
          isActive: false,
        },
        {
          idItem: 2,
          icon: "sensor-icon.png",
          text: "menuSmartDevices",
          color: "#A9D8AE",
          isActive: false,
        },
      ],
      arrMenuItemsOperator: [
        {
          idItem: 0,
          icon: "user-icon.png",
          text: "menuProfile",
          color: "#FF9090",
          isActive: true,
        },
        {
          idItem: 1,
          icon: "house-icon.png",
          text: "menuHouses",
          color: "#F6BB83",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    disableItemsMenu(elem) {
      let itemMenuID = elem.idItem;
      let itemMenuText = elem.text;
      this.$emit("selectMenuItem", itemMenuID);
      this.$emit("selectMenuItemText", itemMenuText);
      if (this.userRole == "Admin") {
        this.arrMenuItemsAdmin.forEach((element) => {
          if (element.idItem != elem.idItem) {
            element.isActive = false;
          } else {
            element.isActive = true;
          }
        });
      } else if (this.userRole == "User") {
        this.arrMenuItemsUser.forEach((element) => {
          if (element.idItem != elem.idItem) {
            element.isActive = false;
          } else {
            element.isActive = true;
          }
        });
      } else if (this.userRole == "Operator") {
        this.arrMenuItemsOperator.forEach((element) => {
          if (element.idItem != elem.idItem) {
            element.isActive = false;
          } else {
            element.isActive = true;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  border-radius: 8px;
}
.menu-items {
  padding: 0 15px;
}

.main-menu-item,
.wrap-out-item {
  padding: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
}

.main-menu-item.activeMenuItem {
  position: relative;
  &::before {
    content: "";
    height: 100%;
    width: 6px;
    background: #fff;
    position: absolute;
    border-radius: 0 12px 12px 0;
    left: -15px;
    display: block;
  }
}

.icon-block-menu-item {
  width: 35px;
  height: 35px;
  border-radius: 12px;
  position: relative;
  margin-right: 17px;
}

.icon-block-menu-item .menu-icon-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-icon-wrap {
  width: 20px;
  height: 20px;
}

.menu-icon-wrap img {
  max-height: 100%;
  max-width: 100%;
}

.activeMenuItem {
  background: #8bc2ff;
  color: #fff;
}

@media screen and (max-width: 700px) {
  .menu-item .text-block {
    display: none;
  }

  .icon-block-menu-item {
    margin-right: 0;
  }

  .head-menu {
    text-align: center;
    padding-left: 0;
  }
}

@media screen and (max-width: 430px) {
  .main-menu-item,
  .wrap-out-item {
    padding: 10px;
  }
}
</style>