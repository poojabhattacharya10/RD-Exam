<template>
  <div class="c-container mt-5">
    <div class="c-row justify-content-center">
      <div class="c-col-md-8">
        <div v-if="courseList.length > 0">
          <h1 class="text-center mb-3">Course List</h1>

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter branch to search..."
              v-model="listQuery.name"
              @input="getCourseList"
            />
            <button class="c-btn c-btn-primary" type="button" @click="getCourseList">Search</button>
          </div>

          <table class="c-table c-table-bordered c-table-hover">
            <thead class="c-table-dark">
              <tr>
                <th scope="col">Course Code</th>
                <th scope="col">Course Full Name</th>
                <!-- <th scope="col">Course Nick Name</th> -->
                <!-- <th scope="col">Course Duration</th> -->
                <!-- <th scope="col">Course Mode</th> -->
                <th scope="col">Affiliated University</th>
                <th scope="col" class="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(course, index) in courseList" :key="index">
                <td>{{ course.courseCode }}</td>
                <td>{{ course.courseFullName }}</td>
                <!-- <td>{{ course.courseNickName }}</td> -->
                <!-- <td>{{ course.courseDuration }}</td> -->
                <!-- <td>{{ course.courseMode }}</td> -->
                <td>{{ course.affiliatedUniversity }}</td>
                <td>
                  <div class="d-flex justify-content-between">
                    <button class="c-btn c-btn-success btn-sm" @click="openEditPage(course._id)">Edit</button>
                    <button class="c-btn c-btn-danger btn-sm" @click="deleteCourse(course._id)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h3 class="text-center text-muted">No records found.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';

export default {
  name: 'CourseList',
  data() {
    return {
      courseList: [],
      listQuery: {
        name: '',
      },
    };
  },
  created() {
    this.getCourseList();
  },
  methods: {
    async getCourseList() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3001/courses/list',
          params: this.listQuery,
        });
        console.log(response);
        this.courseList = response.data.data;
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    },
    openEditPage(id) {
      try {
        router.push({ path: '/course/edit/' + id });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCourse(id) {
      try {
        let result = await axios({
        method: 'delete',
        url: 'http://localhost:3001/course/delete/' + id,
      });
      if (result.data.success) {
        this.getCourseList();
        router.push({ path: '/course/list' });
      }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
/* Base styles for the table */
.c-table {
  width: 100%;
  border-collapse: collapse;
}

.c-table th,
.c-table td {
  padding: 0.75rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
}

.c-table th {
  font-weight: bold;
  text-align: left;
}

/* Striped rows for better readability */
.c-table-striped tbody tr:nth-of-type(odd) {
  background-color: #f8f9fa;
}
</style>
