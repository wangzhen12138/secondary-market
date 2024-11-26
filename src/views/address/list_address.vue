<template>
    <div>
        <template>
            <el-table :data="dataList" style="width: 100%">
                <el-table-column prop="addressid" label="银行id">
                </el-table-column>
                <el-table-column prop="addressname" label="银行名字">
                </el-table-column>
                <el-table-column prop="longitude" label="经度">
                </el-table-column>
                <el-table-column prop="latitude" label="纬度">
                </el-table-column>
                <el-table-column fixed="right" label="操作键">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteAddress(scope.row, dataList)" type="text" size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

</template>
    </div>
</template>

<script>

import { getaddress, deladdress } from "@/api/address.js"
export default {

    data() {
        return {
            dataList: [],
        }
    },
    created() {
        this.getAddress();
        console.log(this.dataList);
    },
    methods: {
        //删除菜品
        deleteAddress(item) {
           
            deladdress({
                addressid: item.addressid,
            }).then((res) => {
                this.getAddress();
                console.log(res);
            })
        },
        //获取菜品列表
        getAddress() {
            getaddress().then((res) => {

                this.dataList = res.data;
            })
        }


    }
}
</script>
