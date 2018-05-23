<template>
  <div class="main">
    <headerBar text="注 册"></headerBar>
    <div class="center">
      <div  class="user">
        <div class="user-left">
          <img src="./img/user.png" alt="哦,图片丢失了" width="30" height="30" >
          <span>用户名</span>
        </div>
        <div class="user-right"><input type="text" class="btn" id="name" placeholder="请输入用户名"></div>
      </div>
      <div  class="user">
        <div class="user-left">
          <img src="./img/password-b.png" alt="哦,图片丢失了" width="30" height="30" id="password">
          <span>密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
        </div>
        <div class="user-right"><input type="password" class="btn" id="passwordA" placeholder="请输入6~12字母和数字组成的密码"></div>
      </div>
      <div  class="user">
        <div class="user-left">
          <img src="./img/phone.png" alt="哦,图片丢失了" width="30" height="30">
          <span>手机号</span>
        </div>
        <div class="user-right"><input type="text" class="btn" id="phone" placeholder="请输入电话号码"></div>
      </div>
      <div  class="user">
        <div class="user-left">
          <img src="./img/email.png" alt="哦,图片丢失了" width="30" height="30">
          <span>邮&nbsp;&nbsp;&nbsp;&nbsp;箱</span>
        </div>

        <div class="user-right"><input type="text" class="btn" id="email" placeholder="请输入邮箱"></div>
      </div>
      <div  class="user">
        <div class="user-left">
          <img src="./img/password-b.png" alt="哦,图片丢失了" width="30" height="30">
          <span>生&nbsp;&nbsp;&nbsp;&nbsp;日</span>
        </div>
        <div class="age">
          <input type="date" id="date">*
        </div>
      </div>

      <div  class="sex">
        <div class="sex-left">
          <input type="radio" name="radio1" id="sex-centent-1">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;男</span>
        </div>
        <div class="sex-right">
          <input type="radio" name="radio1" id="sex-centent-2" >
          <span>&nbsp;&nbsp;&nbsp;&nbsp;女</span>
        </div>
      </div>
      <div class="quit" @click="quit">
        确认注册
      </div>
  </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'//引入头部组件
  import axios from 'axios'
  var count;
  export default {
    data () {
      return {

      }
    },
    methods:{
        quit:function () {
          var nameval = document.getElementById("name").value;
          var emailval= document.getElementById('email').value;
          var phoneval = document.getElementById("phone").value;
          var passwordval = document.getElementById("passwordA").value;
          var date=document.getElementById('date').value;
          var sex1=document.getElementById('sex-centent-1');
          var sex2=document.getElementById('sex-centent-2');


          var repaword = /^[A-Za-z0-9]{6,16}$/;
          var rename = /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/;
          var reemail=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ ;
          var rephone = /^1[3|4|5|7|8]\d{9}$/;
          if(sex1.checked){
            count =1;
          }else if(sex2.checked){
            count =0;
          }
          if(!(rename.test(nameval))){
            alert("输入用户名格式不正确，请重新输入！");
          }else if(!(repaword.test(passwordval))){
            alert('密码必须由 6-16位字母、数字组成');
          }
          else if(!(rephone.test(phoneval))){
            alert("输入电话格式不正确，请重新输入！");
          }
          else if(!(reemail.test(emailval))){
            alert("邮箱格式输入错误，请重新输入！");
          }else if(!(sex1.checked) && !(sex2.checked)){
            alert('请选择性别');
          }else{
            axios.post('www.xiaorenwu.xyz:8080/rener/enroll',
              {
                userNickname: nameval,
                userPwd: passwordval,
                userTel: phoneval,
                userEmail: emailval,
                userSex: count
              }
            ).then(resp =>{
              let data = resp.data;
              if (data.status == 0){
                alert('不能重复注册');
              }else {
                this.$router.push({
                  path:'./login'
                })
              }
              console.log(resp);
            }).catch(err => {
              console.log(err)
            })
          }
        }
    },
    components:{
      headerBar
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .main{
    .center {
      padding: 40px 15px 0 15px;
      .user {
        border-radius: 10px;
        background-color: #f2f2f2;
        display: flex;
        height: 90px;
        align-items: center;
        justify-content: space-around;
        padding: 10px 10px;
        margin-bottom: 45px;
        font-weight: bold;
        .user-left {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 150px;
          img {
            opacity: 0.6;
          }
        }
        .user-right {
          input {
            width: 450px;
            height: 45px;
          }
        }
      }
      .age {
        width: 450px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        input {
          height: 45px;
          width: 450px;
          background-color: #fff;;
        }
      }
      .sex {
        display: flex;
        justify-content: space-around;
        margin-bottom: 15px;
        .sex-left {
          display: flex;
          align-items: center;
          font-weight: bold;
          img{
            opacity: 0.75;
          }
        }
        .sex-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
          img{
            opacity: 0.75;
          }
        }
      }
      .quit {
        background-color: $color-light-pink;
        height: 90px;
        border-radius: 10px;
        text-align: center;
        line-height: 90px;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
</style>
