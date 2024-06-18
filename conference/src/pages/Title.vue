<!--主页-->
<script setup lang="ts" >
    import $axios from 'axios';
    import axios from 'axios';
    import {reactive} from "vue";

    const url = reactive({
    u1:"www.baidu.com",
  });

    //会议Top5
    const columns1 = [
    {
        type: 'index',
        width: 60,
    },
    {
      title: "会议简称",
      key: "conference_brief_title",
    },
    {
      title: "浏览数量",
      key: "conference_browse_number",
    },
    ];

    //期刊Top5
    const columns2 = [
    {
        type: 'index',
        width: 60,
    },
    {
      title: "期刊简称",
      key: "journal_brief_title",
    },
    {
      title: "浏览数量",
      key: "journal_browse_number",
    },
    ];


    const columns3 = [
    {
      type: 'index',
      width: 60,
    },
    {
      title: "日期",
      key: "create_date",
    },
    {
      title: "类型",
      key: "news_type",
      render: (h:any, params:any) => {
        let name='';
        let color='';
        if(params.row.news_type==0){
            name="新增会议";
            color='blue';
        }
        else if(params.row.news_type==1){
            name="新增期刊";
            color='green';
        }
        else if(params.row.news_type==2){
            name="新增用户";
            color='blueviolet';
        }
        else if(params.row.news_type==3){
            name="更新会议";
            color='coral';
        }
        else if(params.row.news_type==4){
            name="更新期刊";
            color='red';
        }
        return h('span',{style:{color:color}}, name);
    }
    },
    {
      title: "内容",
      key: "news_content",
    },
    ];

    const DD = reactive({
        D1:0,
        D2:0,
        D3:0,
        D4:0,
    })

    const state1 = reactive({
        info: {
            columns:columns1,
            data:[{conference_id:1,conference_full_title:"International Conference on Architectural Support for Programming Languages and Operating Systems",conference_brief_title:"ASPLOS",conference_ccf_level:"A",conference_homepage_link:"https:/www.asplos-conference.org/asplos-2025-call-for-papers/",conference_closing_date:"2024-06-25",conference_notice_date:null,conference_meeting_date:"March-April, 2025",conference_meeting_place:"Netherland.",conference_session_number:2025,conference_browse_number:15,conference_focus_number:3,conference_attend_number:0,conference_cfp:null},{conference_id:1,conference_full_title:"International Conference on Architectural Support for Programming Languages and Operating Systems",conference_brief_title:"ASPLOS",conference_ccf_level:"A",conference_homepage_link:"https:/www.asplos-conference.org/asplos-2025-call-for-papers/",conference_closing_date:"2024-06-25",conference_notice_date:null,conference_meeting_date:"March-April, 2025",conference_meeting_place:"Netherland.",conference_session_number:2025,conference_browse_number:15,conference_focus_number:3,conference_attend_number:0,conference_cfp:null},{conference_id:1,conference_full_title:"International Conference on Architectural Support for Programming Languages and Operating Systems",conference_brief_title:"ASPLOS",conference_ccf_level:"A",conference_homepage_link:"https:/www.asplos-conference.org/asplos-2025-call-for-papers/",conference_closing_date:"2024-06-25",conference_notice_date:null,conference_meeting_date:"March-April, 2025",conference_meeting_place:"Netherland.",conference_session_number:2025,conference_browse_number:15,conference_focus_number:3,conference_attend_number:0,conference_cfp:null},{conference_id:1,conference_full_title:"International Conference on Architectural Support for Programming Languages and Operating Systems",conference_brief_title:"ASPLOS",conference_ccf_level:"A",conference_homepage_link:"https:/www.asplos-conference.org/asplos-2025-call-for-papers/",conference_closing_date:"2024-06-25",conference_notice_date:null,conference_meeting_date:"March-April, 2025",conference_meeting_place:"Netherland.",conference_session_number:2025,conference_browse_number:15,conference_focus_number:3,conference_attend_number:0,conference_cfp:null},{conference_id:1,conference_full_title:"International Conference on Architectural Support for Programming Languages and Operating Systems",conference_brief_title:"ASPLOS",conference_ccf_level:"A",conference_homepage_link:"https:/www.asplos-conference.org/asplos-2025-call-for-papers/",conference_closing_date:"2024-06-25",conference_notice_date:null,conference_meeting_date:"March-April, 2025",conference_meeting_place:"Netherland.",conference_session_number:2025,conference_browse_number:15,conference_focus_number:3,conference_attend_number:0,conference_cfp:null}],
        }
    });

    const state2 = reactive({
        info: {
            columns:columns2,
            data:[{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null},{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null},{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null},{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null},{journal_id:1,journal_full_title:"International journal on Architectural Support for Programming Languages and Operating Systems",journal_brief_title:"ASPLOS",journal_ccf_level:"A",journal_homepage_link:"https:/www.asplos-journal.org/asplos-2025-call-for-papers/",journal_closing_date:"2024-06-25",journal_notice_date:null,journal_meeting_date:"March-April, 2025",journal_meeting_place:"Netherland.",journal_session_number:2025,journal_browse_number:15,journal_focus_number:3,journal_attend_number:0,journal_cfp:null}],
        }
    });

    const state3 = reactive({
        info: {
            columns:columns3,
            data:[{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"},{create_date:"1.1.1",news_type:1,news_content:"111"}],
        }
    });

    get_new_10();
    get_journal_5();
    get_conference_5();
    get_DD();
    
    async function get_new_10(){
        let res1= axios.get("http://58.198.177.29:8081/huibannews/findLast10");
        res1.then(data => {
            state3.info.data = data.data.data;
        }).catch(error => {
            console.log('Error:', error);
        });
    }

    async function get_conference_5(){
        let res1= axios.get("http://58.198.177.29:8081/conference/findBrowseTop5");
        res1.then(data => {
            state1.info.data = data.data.data;
        }).catch(error => {
            console.log('Error:', error);
        });
    }

    async function get_journal_5(){
        let res1= axios.get("http://58.198.177.29:8081/journal/findBrowseTop5");
        res1.then(data => {
            state2.info.data = data.data.data;
        }).catch(error => {
            console.log('Error:', error);
        });
    }

    async function get_DD(){
        let res1= axios.get("http://58.198.177.29:8081/conference/getTotals");
        res1.then(data => {
            DD.D1 = data.data.data;
        }).catch(error => {
            console.log('Error:', error);
        });
        let res2= axios.get("http://58.198.177.29:8081/journal/getTotals");
        res2.then(data => {
            DD.D2 = data.data.data;
        }).catch(error => {
            console.log('Error:', error);
        });
        let res3= axios.get("http://58.198.177.29:8081/huibanuser/getTotals");
        res3.then(data => {
            DD.D3 = data.data.data;
        }).catch(error => {
            console.log('Error:', error);
        });
        let res4= axios.get("http://58.198.177.29:8081/huibanbrowse/getTotals");
        res4.then(data => {
            DD.D4 = data.data.data;
        }).catch(error => {
            console.log('Error:', error);
        });
    }

    async function handleClick(){
        window.location.href = url.u1;
    }
</script>


<!-- 主页面 -->
<template>
  <div id="app" class="home">
    <Grid :col="4">
        <br><div class="title"><h2>数据统计</h2></div>
        <GridItem >
          <Grid :col="2">
              <GridItem style="background-color: white;">
                <Icon type="md-calendar"  size="48" style="display: inline;color: blue;"/>
              </GridItem>
              <GridItem style="background-color: white;">
                <h3>会议：</h3>
                <h3 style="color: blue;">{{DD.D1}}</h3>
              </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid :col="2">
              <GridItem style="background-color: white;">
                <Icon type="md-book" size="48" style="display: inline;color: red;"/>
              </GridItem>
              <GridItem style="background-color: white;">
                <h3>期刊：</h3>
                <h3 style="color: red;">{{DD.D2}}</h3>
              </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid :col="2">
              <GridItem style="background-color: white;">
                <Icon type="md-person" size="48" style="display: inline;color:blueviolet"/>
              </GridItem>
              <GridItem style="background-color: white;">
                <h3>用户：</h3>
                <h3 style="color: blueviolet;">{{DD.D3}}</h3>
              </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid :col="2">
              <GridItem style="background-color: white;">
                <Icon type="md-add-circle" size="48" style="display: inline;color: green"/>
              </GridItem>
              <GridItem style="background-color: white;">
                <h3>浏览：</h3>
                <h3 style="color: green;">{{DD.D4}}</h3>
              </GridItem>
          </Grid>
        </GridItem>
    </Grid>
    <Grid :col="2" style="height: 124px;">
        <GridItem>
            <div class="title"><h2>最近更新</h2></div><br>
            
            <Table :columns="state3.info.columns" :data="state3.info.data" >
            </Table>
        </GridItem>
        <GridItem>
            <div class="title"><h2>会议Top5浏览</h2></div><br>
            <Table :columns="state1.info.columns" :data="state1.info.data" >
            </Table>
        </GridItem>
        <GridItem>
            <div class="title"> <h2>期刊Top5浏览</h2></div><br>
            <Table :columns="state2.info.columns" :data="state2.info.data" >
            </Table>

        </GridItem>
    </Grid>
  </div>
</template>


<style>
.home {
    padding: 1em;
    width: 100%;
}
.main-content {
    flex-grow: 1;
    padding: 20px;
}

.card {
    background: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card h2 {
    margin-top: 0;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.table th {
    background-color: #f4f4f4;
}

.badge {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
}

.badge-update {
    background-color: #ff6b6b;
}

.badge-new {
    background-color: #ff9f43;
}

.badge-journal {
    background-color: #1dd1a1;
}

.demo-split{
    height: 200px;
    border: 1px solid #dcdee2;
}
.demo-split-pane{
    padding: 10px;
}
.title {
  background-color: rgb(252, 225, 225);
  border-radius: 15px;
  text-align: center;
}
</style>