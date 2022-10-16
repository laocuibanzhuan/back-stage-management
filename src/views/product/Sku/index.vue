<template>
  <div>
    <el-table :data="skuList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width" align="center">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width" align="center">
      </el-table-column>
      <el-table-column label="默认图片" width="100px" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 60px; height: 60px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80px" align="center">
      </el-table-column>
      <el-table-column label="可选操作" align="center" width="300px">
        <template slot-scope="{ row, $index }">
          <el-button size="mini" type="success" v-if="row.isSale" @click="unSale(row.id)"
            >已上架</el-button
          >
          <el-button size="mini" type="info" v-else @click="sale(row.id)"
            >已下架</el-button
          >
          <el-button size="mini" type="primary" @click="update">修改</el-button>
          <el-button size="mini" type="info" @click="detail(row.id)">详情</el-button>

          <el-popconfirm
            confirm-button-text="确定删除"
            cancel-button-text="取消操作"
            icon="el-icon-delete"
            icon-color="red"
            :title="`确定删除SKU [${row.skuName}] 吗？`"
            @onConfirm="deleteSku(row.id)"
          >
            <el-button size="mini" type="danger" style="margin: 10px" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer :visible.sync="drawer" size="50%" :show-close="false">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDetail.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16" style="overflow-y: scroll; max-height: 120px">{{
          skuDetail.skuDesc
        }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDetail.price }} 元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="(item, index) in skuDetail.skuAttrValueList"
            :key="item.id"
            style="margin: 5px"
          >
            {{ item.valueName }}</el-tag
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16" style="width: 400px">
          <el-carousel trigger="click">
            <el-carousel-item v-for="item in skuDetail.skuImageList" :key="item.id">
              <img
                :src="item.imgUrl"
                style="width: 400px; height: 400px; object-fit: fill"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>

    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[5, 7, 10, 20]"
      layout="prev, pager, next, jumper, sizes, total"
      :total="total"
      @current-change="pageChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      skuList: [],
      page: 1,
      limit: 7,
      total: undefined,
      skuDetail: {},
      drawer: false,
    };
  },
  methods: {
    async getSkuList() {
      let { page, limit } = this;
      let res = await this.$API.sku.reqSkuList_(page, limit);
      if (res.code == 200) {
        this.skuList = res.data.records;
        this.total = res.data.total;
      }
    },
    pageChange(page) {
      this.page = page;
      this.getSkuList();
    },
    sizeChange(size) {
      this.limit = size;
      this.getSkuList();
    },
    async sale(id) {
      let res = await this.$API.sku.reqSale(id);
      if (res.code == 200) {
        this.getSkuList();
        this.$message({
          message: "上架成功",
          type: "success",
          duration: 2000,
        });
      } else {
        this.$message({
          message: "上架失败",
          type: "error",
          duration: 2000,
        });
      }
    },
    async unSale(id) {
      let res = await this.$API.sku.reqUnSale(id);
      if (res.code == 200) {
        this.getSkuList();
        this.$message({
          message: "下架成功",
          type: "success",
          duration: 2000,
        });
      } else {
        this.$message({
          message: "下架失败",
          type: "error",
          duration: 2000,
        });
      }
    },
    update() {
      this.$message({
        message: "未开发",
        duration: 2000,
      });
    },
    async detail(id) {
      let res = await this.$API.sku.reqSku(id);
      if (res.code == 200) {
        this.skuDetail = res.data;
        this.drawer = true;
      }
    },
    async deleteSku(id) {
      let res = await this.$API.sku.deleteSku(id);
      if (res.code == 200) {
        this.getSkuList();
        this.$message({
          message: "删除成功",
          type: "success",
          duration: 2000,
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "error",
          duration: 2000,
        });
      }
    },
  },
  mounted() {
    this.getSkuList();
  },
};
</script>

<style>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-row {
  font-size: 24px;
}
.el-row .el-col-5 {
  font-weight: bolder;
  text-align: right;
  overflow: hidden;
  margin-right: 40px;
  margin-bottom: 16px;
}
.el-row .el-col-16 {
}
</style>
