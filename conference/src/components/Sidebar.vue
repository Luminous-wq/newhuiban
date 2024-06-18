<template>
  <aside class="sidebar">
    <Menu :theme="theme" style="border-radius: 15px;margin-top: 10%;">
          <router-link to="/ ">
            <MenuItem name="1" style="font-size: 200%;color: #000;">
                <Icon type="md-document" style="color: blue;" />
                主页
            </MenuItem>
          </router-link>
          <router-link to="/home">
            <MenuItem name="2" style="font-size: 200%;color: #000;">
                <Icon type="md-chatbubbles" style="color: red;"/>
                会议
            </MenuItem>
          </router-link>
          <router-link to="/about">
            <MenuItem name="3" style="font-size: 200%;color: #000;">
                <Icon type="md-heart" style="color:blueviolet;"/>
                期刊
            </MenuItem>
          </router-link>
          <router-link to="/user">
            <MenuItem name="4" style="font-size: 200%;color: #000;">
                <Icon type="md-leaf" style="color: green;"/>
                用户
            </MenuItem>
          </router-link>
    </Menu>
  </aside>
</template>

<script lang="ts">
export default {
  name: 'Sidebar'
};
</script>

<style scoped>
.sidebar {
  background-color: #f0f0f0;
  padding: 1em;
  box-shadow: 1px 1px 1px 1px rgb(216, 97, 0);
}
nav ul {
  list-style-type: none;
  padding: 0;
}
nav li {
  margin-bottom: 1em;
}
</style>
