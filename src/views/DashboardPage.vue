<template>
  <div class="dashboard-content">
    <div class="dashboard-main-content">
      <div class="main-block">
        <sidebar-component
          class="sidbar"
          @selectedItemMenuId="changeSelectedMenuItem"
          @selectedItemMenuText="changeSelectedMenuItemText"
        ></sidebar-component>
        <content-component
          :user="userObj"
          :menuItemId="selectedMenuItem"
          :menuItemText="selectedMenuItemText"
          class="content"
        ></content-component>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/services/User";
import Auth from "@/services/Auth";
import SidebarComponent from "@/components/dashboard-page/sidebar/SidebarComponent.vue";
import ContentComponent from "@/components/dashboard-page/content/ContentComponent.vue";

export default {
  components: {
    SidebarComponent,
    ContentComponent,
  },
  data() {
    return {
      userObj: this.getUserData(),
      selectedMenuItem: 0,
      selectedMenuItemText: "",
    };
  },
  methods: {
    getUserData() {
      User.getUserData(localStorage.getItem("user_id")).then(
        (response) => {
          console.log(response);
          if (response.data.status == "Success") {
            this.userObj = response.data.data;
          } else if (response.data.code == 401) {
            localStorage.removeItem("user_id");
            localStorage.removeItem("access_token");
            this.$router.push("/signIn");
          }
        }
      );
    },
    changeSelectedMenuItem(itemMenuId) {
      this.selectedMenuItem = itemMenuId;
    },
    changeSelectedMenuItemText(itemMenuText) {
      this.selectedMenuItemText = itemMenuText;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.dashboard-content {
  background: #f3f5f6;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .dashboard-main-content {
    width: 100%;
    z-index: 1;
    flex-grow: 1;
    .main-block {
      height: 100%;
      display: flex;
      position: relative;
      overflow: hidden;
      .sidbar {
        flex-basis: 20%;
      }
      .content {
        flex-basis: 80%;
      }
    }
  }
  p {
    margin: 0;
  }
}
</style>