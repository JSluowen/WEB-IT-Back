<template>
    <div class="user">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="用户管理" name="first">
                <user-mangment />
            </el-tab-pane>
            <el-tab-pane label="待审核成员" name="second">
                <user-review />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import UserMangment from "./UserMangement.vue";
import UserReview from "./UserReview.vue";
export default {
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index);
    }
  },
  components: {
    UserMangment,
    UserReview
  }
};
</script>

<style lang="less" scoped>
.user {
  padding: 10px;
  overflow: auto;
  height: 650px;
  .el-tabs--border-card {
    /deep/.el-tabs__content {
      height: 100%;
    }
  }
}
</style>
