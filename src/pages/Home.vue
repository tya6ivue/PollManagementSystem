<template>
  <div>
    
  <b-navbar toggleable="lg" type="dark" variant="info">
       <b-navbar-nav class="ml-7">

    <b-button class="mr-sm-2"  :to="{path: '/Login'}">Login page</b-button>
       </b-navbar-nav>
        <b-navbar-nav class="mr-auto">
    <b-button  :to="{path: '/CreateAccount'}">Sign up page</b-button>

        </b-navbar-nav>
  </b-navbar>
  </div>
</template>

<script>
export default {
    name:"Home",
      methods: {
      
      }
}
</script>

<style>

</style>>