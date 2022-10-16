<template>
  <div>
    <transition>
      <div v-if="welcomeshow" class="dashboard-text">
        欢迎 {{ $store.state.user.name }}
      </div>
    </transition>
    <transition>
      <div v-if="!welcomeshow">
        <chartItem></chartItem>
        <chartSale></chartSale>
        <chartOther></chartOther>
      </div>
    </transition>
  </div>
</template>

<script>
import chartItem from "./chartItem.vue";
import chartSale from "./chartSale.vue";
import chartOther from "./chartOther.vue";
export default {
  name: "Dashboard",
  components: { chartItem, chartSale, chartOther },
  data() {
    return {
      welcomeshow: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.welcomeshow = false;
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.dashboard-text {
  font-size: 50px;
  line-height: 46px;
  position: fixed;
  top: 100px;
  left: 280px;
  background-color: rgb(255, 254, 253);
  z-index: 999;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: 1s linear;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
