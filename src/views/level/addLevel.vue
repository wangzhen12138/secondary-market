<template>
    <div class="content" v-loading="loading">
        <el-row :gutter="20">
            <el-col :span="6" :offset="6">
                <div>
                    <el-form :model="levelForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="添加等级" prop="levelName" :rules="[
                      { required: true, message: '等级名不能为空'},
                    ]">
                            <el-input v-model="levelForm.levelName"></el-input>
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
import { addLevel } from "@/api/level.js"
export default {
    data() {
        return {
            loading:false,
            levelForm: {
                levelName: ""
            }

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
