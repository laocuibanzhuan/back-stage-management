<template>
  <div>
    <el-card>
      <CategorySelect
        @getGoodsList="getGoodsList"
        @getCategoryId="getCategoryId"
        :canOperation="showTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="showTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 60px; margin-bottom: 20px"
          :disabled="!GoodsList[0]"
          @click="showTable = false"
          >添加属性</el-button
        >
        <el-table :data="GoodsList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="200px" align="center">
          </el-table-column>
          <el-table-column label="属性值列表" width="width" align="center">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="primary"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                size="mini"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="可选操作" width="300px" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                style="margin: 10px"
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="update(row)"
                >修改
              </el-button>
              <el-popconfirm
                confirm-button-text="确定删除"
                cancel-button-text="取消操作"
                icon="el-icon-delete"
                icon-color="red"
                :title="`确定删除属性 [${row.attrName}] 吗？`"
                @onConfirm="delete_(row.id)"
              >
                <el-button
                  style="margin: 10px"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template></el-table-column
          >
        </el-table>
      </div>

      <div v-show="!showTable">
        <el-form :inline="true" ref="form" v-model="addValueList">
          <el-form-item label="属性名称" label-width="100px">
            <el-input
              placeholder="请输入属性名"
              v-model="addValueList.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!addValueList.attrName"
          @click="initAttrList"
          >添加属性值</el-button
        >
        <el-table
          :data="addValueList.attrValueList"
          style="width: 100%; margin: 20px"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column header-align="center" align="center" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                placeholder="请输入属性名"
                v-model="row.valueName"
                @blur="nextAttr($index)"
                @keydown.native.enter="nextAttr($index)"
                :ref="$index"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="可选操作"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteAttr($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="
            !addValueList.attrValueList[0] || !addValueList.attrValueList[0].valueName
          "
          @click="addAttrList"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "goodsAttr",
  data() {
    return {
      showTable: true,
      GoodsList: [],
      addValueList: {
        attrName: undefined,
        attrValueList: [],
        categoryId: "",
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getGoodsList(data) {
      this.GoodsList = data;
    },
    async getGoodsList_() {
      let res = await this.$API.goodsattr.reqGoodsList(this.$children[0].$children[0].ID);
      if (res.code == 200) {
        this.GoodsList = res.data;
      } else {
        return false;
      }
    },
    getCategoryId(id) {
      this.addValueList.categoryId = id;
    },
    update(item) {
      this.showTable = false;
      this.addValueList = cloneDeep(item);
    },
    async delete_(id) {
      let res = await this.$API.goodsattr.deleteGoodsAttr(id);
      if (res.code == 200) {
        this.getGoodsList_();
        this.$message({
          message: "删除属性成功",
          type: "success",
          duration: 2000,
        });
      }
    },
    initAttrList(index) {
      if (this.addValueList.attrValueList.length < 1) {
        this.addValueList.attrValueList.push({
          valueName: undefined,
          attrId: this.addValueList.id,
          id: undefined,
        });
      } else {
        if (this.addValueList.attrValueList.slice(-1)[0].valueName) {
          this.addValueList.attrValueList.push({
            valueName: undefined,
            attrId: this.addValueList.id,
            id: undefined,
          });
          this.$nextTick(() => {
            this.$refs[index].focus();
          });
        }
      }
    },
    nextAttr(index) {
      if (
        this.addValueList.attrValueList.length == index + 1 &&
        this.addValueList.attrValueList[index].valueName
      ) {
        if (this.addValueList.attrValueList[index].valueName.trim()) {
          this.addValueList.attrValueList[index].valueName = this.addValueList.attrValueList[index].valueName.trim();
          if (
            this.addValueList.attrValueList.some(
              (item) =>
                item != this.addValueList.attrValueList[index] &&
                item.valueName == this.addValueList.attrValueList[index].valueName
            )
          ) {
            this.addValueList.attrValueList[index].valueName = undefined;
            this.$message({
              message: "不能输入已有的值",
              type: "error",
              duration: 2000,
            });
          } else {
            this.initAttrList(index + 1);
          }
        } else {
          this.addValueList.attrValueList[index].valueName = undefined;
          this.$message({
            message: "不能输入空值",
            type: "error",
            duration: 2000,
          });
        }
      }
    },
    deleteAttr(index) {
      this.addValueList.attrValueList[index].valueName = "delete";
      this.addValueList.attrValueList = this.addValueList.attrValueList.filter(
        (item) => item.valueName != "delete"
      );
    },
    cancel() {
      this.addValueList.attrName = undefined;
      this.addValueList.attrValueList = [];
      this.showTable = true;
    },
    async addAttrList() {
      if (!this.addValueList.attrValueList.slice(-1)[0].valueName) {
        this.addValueList.attrValueList.pop();
      }
      let res = await this.$API.goodsattr.addGoodsAttr(this.addValueList);
      if (res.code == 200) {
        this.getGoodsList_();
        this.addValueList.attrName = undefined;
        this.addValueList.attrValueList = [];
        this.showTable = true;
        this.$message({
          message: "保存成功",
          type: "success",
          duration: 2000,
        });
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-bottom: 30px;
}
</style>
