<!--用户-->
<script setup lang="ts">
  import $axios from 'axios';
  import axios from 'axios';
  import {reactive} from "vue";
  let uid=0;
  if(localStorage.getItem('userInfo')!=null){
    uid=JSON.parse((localStorage.getItem('userInfo'))).uid;
  }
  else{
    window.location.replace("../#/login");
  }
  
  //let uid=5;

  //表格格式
  const columns = [
      {
        title: "CCF评级",
        key: "conference_ccf_level",
        width: 100,
      },
      {
        title: "会议简称",
        key: "conference_brief_title",
      },
      {
        title: "会议全称",
        key: "conference_full_title",
        width: 350,
      },

      {
        title: "截稿日期",
        key: "conference_closing_date",
      },
      {
        title: "会议日期",
        key: "conference_meeting_date",
      },
      {
        title: "会议地点",
        key: "conference_meeting_place",
      },
      {
        title: "届数",
        key: "conference_session_number",
      },
      {
        title: "浏览数量",
        key: "conference_browse_number",
        width: 100,
      },
      {
        title: "关注数量",
        key: "conference_focus_number",
        className: 'conference_focus_number',
        width: 100,
      },
      {
      title: "删除",
      slot: "operation",
    },
    ];

  const columns1 = [
    {
      title: "CCF评级",
      key: "journal_ccf_level",
      width: 100,
    },
    {
      title: "期刊简称",
      key: "journal_brief_title",
    },
    {
      title: "期刊全称",
      key: "journal_full_title",
      width: 400,
    },
    {
      title: "期刊出版商",
      key: "journal_publishers",
    },
    {
      title: "期刊ISSn",
      key: "journal_issn",
    },
    {
      title: "浏览数量",
      key: "journal_browse_number",
      width: 100,
    },
    {
      title: "关注数量",
      key: "journal_focus_number",
      className: 'journal_focus_number',
      width: 100,
    },
    {
    title: "删除",
    slot: "operation",
  },
  ];




  

  //响应式变量state
  const state = reactive({
    info: {
      udata:[{}],
    }
  });

  get_user_info();
  get_conference_focus();
  get_conference_attend();
  get_journal_focus();

  //响应式变量,会议关注
  const conference_focus = reactive({
    info: {
      columns:columns,
      data:[],
      modal1:false,
      id:1,
    }
  });

  //响应式变量,会议参加
  const conference_attend = reactive({
    info: {
      columns:columns,
      data:[],
      modal1:false,
      id:1,
    }
  });

  //响应式变量,会议关注
  const journal_focus = reactive({
    info: {
      columns:columns1,
      data:[],
      modal1:false,
      id:1,
    }
  });

  //按用户ID查找用户，返回所有信息
  async function get_user_info(){
    let res = axios.get("http://58.198.177.29:8081/huibanuser/findOne?user_id="+uid);
      res.then(data => {
        state.info.udata = data.data.data;
        console.log(state.info.udata);
      }).catch(error => {
        console.log('Error:', error);
      });
  }

  //按用户ID查找已关注的所有会议的所有信息（返回格式同1，但不分页因为懒）
  async function get_conference_focus(){
    let res = axios.get("http://58.198.177.29:8081/huibanuserfocusconference/findAllbyuser?user_id="+uid);
      res.then(data => {
        conference_focus.info.data = data.data.data;
      }).catch(error => {
        console.log('Error:', error);
      });
  }

  //按用户ID查找已关注的所有会议的所有信息（返回格式同1，但不分页因为懒）
  async function get_journal_focus(){
    let res = axios.get("http://58.198.177.29:8081/huibanuserfocusjournal/findAllbyuser?user_id="+uid);
      res.then(data => {
        journal_focus.info.data = data.data.data;
      }).catch(error => {
        console.log('Error:', error);
      });
  }


  //按用户ID查找参加的所有会议的所有信息（返回格式同1，只要最近10条）
  async function get_conference_attend(){
    let res = axios.get("http://58.198.177.29:8081/huibanuserattendconference/findAllbyuser?user_id="+uid);
      res.then(data => {
        conference_attend.info.data = data.data.data;
      }).catch(error => {
        console.log('Error:', error);
      });
  }


  //按用户ID、会议ID取消关注, 无返回（默认成功）
  async function del_conference_focus(conference_id:any){
    let res=axios.get("http://58.198.177.29:8081/huibanuserfocusconference/delete?conference_id="+conference_id+"&user_id="+uid);
    res.then(data => {
        alert(data.data.data);
      }).catch(error => {
        console.log('Error:', error);
      });
    conference_focus.info.modal1 = false;
    setTimeout(function() {location.reload();}, 1000);
  }

    //按用户ID、会议ID取消关注, 无返回（默认成功）
    async function del_journal_focus(journal_id:any){
    let res=axios.get("http://58.198.177.29:8081/huibanuserfocusjournal/delete?journal_id="+journal_id+"&user_id="+uid);
    res.then(data => {
        alert(data.data.data);
      }).catch(error => {
        console.log('Error:', error);
      });
    journal_focus.info.modal1 = false;
    setTimeout(function() {location.reload();}, 1000);
  }

  //按用户ID、会议ID取消参加, 无返回（默认成功）
  async function del_conference_attend(conference_id:any){
    let res=axios.get("http://58.198.177.29:8081/huibanuserattendconference/delete?conference_id="+conference_id+"&user_id="+uid);
    res.then(data => {
        alert(data.data.data);
      }).catch(error => {
        console.log('Error:', error);
      });
    conference_focus.info.modal1 = false;
    setTimeout(function() {location.reload();}, 1000);
  }

  

