<template>
    
     <div>
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
       <el-table-column
        prop="goodname"
        label="商品名字"
        width="180">
      </el-table-column>

       <el-table-column
        prop="content"
        label="商品内容"
        width="180">
      </el-table-column>
       <el-table-column
        prop="prewview"
        label="浏览量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发布者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import { addLevel } from "@/api/level.js"
export default {
    data() {
        return {
             tableData: [{
            id:'1',
            goodname:"iphone14",
            content: '这是一款iphone',
            prewview:'0',
            name: 'admin',
          
          },]
        
        };
    },
    methods: {
        //添加商家事件

        submitForm(formName) {
            this.loading=true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addLevel({ 
                        levelname :this.levelForm.levelName,
                    }).then((res)=>{//添加成功回调
                        this.loading=false;
                        this.$router.push('/level/levelList');
                        console.log(res);
                    })
                    console.log(this.levelForm.levelName);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.content {
    margin-top: 100px;
}
</style>
