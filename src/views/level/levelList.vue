<template>
    <div>
        <template>
            <el-table :data="dataList" style="width: 100%">
                <el-table-column prop="jrid" label="ID" >
                </el-table-column>
                <el-table-column prop="levelname" label="等级名称" >
                </el-table-column>
                <el-table-column fixed="right" label="操作" >
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteLevel(scope.row, dataList)" type="text" size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
import { getLevel,delLevel} from "@/api/level.js"

export default {

    data() {
        return {
            dataList: [],

        }
    },
    created() {
        this.getList();
    },
    methods: {
        //删除商家
        deleteLevel(item){
            console.log(item);
            delLevel({
                levelid:item.jrid,
            }).then((res)=>{
                this.getList();
                console.log(res);
            })
        },
        //获取商家列表
        getList() {
            getLevel().then((res) => {
             
                this.dataList = res.data;
            })
        }
      

    }
}
</script>