</script>

<template>
  <div class="home">
    <div class="title"><h2>基本信息</h2></div><br>
    <h3>用户名：{{state.info.udata.user_name}}</h3>
    <h3>注册机构：{{state.info.udata.user_department}}</h3>
    <h3>注册时间：{{state.info.udata.user_registration_date}}</h3>
    <br>


    <div class="title"><h2>关注的会议</h2></div><br>
    <Table :columns="conference_focus.info.columns" :data="conference_focus.info.data" >
      <template #operation="{ row, index }">
          <div class="operation">
            <Button type="error" @click="conference_focus.info.modal1 = true;conference_focus.info.id=row.conference_id">删除</Button>
            <Modal
                v-model="conference_focus.info.modal1"
                title="啊？真删？！"
                @on-ok="del_conference_focus(conference_focus.info.id)"
                @on-cancel="conference_focus.info.modal1 = false">
            </Modal>
          </div>
      </template>
    </Table><br>


    <div class="title"><h2>参加的会议</h2></div><br>
    <Table :columns="conference_attend.info.columns" :data="conference_attend.info.data" >
      <template #operation="{ row, index }">
          <div class="operation">
            <Button type="error" @click="conference_attend.info.modal1 = true;conference_focus.info.id=row.conference_id">删除</Button>
            <Modal
                v-model="conference_attend.info.modal1"
                title="啊？真删？！"
                @on-ok="del_conference_attend(conference_focus.info.id)"
                @on-cancel="conference_attend.info.modal1 = false">
            </Modal>
          </div>
      </template>
    </Table><br>

    <div class="title"><h2>关注的期刊</h2></div><br>
    <Table :columns="journal_focus.info.columns" :data="journal_focus.info.data" >
      <template #operation="{ row, index }">
          <div class="operation">
            <Button type="error" @click="journal_focus.info.modal1 = true;journal_focus.info.id=row.journal_id">删除</Button>
            <Modal
                v-model="journal_focus.info.modal1"
                title="啊？真删？！"
                @on-ok="del_journal_focus(journal_focus.info.id)"
                @on-cancel="journal_focus.info.modal1 = false">
            </Modal>
          </div>
      </template>
    </Table><br>


  </div>
</template>

<style>
.home {
    padding: 1em;
    width: 100%;
}
.title {
  background-color: rgb(252, 225, 225);
  border-radius: 15px;
  text-align: center;
}
</style>
