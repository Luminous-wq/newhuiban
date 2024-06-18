<template>
  <div class="header">
    <Header />
  </div>
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="content">
      <router-view />
    </div>
    <!-- <Footer /> -->
</template>
  
  <script lang="ts">
  import Header from '../components/Header.vue';
  import Sidebar from '../components/Sidebar.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    name: 'MainLayout',
    components: {
      Header,
      Sidebar,
      Footer
    }
  };
  </script>
  
  <style>
  .main-layout {
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    display: flex;
    flex: 1;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.75);
  }

  .container {
  display: flex;
  height: 100%;
  padding-top: 60px; /* header的高度 */
  }

  .sidebar {
    position: fixed;
    top: 60px; /* header的高度 */
    bottom: 0;
    width: 20%;
    background-color: #2c3e50;
    color: white;
    padding: 0px;
    z-index: 5;
    margin-top: 1%;
  }
  .content {
    position: fixed;
    margin-left: 20%; /* sidebar的宽度 */
    width: calc(100% - 20%);
    overflow-y: auto;
    padding: 20px;
    background-color: #ecf0f1;
    height: calc(100vh - 10%); /* 减去header的高度 */
    margin-top: 5%;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 15%;
    background-color: #3eaf7c;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    margin-top: 0%;
  }
  </style>
  