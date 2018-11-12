<template>
  <div class="UserMangement">
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
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pages">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
        </div> -->
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
          if (item.identity != 1 && item.status != 0) {
            return item;
          }
        });
      });
    },
    //删除用户
    handleDelete(index, row) {
      var username = row.username;
      this.$confirm("是否确认删除用户？", "提示消息", {
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
                message: data.message
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
.UserMangement {
  width: 100%;
  height: 100%;
  .usertable {
    width: 100%;
    height: 540px;
    overflow: hidden;
  }
  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
