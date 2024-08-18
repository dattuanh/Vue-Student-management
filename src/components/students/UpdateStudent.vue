<template>
  <section>
    <h2>Update Student</h2>
    <form @submit.prevent="submitUpdate">
      <div class="form-control">
        <label for="name">Student Name</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model.trim="enteredName"
          placeholder="Name"
          required
        />
      </div>
      <div class="form-control">
        <label for="age">Student Age</label>
        <input
          type="number"
          id="age"
          name="age"
          v-model.trim="enteredAge"
          placeholder="Age"
          required
        />
      </div>
      <base-button>Update</base-button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      enteredName: "",
      enteredAge: "",
      error: null,
    };
  },
  computed: {
    studentId() {
      console.log(this.$route.params.id);
      return this.$route.params.id;
    },
  },
  methods: {
    submitUpdate() {
      this.error = null;
      fetch(
        `https://vue-http-2c621-default-rtdb.firebaseio.com/students/${this.studentId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.enteredName,
            age: this.enteredAge,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            alert("Student updated successfully!");
            this.$router.push("/students");
          } else {
            throw new Error("Could not update data!");
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.message;
        });
    },
  },
  created() {
    fetch(
      `https://vue-http-2c621-default-rtdb.firebaseio.com/students/${this.studentId}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.enteredName = data.name;
        this.enteredAge = data.age;
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        this.error = error.message;
      });
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.form-control {
  margin: 0.5rem 0;
}

input[type="text"],
input[type="number"] {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.15rem;
  border: 1px solid #ccc;
}
</style>
