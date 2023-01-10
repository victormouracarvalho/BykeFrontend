<template>
  <div class="container">
    <h3 class="p-3 text-center">List des Sorties</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>DateSortie</th>
        <th>DistanceParcours</th>
        <th>HeureArrivee</th>
        <th>HeureDepart</th>
        <th>id</th>
        <th>lieuDepart</th>
        <th>numUtil</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.firstName}} {{user.lastName}}</td>
        <td>{{user.email}}</td>
        <td>{{user.role}}</td>
        <td>{{user.role}}</td>
        <td>{{user.role}}</td>
        <td>{{user.role}}</td>
        <td>{{user.role}}</td>
      </tr>

      <tr v-for="i in jsonObj" :key="i">
        <td>{{i.id}}</td>
        <td>{{i.DateSortie}}</td>
        <td>{{i.DistanceParcourue}}</td>
        <td>{{i.heureArrivee}}</td>
        <td>{{i.heureDepart}}</td>
        <td>{{i.lieuDepart}}</td>
        <td>{{i.numUtil}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNZXJsb3QiLCJleHAiOjE2NzMzNzQxNDIsImlhdCI6MTY3MzM1MjU0Mn0.k-x_Ztsm0pmHrAi13NSnkVw7w72W7AaLBRnA51BArlufmfEQgIe-k8ilG4TyaxsxKw0i3PsnDshv8z9rFD4jjA';
const BASEURL = 'http://localhost:8080';
const ENDPOINT = '/sorties';
let jsonObj
axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+TOKEN
  }
})
    .get(ENDPOINT)
    .then(res => {
      console.log(res)
      console.log(JSON.parse(res.request.response))
      jsonObj = JSON.parse(res.request.response)
      console.log(jsonObj)
    });


export default {

  data() {


    return {
      users: [
        { firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
        { firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
        { firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
        { firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'User' },
        { firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'User' }
      ],
      jsonObj
    };
  }
};
</script>