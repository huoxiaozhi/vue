<template>
  <div class="grid-content bg-purple app-container">
    <div class="filter-container app-container">
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
    <el-table ref="filterTable" v-loading="listLoading" :data="list" element-loading-text="Loading" size="mini" fit highlight-current-row>
      <el-table-column fixed="right" align="center" type="index" label="序号" />
      <el-table-column fixed="right" align="center" prop="school" label="开课单位" />
      <el-table-column fixed="right" align="center" prop="code" label="课程编码" />
      <el-table-column fixed="right" align="center" prop="name" label="课程名称" />
      <el-table-column fixed="right" align="center" prop="course_attribute" label="课程属性" />
      <el-table-column fixed="right" align="center" prop="period" label="课时" width="55" />
      <el-table-column fixed="right" align="center" prop="credit" label="学分" width="55" />
      <el-table-column fixed="right" align="center" prop="capacity" label="限选" width="55" />
      <el-table-column fixed="right" align="center" prop="week" label="开课周" />
      <el-table-column fixed="right" align="center" prop="section" label="星期节次" />
      <el-table-column fixed="right" align="center" prop="classroom" label="教室" />
      <el-table-column fixed="right" align="center" prop="teaching_mode" label="授课方式" />
      <el-table-column fixed="right" align="center" prop="examination_mode" label="考试方式" />
      <el-table-column fixed="right" align="center" prop="chief_professor" label="首席教授" width="75" />
      <el-table-column fixed="right" align="center" prop="lecturer" label="主讲教师" width="75" />
      <el-table-column fixed="right" align="center" prop="assistant" label="助教" width="75" />
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/courses'
export default {
  data() {
    return {
      list: [],
      courseQuery: {
        name: null,
        school: null,
        course_attribute: null
      },
      listLoading: false,
      courseattributes: [null, '一级学科核心课', '专业核心课', '一级学科普及课', '专业普及课', '一级学科研讨课', '专业研讨课', '公共必修课', '公共选修课', '高级强化课',
        '实验课', '其他'
      ],
      schools: [null, '计算机科学与技术学院', '人工智能学院', '网络空间安全学院', '马克思主义学院', '外语系', '天文与空间科学学院', '数学科学学院', '体育教研室',
        '公共政策与管理学院', '经济与管理学院', '地球与行星科学学院', '微电子学院', '未来技术学院', '存济医学院', '航空宇航学院', '物理科学学院', '化学科学学院', '资源与环境学院',
        '生命科学学院', '人文学院', '工程科学学院', '材料科学与光电技术学院', '电子电气与通信工程学院', '国际学院', '创新创业学院', '心理学系', '纳米科学与技术学院', '艺术中心',
        '核科学与技术学院', '现代农业科学学院', '化学工程学院', '海洋学院'
      ]
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
</style>
