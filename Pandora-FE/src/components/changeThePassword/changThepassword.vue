<template>
  <div class="main">
    <headerBar text="找回密码"></headerBar>
    <div class="main-top">
      <div class="center">
        <div class="center-centent"><img src="./img/user.png" width="20" height="20" alt=""><span>用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户:</span><input type="text" id="user" placeholder="请输入用户名"></div>
      </div>

      <div class="center">
        <div class="center-centent"><img src="./img/reset_password.png" width="20" height="20" alt=""><span>原&nbsp;&nbsp;密&nbsp;&nbsp;码:</span><input type="text" id="password" placeholder="请输入用户名"></div>
      </div>

      <div class="center">
        <div class="center-centent"><img src="./img/key.png" width="20" height="20" alt=""><span>新&nbsp;&nbsp;密&nbsp;&nbsp;码:</span><input type="text" id="newPassWord" placeholder="请输入6~12位新密码"></div>
      </div>

      <div class="center">
        <div class="center-centent"><img src="./img/pass.png" width="20" height="20" alt=""><span>确认密码:</span><input type="text" id="newPassWord-2" placeholder="请确认新密码"></div>
      </div>
    </div>
    <div class="footer">
        <mt-button type="danger" class="footer-btn" @click="Determine">确&nbsp;&nbsp;&nbsp;&nbsp;定</mt-button>
        <mt-button type="danger" class="footer-btn">取&nbsp;&nbsp;&nbsp;&nbsp;消</mt-button>
    </div>

  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'
  var count= true;
  export default {
    components:{
      headerBar
    },
    data () {
      return {

      }
    },
    methods:{
      Determine:function () {
        var rename = /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/;
        if(!(rename.test(document.getElementById('user').value))){
          alert('姓名不能为空或者格式不正确')
        }
        else if(!count) {
          alert('密码错误');
        }else if(!(5<document.getElementById('newPassWord').value.length &&document.getElementById('newPassWord').value.length<13)){
          alert('新密码不能为空或者格式不正确');
        }else if(document.getElementById('newPassWord').value !=document.getElementById('newPassWord-2').value){
          alert('两次输入密码不一样');
        }else{
          alert('好的,修改成功');
        };
      }
    }

  }
</script>

<style lang="scss" scoped>
  .main {
    .main-top {
      .center {
        padding: 30px 20px 0;
        height: 80px;
        .center-centent {
          margin-bottom: 30px;
          display: flex;
          line-height: 80px;
          justify-content: center;
          align-items: center;
          span{
            height: 70px;
            font-size: 30px;
            line-height: 80px;
          }
          input{
            height: 70px;
            padding-left: 20px;
            width: 500px;
            font-size: 26px;
            border: none;
            border-bottom: 1px #000000 solid;
          }
        }
      }
    }
    .footer{
      display: flex;
      padding:80px 0px;
      justify-content: space-around;
      .footer-btn{
        height: 100px;
        width: 200px;
        font-size: 26px;
        background-color: #949292;
      }
    }
  }
</style>
