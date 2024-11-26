<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="微信号">
      <el-input v-model="form.wx"></el-input>
    </el-form-item>
    <el-form-item label="qq邮箱">
      <el-input v-model="form.emial"></el-input>
    </el-form-item>
    <el-form-item label="所在学校">
      <el-input v-model="form.school"></el-input>
    </el-form-item>
    <div class="btn">
      <el-button type="primary" round @click="submit">提交修改后的信息</el-button>
    </div>

  </el-form>
</template>

<script>
import { state } from 'vuex';
import axios from 'axios';
import { getInfo ,searchinfo,updateinfo} from '@/api/user.js';
import { mapState } from "vuex";
export default {
  data() {
    return {
      user:{
        id:"",
      },
      form: {
        id:"",
        username: '',
        phone: '',
        wx: '',
        emial: '',
        school: '',
      },
    }
  },
  created(){
   this.search();
  },
  methods: {
    search(){
        console.log('进入查找');
        this.user.id=this.$store.getters.id;
         this.form.id=this.$store.getters.id;
        searchinfo(this.$store.getters.token,this.user).then((res)=>{
        console.log(res.data);
        this.form.username=res.data.username;
        this.form.phone=res.data.phone;
        this.form.wx=res.data.wx;
        this.form.school=res.data.school;
        this.form.emial=res.data.emial;            
        })
    },
    submit() {
      if(this.form.username==''){
        console.log("不能为空");
      }
      console.log(this.form);
      updateinfo(this.$store.getters.token,this.form).then((res)=>{
        this.$router.push({
            path:"/mine",
           
        })
      })
      console.log('submit!');
      console.log(this.$store.getters.token);
     this.user.id=this.$store.getters.id;
     console.log(this.user);
    }
  },
  computed: {
    ...mapState({
      username: state => state.username,
      id: state => state.id,
      token:state=>state.token,
      id:state=>state.id,
    }),
  }
}
</script>
 <style>
.btn {
  /*margin:0 auto;*/
  text-align: center;
}
</style>
 