<template>
  <el-form ref="form" :model="spuInfo" label-width="100px">
    <el-form-item label="SPU名称">
      <el-input v-model="spuInfo.spuName" placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="spuInfo.tmId" placeholder="请选择品牌">
        <el-option
          :label="item.tmName"
          :value="item.id"
          v-for="(item, index) in trademarkList"
          :key="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        v-model="spuInfo.description"
        placeholder="请输入SPU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- action="/admin/product/fileUpload" -->
      <!-- 接口已经停机，无法处理请求 2022.10.12 -->
      <el-upload
        action=""
        list-type="picture-card"
        :file-list="spuPictureList"
        :on-seccess="upLoadSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        v-model="unSelectSaleAttrId"
        :placeholder="
          unSelectSaleAttr.length
            ? `还有${unSelectSaleAttr.length}个属性可供选择`
            : '没有其他属性可供选择'
        "
      >
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="(item, index) in unSelectSaleAttr"
          :key="item.id"
        >
        </el-option>
      </el-select>
      <el-button
        :disabled="!unSelectSaleAttrId"
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 20px"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <el-table
        style="width: 100%; margin-top: 20px"
        :data="spuInfo.spuSaleAttrList"
        border
      >
        <el-table-column type="index" label="序号" width="80px" align="center">
        </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="160px" align="center">
        </el-table-column>
        <el-table-column label="属性值列表名称" width="width" align="center">
          <template slot-scope="{ row, $index }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              :disable-transitions="false"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="addSaleAttrValueDone(row)"
              @blur="addSaleAttrValueDone(row)"
            >
            </el-input>
            <el-button
              v-else
              @click="addSaleAttrValue(row)"
              type="primary"
              class="button-new-tag"
              size="small"
              >+新增属性值
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="可选操作" align="center" width="160px">
          <template slot-scope="{ row, $index }">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="spuInfo.spuSaleAttrList.splice($index, 1)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-button type="primary" style="margin-left: 100px" @click="addOrUpdateSpu"
      >保存</el-button
    >
    <el-button @click="cancelSpu">取消</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      spuId: undefined,
      dialogImageUrl: "",
      dialogVisible: false,
      trademarkList: [],
      saleAttrList: [],
      spuInfo: {
        spuName: undefined,
        description: undefined,
        category3Id: undefined,
        tmId: undefined,
        spuSaleAttrList: [],
        spuImageList: [],
      },
      spuPictureList: [],
      unSelectSaleAttrId: undefined,
    };
  },
  computed: {
    unSelectSaleAttr() {
      return this.saleAttrList.filter((item) => {
        return this.spuInfo.spuSaleAttrList.every((item_) => {
          return item.name != item_.saleAttrName;
        });
      });
    },
  },
  methods: {
    initData() {
      this.getTrademarkList();
      this.getSaleAttrList();
      if (this.spuId) {
        this.getSpuInfo();
        this.getSpuPictureList();
      }
    },
    upLoadSuccess(res, file, filelist) {
      this.spuImageList = filelist;
    },
    handleRemove(file, fileList) {
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async getTrademarkList() {
      let res = await this.$API.spu.reqAttrList();
      if (res.code == 200) {
        this.trademarkList = res.data;
      } else {
        return false;
      }
    },
    async getSaleAttrList() {
      let res = await this.$API.spu.reqSaleAttrList();
      if (res.code == 200) {
        this.saleAttrList = res.data;
      } else {
        return false;
      }
    },
    async getSpuInfo() {
      let res = await this.$API.spu.reqSpuInfo(this.spuId);
      if (res.code == 200) {
        this.spuInfo = res.data;
      } else {
        return false;
      }
    },
    async getSpuPictureList() {
      let res = await this.$API.spu.reqSpuPictures(this.spuId);
      if (res.code == 200) {
        res.data.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuPictureList = res.data;
      } else {
        return false;
      }
    },
    arrangementData() {
      this.spuInfo.spuImageList = this.spuPictureList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.res && item.res.data) || item.url,
        };
      });
      return this.spuInfo;
    },
    addOrUpdateSpu() {
      let data = this.arrangementData();
      if (this.spuId) {
        this.updateSpu(data);
      } else {
        this.addSpu(data);
      }
      this.cancelSpu();
    },
    async updateSpu(data) {
      let res = await this.$API.spu.updateSpu(data);
      if (res.code == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 2000,
        });
      } else {
        return false;
      }
      this.cancelSpu();
    },
    async addSpu(data) {
      let res = await this.$API.spu.addSpu(data);
      if (res.code == 200) {
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 2000,
        });
      } else {
        this.$message({
          message: "添加失败",
          type: "error",
          duration: 2000,
        });
      }
      this.cancelSpu();
    },
    cancelSpu() {
      this.spuId = undefined;
      this.spuInfo = {
        spuName: undefined,
        description: undefined,
        category3Id: undefined,
        tmId: undefined,
        spuSaleAttrList: [],
        spuImageList: [],
      };
      this.unSelectSaleAttrId = undefined;
      this.$emit("cancelSpu");
    },
    addSaleAttr() {
      if (this.unSelectSaleAttrId) {
        let spuSaleAttr = {};
        spuSaleAttr.baseSaleAttrId = this.unSelectSaleAttrId;
        spuSaleAttr.saleAttrName = this.saleAttrList.filter((item) => {
          return item.id == this.unSelectSaleAttrId;
        })[0].name;
        spuSaleAttr.spuSaleAttrValueList = [];
        this.spuInfo.spuSaleAttrList.push(spuSaleAttr);
        this.unSelectSaleAttrId = undefined;
      }
    },
    addSaleAttrValue(row) {
      this.$set(row, "inputValue", row.inputValue);
      this.$set(row, "inputVisible", true);
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    addSaleAttrValueDone(row) {
      if (row.inputValue) {
        if (!row.inputValue.trim()) {
          this.$message({
            message: "不能输入空值",
            type: "warning",
            duration: 2000,
          });
        } else {
          if (
            row.spuSaleAttrValueList.every(
              (item) => item.saleAttrValueName != row.inputValue
            )
          ) {
            row.spuSaleAttrValueList.push({
              baseSaleAttrId: row.baseSaleAttrId,
              saleAttrValueName: row.inputValue,
            });
            row.inputValue = undefined;
          } else {
            this.$message({
              message: "不能输已有的值",
              type: "warning",
              duration: 2000,
            });
          }
        }
      }
      row.inputVisible = false;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
