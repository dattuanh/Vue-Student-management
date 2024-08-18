import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue';
import AddStudent from './components/students/AddStudent.vue';
import UpdateStudent from './components/students/UpdateStudent.vue';
import StudentList from './components/students/StudentList.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseDialog from './components/UI/BaseDialog.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/hello', component: HelloWorld },
    { path: '/students', component: StudentList },
    { path: '/add-student', component: AddStudent },
    { path: '/update-student', component: UpdateStudent },
    { path: '/update-student/:id', component: UpdateStudent },
  ],
  linkActiveClass: 'active'
});

const app = createApp(App)

app.use(router)
app.component('base-button', BaseButton)
app.component('base-dialog', BaseDialog)

app.mount('#app')
