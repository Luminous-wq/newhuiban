<!--期刊-->
<script setup lang="ts">
  import $axios from 'axios';
  import axios from 'axios';
  import {reactive} from "vue";

  let uid=0;
  if(localStorage.getItem('userInfo')!=null){
    uid=JSON.parse((localStorage.getItem('userInfo'))).uid;
  }

  const url = reactive({
    u1:"www.baidu.com",
  });

  
  //let uid=5;

  //表格格式
  const columns = [
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
      className: 'journal_full_title',
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
      className: 'journal_browse_number',
      width: 100,
    },
    {
      title: "关注数量",
      key: "journal_focus_number",
      className: 'journal_focus_number',
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
      tmp:[{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null}],
    }
  });
  //响应式变量state
  const state = reactive({
    info: {
      columns:columns,
      data:[{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null}],
      modal1:false,
      modal2:false,
      modal3:false,
      txt:page.params.tmp[0].journal_cfp,
      txt2:page.params.tmp[0].journal_cfp,
      txt_ok:false,
    }
  });



  //新增期刊信息
  const params = reactive({
    huibanJournal:{journal_full_title:"",journal_brief_title:"",journal_ccf_level:'',journal_homepage_link:"",journal_impact_factor:0.0,journal_publishers:"",journal_issn:"",journal_browse_number:0,journal_focus_number:0,journal_cfp:""},
    huibanNews: {create_date: "2024.06.15",news_type:1,news_content: ''}
  });

  //更新期刊cfp
  const params2 = reactive({
    huibanJournal:{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null},
    huibanNews: {create_date: "2024.06.15",news_type:4,news_content: ''}
  });

  //首次获取数据，计算
  //let data=[{journal_id:1,journal_cfp:'A',journal_full_title:"AAA",journal_brief_title:"BBB"}];

  let res1= axios.get("http://58.198.177.29:8081/journal/findByPage?pageNow="+page.params.curPage+"&pageSize="+10+"&search="+"");
  res1.then(data => {
      state.info.data = data.data.data;
    }).catch(error => {
      console.log('Error:', error);
    });
  get_pagesize('');
  change_data('',1);

  //按名查找，返回结果条数并修改pageSize(页数)
  async function get_pagesize(name:any){
    let res = $axios.get("http://58.198.177.29:8081/journal/findTotals?search="+name);
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
    let res = axios.get("http://58.198.177.29:8081/journal/findByPage?pageNow="+page.params.curPage+"&pageSize="+10+"&search="+name);
    res.then(data => {
      state.info.data = data.data.data;
    }).catch(error => {
      console.log('Error:', error);
    });
  }

  //按会议ID添加浏览量（浏览量每次都增加，但浏览记录唯一），无返回
  async function add_browse(uid:any,row:any){
    axios.get("http://58.198.177.29:8081/journal/increase_browse_number?journal_id="+row.journal_id);
    page.params.tmp=row;
    url.u1=page.params.tmp.journal_homepage_link;
    state.info.modal1 = true;
  }

  async function open_modal(row:any){
    add_browse(uid,row);
  }

  //按用户ID、会议ID添加关注,若已关注则返回true未关注则添加记录并返回false
  async function add_focus(uid:any,journal_id:any){
    if(uid==0){window.location.replace("../login");}
    else{
      let res=axios.get("http://58.198.177.29:8081/huibanuserfocusjournal/insert?journal_id="+journal_id+"&user_id="+uid);
      res.then(data => {
        let tmp_data = data.data.data;
        if(tmp_data=="用户已关注期刊"){
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
    //     user_journal_focused: "AAA",
    //     user_journal_attended: "EEE",
    //     user_journal_focused: "BBB",
    //     user_journal_browsed: "CCC",
    //     user_journal_browsed: "DDD"
    //   },
    //   huibanNews: {
    //     create_date: "2024.06.15",
    //     news_type:2,
    //     news_content: "zcf/ECNU"
    //   }
    // };
    // axios.post("http://58.198.177.29:8081/huibanuser/insert",params);

  async function reload(){
    location.reload();
  }

  //新增期刊
  async function add_journal(){
    if(localStorage.getItem('userInfo')==null){
      window.location.replace("../login");
    }
    else{
      if(params.huibanJournal.journal_full_title!="" && params.huibanJournal.journal_homepage_link!=""){
      const now = new Date();
      let date=now.getFullYear()+"."+(now.getMonth() + 1)+"."+now.getDate();
      params.huibanNews.create_date=date;
      params.huibanNews.news_content=params.huibanJournal.journal_brief_title;
      let res=axios.post("http://58.198.177.29:8081/journal/insert",params);
      res.then(data => {
        let tmp_data = data.data.data;
          alert(tmp_data);
      }).catch(error => {
        console.log('Error:', error);
      });
      setTimeout(function() {location.reload();}, 2000);
    }
    else{
      alert("期刊全称和期刊链接必须填写！");
    }
  }
}

  async function handleClick(){
    window.location.href = url.u1;
  }

  async function update_journal_cfp(){
    if(localStorage.getItem('userInfo')==null){
    window.location.replace("../login");
    }
    else{
      const now = new Date();
      let date=now.getFullYear()+"."+(now.getMonth() + 1)+"."+now.getDate();
      params2.huibanNews.create_date=date;
      params2.huibanNews.news_content=page.params.tmp.journal_brief_title;
      params2.huibanJournal=page.params.tmp;
      params2.huibanJournal.journal_cfp=state.info.txt2;
      let res=axios.post("http://58.198.177.29:8081/journal/update",params2);
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
      <h2>期刊详情</h2>
    </div><br>
    <div class="line">
      <br>
      <Button @click="state.info.modal2=true" type="success" style="width: 20%;display: inline-block;margin-left: 2%;">新增期刊</Button>
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
        fullscreen title="增加期刊"
        @on-ok="state.info.modal2 = false;"
        @on-cancel="state.info.modal2 = false;">
        <Form :model="params.huibanJournal" :label-width="80">
          <FormItem label="期刊全称">
              <Input v-model="params.huibanJournal.journal_full_title" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="期刊简称">
              <Input v-model="params.huibanJournal.journal_brief_title" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="期刊等级">
              <Input v-model="params.huibanJournal.journal_ccf_level" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="期刊链接">
              <Input v-model="params.huibanJournal.journal_homepage_link" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="影响因子">
              <InputNumber precision="2"  v-model="params.huibanJournal.journal_impact_factor" placeholder="Enter something..."></InputNumber>
          </FormItem>
          <FormItem label="出版商">
              <Input v-model="params.huibanJournal.journal_publishers" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="ISSN">
              <Input v-model="params.huibanJournal.journal_issn" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="征稿消息">
              <Input v-model="params.huibanJournal.journal_cfp" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
        <Button type="success" long @click="add_journal()">增加期刊</Button>&nbsp;
    </Modal>


    <!-- 表格 -->
    <Table :columns="state.info.columns" :data="state.info.data" @on-cell-click="open_modal">
      <template #operation="{ row, index }">
          <!-- <div class="operation"> -->
            <!-- <Button type="info" @click="add_browse(uid,row)">查看详情</Button> -->
            <Modal
                ok-text="朕已阅"
                v-model="state.info.modal1"
                title="期刊详情"
                width="50%"
                @on-ok="state.info.modal1 = false;"
                @on-cancel="state.info.modal1 = false;">
                <div>
                  <h1>{{page.params.tmp.journal_brief_title}}:{{page.params.tmp.journal_full_title}}</h1>
                  <a @click="handleClick"><h2>{{page.params.tmp.journal_homepage_link}}</h2></a>
                  <h2>出版商：{{page.params.tmp.journal_publishers}}</h2>
                  <h2>ISSN： {{page.params.tmp.journal_issn}}</h2>
                  <h2>期刊信息：{{page.params.tmp.journal_cfp}}</h2>
                </div>
                <Button type="success" long @click="add_focus(uid,page.params.tmp.journal_id)">关注期刊</Button>&nbsp;
                <Button type="error" long @click="state.info.modal3=true">修改期刊信息</Button>
            </Modal>
   
            <Modal
                ok-text="确认修改"
                v-model="state.info.modal3"
                title="修改期刊信息"
                @on-ok="update_journal_cfp();"
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
.ivu-table td.journal_focus_number{
  color: #08f04e;
}
.ivu-table td.journal_browse_number{
  color: #f00808;
}
.ivu-table td.journal_full_title{
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