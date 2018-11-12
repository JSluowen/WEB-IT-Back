<template>
    <div class="UserReview">
        <div class="usertable">
            <el-table :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
                <el-table-column label="姓名" prop="username">
                </el-table-column>
                <el-table-column label="邮箱" prop="email">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="slot">
                        <el-input v-model="search" size="mini" placeholder="搜索成员" />
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handlePass(scope.$index, scope.row)">审核通过</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">拒绝申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  created: function() {
    this.userLoading();
  },
  methods: {
    //加载用户信息
    userLoading() {
      this.$api.user.userLoading().then(res => {
        var user = res.data;
        this.tableData = user.filter(item => {
          if ((item.identity = 1 && item.status == 0)) {
            return item;
          }
        });
      });
    },
    //拒绝用户注册
    handleDelete(index, row) {
      var username = row.username;
      this.$confirm("是否确认拒绝用户注册？", "提示消息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$api.user
            .userDelete({
              username: username
            })
            .then(data => {
              this.$message({
                type: "success",
                message: data.message
              });
              this.userLoading();
            })
            .catch(erro => {
              this.$message({
                type: "warning",
                message: error.message
              });
            });
        })
        .catch(action => {
          this.$message("取消删除");
        });
    },
    // 用户注册通过
    handlePass(index, row) {
      var username = row.username;
      this.$confirm("是否确认用户注册通过？", "提示消息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$api.user
            .userPass({
              username: username
            })
            .then(data => {
              this.$message({
                type: "success",
                message: data.message
              });
              this.userLoading();
            })
            .catch(error => {
              this.$message({
                type: "warning",
                message: error.message
              });
            });
        })
        .catch(action => {
          this.$message("取消删除");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
