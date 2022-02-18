<template>
    <div id="div1" style="width: 1200px;margin: auto;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div v-loading="loading">
        <!-- <el-row :gutter="10">
          <el-col :span="5"><span>表名称:<el-input v-model="inputTableName" placeholder="请输入内容" style="width: 180px;" clearable></el-input></span></el-col>
          <el-col :span="5"><span>表描述:<el-input v-model="inputTableComment" placeholder="请输入内容" style="width:180px" clearable></el-input></span></el-col>
          <el-col :span="15"><span>表时间:<el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="top:2px"></el-date-picker></span></el-col>
        </el-row> -->
        <div class="block" style="float:left">
          <span>表名称：</span><el-input v-model="inputTableName" placeholder="请输入内容" style="width: 180px;" clearable></el-input>
          <span>表描述：</span><el-input v-model="inputTableComment" placeholder="请输入内容" style="width:180px" clearable></el-input>
          <span>表时间：</span><el-date-picker v-model="datetime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至" style="top:2px"></el-date-picker>
          
        </div>
        <el-button type="primary" @click="queryAbleGenTable()">搜索</el-button>
        <el-button type="primary" @click="queryGenTable()" style="float:right">查看已生成的表</el-button>
        <el-table :data="tableData" height="618">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="tableName" label="表名称" width="180"></el-table-column>
          <el-table-column prop="tableComment" label="表描述" width="180"></el-table-column>
          <el-table-column prop="className" label="实体类名" width="180"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
          <el-table-column label="操作" width="140">
            <template #default="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="genTableClick(scope.row)" type="text" size="small" >代码生成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
          <el-pagination
            v-model:currentPage="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div>
        <el-dialog v-model="dialogVisible" title="已生成的表" width="1200px">
          <el-table v-loading="loadgridData" :data="gridData" >
            <el-table-column prop="tableId" label="ID" width="80"></el-table-column>
            <el-table-column prop="tableName" label="表名称" width="180"></el-table-column>
            <el-table-column prop="tableComment" label="表描述" width="180"></el-table-column>
            <el-table-column prop="className" label="实体类名" width="180"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button @click="daleteGenTable(scope.row)" type="text" size="small" :icon="Delete">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    

  <!-- <div id="div1" style="width: 1200px;margin: auto;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" >
    <div v-loading="loading" >
      <div align="left">
        表名称：<el-input v-model="inputTableName" placeholder="请输入内容" style="width: 180px;" clearable></el-input>
        表描述：<el-input v-model="inputTableComment" placeholder="请输入内容" style="width:180px" clearable></el-input>
        <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="queryGenTable()" style="float:right">查看已生成的表</el-button>
      </div>
      
      <el-table :data="tableData" height="618">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="tableName" label="表名称" width="180"></el-table-column>
      <el-table-column prop="tableComment" label="表描述" width="180"></el-table-column>
      <el-table-column prop="className" label="实体类名" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template >
          <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="genTableClick(scope.row)" type="text" size="small" >代码生成</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <div>
      <el-dialog title="已生成的表" @click="dialogVisible = true" width="1200px" :before-close="handleClose">
        <el-table v-loading="loadgridData" :data="gridData" align="center" >
          <el-table-column prop="tableId" label="ID" width="80"></el-table-column>
          <el-table-column prop="tableName" label="表名称" width="180"></el-table-column>
          <el-table-column prop="tableComment" label="表描述" width="180"></el-table-column>
          <el-table-column prop="className" label="实体类名" width="180"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
          <template >
            <el-button @click="daleteGenTable(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
        <span  class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div> -->
  
</template>

