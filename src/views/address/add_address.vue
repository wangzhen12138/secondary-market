<template>
    <div class="content" v-loading="loading">
        <el-row :gutter="20">
            <el-col :span="6" :offset="6">
                <div>
                    <el-form :model="addressForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="添加银行名称" prop="address" :rules="[
                      { required: true, message: '当前等级不能为空'},
                    ]">
                            <el-input v-model="addressForm.address"></el-input>
                        </el-form-item>
                        
                         <el-form-item label="添加纬度" prop="longitude" :rules="[
                      { required: true, message: '当前纬度不能为空'},
                    ]">
                            <el-input v-model="addressForm.longitude"></el-input>
                        </el-form-item>
                         <el-form-item label="添加经度" prop="latitude" :rules="[
                      { required: true, message: '当前经度不能为空'},
                    ]">
                            <el-input v-model="addressForm.latitude"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                            <el-button @click="resetForm('numberValidateForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

        </el-row>

    </div>
</template>
<script>
import { addaddress } from "@/api/address.js"
export default {
    data() {
        return {
            loading:false,
            addressForm: {
                address: "",
                longitude:"",
                latitude:"",
            }

        };
    },
    methods: {
        //添加菜品事件
        submitForm(formName){
             this.loading=true;
            console.log(this.addressForm)
            this.$refs.numberValidateForm.validate((valid)=>{
                if(valid){
                    addaddress({
                        address:this.addressForm.address,
                         longitude:this.addressForm.longitude,
                         latitude:this.addressForm.latitude,
                    }).then((res)=>{
                        this.loading=false;
                        this.$router.push('/address/addresslist');
                        console.log(res);
                    })
                }
                else{
                    console.log("表单提交失败");
                    return false;
                }
            })
        },

        // submitForm(formName) {
        //     this.loading=true;
        //   console.log(this.addressForm);
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             addLevel({ 
        //                 levelname :this.levelForm.levelName,
        //             }).then((res)=>{//添加成功回调
        //                 this.loading=false;
        //                 this.$router.push('/level/levelList');
        //                 console.log(res);
        //             })
        //             console.log(this.levelForm.levelName);
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
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
