<template>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Update Course</title>
    <link href="https://unpkg.com/@coreui/coreui@4.2.0/dist/css/coreui.min.css" rel="stylesheet">
  </head>

  <div>
    <h1 class="text-center mt-5">Update Course</h1>
    <div class="c-container">
      <div class="c-row justify-content-center">
        <div class="c-col-md-6">
          <div class="c-card border-primary bg-steel-grey text-dark">
            <div class="c-card-body">
              <div class="alert bg-success my-3">
                <h4 class="text-center text-white">Update Your Course</h4>
              </div>
              <div class="field my-3">
                <label for="" class="form-label font-weight-bold">Course Code</label>
                <input type="text" class="form-control input-appealing" v-model="courseCode">
              </div>
              <div class="field my-3">
                <label for="" class="form-label font-weight-bold">Course Full Name</label>
                <input type="text" class="form-control input-appealing" v-model="courseFullName">
              </div>
              <!-- <div class="field my-3">
                <label for="" class="form-label font-weight-bold">Course NickName</label>
                <input type="text" class="form-control input-appealing" v-model="courseNickName">
              </div> -->
              <!-- <div class="field my-3">
                <label for="" class="form-label font-weight-bold">Course Duration</label>
                <input type="text" class="form-control input-appealing" v-model="courseDuration">
              </div> -->
              <!-- <div class="field my-3">
                <label for="" class="form-label font-weight-bold">Course Mode</label>
                <input type="text" class="form-control input-appealing" v-model="courseMode">
              </div> -->
              <div class="field my-3">
                <label for="" class="form-label font-weight-bold">Affiliated University</label>
                <input type="text" class="form-control input-appealing" v-model="affiliatedUniversity">
              </div>
              <div class="text-center">
                <button class="c-btn c-btn-primary" @click="openUpdatePage()">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: 'CourseEdit',
  data() {
    return {
      courseCode: '',
      courseFullName: '',
      // courseNickName: '',
      // courseDuration: '',
      // courseMode: '',
      affiliatedUniversity: '',
      courseId: ''
    }
  },
  created() {
    this.getCourseData()
  },
  methods: {
    async getCourseData() {
      const route = useRoute()
      let id = route.params.id;
      this.courseId = id;
      let result = await axios({
        method: 'get',
        url: 'http://localhost:3001/course/for/edit/' + id
      })
      this.courseCode = result.data.data.courseCode;
      this.courseFullName = result.data.data.courseFullName;
      // this.courseNickName = result.data.data.courseNickName;
      // this.courseDuration = result.data.data.courseDuration;
      // this.courseMode = result.data.data.courseMode;
      this.affiliatedUniversity = result.data.data.affiliatedUniversity;
    },
    async openUpdatePage() {
      let data = {
        courseCode: this.courseCode,
        courseFullName: this.courseFullName,
        // courseNickName: this.courseNickName,
        // courseDuration: this.courseDuration,
        // courseMode: this.courseMode,
        affiliatedUniversity: this.affiliatedUniversity
      }
      let result = await axios({
        method: 'put',
        url: 'http://localhost:3001/course/update/' + this.courseId,
        data: data
      })
      if (result.data.success) {
        router.push({ 'path': '/course/list' })
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
.input-appealing {
  border-radius: 0.5rem;
}
</style>
