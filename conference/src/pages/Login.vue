<template>
    <div class="demo-login">
        <Icon type="md-pizza" size="48" style="display: inline;"/>
        <h1 style="display: inline;text-align: center;">会拌&copy; ECNU-5-514-B</h1><br><br><br><br>
        <Login @on-submit="handleSubmit">
            <Email name="username" />
            <Password name="password" />
            <div class="demo-auto-login">
                <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
                <a @click="this.$router.push('/regist');">注册</a>
            </div>
            <Submit />
        </Login>
    </div>
</template>
<script>
    import $axios from 'axios';
    import axios from 'axios';
    import {reactive} from "vue";
    const state = reactive({
        uid:0,
        uname:'',
    });
    export default {
        methods: {
            handleSubmit (valid, { username, password }) {
                if (valid) {
                    let res = axios.get("http://58.198.177.29:8081/huibanuser/login?user_email="+username+"&user_password="+password);
                    res.then(data => {
                        let tmp_data = data.data.data;
                        if(tmp_data=="登录失败"){
                            alert("邮箱或密码错误!");
                        }
                        else{
                            alert("登录成功!");
                            localStorage.setItem('userInfo', JSON.stringify({uid:tmp_data.user_id,uname:tmp_data.user_name}));
                            this.$router.push('/');
                        }
                    }).catch(error => {
                        console.log('Error:', error);
                    });
                }
            }
        },
    }
</script>
<style>
    .demo-login{
        width: 50%;
        height: 40%;
        margin-top: 10%;
        margin-left: 25%;
        scale: 1;
    }
    .demo-auto-login{
        margin-bottom: 24px;
        text-align: left;
    }
    .demo-auto-login a{
        float: right;
    }
</style>
