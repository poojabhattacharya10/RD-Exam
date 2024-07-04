<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CoreUI Demo</title>
    <link href="https://unpkg.com/@coreui/coreui@4.2.0/dist/css/coreui.min.css" rel="stylesheet">
  </head>

  <div class="c-container bg-light">
    <div class="c-row justify-content-center mt-5">
      <div class="c-col-md-8">
        <div class="card border-primary bg-gradient-primary text-light">
          <div class="card-body">
            <div class="c-container">
              <div class="c-row justify-content-center">
                <div class="c-col-md-6">
                  <h4 class="text-center font-weight-bold mb-4">Create Your Branch Account</h4>
                  <div class="sub-box p-3 mb-4">
                    <div class="field my-3">
                      <label for="courseCode" class="form-label bold-label">Branch Code</label>
                      <input id="courseCode" type="text" class="form-control input-appealing" v-model="branchCode" placeholder="Enter branch Code">
                    </div>
                    <div class="field my-3">
                      <label for="courseFullName" class="form-label bold-label">Branch Full Name</label>
                      <input id="courseFullName" type="text" class="form-control input-appealing" v-model="branchFullName" placeholder="Enter branch full name">
                    </div>
                    <!-- <div class="field my-3">
                      <label for="courseNickName" class="form-label bold-label">Branch Nick Name</label>
                      <input id="courseNickName" type="text" class="form-control input-appealing" v-model="branchNickName" placeholder="Enter branch Nick name">
                    </div> -->
                    <div class="field my-3">
                      <label for="courseMode" class="form-label bold-label">Course</label>
                      <select id="courseMode" class="form-control input-appealing" v-model="course">
                        <option v-for="(course, index) in courses" :key="index" :value="course._id">{{ course.courseFullName }}</option>
                      </select>
                    </div> 
                    <button @click="createBranch()" class="btn btn-primary w-100">Create Branch</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  name: 'BranchCreate',
  data() {
    return {
      branchCode: '',
      branchFullName: '',
      // branchNickName: '',
      course: '',
      courses: []
    }
  },
  created() {
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
    async createBranch() {
      try {
        let data = {
          branchCode: this.branchCode,
          branchFullName: this.branchFullName,
          // branchNickName: this.branchNickName,
          course: this.course
        }
        let result = await axios({
          method: 'post',
          url: 'http://localhost:3001/branch/create',
          data: data
        })
        console.log(result, 'result')
        if (result.data.success) {
          router.push({ path: '/branch/list' })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
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
