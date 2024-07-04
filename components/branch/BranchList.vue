<template>
  <div class="c-container mt-4">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Branch List</title>
      <link href="https://unpkg.com/@coreui/coreui@4.2.0/dist/css/coreui.min.css" rel="stylesheet">
    </head>

    <div v-if="branchList.length">
      <div class="mb-4">
        <input type="text" class="form-control" placeholder="Enter branch to search..." v-model="listQuery.name" @input="getBranchList()">
      </div>
      <h1 class="mb-4">Branch List</h1>
      <table class="c-table c-table-striped c-table-hover">
        <thead class="c-table-dark">
          <tr>
            <th scope="col">Branch Code</th>
            <th scope="col">Branch Full Name</th>
            <!-- <th scope="col">Branch Nickname</th> -->
            <th scope="col">Course</th>
            <th scope="col" colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(branch, index) in branchList" :key="index">
            <td>{{ branch.branchCode }}</td>
            <td>{{branch.branchFullName }}</td>
            <!-- <td>{{branch.branchNickName }}</td> -->
            <td>{{branch.course.courseFullName }}</td>
            <td>
              <button class="c-btn c-btn-primary c-btn-sm" @click="openEditPage(branch._id)">Edit</button>
            </td>
            <td>
              <button class="c-btn c-btn-danger c-btn-sm" @click="deleteBranch(branch._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul class="c-pagination justify-content-center">
          <li v-for="n in nop" :key="n" class="c-page-item">
            <a class="c-page-link" href="#" @click.prevent="getData(n)">{{ n }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else>
      <div class="c-alert c-alert-warning" role="alert">
        No records found.
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  name: 'BranchList',
  data() {
    return {
      branchList: [],
      listQuery: {
        name: '',
        page: 1,
        limit: 2
      },
      nop: 1
    }
  },
  created() {
    this.getBranchList();
  },
  methods: {
    async getBranchList() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3001/branches',
          params: this.listQuery
        });
        console.log(response);
        this.branchList = response.data.data;
        this.nop = Math.ceil(response.data.totalCount / this.listQuery.limit)
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    },
    openEditPage(id) {
      router.push({ path: '/branch/edit/' + id })
    },
    async deleteBranch(id) {
      let result = await axios({
        method: 'delete',
        url: 'http://localhost:3001/branch/delete/' + id
      })
      if (result.data.success) {
        this.getBranchList();
      }
    },
    getData(n) {
      this.listQuery.page = n;
      this.getBranchList();
    }
  }
}
</script>

<style scoped>
.c-container {
  max-width: 900px;
}

.c-table {
  margin-bottom: 0;
}

.c-table th,
.c-table td {
  vertical-align: middle;
}

.c-page-link {
  cursor: pointer;
}

.c-alert {
  text-align: center;
}
</style>
