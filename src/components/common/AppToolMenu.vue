<template>
  <div class="tools-menu">
    <div class="tool-menu" v-bind:class="this.pos == 'vertical' ? 'tool-menu-vertical' : ''" @click="openMenu">
      <div class="circle-tool"></div>
      <div class="circle-tool"></div>
      <div class="circle-tool"></div>
    </div>
    <div class="tool-menu-body" v-if="this.isOpened">
      <button @click="editOption">{{ $t('edit') }}</button>
      <button @click="deleteOption">{{ $t('delete') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-tool-menu",
  data() {
    return {
      isOpened: false,
    };
  },
  props: {
    pos: {
      type: String,
    }
  },  
  methods: {
    openMenu() {
      this.isOpened = !this.isOpened;
    },
    editOption() {
      this.$emit("edit");
       this.isOpened = false;
    },
    deleteOption() {
      this.$emit("delete");
      this.isOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.tools-menu {
  margin-left: auto;
  position: relative;
  .tool-menu {
    width: 38px;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    border-radius: 20px;
    background: rgb(240, 240, 240);
    align-items: center;
    cursor: pointer;
    .circle-tool {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgb(211, 211, 211);
      margin: 0;
    }
  }
  .tool-menu-vertical {
    flex-direction: column;
    width: auto;
    height: 34px;
  }
  .tool-menu-body {
    position: absolute;
    bottom: -69px;
    left: -54px;
    width: 100px;
    background: #fff;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 8px;
    overflow: hidden;
    z-index: 100;
    button {
      width: 100%;
      border: none;
      background: #fff;
      padding: 8px 0;
      transition: all 0.5s;
      cursor: pointer;
    }
    button:hover {
      background: rgb(241, 241, 241);
    }
    button:last-child {
      color: rgb(255, 117, 117);
    }
  }
}
</style>