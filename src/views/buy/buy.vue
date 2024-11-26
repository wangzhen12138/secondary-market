<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
            <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商家">
            <el-input v-model="form.goodsusername"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="form.buyer"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="收获地点">
            <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="学校">
            <el-input v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item label="金额">
            <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
            <el-radio-group v-model="form.pay">
                <el-radio label="微信"></el-radio>
                <el-radio label="支付宝"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button>取消</el-button>
    </el-form>
</template>
<script>
import { state } from 'vuex';
import axios from 'axios';
import { add } from "@/api/order.js";
import { mapState } from "vuex";
import { artdetial,outoffgoods } from "@/api/article.js"
export default {

    data() {
        return {
            form: {
                goodsname: '',
                goodsusername: '',
                buyer: '',
                phone: '',
                address: '',
                price: '',
                pay: '',
                state: ''
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
        console.log(this.$store.getters);
    },
    methods: {
        showdetial() {
            console.log("这是id" + this.$route.query.id);
            const user = this.$store.getters;
            artdetial(this.$route.query.id).then((res) => {
                console.log(res);
                this.form.goodsname = res.data.goodsname;
                this.form.buyer = user.name;
                this.form.goodsusername = res.data.goodsusername;
                this.form.phone = user.phone;
                this.form.address = user.address;
                this.form.price = res.data.newprice;
                this.form.school = user.school;
                this.form.state = "1";
                console.log(this.form);
            })
        },
        onSubmit() {
            console.log("提交按钮");

            add(this.form).then((res) => {
                console.log("信息提交成功");
                  outoffgoods(this.$route.query.id).then((res) => {
                    
                     this.$alert('当前订单等待发货，再看看别的商品吧', '订单进度', {
                    confirmButtonText: '已知晓',
                    callback: action => {
                        this.$router.push('/example/table');
                    }
                });
                })
              
              
            })


        }
    }
}
</script>5