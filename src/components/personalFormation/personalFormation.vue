<template>
  <div class="main">
    <headerBar text="个人信息"></headerBar>
    <div class="center">
      <div class="center-center">
        <div class="user">
          <div>头像</div>
          <div class="user-right">
            <img :src="photoUrl" alt="哦，图像丢失了" width="30" height="30" class="user-right-img" >
            <img src="./img/Right_arrow.png" alt="哦，不见了" width="25" height="25">
          </div>
        </div>
        <hr>

        <div class="user">
          <div>昵称</div>
          <div class="user-right">
           <span>{{data2.userNickname}}</span>
            <img src="./img/Right_arrow.png" alt="哦，不见了" width="25" height="25">
          </div>
        </div>
        <hr>

        <div class="user">
          <div>生日</div>
          <div class="user-right">
           <span>{{data2.userBirth}}</span>
            <img src="./img/Right_arrow.png" alt="哦，不见了" width="25" height="25">
          </div>
        </div>
        <hr>

        <div class="user" @click="toAddress">
          <div>收餐地址</div>
          <div class="user-right">
            <span>修改/添加</span>
            <img src="./img/Right_arrow.png" alt="哦，不见了" width="25" height="25">
          </div>
        </div>
        <hr>

        <div class="user">
          <div>修改电话</div>
          <div class="user-right">
            <span>{{data2.useTel}}</span>
            <img src="./img/Right_arrow.png" alt="哦，不见了" width="25" height="25">
          </div>
        </div>
        <hr>


      </div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'  //引入头部组件
  import axios from 'axios'
  export default {
    data () {

      return {
          photoUrl: [],
          data2 : []
      }
    },
    methods: {
        _initData: function () {
          axios.get('http://192.168.0.114:8080/rener/userHome/findUserById').then(resp =>{
            let data=resp.data.userHome;
            this.photoUrl = data.userPhoto;
            this.data2 = Object.assign({},data);
          }).catch(err => {
            console.log('出错了')
          })
        },
      toAddress:function () {
        path:{
          this.$router.push()
        }
      }
    },
  created () {
    // 初始化列表数据
    this._initData()
  },
    components:{
      headerBar
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .center{
    width: 100%;
    padding-top: 20px;
    hr{
      margin-bottom: 10px;
      background-color: #f8f4f4;
    }
    .center-center{
      .user{
        padding:10px 30px 10px 30px;
        font-size: $font-size-one;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-right{
          align-items: center;
          line-height: 80px;
          display: flex;
          span{
            color: #ccc;
          }
          .user-right-img{
              border-radius: 50%;
          }
        }
      }
    }

  }
</style>
