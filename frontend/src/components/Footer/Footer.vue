<template>
  <v-row class="mt-10">
    <v-col cols="12" class="d-flex justify-center">
      <div class="primary--text">
        {{ new Date().getFullYear() }} &copy; PostneStevilkeVUE - Made by
        <a href="https://flatlogic.com/">Flatlogic</a>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>
