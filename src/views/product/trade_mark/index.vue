<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-left: 10%" @click="add"
      >添加商品
    </el-button>

    <el-table :data="listData.records" style="width: 100%; margin-top: 30px" border>
      <el-table-column type="index" label="序号" width="100px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="300px" align="center">
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width=60px;height:60px;" />
        </template>
      </el-table-column>
      <el-table-column label="可选操作" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="update(row)"
            >修改
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delete_(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, jumper, sizes, total"
      :total="listData.total"
      @current-change="pageChange"
      @size-change="sizeChange"
    >
    </el-pagination>

    <el-dialog
      :title="form.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: 80%" :rules="rules" ref="verification">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="form.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- action="/admin/product/fileUpload" -->
          <!-- 接口已经停机，无法处理请求 2022.10.9 -->
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action=""
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              style="object-fit: contain"
              v-if="form.logoUrl"
              :src="form.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
            <div slot="tip" class="el-upload__tip">由于无法上传图片，只能使用默认图</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_update_Trade">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除品牌" :visible.sync="dialogFormVisible_">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="品牌名称" label-width="100px">
          <div style="padding-left: 70px">
            {{ form.tmName }}
          </div>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <img
            style="object-fit: contain"
            v-if="form.logoUrl"
            :src="form.logoUrl"
            class="avatar"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="delete_Trade">确 定 删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      listData: [],
      page: 1,
      limit: 5,
      dialogFormVisible: false,
      dialogFormVisible_: false,
      form: {
        tmName: "",
        logoUrl:
          "http://47.93.148.192:8080/group1/M00/02/DA/rBHu8mGxOciADR75AAE6kN74a-E289.png",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名", trigger: "blur" },
          { min: 2, max: 10, message: "2到10个字符", trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请选择品牌LOGO" }],
      },
    };
  },
  methods: {
    async getPageList() {
      let { page, limit } = this;
      let res = await this.$API.trademark.reqPageList(page, limit);
      if (res.code == 200) {
        this.listData = res.data;
      }
    },
    pageChange(page) {
      this.page = page;
      this.getPageList();
    },
    sizeChange(size) {
      this.limit = size;
      this.getPageList();
    },
    // 应该有下列处理函数，但由于接口问题，无法调用
    handleAvatarSuccess(res) {
      //   if (res.code == 200) {
      //     this.form.imageUrl = res.data;
      //  }
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //   }
      //   return isJPG && isLt2M;
    },
    add() {
      this.dialogFormVisible = true;
      this.form = {
        tmName: "",
        logoUrl:
          "http://47.93.148.192:8080/group1/M00/02/DA/rBHu8mGxOciADR75AAE6kN74a-E289.png",
      };
      //使用默认图片，不能更新
    },
    update(item) {
      this.dialogFormVisible = true;
      this.form = { ...item };
    },
    delete_(item) {
      this.dialogFormVisible_ = true;
      this.form = { ...item };
    },
    add_update_Trade() {
      this.$refs.verification.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          if (this.form.id) {
            let res = await this.$API.trademark.updateTrade({
              id: this.form.id,
              trName: this.form.name,
              logoUrl: this.form.imageUrl,
            });
            if (res.code == 200) {
              this.$message({
                message: "修改品牌成功",
                type: "success",
                duration: 5000,
              });
              this.getPageList();
            } else {
              this.$message({
                message: "修改品牌失败",
                type: "error",
                duration: 5000,
              });
            }
          } else {
            let res = await this.$API.trademark.addNewTrade({
              trName: this.form.name,
              logoUrl: this.form.imageUrl,
            });
            if (res.code == 200) {
              this.$message({
                messag: "添加品牌成功",
                type: "success",
                duration: 5000,
              });
              this.getPageList();
            } else {
              this.$message({
                message: "添加品牌失败",
                type: "error",
                duration: 5000,
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    async delete_Trade() {
      this.dialogFormVisible_ = false;
      let res = await this.$API.trademark.deleteTrade(this.form.id);
      if (res.code == 200) {
        this.$message({
          messag: "删除品牌成功",
          type: "success",
          duration: 5000,
        });
        this.page = this.listData.lenght > 1 ? this.page : this.page - 1;
        this.getPageList();
      } else {
        this.$message({
          message: "删除品牌失败",
          type: "error",
          duration: 5000,
        });
      }
    },
  },
  mounted() {
    this.getPageList();
  },
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