<script>
import {AbleGenTable,GenTable,DeleteClass} from '../interface/GenTable';
import { ElMessageBox, ElMessage } from 'element-plus'
import axios from 'axios';
  const apiUrl ="http://localhost:8081/";
  export default {
    data () {
      return {
        tableData: [],//生成代码表格
        gridData: [],//成功生成代码的表格
        dialogVisible: false, //是否打开表格成功生成代码的表格
        loading: '',  //生成代码表格显示区域加载
        loadgridData: '',//已生成的表显示区域加载
        isokqueryGenTable: true,//是否向后端请求查询已生成的表
        currentPage: 1,//当前页
        pageSize:10,//显示多少行数据
        total:0,//总行数
        inputTableName: '',//表名称输入框
        inputTableComment: '',//表描述输入框
        datetime: [],//时间
      }
    },
    //页面加载时执行
    created(){
      //查询可生成代码的表
      this.queryAbleGenTable();
    },
    //事件
    methods: {
      //查看按钮
      handleClick(row) {
        alert(row.tableName);
      },
      //查询可生成代码的表
      queryAbleGenTable(){
        this.loading = true;//显示加载中
        //post传参
        //let params = new URLSearchParams();
        //json传参
        let params = {};
        //添加参数
        const tableName = this.inputTableName;//表名称
        const tableComment = this.inputTableComment//表描述
        if(this.datetime!=null && this.datetime.length > 0){
          const startTime = this.dateFormat(new Date(this.datetime[0]));//获取开始时间
          const endTime = this.dateFormat(new Date(this.datetime[1]));//获取结束时间
          // params.append('startTime',startTime);
          // params.append('endTime',endTime);
          params['startTime'] = startTime;
          params['endTime'] = endTime;
        }
        params['tableName'] = tableName;
        params['tableComment'] = tableComment;
        params['currentPage'] = this.currentPage;
        params['pageSize'] = this.pageSize;
        // params.append('tableName',tableName);
        // params.append('tableComment',tableComment);
        // params.append('currentPage',this.currentPage);
        // params.append('pageSize',this.pageSize);
        //查询可生成代码的表
        AbleGenTable(params).then((response) =>{          //这里使用了ES6的语法
                 //请求成功返回的数据
            //console.log(response.data) //控制台打印结果
            setTimeout(() => { //延迟0.5秒显示加载中
              this.loading = false;//关闭加载
              //this.tableData = response.data;//渲染数据
              this.tableData = response.data.listObject;
              //查询总页数
              //this.pageTotal();
              //设置总页数
              this.total = response.data.total;
            }, 500);
            // for (const table of response.data) {
            //   alert(this.table_name);
            // }
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      },
      //查询已生成表
      queryGenTable() {
        this.dialogVisible = true;
        if(this.isokqueryGenTable){
          this.isokqueryGenTable = false;//表格没有改动则不请求数据
          this.loadgridData = true;//显示已生成的表格
          //alert('开始查询');
          axios({
              method:'post',
              url: apiUrl +'generatemysql/gen-table/queryGenTable',
              data:{}   //这里是发送给后台的数据
          }).then((response) =>{          //这里使用了ES6的语法
              setTimeout(() => { //延迟0.5秒显示加载中
                this.loadgridData = false;//关闭加载
                this.gridData = response.data;//请求成功返回的数据
              }, 500);
              // for (const table of response.data) {
              //   alert(this.table_name);
                
              // }
          }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
          })
        }
      },
      //生成代码按钮
      genTableClick(row){
        ElMessageBox.confirm(
          '确定要生成'+row.tableName+'表代码吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          this.loading = true;
          GenTable(row).then((response) =>{          //这里使用了ES6的语法
              let genTable = response.data;//请求成功返回的数据
              if(genTable){
                this.queryAbleGenTable();//刷新生成代码按钮
                this.openSuccess();//提示操作成功
                this.isokqueryGenTable = true;//开启已生成表查询
              }else{
                this.openError();
              };
              this.loading = false;//关闭加载中
          }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
          })
        }).catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            })
        })
      },
      //删除生成代码及相关配置信息
      daleteGenTable(row){
        let params = new URLSearchParams();
        //添加参数
        params.append('className',row.className);
        ElMessageBox.confirm('确定删除表'+row.tableName+'生成的代码及相关配置信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteClass(params).then((response) =>{          //这里使用了ES6的语法
            if(response){
              this.isokqueryGenTable = true;//表格有改动则q开启请求数据
              this.queryGenTable();//查询已生成代码的表
              this.queryAbleGenTable();//查询可生成代码的表
              //this.pageTotal();//查询总页数
              this.openSuccess();//提升操作成功
            }else{
              this.openError();//提升操作失败
            }
          }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
          })
        }).catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            })
        });
      },
      openSuccess() {
        ElMessage({
          type: 'success',
          message: '操作成功',
        })
      },
      openError() {
        ElMessage.error('操作失败');
      },
      handleCurrentChange(val) {
        // alert(this.currentPage)
        // console.log(`当前页: ${val}`);
        this.queryAbleGenTable();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryAbleGenTable();
        //alert(this.pageSize)
        //this.queryAbleGenTable();
        console.log(`每页 ${val} 条`);
      },
      //查询总页数
      pageTotal(){
        //post传参
        let params = new URLSearchParams();
        //添加参数
        const tableName = this.inputTableName;//表名称
        const tableComment = this.inputTableComment//表描述
        if(this.datetime!=null && this.datetime.length > 0){
          const startTime = this.dateFormat(new Date(this.datetime[0]));//获取开始时间
          const endTime = this.dateFormat(new Date(this.datetime[1]));//获取结束时间
          params.append('startTime',startTime);
          params.append('endTime',endTime);
        }
        params.append('tableName',tableName);
        params.append('tableComment',tableComment);
        axios({method:'post',url: apiUrl + 'generatemysql/gen-table/selectDbTableCount',data: params}).then((response) =>{          //这里使用了ES6的语法
            this.total = response.data;
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      },
      search(){
        const tableName = this.inputTableName;//表名称
        const tableComment = this.inputTableComment//表描述
        alert(this.datetime);
        const startTime = this.dateFormat(new Date(this.datetime[0]));//获取开始时间
        const endTime = this.dateFormat(new Date(this.datetime[1]));//获取结束时间
        alert(tableName);
        alert(tableComment);
        alert(startTime);
        alert(endTime);
      },
      //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
      dateFormat(time) {
          var date=new Date(time);
          var year=date.getFullYear();
          /* 在日期格式中，月份是从0开始的，因此要加0
            * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
            * */
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
          var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
          var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
          // 拼接
          return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },
      mounted(){
        // axios.post('http://localhost:8081/generatemysql/gen-table/testgenTable')
        // .then(res => (
        //     alert(res)
        //   ))
        // .catch(function (error) { // 请求失败处理
        //     console.log(error);
        // });
      }
    }
  }

</script>

<style lang="scss">
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
