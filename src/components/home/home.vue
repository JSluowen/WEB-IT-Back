<template>
  <div class="home">
    <div class="header">
      <div class="img">
        <img src="./images/logo.png" alt="">
        &nbsp;&nbsp;
        <span> IT技术交流社区后台管理</span>
      </div>
      <div class="userinfo">
        <div class="avator">
          <img src="./images/1.png" alt="">
          &nbsp;&nbsp;
          <span class="name">{{name}}</span>
        </div>
        <div class="logout">
          <el-button type="danger" plain @click="logout">退出</el-button>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="sidebar-left">
        <div class="sidebarMenu">
          <el-menu @select="MenuItem" default-active="1" :collapse="isCollapse" class="el-menu-vertical-demo" background-color="rgb(25, 27, 31)" text-color="#fff" active-text-color="rgb(64,158,255)">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">成员管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">友情链接</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="sidebar-right">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "超级管理员",
      isCollapse: false,
      routerlink: ["/user", "/article"]
    };
  },
  methods: {
    MenuItem(index) {
      this.$router.push({ path: this.routerlink[index - 1] });
    },
    //注销
    logout() {
      this.$confirm("是否确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem('token')
          this.$router.push({
            path:"/login"
          })
          this.$message({
            type: "success",
            message: "退出成功,返回登录界面!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "退出取消"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@fontcolor: rgb(173, 175, 178);
@bgc: rgb(25, 27, 31);
@bordercolor: rgb(156, 26, 26);
@fontcolor2: rgb(64, 158, 255);
.home {
  width: 100%;
  height: 100%;
  font-size: 16px;
  background-color: #e5e5e5;

  .header {
    width: 100%;
    height: 50px;
    border-bottom: 3px solid rgb(156, 26, 26);
    background-color: rgb(25, 27, 31);
    padding: 3px 0px;
    display: flex;
    justify-content: space-between;
    .img {
      width: 400px;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 100%;
        height: 100%;
      }
      span {
        font-family: "楷体";
        font-size: 22px;
        color: @fontcolor2;
        letter-spacing: 3px;
      }
    }
    .userinfo {
      width: 250px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: @fontcolor2;
      padding: 0px 20px;
      .avator {
        width: 200px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
        .name {
          color: @fontcolor2;
        }
      }
      .logout {
        height: 100%;
        width: 100px;
        color: @fontcolor;
        margin-left: 20px;
        display: flex;
        align-items: center;
        /deep/.el-button--danger.is-plain {
          color: red;
          background: @bgc;
          letter-spacing: 3px;
          font-size: 16px;
          border: 1px solid @bordercolor;
        }
        /deep/ .el-button--danger.is-plain:focus,
        .el-button--danger.is-plain:hover {
          background: @bordercolor;
          color: @fontcolor;
          border: 1px solid @fontcolor;
          box-shadow: @fontcolor 0px 0px 5px;
          transition: 0.6s;
        }
      }
    }
  }
  .body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    .sidebar-left {
      margin-top: 0px;
      height: 100%;
      width: 200px;
      .sidebarMenu {
        width: 100%;
        .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 200px;
          min-height: 664px;
        }
      }
      .controlMenu {
        width: 200px;
        height: 100px;
      }
    }
    .sidebar-right {
      width: 100%;
      height: 664px;
      overflow: hidden;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
