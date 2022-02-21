<template>
    <div id="div1" >
      <div v-loading="state.loading">
        <div >
          <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
            <el-form-item label="表名称:">
              <el-input v-model="state.formInline.inputTableName" placeholder="请输入表名称" style="width: 180px;" clearable></el-input>
            </el-form-item>
            <el-form-item label="表描述:">
              <el-input v-model="state.formInline.inputTableComment" placeholder="请输入表描述" style="width:180px" clearable></el-input>
            </el-form-item>
            <el-form-item label="时间:">
              <el-date-picker v-model="state.formInline.datetime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至" style="top:2px"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryAbleGenTable()" :icon="Search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryGenTable">查看已生成的表</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-row class="mb-4">
          <!-- <el-button @click="toggleSelection([state.tableData[1], state.tableData[2]])">切换第二、第三行的选中状态</el-button> -->
          <el-button @click="toggleSelection()" :disabled="state.buttonDisabled" type="primary" plain >批量生成</el-button>
          <el-button >Default</el-button>
          <el-button type="primary" >Primary</el-button>
          <el-button type="success" >Success</el-button>
          <el-button type="info" >Info</el-button>
          <el-button type="warning" >Warning</el-button>
          <el-button type="danger" >Danger</el-button>
        </el-row>
        <div>
          <el-table :data="state.tableData" @selection-change="handleSelectionChange" height="650" :row-style="{height: '58.5px'}" :cell-style="{padding: '0'}">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="tableName" label="表名称" width="auto"></el-table-column>
            <el-table-column prop="tableComment" label="表描述" width="auto"></el-table-column>
            <el-table-column prop="className" label="实体类名" width="auto"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="auto"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="auto"></el-table-column>
            <el-table-column label="操作" width="auto">
              <template #default="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small" :icon="Edit">编辑</el-button>
                <el-button @click="genTableClick(scope.row)" type="text" size="small" >代码生成</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="demo-pagination-block">
          <el-pagination
            v-model:currentPage="state.currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="state.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="state.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div>
        <el-dialog v-model="state.dialogVisible" title="已生成的表" width="1200px">
          <el-table v-loading="state.loadgridData" :data="state.gridData">
            <el-table-column prop="tableId" label="ID" width="80"></el-table-column>
            <el-table-column prop="tableName" label="表名称" width="180"></el-table-column>
            <el-table-column prop="tableComment" label="表描述" width="180"></el-table-column>
            <el-table-column prop="className" label="实体类名" width="180"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="aoto">
              <template #default="scope">
                <el-button @click="daleteGenTable(scope.row)" type="danger" size="mini" :icon="Delete" >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="state.dialogVisible = false">确 定</el-button>
          </span>
          </template>
        </el-dialog>
      </div>
    </div>
  
</template>

