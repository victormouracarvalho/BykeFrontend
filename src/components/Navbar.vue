<template>
 <b-container>
   <b-navbar toggleable="lg" type="dark" variant="dark">
     <b-navbar-brand href="#">Navbar</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="#"> Link 1</b-nav-item>
      </b-navbar-nav>
   </b-navbar>
 </b-container>
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

