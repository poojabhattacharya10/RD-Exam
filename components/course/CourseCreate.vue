<template>
  <div>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Create Course</title>
      <link href="https://unpkg.com/@coreui/coreui@4.2.0/dist/css/coreui.min.css" rel="stylesheet">
    </head>

    <div class="c-container mt-4">
      <h2 class="text-center" style="color:seagreen;" >Course Details</h2>

      <div class="c-row justify-content-center">
        <div class="c-col-md-8">
          <div class="c-card p-4 shadow-lg">
            <div class="mb-3">
              <label for="courseCode" class="form-label">Course Code</label>
              <input type="text" id="courseCode" class="form-control" v-model="courseCode" placeholder="Enter Course Code">
            </div>

            <div class="mb-3">
              <label for="courseFullName" class="form-label">Course Full Name</label>
              <input type="text" id="courseFullName" class="form-control" v-model="courseFullName" placeholder="Enter Course Full Name">
            </div>

            <!-- <div class="mb-3">
              <label for="courseNickName" class="form-label">Course Nick Name</label>
              <input type="text" id="courseNickName" class="form-control" v-model="courseNickName" placeholder="Enter Course Nick Name">
            </div> -->

            <!-- <div class="mb-3">
              <label for="courseDuration" class="form-label">Course Duration</label>
              <input type="text" id="courseDuration" class="form-control" v-model="courseDuration" placeholder="Enter Course Duration">
            </div> -->

            <!-- <div class="mb-3">
              <label for="courseMode" class="form-label">Course Mode</label>
              <select id="courseMode" class="form-select" v-model="courseMode">
                <option value="Semester">Semester</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div> -->

            <div class="mb-3">
              <label for="affiliatedUniversity" class="form-label">Affiliated University</label>
              <input type="text" id="affiliatedUniversity" class="form-control" v-model="affiliatedUniversity" placeholder="Enter Affiliated University">
            </div>

            <div class="d-grid">
              <button class="c-btn c-btn-success c-btn-lg" @click="createCourse">Create Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';

export default {
  name: 'CourseCreate',
  data() {
    return {
      courseCode: '',
      courseFullName: '',
      // courseNickName: '',
      // courseDuration: '',
      // courseMode: '',
      affiliatedUniversity: ''
    }
  },
  methods: {
    async createCourse() {
      try {
        let data = {
          courseCode: this.courseCode,
          courseFullName: this.courseFullName,
          // courseNickName: this.courseNickName,
          // courseDuration: this.courseDuration,
          // courseMode: this.courseMode,
          affiliatedUniversity: this.affiliatedUniversity
        }
        let result = await axios.post('http://localhost:3001/course/create', data);
        if (result.data.success) {
          console.log(result , "result");
          router.push({ path: '/course/list' });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.c-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.1);
}

.c-card .form-label {
  font-weight: bold;
  color: #495057;
}

.c-card .form-control {
  border-radius: 0.5rem;
  box-shadow: inset 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.c-card .c-btn-success {
  background-color: #28a745;
  border-color: #28a745;
  font-size: 1.25rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s, border-color 0.3s;
}

.c-card .c-btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.c-card .form-select {
  border-radius: 0.5rem;
  box-shadow: inset 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
