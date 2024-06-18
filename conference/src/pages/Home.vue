<!--会议-->
<script setup lang="ts">
  import $axios from 'axios';
  import axios from 'axios';
  import {reactive} from "vue";

  const url = reactive({
    u1:"www.baidu.com",
  });

  let uid=0;
  if(localStorage.getItem('userInfo')!=null){
    uid=JSON.parse((localStorage.getItem('userInfo'))).uid;
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
      className: 'conference_full_title',
      width: 400,
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
      className: 'conference_browse_number',
      width: 100,
    },
    {
      title: "关注数量",
      key: "conference_focus_number",
      className: 'conference_focus_number',
      width: 100,
    },
    {
    title: ".",
    slot: "operation",
    width: 10,
    },
  ];
  //响应式变量page
  const page = reactive({
    params: {
      curPage:1,
      pageSize:10,
      name:'',
      tmp:[{conference_id:1,conference_full_title:"International Conference on Architectural Support for Programming Languages and Operating Systems",conference_brief_title:"ASPLOS",conference_ccf_level:"A",conference_homepage_link:"https:/www.asplos-conference.org/asplos-2025-call-for-papers/",conference_closing_date:"2024-06-25",conference_notice_date:null,conference_meeting_date:"March-April, 2025",conference_meeting_place:"Netherland.",conference_session_number:2025,conference_browse_number:15,conference_focus_number:3,conference_attend_number:0,conference_cfp:null}],
    }
  });
  //响应式变量state
  const state = reactive({
    info: {
      columns:columns,
      data:[{conference_id:1,conference_full_title:"International Conference on Architectural Support for Programming Languages and Operating Systems",conference_brief_title:"ASPLOS",conference_ccf_level:"A",conference_homepage_link:"https:/www.asplos-conference.org/asplos-2025-call-for-papers/",conference_closing_date:"2024-06-25",conference_notice_date:null,conference_meeting_date:"March-April, 2025",conference_meeting_place:"Netherland.",conference_session_number:2025,conference_browse_number:15,conference_focus_number:3,conference_attend_number:0,conference_cfp:null}],
      modal1:false,
      modal2:false,
      modal3:false,
      txt:page.params.tmp[0].conference_cfp,
      txt2:page.params.tmp[0].conference_cfp,
      txt_ok:false,
    }
  });

  //新增会议信息
  const params = reactive({
    huibanConference:{conference_id:1,conference_full_title:"",conference_brief_title:"",conference_ccf_level:"",conference_homepage_link:"",conference_closing_date:"",conference_notice_date:null,conference_meeting_date:"",conference_meeting_place:"",conference_session_number:2025,conference_browse_number:0,conference_focus_number:0,conference_attend_number:0,conference_cfp:null},
    huibanNews: {create_date: "2024.06.15",news_type:0,news_content:""}
  });

  //更新会议信息
  const params2 = reactive({
    huibanConference:{conference_id:1,conference_full_title:"",conference_brief_title:"",conference_ccf_level:"",conference_homepage_link:"",conference_closing_date:"",conference_notice_date:null,conference_meeting_date:"",conference_meeting_place:"",conference_session_number:2025,conference_browse_number:0,conference_focus_number:0,conference_attend_number:0,conference_cfp:null},
    huibanNews: {create_date: "2024.06.15",news_type:3,news_content:""}
  });

  //首次获取数据，计算
  //let data=[{conference_id:1,conference_cfp:'A',conference_full_title:"AAA",conference_brief_title:"BBB"}];

  let res1= axios.get("http://58.198.177.29:8081/conference/findByPage?pageNow="+page.params.curPage+"&pageSize="+10+"&search="+"");
  res1.then(data => {
      state.info.data = data.data.data;
    }).catch(error => {
      console.log('Error:', error);
    });
  get_pagesize('');
  change_data('',1);

  //按名查找，返回结果条数并修改pageSize(页数)
  async function get_pagesize(name:any){
    let res = $axios.get("http://58.198.177.29:8081/conference/findTotals?search="+name);
    res.then(data => {
      //console.log('Success:', data);
      page.params.pageSize = data.data.data;
    }).catch(error => {
      console.log('Error:', error);
    });
  }

  //按名查找，请求10e-9到10e+1的数据
  async function change_data(name:any,event:any){
    get_pagesize(name);
    page.params.curPage=event;
    let res = axios.get("http://58.198.177.29:8081/conference/findByPage?pageNow="+page.params.curPage+"&pageSize="+10+"&search="+name);
    res.then(data => {
      state.info.data = data.data.data;
    }).catch(error => {
      console.log('Error:', error);
    });
  }

  //按会议ID添加浏览量（浏览量每次都增加，但浏览记录唯一），无返回
  async function add_browse(uid:any,row:any){
    axios.get("http://58.198.177.29:8081/conference/increase_browse_number?conference_id="+row.conference_id);
    page.params.tmp=row;
    url.u1=page.params.tmp.conference_homepage_link;
    state.info.modal1 = true;
  }

  async function open_modal(row:any){
    add_browse(uid,row);
  }

  //按用户ID、会议ID添加关注,若已关注则返回true未关注则添加记录并返回false
  async function add_focus(uid:any,conference_id:any){
    if(uid==0){window.location.replace("../login");}
    else{
      let res=axios.get("http://58.198.177.29:8081/huibanuserfocusconference/insert?conference_id="+conference_id+"&user_id="+uid);
      res.then(data => {
        let tmp_data = data.data.data;
        if(tmp_data=="用户已关注会议"){
          alert("无需重复关注!");
        }
        else{
          alert("关注成功!");
        }
      }).catch(error => {
        console.log('Error:', error);
      });
      state.info.modal1 = false;
      setTimeout(function() {location.reload();}, 2000);
    }
  }

    // let params = {
    //     user: {
    //     user_name: "zcf",
    //     user_email: "zcf@ecnu.com",
    //     user_password: "zcf123",
    //     user_department: "ECNU",
    //     user_registration_date: "2024.06.15",
    //     user_activeness: 100,
    //     user_conference_focused: "AAA",
    //     user_conference_attended: "EEE",
    //     user_journal_focused: "BBB",
    //     user_conference_browsed: "CCC",
    //     user_journal_browsed: "DDD"
    //   },
    //   huibanNews: {
    //     create_date: "2024.06.15",
    //     news_type:2,
    //     news_content: "zcf/ECNU"
    //   }
    // };
    // axios.post("http://58.198.177.29:8081/huibanuser/insert",params);


    //按用户ID、会议ID添加参与,若已关注则返回true未关注则添加记录并返回false
    async function add_attend(uid:any,conference_id:any){
      if(uid==0){window.location.replace("../login");}
      else{
        let res=axios.get("http://58.198.177.29:8081/huibanuserattendconference/insert?conference_id="+conference_id+"&user_id="+uid);
        res.then(data => {
          let tmp_data = data.data.data;
          if(tmp_data=="用户已参加会议"){
            alert("无需重复参加!");
          }
          else{
            alert("参加成功!");
          }
        }).catch(error => {
          console.log('Error:', error);
        });
        state.info.modal1 = false;
        setTimeout(function() {location.reload();}, 2000);
      }
  }

  async function reload(){
    location.reload();
  }
  
  //新增会议
  async function add_conference(){
  if(localStorage.getItem('userInfo')==null){
    window.location.replace("../login");
  }
  else{
    if(params.huibanConference.conference_full_title!="" && params.huibanConference.conference_homepage_link!=""){
      const now = new Date();
      let date=now.getFullYear()+"."+(now.getMonth() + 1)+"."+now.getDate();
      params.huibanNews.create_date=date;
      params.huibanNews.news_content=params.huibanConference.conference_brief_title;
      //params.conference={conference_id:1,conference_full_title:"1",conference_brief_title:"1",conference_ccf_level:"1",conference_homepage_link:"1",conference_closing_date:"1",conference_notice_date:null,conference_meeting_date:"1",conference_meeting_place:"1",conference_session_number:2025,conference_browse_number:0,conference_focus_number:0,conference_attend_number:0,conference_cfp:null};
      let res=axios.post("http://58.198.177.29:8081/conference/insert",params);
      res.then(data => {
        let tmp_data = data.data.data;
          alert(tmp_data);
      }).catch(error => {
        console.log('Error:', error);
      });
      setTimeout(function() {location.reload();}, 2000);
    }
    else{
      alert("会议全称和会议链接必须填写！");
    }
  }
  }

  //新增会议
  async function handleClick(){
    window.location.href = url.u1;
  }

  async function update_conference_cfp(){
    if(localStorage.getItem('userInfo')==null){
    window.location.replace("../login");
    }
    else{
      const now = new Date();
      let date=now.getFullYear()+"."+(now.getMonth() + 1)+"."+now.getDate();
      params2.huibanNews.create_date=date;
      params2.huibanNews.news_content=page.params.tmp.conference_brief_title;
      params2.huibanConference=page.params.tmp;
      params2.huibanConference.conference_cfp=state.info.txt2;
      let res=axios.post("http://58.198.177.29:8081/conference/update",params2);
      res.then(data => {
        let tmp_data = data.data.data;
          alert(tmp_data);
      }).catch(error => {
        console.log('Error:', error);
      });
    }
  }
