<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content bg-purple app-container">
        <div id="left">
          <center>
            <h3>课表</h3>
          </center>
          <el-table v-loading="coursesLoading" :data="classtablelist" border size="small" :fit="true">
            <el-table-column fixed="right" align="center" width="48px" type="index" :index="classtable_indexMethod" />
            <el-table-column fixed="right" align="center" prop="0" label="周一" />
            <el-table-column fixed="right" align="center" prop="1" label="周二" />
            <el-table-column fixed="right" align="center" prop="2" label="周三" />
            <el-table-column fixed="right" align="center" prop="3" label="周四" />
            <el-table-column fixed="right" align="center" prop="4" label="周五" />
            <el-table-column fixed="right" align="center" prop="5" label="周六" />
            <el-table-column fixed="right" align="center" prop="6" label="周日" />
          </el-table>
          <el-pagination align="center" :page-size="1" :page-count="20" :pager-count="21" :current-page.sync="currentweek" layout="prev, pager, next" @current-change="handleWeeksChange" />
          <center>
            <h3>已选课程</h3>
          </center>
          <el-table v-loading="coursesLoading" :data="selectedlist" border size="mini" :fit="true">
            <el-table-column fixed="right" label="开课单位" align="center" width="125">
              <template slot-scope="scope">
                <span>{{ scope.row.school }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="课程编码" align="center" width="125">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="课程名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="课程属性" align="center" width="125">
              <template slot-scope="scope">
                <span>{{ scope.row.course_attribute }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="周次/节次" align="center">
              <template slot-scope="scope">
                <!-- {{ scope.row.period }}/{{ scope.row.credit }} -->
                {{ scope.row.week }}/{{ scope.row.section }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="课时" align="center" width="55">
              <template slot-scope="scope">
                {{ scope.row.period }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="学分" align="center" width="55">
              <template slot-scope="scope">
                {{ scope.row.credit }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="90">
              <template slot-scope="{row}">
                <el-button size="mini" type="danger" @click="handleSelectPop(row)">
                  取消
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple app-container">
        <div class="filter-container app-container" align="center">
          <el-input v-model="courseQuery.name" placeholder="课程名称" class="filter-item" style="width: 200px;" @keyup.enter.native="handleFilter" />
          <el-select v-model="courseQuery.school" placeholder="开课学院" class="filter-item" style="width: 180px;">
            <el-option v-for="item in schools" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select v-model="courseQuery.course_attribute" placeholder="课程属性" class="filter-item" style="width: 180px;">
            <el-option v-for="item in courseattributes" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Search
          </el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border size="mini" fit>
          <el-table-column type="expand" width="35px">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="开课单位">
                  <span>{{ props.row.school }}</span>
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
          <el-table-column fixed="right" label="开课单位" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.school }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="课程编码" align="center" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="课程名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="课程属性" align="center" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.course_attribute }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="课时/学分" align="center" width="55">
            <template slot-scope="scope">
              {{ scope.row.period }}/{{ scope.row.credit }}
              <!-- {{ scope.row.week }}/{{ scope.row.section }} -->
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="周次/节次" align="center">
            <template slot-scope="scope">
              <!-- {{ scope.row.period }}/{{ scope.row.credit }} -->
              {{ scope.row.week }}/{{ scope.row.section }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="100">
            <template slot-scope="{row}">
              <el-button size="mini" type="success" @click="handleSelectPush(row)">
                选课
              </el-button>
              <!-- <el-button size="mini" type="danger" @click="handleSelectPop(row)">
                取消
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { fetchList, detect, fetchTimeTable } from '@/api/courses'
import { transpose } from 'mathjs'

const defaultclasstablelist = []

var done = []

var undone = []

export default {
  data() {
    return {
      currentweek: 1,
      list: [],
      courseQuery: {
        name: null,
        school: null,
        course_attribute: null
      },
      listLoading: false,
      classtablelist: [],
      coursesLoading: false,
      selectedlist: [],
      selectedset: new Set(),
      courseattributes: [null, '一级学科核心课', '专业核心课', '一级学科普及课', '专业普及课', '一级学科研讨课', '专业研讨课', '公共必修课', '公共选修课', '高级强化课', '实验课', '其他'],
      schools: [null, '计算机科学与技术学院', '人工智能学院', '网络空间安全学院', '马克思主义学院', '外语系', '天文与空间科学学院', '数学科学学院', '体育教研室', '公共政策与管理学院', '经济与管理学院', '地球与行星科学学院', '微电子学院', '未来技术学院', '存济医学院', '航空宇航学院', '物理科学学院', '化学科学学院', '资源与环境学院', '生命科学学院', '人文学院', '工程科学学院', '材料科学与光电技术学院', '电子电气与通信工程学院', '国际学院', '创新创业学院', '心理学系', '纳米科学与技术学院', '艺术中心', '核科学与技术学院', '现代农业科学学院', '化学工程学院', '海洋学院']
    }
  },
  created() {
    this.fetchData(this.courseQuery)
  },
  methods: {
    handleFilter() {
      this.fetchData(this.courseQuery)
    },
    fetchData(params) {
      this.listLoading = true
      fetchList(params).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    handleSelectPush(course) {
      // 添加课程
      // 检测冲突
      if (this.selectedset.has(course)) {
        console.log('already selected')
        return false
      } else {
        this.detect = { code: this.codesQuery(), detect: course.code }
        detect(this.detect).then(response => {
          if (response.data.status === true) {
            // console.log('success')
            this.selectedset.add(course)
            this.updateSelect()
          } else {
            // TODO:界面提示错误
            alert('想选择的  ' + course.name + '  与  ' + response.data.clash + '  冲突')
          }
        })
      }
    },
    handleSelectPop(course) {
      // 删除课程
      if (this.selectedset.has(course)) {
        this.selectedset.delete(course)
      } else {
        console.log('error not selected')
      }
      this.updateSelect()
    },
    codesQuery() {
      var selectCoursescodes = []
      this.selectedset.forEach(function(item) {
        selectCoursescodes.push(item.code)
      })
      return selectCoursescodes
    },
    updateSelect() {
      //  更新课程选择
      this.selectedlist = [...this.selectedset]
      this.changeClassTable()
    },
    changeClassTable() {
      if (this.selectedset.size > 0) {
        this.weeks = []
        fetchTimeTable({ code: this.codesQuery() }).then(response => {
          this.first = true
          for (var key in response.data.list) {
            this.str2List(response.data.list[key]['name'], response.data.list[key]['timetable'])
          }
          this.slicing()
        }).then(_ => {
          this.handleWeeksChange(this.currentweek)
        })
      } else {
        this.classtablelist = defaultclasstablelist
      }
    },
    str2List(course_name, timetable) {
      if (this.first === true) {
        this.first = false
        done = timetable.split('')
        done.forEach(function(item, index) {
          if (item === '1') {
            done.splice(index, 1, course_name)
          }
        })
      } else {
        undone = timetable.split('')
        undone.forEach(function(item, index) {
          if (item === '1') {
            done.splice(index, 1, course_name)
          }
        })
      }
      // console.log(done)
    },
    slicing() {
      done.forEach(function(item, index) {
        if (item === '0') {
          done.splice(index, 1, '')
        }
      })
      var m20_1_77 = []
      var m1_77 = []
      for (var i = 0; i < 20; i++) {
        m1_77 = done.slice(i * 77, (i + 1) * 77)
        // console.log(m1_77)
        var m7_11 = []
        for (var j = 0; j < 7; j++) {
          m7_11.push(m1_77.slice(j * 11, (j + 1) * 11))
        }
        // console.log(m7_11)
        m20_1_77.push(transpose(m7_11))
      }
      this.classtable = m20_1_77
      // console.log(this.classtable)
      this.coursesLoading = false
    },
    handleWeeksChange(currentweek) {
      this.classtablelist = this.classtable[currentweek - 1]
    },
    reverseMatrix(temp_arr) {
      var temp_arr2 = []
      for (var i = 0; i < temp_arr[0].length; i++) {
        temp_arr2[i] = []
      }
      for (var j = 0; j < temp_arr.length; j++) {
        for (var k = 0; k < temp_arr[j].length; k++) {
          temp_arr2[k][j] = temp_arr[j][k]
        }
      }
      return temp_arr2
    },
    classtable_indexMethod(index) {
      return index + 1
    }
  }
}
</script>

<style>
.app-container {
  padding: 10px;
}

.filter-container {
  padding-bottom: 10px;
}

.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}

.left{
  margin: auto;
  position: fixed;
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
</style>
