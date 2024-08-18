<template>
  <base-dialog
    v-if="confirmDelete"
    title="Confirm delete "
    @close="cancelDelete"
  >
    <template #default>
      <p>Do you reallyyyy want to delete this student?</p>
    </template>
    <template #actions>
      <base-button clas @click="cancelDelete">Cancel</base-button>
      <base-button @click="confirmDeleteStudent">Okay</base-button>
    </template>
  </base-dialog>
  <section>
    <div>
      <h2>List Student</h2>
      <SearchStudent @search-student="handleSearch" />
      <p v-if="isLoading">LOADING...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="!isLoading && (!students || students.length === 0)">
        No Student found. Start add some
      </p>
      <ul v-else-if="!isLoading && students && students.length > 0">
        <li v-for="student in filteredStudents" :key="student.id">
          {{ student.name }} - {{ student.age }}
          <button class="btn" @click="toEditPage(student)">Edit</button>
          <button class="btn" @click="deleteStudent(student.id)">Delete</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import SearchStudent from './SearchStudent.vue';

export default {
  components: {
    SearchStudent,
  },
  data() {
    return {
      students: [],
      isLoading: false,
      searchQuery: "",
      confirmDelete: false,
      deletedStudentId: null,
      error: null,
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter((student) =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    loadStudents() {
      this.isLoading = true;
      this.error = null;
      fetch("https://vue-http-2c621-default-rtdb.firebaseio.com/students.json")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isLoading = false;
          const tempData = [];
          for (const id in data) {
            tempData.push({
              id: id,
              name: data[id].name,
              age: data[id].age,
            });
          }
          this.students = tempData;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = "Failed to fetch data - please try again later.";
        });
    },
    deleteStudent(studentId) {
      this.deletedStudentId = studentId;
      this.confirmDelete = true;
    },
    toEditPage(student) {
      this.$router.push({
        path: "/update-student/" + student.id,
      });
    },
    confirmDeleteStudent() {
      fetch(`https://vue-http-2c621-default-rtdb.firebaseio.com/students/${this.deletedStudentId}.json`, {
          method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          this.loadStudents();
        } else {
          throw new Error("Could not delete data!");
        }
      }).catch((error) => {
        console.log(error);
        this.error = error.message;
      }).finally(() => {
        this.confirmDelete = false;
      });
    },
    cancelDelete() {
      this.confirmDelete = false;
      this.deletedStudentId = null;
    },
  },
  mounted() {
    this.loadStudents();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.btn {
  display: inline-block;
  padding: 0.5em 1em;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

.btn:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
