<template>
<div>
 <el-table
      :data="articleData"
      style="width: 100%"  @click.native="skip(articleData)">
      <el-table-column
        prop="id"
        label="id"
        width="90" >
      </el-table-column>
      <el-table-column
        prop="goodsname" 
        label="文章标题"
        width="90">
      </el-table-column>
      <el-table-column
        prop="content"
        label="文章内容"
        width="360" :show-overflow-tooltip="false">
      </el-table-column>
      <el-table-column
        prop="pageview"
        label="浏览量">
      </el-table-column>
      
      <el-table-column
      prop="createdAt"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="medium ">查看</el-button>
      </template>
    </el-table-column>
     <el-table-column
      prop="goodsusername"
      label="作者"
      width="150"
      fixed="right">
    </el-table-column>
    </el-table>
     <el-pagination class="pagenumber"
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000" @current-change="getPageNum">
</el-pagination>

</div>

 

  </template>

<script>
// import { getList } from '@/api/table'
import axios from 'axios';
import {getartlist ,artdetial} from "@/api/article.js";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
      pagenumber:[]
    }
  },
  created() {
    
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      let url = 'http://localhost:8000/article/list'
      axios.get(url).then((res) => {
        
        this.articleData = res.data.data.list;
        this.listLoading = false
      })
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    skip(articleData){
      console.log(articleData);
     
    },
    handleClick(row){
      console.log(row.id);
        this.$router.push({
            path:"/showarticle/index",
            query:{
               id:row.id,
            }
        })
    },
    updataclick(row){
       this.$router.push({
            path:"/form/index",
            query:{
               id:row.id,
            }
        })
    },
    getPageNum(pagenumber){
      console.log(pagenumber);
      let pageNum=pagenumber;
      getartlist(pageNum).then((res)=>{
        console.log(res);
         this.articleData = res.data.list;
         this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
  .pagenumber{
    display: block;
    text-align: center;
  }
</style>

