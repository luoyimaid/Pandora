<template>
  <div class="main">
    <headerBar text="投 诉" class="top"></headerBar>
    <div class="centent">
        <div class="centent-top">
          <span>投诉原因</span>
          <div class="centent-top-right" @click="clicka">
            <span>查看之前的投诉内容</span>
            <img src="./img/Right-arrow.png" alt="哦，图片不见了" width="20" height="20">
          </div>
        </div>
      <div class="centent-txt">
        <div><textarea name="" id="" cols="30" rows="10"></textarea></div>
      </div>
      <div class="centent-photo">
        <span>添加图片(提供问题截图)</span>
      </div>
      <div class="centent-photo-add">
        <div><img src="./img/viods.png" alt="" width="50" height="50" @click="action">
          <mt-actionsheet :actions="actions" :visible.sync="sheetVisible"></mt-actionsheet>
        </div>
        <span>请上传照片...</span>
      </div>
      <div class="footer" @click="footera">提&nbsp;&nbsp;&nbsp;&nbsp;交</div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'
  export default {
    components:{
      headerBar
    },
    data () {
      return {

      }
    },
    methods:{
      clicka:function () {
        this.$router.push({
          path:'/personalCenter'
        })
      },
      footera:function () {
          alert('二期实现');
  }
    }
  }
</script>

<style lang="scss" scoped>
  .main{
    .top{
      position: fixed;
    }
    .centent{
      position: fixed;
      height: 100%;
      width: 100%;
      top: 70px;
      background-color: #f2f2f2;
      .centent-top{
        padding: 20px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          font-weight: bold;
        }
        .centent-top-right{
          display: flex;
          color: #969798;
          align-items: center;
          justify-content: space-around;
        }
      }
      .centent-txt{
        div{
          padding:0 20px;
          background-color: #ffffff;
          textarea{
            width: 100%;
            height: 300px;
          }
        }
      }
      .centent-photo{
        padding: 20px 0 20px 20px;
        span{
          padding-bottom: 20px;
          font-weight: bold;
        }
      }
      .centent-photo-add{
        display: flex;
        padding:50px 20px;
        background-color: #ffffff;
        div{
          border: 1px #000000 dashed;
          padding: 5px 10px 0 5px;
        }
      }
      .footer{
        position: fixed;
        bottom: 0;
        background-color: #ccc;
        text-align: center;
        line-height: 100px;
        height: 100px;
        width: 100%;
        font-size: 30px;

      }
    }
  }

</style>
