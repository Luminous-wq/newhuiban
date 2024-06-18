<template>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App'
};
</script>

<style>
  html, body, #app {
    height: auto;
    width : auto;
    margin: 0;
    padding: 0;
  }
  .main-content{
    background-color:#f0f0f0;
  }
  .ivu-table{
    border-radius: 15px;
  }
</style>
