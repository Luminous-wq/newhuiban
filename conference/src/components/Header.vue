<script setup lang="ts">
    import $axios from 'axios';
    import axios from 'axios';
    import {reactive} from "vue";
    let uid=0;
    let uname='未登录用户';
    if(localStorage.getItem('userInfo')!=null){
        uid=JSON.parse((localStorage.getItem('userInfo'))).uid;
        uname=JSON.parse((localStorage.getItem('userInfo'))).uname;
    }

    async function log_out(){
        localStorage.removeItem('userInfo');
        location.reload();
    }

</script>

<template >
    <Row class="header">
        <Col span="12">
            <Icon type="md-pizza" size="48" style="display: inline;"/>
            <h1 style="display: inline;text-align: left;">会拌&copy; ECNU-5-514-B</h1>
        </Col>
        <Col span="12" style="text-align: right;">
            <a  @click="$router.push('/user');"><h2 style="display: inline;">{{uname}}</h2></a>&nbsp;
            <a  @click="log_out()"><h2 style="display: inline;">登出</h2></a>&nbsp;
        </Col>
    </Row>
</template>

<style scoped>
.header {
    background-color: #ffffec;
    color:rgb(216, 97, 0);
    padding: 1em;
    box-shadow: 1px 1px 1px 1px rgb(216, 97, 0);
}
</style>
  