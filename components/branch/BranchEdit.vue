<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CoreUI Demo</title>
    <link href="https://unpkg.com/@coreui/coreui@4.2.0/dist/css/coreui.min.css" rel="stylesheet">
  </head>

  <div>
    <h1 class="text-center mt-5">Update Course</h1>
    <div class="c-container">
      <div class="c-row justify-content-center">
        <div class="c-col-md-6">
          <div class="card border-primary bg-gradient-primary text-light">
            <div class="card-body">
              <div class="alert bg-success my-3">
                <h4 class="text-center text-white">Update Your Branch</h4>
              </div>
              <div class="field my-3">
                <label for="branchCode" class="form-label bold-label">Branch Code</label>
                <input type="text" class="form-control input-appealing" v-model="branchCode">
              </div>
              <div class="field my-3">
                <label for="branchFullName" class="form-label bold-label">Branch Full Name</label>
                <input type="text" class="form-control input-appealing" v-model="branchFullName">
              </div>
              <!-- <div class="field my-3">
                <label for="branchNickName" class="form-label bold-label">Branch Nick Name</label>
                <input type="text" class="form-control input-appealing" v-model="branchNickName">
              </div> -->
              <div class="field my-3">
                <label for="course" class="form-label bold-label">Course</label>
                <select class="form-control input-appealing" v-model="course">
                  <option v-for="course in courses" :key="course._id" :value="course._id">{{ course.courseFullName }}</option>
                </select>
              </div>
              <div class="text-center">
                <button class="btn btn-primary" @click="openUpdatePage()">Update</button>
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
  name: 'BranchEdit',
  data() {
    return {
      branchCode: '',
      branchFullName: '',
      // branchNickName: '',
      course: '',
      branchId: '',
      courses: []
    }
  },
  created() {
    this.getBranchData()
    this.getCourses()
  },
  methods: {
    async getCourses() {
      let result = await axios({
        method: 'get',
        url: 'http://localhost:3001/courses'
      })
      console.log(result.data.data)
      this.courses = result.data.data
    },
    async getBranchData() {
      const route = useRoute()
      let id = route.params.id
      this.branchId = id
      let result = await axios({
        method: 'get',
        url: 'http://localhost:3001/branch/for/edit/' + id
      })
      this.courses = result.data.data
      this.branchCode = result.data.data.branchCode
      this.branchFullName = result.data.data.branchFullName
      // this.branchNickName = result.data.data.branchNickName
      this.course = result.data.data.course
    },
    async openUpdatePage() {
      let data = {
        branchCode: this.branchCode,
        branchFullName: this.branchFullName,
        // branchNickName: this.branchNickName,
        course: this.course
      }
      let result = await axios({
        method: 'put',
        url: 'http://localhost:3001/branch/update/' + this.branchId,
        data: data
      })
      if (result.data.success) {
        router.push({ path: '/branch/list' })
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

.bg-gradient-primary {
  background-image: linear-gradient(to right, #a6c8eb 0%, #58697c 100%);
}

.text-light {
  color: #fff;
}

.text-muted {
  color: #ccc;
}

.btn-primary {
  background-color: #25cef4;
  border-color: #0f4e79;
}

.btn-primary:hover {
  background-color: #025a68;
  border-color: #00c7fe;
}

.input-appealing::placeholder {
  font-style: italic;
  color: #050445;
}

.input-appealing:hover,
.input-appealing:focus {
  border-color: #025d60;
  box-shadow: 0 0 0 0.15rem rgba(0, 123, 255, 0.25);
}

.bold-label {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
