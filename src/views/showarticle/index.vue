<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <h1 class="contentbox">{{ articledata.articletitle }}</h1>
      </el-form-item>
      <el-form-item label="内容">
        <div class="content">
          <div style="margin: 20px 0; "></div>
          {{ articledata.articlecontent }}
          <div style="margin: 20px 0; "></div>
        </div>
      </el-form-item>
      <el-form-item label="当前访问量">
        <div>{{ articledata.pageview }}</div>
      </el-form-item>
      <el-form-item label="原价">
        <div>{{ articledata.price }}</div>
      </el-form-item>
      <el-form-item label="惊爆价">
        <div>{{ articledata.newprice }}</div>
      </el-form-item>

      <el-form-item label="出售学校">
        <div>{{ articledata.school }}</div>
      </el-form-item>
      <el-form-item label="作者">
        <div>{{ articledata.goodsusername }}</div>
      </el-form-item>
    </el-form>
    <div ref="articledata" :model="articledata">

      <div style="margin: 20px 0;"></div>
      <el-empty description="描述文字"></el-empty>

    </div>
    <div style="margin-top:10px"></div>

    <div>
      <!--style="margin-top:600px;"-->

      <el-button style="margin-left:10px" round @click="onbuy" icon="el-icon-s-opportunity">购买商品</el-button>
      <el-button type="info" plain>私信商家</el-button>
      <el-button round icon="el-icon-edit-outline" @click="onReview">评论</el-button>
      <el-button type="info" @click="outgoods">下架商品</el-button>
      <el-button type="info" @click="ongoods">上架商品</el-button>

      <div style="margin-top:10px"></div>
      <el-drawer title="评论区" :visible.sync="drawer" :direction="direction" :before-close="handleClose"
        :model="rereviewdata">
        <div style="margin-left:10px ;margin-bottom:10px" v-show="rereview">回复评论</div>
        <div style="margin-left:10px ;margin-bottom:10px" v-show="rereview">{{ rereviewdata.reviewcontent }}</div>
        <div style="margin-left:10px ;margin-bottom:10px" v-show="rereview">{{ rereviewdata.reviewname }}</div>
        <el-input type="textarea" placeholder="欢迎高质量的评论，回复的评论将折叠" v-model="textarea" maxlength="150" rows="20"
          show-word-limit>
        </el-input>
        <div style="margin-top:10px"></div>
        <el-button style="margin-left:10px" round @click="submitreview" icon="el-icon-s-opportunity">提交评论</el-button>
        <el-button style="margin-left:10px" round @click="drawer = false" icon="el-icon-s-opportunity">取消评论</el-button>
      </el-drawer>

      <el-collapse :v-model="reviewdata" v-for="(item) in reviewdata" :key="item.artid">
        <div style="margin-left:50px; display:inline-block">{{ item.reviewname + "：" + item.reviewcontent }}</div>
        <el-button style="margin-left:50px;display:inline-block" size="mini" type="info" icon="el-icon-message"
          @click="onRereview(item.reviewname, item.reviewcontent, item.id)" circle></el-button>
        <el-collapse-item style="margin-left:50px" v-for="li in item.list" :key="li.id">
          <div style="margin-left:50px; display:inline-block">{{ li.reviewname + ":" }}</div>
          <div style="margin-left:50px; display:inline-block">{{ li.reviewcontent }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script>
import { state } from 'vuex';
import axios from 'axios';
// import { getlist } from "@/api/table.js";
import { addarticle, artdetial, updataArt, pageview, outoffgoods, ongoods } from "@/api/article.js";
import { addreview, getreviewlist, rereview } from "@/api/review.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      articledata: {
        articleType: '',
        articletitle: '',
        articlecontent: '',
        articleuid: "",
        pageview: '',
        username: '',
        newprice: '',
        price: '',
        school: '',
        goodsusername: '',
      },
      data: {
      },
      reviewdata: [],
      content: [],
      count: 0,
      textarea: "",
      showr: false,
      drawer: false,
      rereview: false,
      direction: 'rtl',
      rereviewdata: {
        reviewname: "",
        reviewcontent: "",
        reviewid: "",
        artid: "",
        list: []
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.username,
      id: state => state.id,
    }),
  },
  created() {
    this.showdetial();
    this.getreviewlist();

  },
  mounted() {
    console.log(this.$route.query);



  },
  methods: {
    ongoods() {
      this.$confirm('是否要上架该商品, 确定是否继续么?', '提示', {
        confirmButtonText: '上架',
        cancelButtonText: '在考虑考虑',
        type: 'warning'
      }).then(() => {
        console.log(this.$route.query);
        ongoods(this.$route.query.id).then((res) => {
          this.$message({
            type: 'success',
            message: '上架成功!'
          });
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上架'
        });
      });
    },
    outgoods() {
      this.$confirm('是否要下架该商品, 确定是否继续么?', '提示', {
        confirmButtonText: '下架',
        cancelButtonText: '在考虑考虑',
        type: 'warning'
      }).then(() => {
        console.log(this.$route.query);
        outoffgoods(this.$route.query.id).then((res) => {
          this.$message({
            type: 'success',
            message: '下架成功!'
          });
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下架'
        });
      });
    },
    onbuy() {
      console.log("跳入购买页面");
      console.log(this.data);
      const user = this.$store.getters;
      console.log(user.name);
      console.log(this.articledata.username);
      if (user.name == this.articledata.username) {
        this.$alert('不能购买自己的商品哦', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `请购买其他用户发布的商品:`
            });
          }
        });
      }
      else {
        this.$router.push({
          path: "/buy",
          query: {
            id: this.$route.query.id,
          }
        });


      }

    },
    onSubmit() {
      console.log(this.articledata);
      axios.get("http://localhost:8000/users/userlist").then((res) => {
        console.log(res);
        console.log("获取成功");
      })

      this.data.title = this.articledata.articletitle;
      this.data.content = this.articledata.articlecontent;
      this.data.cateid = this.articledata.articleuid;
      this.data.status = this.articledata.articleuid;
      this.data.pageview = this.articledata.pageview;
      console.log(this.data);
      axios.post("http://localhost:8000/article/add", this.data).then((res) => {
        console.log(res);
        console.log("提交成功");
      })


      //  let url = 'http://localhost:5000/api/blog/new'
      // 	axios.post(url,articledata).then((res)=>{
      //   this.listLoading = false
      //   this.articleuid=res.data.data.length;
      //    console.log(this.articleuid);
      //      this.$message('submit!');
      //   })

    },
    pageview() {
      console.log("page" + this.articledata.pageview);
      this.data.pageview = parseInt(this.articledata.pageview) + 1;
      console.log(parseInt(this.articledata.pageview));
      console.log(this.data.pageview);
      this.data.title = this.articledata.articletitle;
      this.data.content = this.articledata.articlecontent;
      this.data.cateid = this.articledata.articleuid;
      this.data.status = this.articledata.articleuid;
      console.log(this.data);
      updataArt(this.$route.query.id, this.data);
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    showdetial() {
      let id = this.$route.query.id;

      console.log(id);
      artdetial(id).then((res) => {
        console.log(res);
        this.articledata.articletitle = res.data.goodsname;
        this.articledata.articlecontent = res.data.content;
        this.articledata.articleuid = res.data.cateid;
        this.articledata.articleuid = res.data.status;
        this.articledata.pageview = res.data.pageview + 1;
        this.articledata.username = res.data.goodsusername;
        this.articledata.price = res.data.price;
        this.articledata.newprice = res.data.newprice;
        this.articledata.school = res.data.school;
        this.articledata.goodsusername = res.data.goodsusername;



        this.content = this.createArr(res.data.content, 0, 20);
      })
    },
    createArr(str, start, end) {
      let arr = [] //保存每次截取后的字符串
      let unit = 20;
      let counts = Math.ceil(str.length / unit) //循环截取的次数,向上取整

      for (let i = 0; i < counts; i++) {
        let newStr = str.substring(start, end)
        arr.push(newStr)
        start = end
        end += 20
      }
      return arr
    },
    addpageview() {
      console.log(this.articledata);
      pageview(this.$route.query.id, this.articledata).then(() => {
        console.log("阅读文章一次");
      });
    },
    getreviewlist() {
      getreviewlist("1", this.$route.query.id).then((res) => {
        console.log("请求评论成功");
        this.reviewdata = res.data.list;
        console.log(this.reviewdata);

      })
    },
    handleClose(done) {
      done();
    },
    submitreview(id) {
      console.log(this.articledata);
      console.log(this.textarea);
      console.log(this.$store.getters.name);
      console.log(this.rereview);
      let data = {
        artid: this.$route.query.id,
        reviewname: this.$store.getters.name,
        reviewcontent: this.textarea,
      };
      let rereviewdata = {
        reviewname: this.$store.getters.name,
        reviewcontent: this.textarea,
        reviewid: this.rereviewdata.reviewid
      }
      console.log(rereviewdata);
      console.log(data.artid.toString());
      if (this.rereview == true) {
        console.log("进行回复评论");
        console.log(this.rereviewdata);
        rereview(rereviewdata).then((res) => {
          this.$message("回复评论成功")
          window.location.reload();
        })
      } else {
        console.log('进行评论');
        addreview(data).then((res) => {
          this.$message("评论成功");
          this.drawer = false;
          window.location.reload();
        })
      }

    },
    onRereview(reviewname, reviewcontent, id) {
      this.rereview = true
      this.drawer = true;

      console.log(reviewname, reviewcontent, id)
      console.log(this.rereview);
      this.rereviewdata.reviewid = id;
      this.rereviewdata.reviewcontent = reviewcontent;
      this.rereviewdata.reviewname = reviewname;
      console.log(reviewname, reviewcontent)
      console.log(this.rereviewdata);

    },
    onReview() {
      this.drawer = true;
      this.rereview = false;
      console.log(this.rereview);
    }


  }
}

</script>

<style scoped>
.line {
  text-align: center;
}


.titleData {
  margin-top: 402px;
}

.content-box {
  margin: 0 auto;
}

.content {
  border: 1px solid black;
}

.contentbox {
  text-align: center;
}
</style>
