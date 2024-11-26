<template>
    <!--<div class="content" v-loading="loading">-->
    <div class="content">

        <el-row :gutter="20">
            <el-col :span="6" :offset="6">
                <div>
                    <el-form :model="messageForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户姓名" prop="uname" :rules="[ { required: true, message: '当前姓名不能为空'}, ]">
                            <el-input v-model="messageForm.uname"></el-input>
                        </el-form-item>

                        <el-form-item label="用户电话" prop="tel" :rules="[ { required: true, message: '当前电话不能为空'},
                                                                                                        ]">
                            <el-input v-model="messageForm.tel"></el-input>
                        </el-form-item>

                        <!--等级-->
                        <el-form-item label="等级">
                            <el-select v-model="messageForm.levelid" placeholder="请选择">
                                <el-option v-for="item in levelList" :key="item.jrid" :label="item.levelname" :value="item.jrid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div></div>
                        <!--区域-->
                        <el-form-item label="区域">
                            <el-select v-model="messageForm.addressid" placeholder="请选择">
                                <el-option v-for="item2 in addressList" :key="item2.addressid" :label="item2.addressname" :value="item2.addressid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--头像-->
                        <!--<el-form-item label="头像">
                            <el-upload action="http://47.92.82.13:4000/getMessageA" :file-list="fileList" :on-success="txUpload" name="sfile">

                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="二维码">
                            <el-upload action="http://47.92.82.13:4000/getMessageB" :file-list="fileList" :on-success="wxUpload" name="sweixin">

                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button v-if="isUpdate" type="primary" @click="updateMessageHandle('messageForm')">修改</el-button>
                             <el-button type="primary" @click="addMessageHandle('numberValidateForm')">提交</el-button>
                            <el-button @click="resetForm('numberValidateForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

        </el-row>

    </div>
</template>
<script>
import { getaddress } from "@/api/address.js";
import { getLevel } from "@/api/level.js";
import { addMessage, messageId,updateMessage } from "@/api/message.js";
export default {
    data() {
        return {
            // loading:false,
            messageForm: {
                uname: "",
                addressid: "",
                levelid: "",
                tel: "",
                tcoin: "",
                weixin: "",

            },
            addressList: [],
            fileList: [],
            levelList: [],
            value: '',
            value2: ''

        };
    },
    created() {
        this.initPage();
        if (this.$route.query.id) {
            this.isUpdate = true;
            this.getMessageById();
        }

    },
    methods: {
        //修改信息
        updateMessageHandle(){
        let { uname,addressid,levelid,tel} = this.messageForm;
        updateMessage({
            id:this.$route.query.id,
            uname,
            addressid,
            levelid,
            tel
        }).then((res)=>{
            console.log(res);
            this.$router.push("/message/list")
        })
    },


        //通过id查找信息
        getMessageById() {
            messageId({
                id: this.$route.query.id,
            }).then((res) => {
                console.log(res);
                this.messageForm = {
                    uname: res.data[0].jrname,
                    addressid: res.data[0].jraddressesid,
                    levelid: res.data[0].jrlevel,
                    tel: res.data[0].jrtel,
                    tcoin: res.data[0].tcoin,
                    weixin: res.data[0].weixin,
                }

            })
        },
        //二维码上传成功
        txUpload(res) {
            this.messageForm.tcoin = res.headerurl;
            console.log(this.messageForm.tcoin);
        },
        wxUpload(res) {
            this.messageForm.weixin = res.weixinurl;

        },
        //获取地址信息
        getAddressData() {
            return new Promise((resolve, reject) => {
                getaddress().then((res) => {
                    this.addressList = res.data;
                    resolve();
                });
            });
        },

        //获取等级列表
        getLevelData() {
            return new Promise((resolve, reject) => {
                getLevel().then((res) => {
                    this.levelList = res.data
                    resolve();
                });
            });
        },
        addMessageHandle(formName) {
            console.log(formName);
            this.$refs[formName].validate((res) => {
                if (res) {
                    console.log("ssss");
                    console.log(this.messageForm);
                    addMessage({ ...this.messageForm }).then((res) => {
                        console.log("hhh");
                        console.log(res);
                        this.$router.push('/message/list');
                    });
                }
            });
        },
        //初始化页面
        initPage() {
            this.loading = true;
            let levelPromise = this.getLevelData();
            let addressPromise = this.getAddressData();
            Promise.all([levelPromise, addressPromise]).then(() => {
                this.loading = false;
            })
        }

    }




    // methods: {
    //     //添加等级事件
    //     submitForm(formName){
    //          //this.loading=true;
    //         console.log(this.addressForm)
    //         this.$refs[formName].validate((valid)=>{
    //             if(valid){
    //                 addaddress({
    //                     address:this.addressForm.address,
    //                      longitude:this.addressForm.longitude,
    //                      latitude:this.addressForm.latitude,
    //                 }).then((res)=>{
    //                     this.loading=false;
    //                     this.$router.push('/address/addresslist');
    //                     console.log(res);
    //                 })
    //             }
    //             else{
    //                 console.log("表单提交失败");
    //                 return false;
    //             }
    //         })
    //     },
    //     resetForm(formName) {
    //         this.$refs[formName].resetFields();
    //     }
    // }
}
</script>

<style scoped>
.content {
    margin-top: 100px;
}
</style>
