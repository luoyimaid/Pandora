<template>
  <div class="main">
    <headerBar text="登 录"></headerBar>
    <div class="user">
      <img src="./img/portrait_mode.png" alt="哦，图片不见了" width="80" height="80">
    </div>
    <div class="centent">
      <div class="password">
        <div class="user-name">
          <img src="./img/user.png" alt="哦，不见了" width="30" height="30"><span>用户名</span>
        </div>
        <div class="user-input">
          <input type="text" placeholder="请输入用户名" id="puitCentent2" @click="toBlock1">
          <p id="puitCentent2-user">请输入正确的电话号!!!</p>
        </div>
      </div>
      <div class="password" id="password-2">
        <div class="user-name">
          <img src="./img/password-b.png" alt="哦，不见了" width="30" height="30"><span>密&nbsp;&nbsp;&nbsp;码</span>
        </div>
        <div class="user-input">
          <input type="password" placeholder="请输入密码" id="passworda" @click="toBlock2">
          <p id="puitCentent2-password">密码必须由 6-16位字母、数字组成</p>
        </div>
      </div>
      <div class="puit">
        <mt-button type="danger" class="puit-centent" @click="Toregistered">注&nbsp;&nbsp;册</mt-button>
        <mt-button type="danger" class="puit-centent" id="logina" @click="Tologin">登&nbsp;&nbsp;录</mt-button>
      </div>
      <div class="footer" @click="ToForgotPassword">
        忘记密码？
      </div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'//引入头部组件
  import axios from 'axios'
  var count=true;
  export default {
    data () {
      return {

      }
    },
    methods:{
      ToForgotPassword:function () {
        this.$router.push({
          path: '/forgotPassword'
        }
        )
      },
      Toregistered:function () {
        this.$router.push({
          path: '/registered'
        })
      },
      toBlock1:function () {
        let user_name = document.getElementById("puitCentent2-user");
        user_name.style.display = 'none';
      },
      toBlock2:function () {
        let user_password = document.getElementById("puitCentent2-password");
        user_password.style.display = 'none';
      },

      Tologin:function () {
        var rename = /^1[34578]\d{9}$/;
        var repassword = /^[A-Za-z0-9]{6,16}$/;
        if(!(rename.test(document.getElementById('puitCentent2').value))){
          var oBtn = document.getElementById('puitCentent2-user');
          oBtn.style.display = 'block';
          setTimeout(function(){
            var oBtn = document.getElementById('puitCentent2-user');
            oBtn.style.display = 'none';
          },5000)
        }
        else
          if(!(repassword.test(document.getElementById('passworda').value))){
            var opassword = document.getElementById('puitCentent2-password');
            opassword.style.display = 'block';
            setTimeout(function () {
              var oBtn = document.getElementById('puitCentent2-password');
              oBtn.style.display = 'none';
            },5000)
        }
        else if(!count){
         alert('密码错误')
        }else{

          let user_name = document.getElementById('puitCentent2').value;
           let user_password= document.getElementById('passworda').value;
//          let obj = {
//            tell : user_name,
//            pwd : user_password
//          };
//          console.log(obj);
//          alert(obja);
          axios.post('http://192.168.0.114:8080/rener/login',
            {
              tell : user_name,
              pwd : user_password
            }
          ).then(resp => {
            let data = resp.data;
            if(data.status == 0){
              alert('用户或密码不对')
            }else {
              this.$router.push({
                path: '/Lyindex'
              })
            }
            console.log(resp.data);
          }).catch(error => {
            console.log(error)
          })
        }
      },
    },
    components:{
      headerBar
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .user{
    width: 220px;
    height: 220px;
    margin: 80px auto;
    background-color: #ccc;
    line-height: 250px;
    text-align: center;
    padding: 20px;
    border-radius: 50%;
    img{
      position: relative;
      top: 8%;
    }
  }
  .centent{
    padding: 0 20px;
    #password-2{
      margin-bottom: 90px;
    }
    .password{
      height: 130px;
      width: 100%;
      background-color: #ccc;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 60px;
      .user-name{
        display: flex;
        align-items: center;
        width: 150px;
        justify-content: space-around;
        span{
          font-weight: bold;
        }
      }
      .user-input{
        position: relative;
        input{
          width:400px;
          height: 55px;
        }
        #puitCentent2-user{
          color: red;
          position: absolute;
          display: none;
        }
        #puitCentent2-password{
          position: absolute;
          color: red;
          display: none;
        }
      }

    }
    .puit{
      display: flex;
      justify-content: space-between;
      .puit-centent{
        background-color: $color-dark-pink;
        border-radius: 10px;
        width: 320px;
        text-align: center;
        height: 110px;
        color: black;
        font-size: 24px;
        line-height: 80px;
        font-weight: bold;
      }
      .puit-centent:nth-of-type(2){
        background-color: #f2f2f2;
      }
    }
    .footer{
      height: 80px;
      text-align: right;
      padding-right: 30px;
      line-height: 80px;
      color: #6257fb;
    }
  }
</style>
