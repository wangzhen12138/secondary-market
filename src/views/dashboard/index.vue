<template>
  <div class="dashboard-container">
    <div class="demo-image">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="block" v-for="fit in fits" :key="fit">
              <div class="dashboard-text">尊敬的 {{ name }} 您好</div>

              <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="上架商品" name="first">
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
                <el-button type="text" @click="delclick(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagenumber" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"
            @current-change="getPageNum">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我购买的商品" name="second">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column label="id" width="180">
            <template slot-scope="scope">
              <div>
                {{scope.row.$index}}
              </div>
            </template>
          </el-table-column>
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
      <el-tab-pane label="下架商品列表" name="third">
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
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="我卖出的商品" name="fourth">
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
import { getartlist, artdetial, getuserartlist, delgood } from "@/api/article.js";
import { getuserorderlist, getusersoldlist } from "@/api/order.js";
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
      soldData: []
    }

  },
  created() {
    this.getname();
    this.fetchData();
    this.getorderlist();
    this.getsoldlist();
  },
  methods: {
    delclick(row) {
      delgood(row.id).then((res) => {
        this.$message('删除文章成功!');
        this.$router.push('/example/table');
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
      getusersoldlist(1, this.$store.getters.name).then((res) => {
        this.soldData = res.data.list;

      })
    },
    getorderlist() {
      getuserorderlist(1, this.$store.getters.name).then((res) => {
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

      getuserartlist(1, this.name).then((res) => {
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
    font-size: 24px;
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
