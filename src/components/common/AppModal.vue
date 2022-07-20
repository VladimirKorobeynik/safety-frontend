<template>
  <transition name="modal-fade">
    <div class="modal-wrap">
      <div class="modal-backdrop" @click="close"></div>
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"> This is the default tile! </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            <img src="@/assets/close-icon.png" alt="" />
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="modal-btn"
            @click="approve"
          >
            {{ this.btnText }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "app-modal",
  props: {
    btnText: {
        type: String,
        required: true
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    approve() {
      this.$emit("approve");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
}
.modal-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 10px;
  min-width: 400px;
  min-height: 200px;
  border-radius: 15px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4a4a4a;
  justify-content: space-between;
  img {
    width: 15px;
    height: 15px;
  }
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.modal-btn {
    width: 150px;
  background-color: #4482f7;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.5s;
}
.modal-btn:hover {
  background-color: #3c76e2;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>