<template>
  <div>
    <div ref="articledata" :model="articledata">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品标题">
          <el-input type="textarea" autosize placeholder="给商品来一个标题" v-model="articledata.articletitle"></el-input>
        </el-form-item>
        <el-form-item label="购买价格">
          <el-input type="textarea" autosize placeholder="购买商品时的价格" v-model="articledata.price"></el-input>
        </el-form-item>
        <el-form-item label="想卖价格">
          <el-input type="textarea" autosize placeholder="想要出售的价格" v-model="articledata.newprice"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 40 }" placeholder="请介绍一下商品"
            v-model="articledata.articlecontent" class="textarea"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <div style="margin: 20px 0;"></div>
    </div>
    <div class="titleData">
      <el-form ref="articledata" :model="articledata.cateid" label-width="80px">
        <el-form-item label="商品分类">
          <template>
            <el-select v-model="articledata.cateid" placeholder="请选择">
              <el-option v-for="item in cateData" :key="item.id" :label="item.label" :value="item.catename"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { state } from 'vuex';
import axios from 'axios';
import { addarticle, artdetial, updataArt } from "@/api/article.js";
import { mapState } from "vuex";
import { catelist } from "@/api/cate.js";


export default {
  data() {
    return {
      fileList: [],
      articledata: {
        cateid: '',
        goodsname: '',
        goodscontent: '',
        goodsusername: "",
        price: "",
        newprice: "",
        school: "",
      },
      cateData: [],

    }
  },
  computed: {
    ...mapState({
      username: state => state.username,
      id: state => state.id,
    }),
    //与state中的名字相同,在template中可以直接使用name,age
  },
  created() {
    if (!this.$route.query.id) {
      this.showcatelist();
    }
    if (this.$route.query.id) {
      this.showdetial();

    }
  },
  methods: {
    showcatelist() {
      catelist().then((res) => {
        this.cateData = res.data.list;
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file, filelist) {
      console.log(file);
      console.log("111");
      console.log(this.fileList);

      // this.filelist.push.apply(this.filelist, file);
      console.log(this.fileList.length);
      let length = this.fileList.length;
      this.fileList[length] = file;
      // this.filelist.push(file);
      console.log(this.fileList);

    },

    onSubmit() {
      console.log(this.articledata);
      let data = {
      };
      data.price = this.articledata.price;
      data.newprice = this.articledata.newprice;
      data.goodsusername = this.$store.getters.name;
      data.goodsname = this.articledata.articletitle;
      data.goodscontent = this.articledata.articlecontent;
      data.cateid = "1";
      data.school = this.$store.getters.school;
      data.status = 0;
      // data.goodspicture = this.fileList;
      console.log("------------------------");
      console.log(data);
      console.log(this.articledata);
      if (this.$route.query.id) {
        updataArt(this.$route.query.id, data).then((res) => {
          console.log("更新成功");
          this.$message('更新成功,快在文章列表中查看吧!');
          this.$router.push('/mine');
        })

      } else {
        addarticle(data).then((res) => {
          console.log("提交成功");
          this.$message('提交成功,快在文章列表中查看吧!');
          this.$router.push('/mine');
        })


      }



      //  let url = 'http://localhost:5000/api/blog/new'
      // 	axios.post(url,articledata).then((res)=>{
      //   this.listLoading = false
      //   this.articleuid=res.data.data.length;
      //    console.log(this.articleuid);
      //      this.$message('submit!');
      //   })

    },
    showdetial() {
      let id = this.$route.query.id;

      console.log(id);
      artdetial(id).then((res) => {
        console.log(res);
        this.articledata.articletitle = res.data.title;
        this.articledata.articlecontent = res.data.content;
        this.articledata.articleType = res.data.cateid;
        this.articledata.articleuid = res.data.status;
      })
    },

    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },


  }
}

</script>

<style scoped>
.line {
  text-align: center;
}

.textarea {
  height: 6rem;
}

.titleData {
  margin-top: 402px;
}
</style>
