 <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsusername"
        label="卖家"
        width="180">
      </el-table-column>
      <el-table-column
        prop="buyer"
        label="买家"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
    </el-table>
  </template>

   <script>
import { state } from 'vuex';
import axios from 'axios';
import { getorderlist } from "@/api/order.js";
import { mapState } from "vuex";
    export default {
      data() {
        return {
          tableData:[],
        }
      },
      created(){
          this.getlist();
      },
      methods:{
        getlist(){
            getorderlist().then((res)=>{
                console.log(res);
                this.tableData = res.data.list;
                console.log(this.tableData);
            })
        }
      }
    }
  </script>