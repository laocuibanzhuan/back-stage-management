<template>
  <div>
    <el-input disabled :value="$route.query.roleName"></el-input>
    <el-button :loading="loading" type="primary" @click="save" style="margin-top: 20px"
      >保存</el-button
    >
    <el-button @click="$router.replace({ name: 'Role' })">取消</el-button>
    <el-tree
      style="margin: 20px 0"
      ref="tree"
      :data="allPermissions"
      node-key="id"
      show-checkbox
      :default-expanded-keys="['1']"
      :props="defaultProps"
    />
  </div>
</template>
<script>
export default {
  name: "roleAuth",
  data() {
    return {
      loading: false,
      allPermissions: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const roleId = this.$route.params.id;
      this.getPermissions(roleId);
    },
    getPermissions(roleId) {
      this.$API.permission.toAssign(roleId).then((result) => {
        this.allPermissions = result.data.children;
        const checkedIds = this.getCheckedIds(this.allPermissions);
        this.$refs.tree.setCheckedKeys(checkedIds);
      });
    },
    getCheckedIds(auths, initArr = []) {
      return auths.reduce((pre, item) => {
        if (item.select && item.level == 4) {
          pre.push(item.id);
        } else if (item.children) {
          this.getCheckedIds(item.children, initArr);
        }
        return pre;
      }, initArr);
    },
    save() {
      var ids = this.$refs.tree.getCheckedKeys().join(",");
      this.loading = true;
      this.$API.permission.doAssign(this.$route.params.id, ids).then((result) => {
        this.loading = false;
        this.$message.success(result.$message || "分配权限成功");
        const roleName = this.$route.query.roleName;
        const roles = this.$store.getters.roles;
        this.$router.replace("/acl/role/list", () => {
          if (roles.includes(roleName)) {
            window.location.reload();
          }
        });
      });
    },
  },
};
</script>
