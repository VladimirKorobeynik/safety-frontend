<template>
  <div class="sidebar-content">
    <div class="company-block" @click="$router.push('/')">
      <img src="@/assets/logo-icon-footer.png" alt="" />
      <h1 class="company-name">Safety</h1>
    </div>
    <div class="sidebar-divider"></div>
   <div class="sidebar-menu">
     <sidebar-menu @selectMenuItem="selectedMenuItemId" @selectMenuItemText="selectedMenuItemText"></sidebar-menu>
   </div>
  </div>
</template>

<script>
import SidebarMenu from "./SidebarMenu.vue";
export default {
  name: "sidebar-component",
  components: {
    SidebarMenu
  },
  methods: {
    selectedMenuItemId(itemMenuId) {
      this.$emit("selectedItemMenuId", itemMenuId);
    },
        selectedMenuItemText(itemMenuText) {
      this.$emit("selectedItemMenuText", itemMenuText);
    },
  }
};
</script>

<style lang="scss" scoped>
.sidebar-content {
  background: #558fff;
  border-radius: 0 24px 24px 0;
  .company-block {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .company-name {
      color: #fff;
      font-size: 30px;
      font-weight: 400;
    }
    img {
      height: 50px;
      margin: 0 10px 0 0;
    }
  }
  .sidebar-divider {
    width: 220px;
    margin: 0 auto;
    height: 3px;
    background: #84aeff;
    border-radius: 9px;
    margin-bottom: 50px;
  }
}
</style>