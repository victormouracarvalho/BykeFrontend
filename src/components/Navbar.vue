<template>
  <div class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
    <div class="flex items-center cursor cursor-pointer">
      <span class="text-green-500 text-xl mr-1">
        <i class="bi bi-messenger">
        </i>
      </span>

      <h1>Teste</h1>
    </div>


      <ul class="md-flex md:items-center">
        <li class="md:mx-4" v-for="link in Links">
          <a href="link.link" class="text-x1" > Home</a>
        </li>
        <li class="md:mx-4">
          <a href="#" class="text-x1" > Teste </a>
        </li>
      </ul>
  </div>
</template>


<script>
export default {
  setup(){
    let Links =[
      {name: "Home", link: "#"},

    ]
  }
};
</script>

<style lang="css" scoped></style>

