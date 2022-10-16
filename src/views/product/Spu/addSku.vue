<template>
  <div>
    <el-form ref="form" :model="skuInfo" label-width="100px">
      <el-form-item label="SPU名称">
        <span style="padding-left: 10px">{{ spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="请输入SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input
          v-model="skuInfo.price"
          placeholder="请输入价格"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input v-model="skuInfo.weight" placeholder="请输入重量"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          v-model="skuInfo.skuDesc"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <span v-if="!attrInfoList[0]" style="padding-left: 10px">暂无任何平台属性</span>
        <el-form v-else ref="form" label-width="80px" inline>
          <el-form-item
            :label="item.attrName"
            v-for="(item, index) in attrInfoList"
            :key="item.id"
            style="margin-bottom: 10px"
          >
            <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="item in item.attrValueList"
                :key="item.id"
                :label="item.valueName"
                :value="`${item.attrId}:${item.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <span v-if="!spuSaleAttrList[0]" style="padding-left: 10px"
          >暂无任何销售属性</span
        >
        <el-form v-else ref="form" label-width="80px" inline>
          <el-form-item
            :label="item.saleAttrName"
            v-for="(item, index) in spuSaleAttrList"
            :key="item.id"
          >
            <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="(item_, index) in item.spuSaleAttrValueList"
                :key="item_.id"
                :label="item_.saleAttrValueName"
                :value="`${item.id}:${item_.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="spuPictureList"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80px" align="center">
          </el-table-column>
          <el-table-column label="图片" width="width" align="center">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 60px; height: 60px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="图片名称" width="width" align="center">
          </el-table-column>
          <el-table-column label="可选操作" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                v-show="!row.isDefault"
                @click="setDefault(row)"
                >设为默认值</el-button
              >
              <el-button
                type="success"
                size="mini"
                v-show="row.isDefault"
                @click="row.isDefault = !row.isDefault"
                >默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="primary" style="margin-left: 100px" @click="addSku"
        >保存</el-button
      >
      <el-button @click="cancelSku">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spuId: undefined,
      spuName: undefined,
      skuInfo: {
        spuId: undefined,
        tmId: undefined,
        category3Id: undefined,
        skuName: undefined,
        price: undefined,
        weight: undefined,
        skuDesc: undefined,
        skuImageList: [],
        skuDefaultImg: undefined,
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
      },
      spuSaleAttrList: [],
      spuPictureList: [],
      attrInfoList: [],
    };
  },
  methods: {
    initData() {
      this.getSpuPictureList();
      this.getSpuSaleAttrList();
      this.getAttrInfoList();
    },
    async getSpuPictureList() {
      let res = await this.$API.spu.reqSpuPictures(this.spuId);
      if (res.code == 200) {
        res.data.forEach((item) => {
          item.isDefault = false;
        });
        this.spuPictureList = res.data;
      } else {
        return false;
      }
    },
    async getSpuSaleAttrList() {
      let res = await this.$API.spu.reqSpuSaleAttrList(this.spuId);
      if (res.code == 200) {
        this.spuSaleAttrList = res.data;
      } else {
        return false;
      }
    },
    async getAttrInfoList() {
      let res = await this.$API.goodsattr.reqGoodsList(this.$ID);
      if (res.code == 200) {
        this.attrInfoList = res.data;
      } else {
        return false;
      }
    },
    handleSelectionChange(selectedList) {
      this.selectedSkuImageList = selectedList;
    },
    setDefault(row) {
      this.spuPictureList.forEach((item) => {
        item.isDefault = false;
      });
      row.isDefault = true;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    async addSku() {
      let res = await this.$API.sku.saveSkuInfo(this.arrangementData());
      if (res.code == 200) {
        this.$message({
          message: "添加SKU成功",
          type: "success",
          duration: 2000,
        });
        this.cancelSku();
      } else {
        this.$message({
          message: "添加SKU失败",
          type: "error",
          duration: 2000,
        });
      }
    },
    arrangementData() {
      this.skuInfo.spuImageList = this.selectedSkuImageList;
      this.attrInfoList.forEach((item) => {
        if (item.attrIdAndValueId) {
          this.skuInfo.skuAttrValueList.push({
            attrId: item.attrIdAndValueId.split(":")[0],
            valueId: item.attrIdAndValueId.split(":")[1],
          });
        }
      });
      this.spuSaleAttrList.forEach((item) => {
        if (item.attrIdAndValueId) {
          this.skuInfo.skuSaleAttrValueList.push({
            saleAttrId: item.attrIdAndValueId.split(":")[0],
            saleAttrValueId: item.attrIdAndValueId.split(":")[1],
          });
        }
      });
      return this.skuInfo;
    },
    cancelSku() {
      Object.assign(this._data, this.$options.data());
      this.$emit("cancelSku");
    },
  },
};
</script>

<style scoped></style>
