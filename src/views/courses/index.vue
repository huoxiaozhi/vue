<template>
  <el-row>
    <el-col :span="8">
      <div class="grid-content bg-purple app-container">
        <div id="left">
          <center>
            <h3>排课表</h3>
          </center>
          <el-table v-loading="listLoading" :data="classtablelist" :stripe="true" size="mini" :fit="true"
            highlight-current-row>
            <el-table-column align="center" width="33px" type="index" :index="classtable_indexMethod">
            </el-table-column>
            <el-table-column align="center" label="周一" min-width="48">
              <template slot-scope="scope">
                {{ scope.row.Mon }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="周二" min-width="48">
              <template slot-scope="scope">
                {{ scope.row.Tue }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="周三" min-width="48">
              <template slot-scope="scope">
                {{ scope.row.Wed }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="周四" min-width="48">
              <template slot-scope="scope">
                {{ scope.row.Thur }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="周五" min-width="48">
              <template slot-scope="scope">
                {{ scope.row.Fri }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="周六" min-width="48">
              <template slot-scope="scope">
                {{ scope.row.Sat }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="周日" min-width="48">
              <template slot-scope="scope">
                {{ scope.row.Sun }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-col :span="15">
      <div class="grid-content bg-purple app-container">
        <div class="filter-container app-container" align="center">
          <el-input v-model="listQuery.name" placeholder="课程名称" class="filter-item" style="width: 200px;" @keyup.enter.native="handleFilter" />
          <el-select v-model="listQuery.department" placeholder="开课单位" class="filter-item" style="width: 180px;">
            <el-option v-for="item in calendarTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select v-model="listQuery.course_attribute" placeholder="课程属性" class="filter-item" style="width: 180px;">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Search
          </el-button>
        </div>
        <el-table ref="filterTable" v-loading="listLoading" :data="list" element-loading-text="Loading" size="mini" fit
          highlight-current-row>
          <el-table-column type="expand" width="35px">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="开课单位">
                  <span>{{ props.row.department }}</span>
                </el-form-item>
                <el-form-item label="课程编码">
                  <span>{{ props.row.code }}</span>
                </el-form-item>
                <el-form-item label="课程名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="课程属性">
                  <span>{{ props.row.course_attribute }}</span>
                </el-form-item>
                <el-form-item label="课时">
                  <span>{{ props.row.period }}</span>
                </el-form-item>
                <el-form-item label="学分">
                  <span>{{ props.row.credit }}</span>
                </el-form-item>
                <el-form-item label="开课周">
                  <span>{{ props.row.week }}</span>
                </el-form-item>
                <el-form-item label="星期节次">
                  <span>{{ props.row.section }}</span>
                </el-form-item>
                <el-form-item label="教室">
                  <span>{{ props.row.classroom }}</span>
                </el-form-item>
                <el-form-item label="讲授方式">
                  <span>{{ props.row.teaching_mode }}</span>
                </el-form-item>
                <el-form-item label="考试方式">
                  <span>{{ props.row.examination_mode }}</span>
                </el-form-item>
                <el-form-item label="主讲教师">
                  <span>{{ props.row.chief_professor }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="开课单位" width="125" align="center">
          </el-table-column>
          <el-table-column prop="code" label="课程编码" width="125" align="center">
          </el-table-column>
          <el-table-column prop="name" label="课程名称" align="center">
          </el-table-column>
          <el-table-column prop="course_attribute" label="课程属性" width="125" align="center">
          </el-table-column>
          <el-table-column label="课时/学分" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.row.period }}/{{ scope.row.credit }}
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button size="mini" type="success" @click="handleModifyStatus(row,'published')">
                选课
              </el-button>
              <el-button size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
                取消
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {
    getClassList
  } from '@/api/table'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        classtablelist: null,
        listQuery: {
          // page: 1,
          course_attribute: undefined,
          name: undefined,
          department: undefined
        },
        importanceOptions: ['全部', '核心课', '普及课', '研讨课', '公共必修课', '公共选修课', '高级强化课', '实验课', '其他'],
        calendarTypeOptions: ['人文学院', '马克思主义学院', '经济与管理学院', '公共政策与管理学院', '马克思主义学院', '心理学系'],
        // temp: {
        //   id: undefined,
        //   course_attribute: 1,
        //   name: '',
        //   department: ''
        // }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getClassList(this.listQuery).then(response => {
          this.list = response.data.list
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.fetchData()
      },
      classtable_indexMethod(index) {
        return index + 1
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        row.status = status
      },
    }
  }
</script>

<style>
  .app-container {
    padding: 10px;
  }

  .filter-container {
    padding-botstom: 10px;

    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .small-padding {
    .cell {
      padding-left: 5px;
      padding-right: 5px;
    }
  }

  .fixed-width {
    .el-button--mini {
      padding: 7px 10px;
      width: 60px;
    }
  }

  #left {
    margin: auto;
    position: fixed;
  }
</style>
