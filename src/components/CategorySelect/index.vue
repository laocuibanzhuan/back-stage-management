<template>
  <div>
    <el-form
      :inline="true"
      ref="ruleForm"
      label-width="100px"
      v-model="ID"
      class="demo-ruleForm"
    >
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          :disabled="!canOperation"
          v-model="ID.id1"
          @change="getGoodsList_2"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in GoodsList_1"
            :key="GoodsList_1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          :disabled="!canOperation"
          v-model="ID.id2"
          @change="getGoodsList_3"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in GoodsList_2"
            :key="GoodsList_2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          :disabled="!canOperation"
          v-model="ID.id3"
          @change="getGoodsList"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in GoodsList_3"
            :key="GoodsList_3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ["canOperation"],
  data() {
    return {
      GoodsList_1: [],
      GoodsList_2: [],
      GoodsList_3: [],
      ID: {
        id1: undefined,
        id2: undefined,
        id3: undefined,
      },
    };
  },
  methods: {
    async getGoodsList_1() {
      let res = await this.$API.goodsattr.reqGoodsList_1();
      if (res.code == 200) {
        this.GoodsList_1 = res.data;
      } else {
        return false;
      }
    },
    async getGoodsList_2() {
      let res = await this.$API.goodsattr.reqGoodsList_2(this.ID.id1);
      if (res.code == 200) {
        this.ID.id2 = undefined;
        this.ID.id3 = undefined;
        this.GoodsList_2 = res.data;
        this.GoodsList_3 = [];
      } else {
        return false;
      }
    },
    async getGoodsList_3() {
      let res = await this.$API.goodsattr.reqGoodsList_3(this.ID.id2);
      if (res.code == 200) {
        this.ID.id3 = undefined;
        this.GoodsList_3 = res.data;
      } else {
        return false;
      }
    },
    async getGoodsList() {
      Object.assign(this.$ID, this.ID);
      let res = await this.$API.goodsattr.reqGoodsList(this.ID);
      if (res.code == 200) {
        this.$emit("getGoodsList", res.data);
        this.$emit("getCategoryId", this.ID.id3);
        this.$emit("getSpuList");
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getGoodsList_1();
  },
};
</script>

<style scoped></style>
