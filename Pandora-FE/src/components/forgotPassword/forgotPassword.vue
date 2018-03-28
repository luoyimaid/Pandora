<template>
  <div class="main">
  <headerBar text="重置密码"></headerBar>
    <div class="password">
      <div class="user-name">
        <img src="./img/user.png" alt="" width="30" height="30">
      </div>
      <div class="user-input">
        <input type="text" placeholder="请输入电话" id="phohea">
      </div>
    </div>
    <hr>

    <div class="password">
      <div class="user-name">
        <img src="./img/verification.png" alt="" width="30" height="30">
      </div>
      <div class="user-input">
        <input type="text" placeholder="请输入验证码" id="code">
        <div class="verification" @click.stop="ReturnFalse">
          <mt-button type="default" class="verification-center">点击获取验证码</mt-button>
        </div>
      </div>
    </div>
    <hr>

    <div class="password">
      <div class="user-name">
        <img src="./img/password.png" alt="" width="30" height="30">
      </div>
      <div class="user-input">
        <input type="password" placeholder="请输入新密码" id="password">
      </div>
    </div>
    <hr>

    <div class="footer">
      <mt-button type="default" class="footer-center" @click="logina">确&nbsp;&nbsp;&nbsp;&nbsp;定</mt-button>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'
  var count =true;
  var timer;
  var i=61;
  export default {
    data () {
      return {

      }
    },
    methods:{
      ReturnFalse: function() {
        var rephone = /^1[3|4|5|8][0-9]\d{4,8}$/;
        if(!(rephone.test(document.getElementById('phohea').value))){
          alert("电话输入不正确，请重新输入！");
        }
        else if(count) {
          count = !count;
          var timer = setInterval(function () {
            if (i > 0) {
              document.getElementsByClassName("verification-center")[0].innerHTML = --i + 's后重试';
            } else if (i == 0) {
              document.getElementsByClassName("verification-center")[0].innerHTML = '点击获取验证码';
              clearInterval(timer);
              count = !count;
              i = 61;
            }
          }, 1000)
        }
      },
      logina:function () {
        alert('111');
      }
    },
    components: {
      headerBar
    }
  }
</script>

<style lang="scss" scoped>
.main{
  .password{
    padding-left: 20px;
    padding-right: 20px;
    height: 110px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-name{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-input
    {
      width: 100%;
      align-items: center;
      display: flex;
      input{
        width: 100%;
        height: 80px;
        border: none;
      }
      .verification{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 30px;
        .verification-center{
          height: 60px;
          font-size: 26px;
        }
      }
    }
  }
  .footer{
    padding-top: 80px;
    .footer-center{
      width: 100%;
      height: 100px;
      font-weight: bold;
      font-size: 26px;
    }
  }
}
</style>
