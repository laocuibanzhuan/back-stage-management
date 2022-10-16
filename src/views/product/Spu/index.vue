<template>
  <div>
    <el-card>
      <CategorySelect
        :canOperation="showTable == 1"
        @getSpuList="getSpuList"
        @getCategoryId="getCategoryId"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="showTable == 1">
        <el-button
          :disabled="!info.category3Id"
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 60px; margin-bottom: 20px"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table border style="width: 100%" :data="spuList">
          <el-table-column type="index" label="序号" align="center" width="80px">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" align="center" width="160px">
          </el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            align="center"
            width="width"
          >
          </el-table-column>
          <el-table-column label="可选操作" align="center" width="450px">
            <template slot-scope="{ row, $index }">
              <el-button
                style="margin: 10px"
                type="success"
                size="mini"
                icon="el-icon-plus"
                @click="addSku(row)"
                >添加SKU
              </el-button>
              <el-button
                style="margin: 10px"
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateSpu(row.id)"
                >修改
              </el-button>
              <el-button
                style="margin: 10px"
                type="info"
                size="mini"
                icon="el-icon-message"
                @click="getSkuList(row)"
                >详情
              </el-button>
              <el-popconfirm
                confirm-button-text="确定删除"
                cancel-button-text="取消操作"
                icon="el-icon-delete"
                icon-color="red"
                :title="`确定删除SPU [${row.spuName}] 吗？`"
                @onConfirm="deleteSpu(row.id)"
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
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          style="margin-top: 20px; text-align: center"
          :current-page="info.page"
          :page-size="info.limit"
          :page-sizes="[5, 10, 20]"
          layout="prev, pager, next,->, jumper, sizes, total"
          :total="total"
          @current-change="pageChange"
          @size-change="sizeChange"
        >
        </el-pagination>
      </div>
      <div v-show="showTable == 2">
        <AddSpu @cancelSpu="cancelSpu" ref="spu" />
      </div>
      <div v-show="showTable == 3">
        <AddSku @cancelSku="cancelSku" ref="sku" />
      </div>
    </el-card>
    <el-dialog
      :title="`[${spuName}] 的SKU列表`"
      :visible.sync="dialogVisible"
      @close="closeSku"
    >
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称"> </el-table-column>
        <el-table-column prop="price" label="价格" width="80px"> </el-table-column>
        <el-table-column prop="weight" label="重量" width="80px"></el-table-column>
        <el-table-column label="默认图片" width="100px">
          <template slot-scope="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 60px; height: 60px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import AddSpu from "./addSpu.vue";
import AddSku from "./addSku.vue";

export default {
  name: "Spu",
  data() {
    return {
      showTable: 1,
      info: {
        page: 1,
        limit: 5,
      },
      spuList: [],
      spuName: undefined,
      skuList: [],
      total: undefined,
      dialogVisible: false,
      loading: true,
    };
  },
  components: { AddSku, AddSpu },
  methods: {
    getCategoryId(id) {
      this.info.category3Id = id;
    },
    async getSpuList() {
      let res = await this.$API.spu.reqSpuList(this.info);
      if (res.code == 200) {
        this.spuList = res.data.records;
        this.total = res.data.total;
      } else {
        return false;
      }
    },
    pageChange(page) {
      this.info.page = page;
      this.getSpuList();
    },
    sizeChange(size) {
      this.info.limit = size;
      this.getSpuList();
    },
    addSpu() {
      this.showTable = 2;
      this.$refs.spu.spuInfo.category3Id = this.info.category3Id;
      this.$refs.spu.initData();
    },
    updateSpu(id) {
      this.showTable = 2;
      this.$refs.spu.spuId = id;
      this.$refs.spu.spuInfo.category3Id = this.info.category3Id;
      this.$refs.spu.initData();
    },

    async deleteSpu(id) {
      let res = await this.$API.spu.deleteSpu(id);
      if (res.code == 200) {
        if ((this.spuList.length = 1)) {
          this.info.page -= 1;
          this.getSpuList();
        }
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
    addSku(row) {
      this.showTable = 3;
      this.$refs.sku.spuId = row.id;
      this.$refs.sku.spuName = row.spuName;
      this.$refs.sku.skuInfo.category3Id = this.info.category3Id;
      this.$refs.sku.skuInfo.spuId = row.id;
      this.$refs.sku.skuInfo.tmId = row.tmId;
      this.$refs.sku.initData();
    },
    async getSkuList(row) {
      this.dialogVisible = true;
      let res = await this.$API.sku.reqSkuList(row.id);
      if (res.code == 200) {
        this.skuList = res.data;
        this.spuName = row.spuName;
        this.loading = false;
      }
    },
    closeSku() {
      this.skuList = [];
      this.loading = true;
    },
    cancelSpu() {
      this.showTable = 1;
      this.getSpuList();
    },
    cancelSku() {
      this.showTable = 1;
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-bottom: 30px;
}
</style>
