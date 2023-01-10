<template>
  <div class="container">
    <h3 class="p-3 text-center">List des Sorties</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>id</th>
        <th>DateSortie</th>
        <th>DistanceParcours</th>
        <th>HeureArrivee</th>
        <th>HeureDepart</th>
        <th>lieuDepart</th>
        <th>numUtil</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sortie in jsonObj" :key="sortie.id">
        <td>{{sortie.id}}</td>
        <td>{{sortie.dateSortie}}</td>
        <td>{{sortie.distanceParcourue}}</td>
        <td>{{sortie.heureArrivee}}</td>
        <td>{{sortie.heureDepart}}</td>
        <td>{{sortie.lieuDepart}}</td>
        <td>{{sortie.numUtil}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";



export default {
  async created() {
    const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNZXJsb3QiLCJleHAiOjE2NzMzOTgzMDUsImlhdCI6MTY3MzM3NjcwNX0.SYxfBN4Xjd0nXG8S4ajOkShouX8FuKv2clEi_Ufn8THC5HWSiRPKhZ9hTmIehfmobEA6xjtirTzuF5XHQih60A';
    const BASEURL = 'http://localhost:8080';
    const ENDPOINT = '/sorties';
    let jsonObj
    let res = await axios.create({
      baseURL: BASEURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+TOKEN
      }
    }).get(ENDPOINT)

    console.log(res)
    this.jsonObj = JSON.parse(res.request.response)
    console.log(jsonObj)
  },
  data() {
    return {
      jsonObj: null,
    };
  }
};
</script>