</script>


<!-- 主页面 -->
<template>
   
  <div class="home">

    <div class="title">
      <h2>会议详情</h2>
    </div><br>

    <div class="line">

      <br>
      <Button @click="state.info.modal2=true" type="success"  style="width: 20%;display: inline-block;margin-left: 2%;">
        新增会议
      </Button>

      <!-- 搜索框 -->
      <Input
        style="width: 30%;display: inline-block;margin-left: 46%;"
        placeholder="请输入任何信息以搜索"
        class="search"
        @on-blur="change_data(page.params.name,1)"
        v-model="page.params.name"
      >
        <template #suffix>
          <Icon type="ios-search" />
        </template>
      </Input>
      <br><br>

    </div>


    <Modal
        ok-text="点错了"
        v-model="state.info.modal2"
        fullscreen title="增加会议"
        @on-ok="state.info.modal2 = false;"
        @on-cancel="state.info.modal2 = false;">
        <Form :model="params.huibanConference" :label-width="80">
          <FormItem label="会议全称">
            <Input v-model="params.huibanConference.conference_full_title" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="会议简称">
              <Input v-model="params.huibanConference.conference_brief_title" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="会议等级">
              <Input v-model="params.huibanConference.conference_ccf_level" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="会议链接">
              <Input v-model="params.huibanConference.conference_homepage_link" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="截稿日期">
              <Input v-model="params.huibanConference.conference_closing_date" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="通知日期">
              <Input v-model="params.huibanConference.conference_notice_date" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="会议日期">
              <Input v-model="params.huibanConference.conference_meeting_date" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="会议地点">
              <Input v-model="params.huibanConference.conference_meeting_place" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="会议届数">
              <Input v-model="params.huibanConference.conference_session_number" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="征稿消息">
              <Input v-model="params.huibanConference.conference_cfp" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
        <Button type="success" long @click="add_conference()">增加会议</Button>&nbsp;
    </Modal>

    <!-- 表格 -->
    <Table :columns="state.info.columns" :data="state.info.data" @on-cell-click="open_modal">
      <template #operation="{ row, index }">
          <!-- <div class="operation"> -->
            <!-- <Button type="info" @click="add_browse(uid,row)">查看详情</Button> -->
            <Modal
                ok-text="朕已阅"
                v-model="state.info.modal1"
                title="会议详情"
                width="50%"
                @on-ok="state.info.modal1 = false;"
                @on-cancel="state.info.modal1 = false;">
                <div>
                  <h1>{{page.params.tmp.conference_brief_title}}:{{page.params.tmp.conference_full_title}}</h1>
                  <a @click="handleClick">{{page.params.tmp.conference_homepage_link}}</a>
                  <h2>截稿日期：{{page.params.tmp.conference_closing_date}}</h2>
                  <h2>会议日期： {{page.params.tmp.conference_meeting_date}}</h2>
                  <h2>会议地点：{{page.params.tmp.conference_meeting_place}}</h2>
                  <h2>届数    ：{{page.params.tmp.conference_session_number}}</h2>
                  <h2>会议信息：{{page.params.tmp.conference_cfp}}</h2>
                </div>
                <Button type="success" long @click="add_focus(uid,page.params.tmp.conference_id)">关注会议</Button>&nbsp;
                <Button type="warning" long @click="add_attend(uid,page.params.tmp.conference_id)">参加会议</Button>&nbsp;
                <Button type="error" long @click="state.info.modal3=true">修改会议信息</Button>
            </Modal>
   
            <Modal
                ok-text="确认修改"
                v-model="state.info.modal3"
                title="修改会议信息"
                @on-ok="update_conference_cfp();"
                @on-cancel="state.info.modal3 = false;">
                <Input v-model="state.info.txt2" 
                      type="textarea" 
                      :autosize="{minRows: 2,maxRows: 10}" 
                      placeholder=""
                      />    
            </Modal>
          <!-- </div> -->
      </template>
    </Table>

    <!-- 翻页 -->
    <Page :total="page.params.pageSize"  @on-change='change_data(page.params.name,$event)'/>
  </div>

</template>


<style>
.home {
    padding: 1em;
    width: 100%;
}
.ivu-table td.conference_focus_number{
  color: #08f04e;
}
.ivu-table td.conference_browse_number{
  color:cornflowerblue;
}
.ivu-table td.conference_full_title{
  color: #f08f08;
}
.line {
  background-color: rgb(220, 220, 220);
  border-radius: 15px;
}
.title {
  background-color: rgb(252, 225, 225);
  border-radius: 15px;
  text-align: center;
}
</style>