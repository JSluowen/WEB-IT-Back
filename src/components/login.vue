<template>
  <div id="login">
    <!-- 粒子背景 -->
    <vue-particles color="#a211be" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <!-- 登录的表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm formuser">
      <el-form-item class="form-label" label="用户" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "change" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.username == "" || this.ruleForm.password == "") {
            this.$message({
              message: "信息不完整哦~~",
              type: "warning"
            });
            return;
          }
          this.$api.user
            .login({
              username: this.ruleForm.username.toString(),
              password: this.ruleForm.password.toString()
            })
            .then(res => {
              if (!res.have) {
                this.$message({
                  message: "用户不存在哦~~",
                  type: "warning"
                });
              } else if (!res.identity) {
                this.$message({
                  message: "你没有权限登录哦~~",
                  type: "warning"
                });
              } else if (!res.pas) {
                this.$message({
                  message: "密码不正确哦~~",
                  type: "warning"
                });
              } else {
                this.$message({
                  message: "登录成功!~~",
                  type: "warning"
                });
                sessionStorage.setItem("token", res.token);
                this.$router.push("/");
              }
            });
        } else {
          this.$message({
            message: "信息不完整！",
            type: "warning"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0px;
  padding: 0px;
  background-color: rgb(52, 57, 63);
  background-image: url("../images/1.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  #particles-js {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
  .el-form {
    padding: 20px;
    width: 400px;
    margin-top: -200px;
    margin-left: -150px;
    /deep/.el-form-item__label{
      color: white;
      font-size: 16px;
    }
  }
}
</style>

