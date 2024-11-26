<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="搜索内容">
            <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="搜索区域">
            <el-select v-model="form.region" placeholder="请选择搜索区域">
                <el-option label="商品名" value="goodsname"></el-option>
                <el-option label="商品介绍" value="content"></el-option>
                <el-option label="商家" value="goodsusername"></el-option>
                <el-option label="种类" value="cateid"></el-option>
                <el-option label="学校" value="school"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { searchgoods } from "@/api/article.js";
export default {

    data() {
        return {
            form: {
                content: '',
                region: '',
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            if (this.form.region == "") {
                this.$message({
                    type: '查询失败',
                    message: '请添加查询类型!'
                });
            }
            else if (this.form.content == "") {
                this.$message({
                    type: '查询失败',
                    message: '请添加查询类型!'
                })
            }
            else {
                searchgoods(this.form).then((res) => {
                    this.$alert('已搜索到', '谢谢', {
                    confirmButtonText: '已知晓',
                    callback: action => {
                        this.$router.push('/showfind');
                    }
                });
                })
            }

        }
    }
}
</script>