<template>
  <div class="dashboard-container">
    <div class="demo-image">
      <div class="block" v-for="fit in fits" :key="fit">
        <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
      </div>
    </div>
    <el-divider></el-divider>

    <div class="dashboard-text">尊敬的管理员！您好！</div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品列表" name="first">
        <div class="lunch">
          <el-table :data="articleData" style="width: 100%" @click.native="skip(articleData)">
            <el-table-column prop="status" label="上架状态" width="90">
              <!--<div v-else>下架</div>-->
            </el-table-column>
            <el-table-column prop="goodsname" label="商品名字" width="90">
            </el-table-column>
            <el-table-column prop="content" label="商品内容" width="360" show-overflow-tooltip="false">
            </el-table-column>
            <el-table-column prop="pageview" label="浏览量">
            </el-table-column>
            <el-table-column prop="goodsusername" label="发布者" width="150">
            </el-table-column>
            <el-table-column prop="createdAt" label="发布内容日期" width="150">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick2(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" @click="updataclick(scope.row)" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagenumber" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" @current-change="getPageNum">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="订单列表" name="second">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="id" width="180">
          </el-table-column>
          <el-table-column prop="goodsname" label="商品名" width="180">
          </el-table-column>
          <el-table-column prop="goodsusername" label="卖家">
          </el-table-column>
          <el-table-column prop="buyer" label="买家">
          </el-table-column>
          <el-table-column prop="price" label="价格">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick3(scope.row)" type="text" size="small">查看</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="种类列表" name="third">
        <el-input placeholder="请输入您想要添加的种类名" v-model="input" clearable>
        </el-input>
        <el-button icon="el-icon-search" @click="subcate" circle></el-button>
        <el-table :data="cateData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="id" width="360">
          </el-table-column>
          <el-table-column prop="catename" label="种类名" width="360">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="deletcate(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="用户列表" name="forth">
        <el-table :data="userData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="id" width="180">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="wx" label="微信">
          </el-table-column>
          <el-table-column prop="emial" label="邮箱">
          </el-table-column>
          <el-table-column prop="school" label="学校">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick4(scope.row)" type="text" size="small">查看</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="申诉列表" name="fifth">
        <el-table :data="soldData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="id" width="180">
          </el-table-column>
          <el-table-column prop="goodsname" label="商品名" width="180">
          </el-table-column>
          <el-table-column prop="goodsusername" label="卖家">
          </el-table-column>
          <el-table-column prop="buyer" label="买家">
          </el-table-column>
          <el-table-column prop="price" label="价格">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick3(scope.row)" type="text" size="small">查看</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
import { getartlist, artdetial, getuserartlist, } from "@/api/article.js";
import { getuserorderlist, getusersoldlist, getorderlist, getadminorder } from "@/api/order.js";
import { getuserlist, getInfo } from "@/api/user.js";
import { addcate, catelist, delcate } from "@/api/cate.js";


getuserlist
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      input: '',
      isadmin: '',
      input: '',
      activeName: 'first',
      fits: ['fill'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      count: 1,
      list: null,
      listLoading: true,
      listData: {
        articleuid: "asfdasfs",
        articletitle: "",
        articlecontent: "",
        articletype: "",
        articleuser: "",
        articlese: "",
        articlecollect: "",
        articlethumbs: "",
      },
      articleData: [],
      pagenumber: [],
      tableData: [],
      soldData: [],
      userData: [],
      cateData: []
    }

  },
  created() {
    console.log(this.$store.getters.token);
    getInfo(this.$store.getters.token, this.$store.getters).then((res) => {
      console.log(res);
      this.isadmin = res.data.is_admin;
      console.log(this.isadmin);
      if (this.isadmin == 1) {
        this.getname();
        this.fetchData();
        this.getorderlist();
        this.getsoldlist();
        this.getuserlist();
        this.getcatelist();
        this.getcatelist();
      }
      if (this.isadmin == 0) {
        this.$alert('当前页面管理员权限不够请浏览其他页面', '谢谢', {
          confirmButtonText: '已知晓',
          callback: action => {
            this.$router.push('/mine');
          }
        });
      }
    })



  },
  methods: {
    getcatelist() {
      console.log('获取种类列表');
      catelist().then((res) => {
        this.cateData = res.data.list;

      })
    },
    subcate() {
      const data = {
        catename: this.input
      }
      console.log("进入添加种类");
      addcate(data).then((res) => {
         this.$message('添加种类成功');
          this.$router.push('/mine');
      })
    },
    getuserlist() {
      getuserlist().then((res) => {
        this.userData = res.data.list;

      })
    },
    showstatus(data) {
      console.log(data);
      for (let i = 0; i <= data.length - 1; i++) {
        if (data[i].status) {
          data[i].status = '下架';
        } else {
          data[i].status = "上架";
        }
      }
      console.log("************************");
      console.log(data);
    },
    getsoldlist() {
      console.log("获取卖出商品的列表")
      getadminorder(1).then((res) => {
        this.soldData = res.data.list;

      })
    },
    getorderlist() {
      getorderlist(1).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        console.log(this.tableData);
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getname() {
      console.log("hhh");
      console.log(this.$store.getters.name);
      console.log(this.$store);
    },
    fetchData() {

      getartlist(1).then((res) => {
        console.log(res);
        this.articleData = res.data.list;
        console.log(this.articleData);
        this.showstatus(this.articleData);
        // 在这里用循环把status的布尔值改成上架与下架状态
        console.log(this.articleData)
        this.listLoading = false
        this.$message(`您累计发布过${res.data.total}个二手物品`);
      })
    },
    skip(articleData) {
      console.log(articleData);

    },
    handleClick2(row) {
      console.log(row.id);
      this.$router.push({
        path: "/showarticle/index",
        query: {
          id: row.id,
        }
      })
    },
    deletcate(row) {
      this.$confirm('是否删除该种类操作, 确定是否继续么?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '在考虑考虑',
        type: 'warning'
      }).then(() => {
        delcate(row.id).then((res) => {
          console.log(this.$route.query);
            this.$message({
              type: '删除成功',
              message: '删除成功!'
            });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });

    },
    handleClick4(row) {
      console.log(row.id);
      this.$router.push({
        path: "/infor",
        query: {
          id: row.id,
        }
      })
    },
    handleClick3(row) {
      console.log(row.id);
      this.$router.push({
        path: "/showorder",
        query: {
          id: row.id,
        }
      })
    },
    updataclick(row) {
      this.$router.push({
        path: "/form/index",
        query: {
          id: row.id,
        }
      })
    },
    getPageNum(pagenumber) {
      console.log(pagenumber);
      let pageNum = pagenumber;

      console.log(this.name);
      getuserartlist(pageNum, this.name).then((res) => {
        console.log(res);
        this.articleData = res.data.list;
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
