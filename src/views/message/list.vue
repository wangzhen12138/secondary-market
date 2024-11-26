<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="选择地址">
                <el-select v-model="searchAddressId" placeholder="请选择地址">
                    <el-option v-for="item in addressData" :key="item.addressid" :label="item.addressname" :value="item.addressid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchHandle">查询</el-button>
                <el-button @click="resetSearch">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="messageData" style="width: 100%">
            <el-table-column type="index" width="180">
            </el-table-column>
            <el-table-column prop="jrname" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="addressname" label="地址">
            </el-table-column>
            <el-table-column prop="levelname" label="等级">
            </el-table-column>
            <el-table-column prop="jrtel" label="手机号">
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-button class="el-icon-edit" @click.native.prevent="updateBtn(scope.row, messageData)" type="text" size="small">
                        修改
                    </el-button>
                    <el-button class="el-icon-delete" @click.native.prevent="deleteMessage(scope.row, messageData)" type="text" size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { delMessage, getMessage, searchAddress } from "@/api/message.js"
import { getaddress } from "@/api/address.js"

export default {
    data() {
        return {
            messageData: [],
            addressData: [],
            searchAddressId: [],
        }

    },
    methods: {
        //重置
        resetSearch() {
            this.searchAddress = "";
            this.getMessageData();
        },

        //获取地址
        getaddressData() {
            getaddress().then((res) => {
                this.addressData = res.data
            })
        },
        // getaddressData() {
        //     getaddress().then((res) => {
        //         this.addressData = res.data;
        //         console.log(this.addressData);
        //     })
        // },
        getMessageData() {
            getMessage().then((res) => {
                this.messageData = res.data;
                console.log(this.messageData);
            })
        },


        deleteMessage(item) {

            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(item);
                delMessage({
                    id: item.jrid
                }).then((res) => {
                    this.getMessageData();
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });


        },
        /*  deleteLevel(item){
        console.log(item);
        delLevel({
            levelid:item.jrid,
        }).then((res)=>{
            this.getList();
            console.log(res);
        })
    },*/updateBtn(item){
        console.log(item);
        // this.$router.push({
        //     name:"messageAdd",
        //     params:{
        //         id:item.jrid
        //     }
        // })
        this.$router.push({
            path:"/message/add",
            query:{
                id:item.jrid
            }
        })
    },

        searchHandle() {
            let address = "";
            this.addressData.map((item) => {
                if (item.addressid == this.searchAddressId) {
                    address = item.addressname;
                }
            });
            searchAddress({
                searchid: this.searchAddressId,
            }).then((res)=>{
            console.log(res);
            this.messageData = res.data.map((item)=>{
                 item.addressname = address;
                 return item
            })
            // this.messageData = res.data;

        })

       },
    },
    //搜索地址名字

    created() {
        this.getMessageData();
        this.getaddressData();
    }
}
</script>