<template>
  <div>
    <el-form inline>
      <el-form-item>
        <el-input v-model="tempSearchObj.roleName" placeholder="角色名称" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button @click="resetSearch">清空</el-button>
    </el-form>

    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="addRole">添加</el-button>
      <el-button
        type="danger"
        @click="removeRoles"
        :disabled="selectedRoles.length == 0"
        >批量删除</el-button
      >
    </div>

    <el-table
      border
      stripe
      style="width: 960px"
      v-loading="listLoading"
      :data="roles"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />

      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>

      <el-table-column label="角色名称">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.roleName" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="{ row }">
          <HintButton
            size="mini"
            type="info"
            icon="el-icon-info"
            title="分配权限"
            @click="$router.push(`/acl/role/auth/${row.id}?roleName=${row.roleName}`)"
          />

          <HintButton
            size="mini"
            type="primary"
            icon="el-icon-check"
            title="确定"
            @click="updateRole(row)"
            v-if="row.edit"
          />
          <HintButton
            size="mini"
            type="primary"
            icon="el-icon-edit"
            title="修改角色"
            @click="row.edit = true"
            v-if="!row.edit"
          />

          <HintButton
            size="mini"
            type="danger"
            icon="el-icon-delete"
            title="删除角色"
            @click="removeRole(row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      style="padding: 20px 0"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getRoles"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: "RoleList",
  data() {
    return {
      listLoading: true,
      roles: [],
      total: 0,
      page: 1,
      limit: 5,
      tempSearchObj: {
        roleName: "",
      },
      searchObj: {
        roleName: "",
      },
      selectedRoles: [],
    };
  },
  mounted() {
    this.getRoles();
  },
  methods: {
    cancelEdit(role) {
      role.roleName = role.originRoleName;
      role.edit = false;
      this.$message.warning("取消角色修改");
    },
    updateRole(role) {
      this.$API.role
        .updateById({ id: role.id, roleName: role.roleName })
        .then((result) => {
          this.$message.success(result.message || "更新角色成功!");
          this.getRoles(this.page);
        });
    },
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.getRoles();
    },
    addRole() {
      this.$prompt("请输入新名称", "添加角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$API.role.save({ roleName: value }).then((result) => {
            this.$message.success(result.message || "添加角色成功");
            this.getRoles();
          });
        })
        .catch(() => {
          this.$message.warning("取消添加");
        });
    },
    getRoles(page = 1) {
      this.page = page;
      this.listLoading = true;
      const { limit, searchObj } = this;
      this.$API.role
        .getPageList(page, limit, searchObj)
        .then((result) => {
          const { items, total } = result.data;
          this.roles = items.map((item) => {
            item.edit = false;
            item.originRoleName = item.roleName;
            return item;
          });
          this.total = total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    search() {
      this.searchObj = { ...this.tempSearchObj };
      this.getRoles();
    },
    resetSearch() {
      this.tempSearchObj = {
        roleName: "",
      };
      this.searchObj = {
        roleName: "",
      };
      this.getRoles();
    },
    removeRole({ id, roleName }) {
      this.$confirm(`确定删除 '${roleName}' 吗?`, "提示", {
        type: "warning",
      })
        .then(async () => {
          const result = await this.$API.role.removeById(id);
          this.getRoles(this.roles.length === 1 ? this.page - 1 : this.page);
          this.$message.success(result.message || "删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    handleSelectionChange(selection) {
      this.selectedRoles = selection;
    },
    removeRoles() {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        type: "warning",
      })
        .then(async () => {
          const ids = this.selectedRoles.map((role) => role.id);
          const result = await this.$API.role.removeRoles(ids);
          this.getRoles();
          this.$message({
            type: "success",
            message: "批量删除成功!",
          });
        })
        .then((result) => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
