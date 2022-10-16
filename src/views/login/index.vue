<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title-container">
        <h3 class="title">请登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg
            t="1665885821396"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2567"
            width="20"
            height="20"
          >
            <path
              d="M880.182 987.568H143.818C98.705 987.568 62 952.882 62 910.245V801.52c0-122.986 110.113-223.042 245.455-223.042h409.09C851.887 578.478 962 678.533 962 801.52v108.726c0 42.636-36.704 77.322-81.818 77.322z m-736.364-82.197l736.363 0.379V801.52c0-77.873-73.408-141.224-163.637-141.224h-409.09c-90.228 0-163.636 63.351-163.636 141.224v103.851zM511.67 547.796c-140.984 0-255.682-114.697-255.682-255.682 0-140.984 114.697-255.682 255.682-255.682 140.985 0 255.682 114.697 255.682 255.682 0.001 140.985-114.697 255.682-255.682 255.682z m0-429.546c-95.871 0-173.864 77.993-173.864 173.864S415.8 465.978 511.67 465.978s173.864-77.993 173.864-173.864S607.541 118.25 511.67 118.25z"
              p-id="2568"
            ></path>
          </svg>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg
            t="1665885886191"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3494"
            width="20"
            height="20"
          >
            <path
              d="M288 384v-74.666667c0-123.722667 100.266667-224 224-224s224 100.224 224 224v74.666667h10.677333C811.445333 384 864 436.597333 864 501.333333v320c0 64.821333-52.469333 117.333333-117.322667 117.333334H277.333333C212.554667 938.666667 160 886.069333 160 821.333333V501.333333c0-64.821333 52.469333-117.333333 117.322667-117.333333H288z m64 0h320v-74.666667c0-88.426667-71.605333-160-160-160-88.384 0-160 71.626667-160 160v74.666667zM224 501.333333v320c0 29.397333 23.914667 53.333333 53.322667 53.333334H746.666667A53.269333 53.269333 0 0 0 800 821.333333V501.333333c0-29.397333-23.914667-53.333333-53.322667-53.333333H277.333333A53.269333 53.269333 0 0 0 224 501.333333z"
              p-id="3495"
            ></path>
          </svg>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg
            t="1665885933079"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4548"
            width="20"
            height="20"
          >
            <path
              d="M469.333333 681.386667c-36.053333-2.432-71.253333-8.533333-104.96-17.92l-69.802666 149.674666a42.368 42.368 0 0 1-56.533334 20.266667 42.666667 42.666667 0 0 1-20.821333-56.32l66.986667-143.658667a451.712 451.712 0 0 1-148.906667-112.682666 388.693333 388.693333 0 0 1-70.570667-119.338667 42.666667 42.666667 0 1 1 80.128-29.354667 303.445333 303.445333 0 0 0 55.210667 93.098667C270.634667 547.413333 383.018667 597.333333 505.728 597.333333c122.752 0 235.136-49.962667 305.706667-132.181333a303.445333 303.445333 0 0 0 55.210666-93.098667 42.666667 42.666667 0 0 1 80.128 29.354667 388.693333 388.693333 0 0 1-70.570666 119.338667 423.68 423.68 0 0 1-18.773334 20.48l104.362667 104.362666a42.666667 42.666667 0 0 1-0.298667 60.032 42.368 42.368 0 0 1-60.032 0.298667l-109.653333-109.653333c-20.48 14.08-42.24 26.581333-65.024 37.418666l66.901333 143.36a42.666667 42.666667 0 0 1-20.821333 56.362667 42.368 42.368 0 0 1-56.533333-20.266667l-69.717334-149.546666a520.533333 520.533333 0 0 1-91.946666 16.810666v130.645334A42.666667 42.666667 0 0 1 512 853.333333c-23.722667 0-42.666667-18.944-42.666667-42.24v-129.706666z"
              fill="#ffffff"
              p-id="4549"
            ></path>
            <path
              d="M176.128 524.373333a42.368 42.368 0 0 1 60.032 0.256 42.666667 42.666667 0 0 1 0.298667 60.074667l-121.216 121.216a42.368 42.368 0 0 1-60.074667-0.298667 42.666667 42.666667 0 0 1-0.298667-60.032l121.258667-121.258666z"
              fill="#ffffff"
              p-id="4550"
            ></path>
          </svg>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: 111111</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于六位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let res = await this.$store.dispatch("user/login", this.loginForm);
          if (res) {
            this.$store.dispatch("user/getInfo");
            this.$router.push("/");
            this.loading = false;
          } else {
            this.loading = false;
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url(./bgp.jpeg);
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