<script setup>
import { reactive, ref, toRefs ,defineComponent,nextTick} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'//弹窗提示
import {Search,Edit,Check,Message,Star,Delete,} from '@element-plus/icons-vue'//图标
import {AbleGenTable,GenTable,DeleteClass,QueryGenTable} from '../interface/GenTable';//接口
import {DateFormat} from '../util/dateFormatUtil'//日期

  const apiUrl ="http://localhost:8081/";

  defineComponent(() =>{

  })

  //页面加载时执行
  nextTick(() => {
    queryAbleGenTable();
  })

  //return
  const state = reactive({
    tableData: [],//生成代码表格
    gridData: [],//成功生成代码的表格
    dialogVisible: false, //是否打开表格成功生成代码的表格
    loading: false,  //生成代码表格显示区域加载
    loadgridData: false,//已生成的表显示区域加载
    isokqueryGenTable: true,//是否向后端请求查询已生成的表
    currentPage: 1,//当前页
    pageSize:10,//显示多少行数据
    total:0,//总行数
    multipleSelection:[],//多选框，保存选中的值
    buttonDisabled:true,//是否禁用批量生成按钮
    formInline: {
        inputTableName: '',//表名称输入框
        inputTableComment: '',//表描述输入框
        datetime: [],//时间
      },
  })

  const onSubmit = () => {
      console.log('submit!')
  }

  //查询可生成代码的表
  const queryAbleGenTable = () => {
    state.loading = true;//显示加载中
    //post传参
    //let params = new URLSearchParams();
    //json传参
    let params = {};
    //添加参数
    const tableName = state.formInline.inputTableName;//表名称
    const tableComment = state.formInline.inputTableComment//表描述
    if(state.formInline.datetime!=null && state.formInline.datetime.length > 0){
      const startTime = DateFormat(new Date(state.formInline.datetime[0]));//获取开始时间
      const endTime = DateFormat(new Date(state.formInline.datetime[1]));//获取结束时间
      // params.append('startTime',startTime);
      // params.append('endTime',endTime);
      params['startTime'] = startTime;
      params['endTime'] = endTime;
    }
    params['tableName'] = tableName;
    params['tableComment'] = tableComment;
    params['currentPage'] = state.currentPage;
    params['pageSize'] = state.pageSize;
    // params.append('tableName',tableName);
    // params.append('tableComment',tableComment);
    // params.append('currentPage',this.currentPage);
    // params.append('pageSize',this.pageSize);
    //向后端查询可生成代码的表
    AbleGenTable(params).then((response) =>{          0//这里使用了ES6的语法
      //请求成功返回的数据
      //console.log(response.data) //控制台打印结果
      setTimeout(() => { //延迟0.3秒显示加载中
        //this.tableData = response.data;//渲染数据
        state.tableData = response.data.listObject;
        //查询总页数
        //this.pageTotal();
        //设置总页数
        state.total = response.data.total;
        state.loading = false;//关闭加载
      }, 300);
      // for (const table of response.data) {
      //   alert(this.table_name);
      // }
    }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
    })
  }

  //编辑按钮
  const handleClick = (row) => {
    alert(row.tableName);
  }
  //生成代码按钮
  const genTableClick = (row) => {
    let genTableList = [];
    if(row.tableName != null){//判断row是对象还是集合
      genTableList.push(row);
    }else{
      genTableList = row;//如果是集合直接赋值
    }
    let multipleTableName = [];
    genTableList.forEach(row => {
      multipleTableName.push(row.tableName);//保存表名称
    });
    let multipleTableNameString = multipleTableName.join(',');//把数组项拼接成字符串，并以逗号隔开。默认情况下是以逗号隔开
    //json传参
    let params = {
      'multipleTableName':multipleTableNameString,
      'listObject':genTableList
    };
    ElMessageBox.confirm(
      '确定要生成'+ (genTableList.length>1?multipleTableNameString +'这些选中的':multipleTableNameString)+'表代码吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      state.loading = true;
      GenTable(params).then((response) =>{          //这里使用了ES6的语法
          let genTable = response.data;//请求成功返回的数据
          if(genTable){
            queryAbleGenTable();//刷新生成代码按钮
            openSuccess();//提示操作成功
            state.isokqueryGenTable = true;//开启已生成表查询
          }else{
            openError();
          };
          state.loading = false;//关闭加载中
      }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
      })
    }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
    })
  }

  //多选事件，保存选中的值
  const handleSelectionChange = (val) => {
    if(val.length>0){
      state.multipleSelection = val;//保存选中的值
      state.buttonDisabled = false;//启用批量生成按钮
    }else{
      state.buttonDisabled = true;//禁用批量生成按钮
    }
    
  }

  //批量生成按钮
  const toggleSelection = () => {
    if(state.multipleSelection.length > 0){
      genTableClick(state.multipleSelection);//生成代码
    }
  }

  //当前页
  const handleCurrentChange = (val) => {
    // alert(this.currentPage)
    //console.log(`当前页: ${val}`);
    queryAbleGenTable();//刷新
  }
  //显示多少条数据
  const handleSizeChange = (val) => {
    state.pageSize = val;//设置显示多少条数据
    queryAbleGenTable();//刷新
    //alert(this.pageSize)
    //this.queryAbleGenTable();
    //console.log(`每页 ${val} 条`);
  }

  //查询已生成表
  const queryGenTable = () => {
    //alert(dialogVisible);
    state.dialogVisible = true;
      if(state.isokqueryGenTable){
        state.isokqueryGenTable = false;//表格没有改动则不请求数据
        state.loadgridData = true;//显示已生成的表格
        //alert('开始查询');
        QueryGenTable().then((response) =>{ //这里使用了ES6的语法
            setTimeout(() => { //延迟0.3秒显示加载中
              state.loadgridData = false;//关闭加载
              state.gridData = response.data;//请求成功返回的数据
            }, 300);
            // for (const table of response.data) {
            //   alert(this.table_name);
              
            // }
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      }
  }
  //删除生成代码及相关配置信息
  const daleteGenTable = (row) => {
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
          state.isokqueryGenTable = true;//表格有改动则q开启请求数据
          queryGenTable();//查询已生成代码的表
          queryAbleGenTable();//查询可生成代码的表
          openSuccess();//提升操作成功
        }else{
          openError();//提升操作失败
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
  }
  const openSuccess =() => {
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
  }
  const openError = () => {
    ElMessage.error('操作失败');
  }
</script>

<style>

</style>