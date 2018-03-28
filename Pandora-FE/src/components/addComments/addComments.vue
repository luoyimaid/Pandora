<template>
  <div class="main">
    <headerBar text="添加评论"></headerBar>
    <div class="center">
      <div class="center-center" id="f4" @click="changeColor(0)">
        <p>差</p>
        <img src="./img/差.png" alt="哦，不见了" width="38" height="38">
      </div>

      <div class="center-center" @click="changeColor(1)">
        <p>一般</p>
        <img src="./img/一般.png" alt="哦，不见了" width="38" height="38">
      </div>

      <div class="center-center" @click="changeColor(2)">
        <p>还不错</p>
        <img src="./img/hhh.png" alt="哦，不见了" width="38" height="38">
      </div>

      <div class="center-center" @click="changeColor(3)">
        <p>很满意</p>
        <img src="./img/好不错.png" alt="哦，不见了" width="38" height="38">
      </div>

      <div class="center-center" @click="changeColor(4)">
        <p>强烈推荐</p>
        <img src="./img/推荐.png" alt="哦，不见了" width="38" height="38">
      </div>
    </div>
    <div class="center-box"></div>
    <div class="address">
      <span>位置好</span>
      <span>服务好</span>
      <span>味道不错</span>
      <span>卫生好</span>
    </div>
    <div class="btn">
      <div class="btn-center">
        <textarea name="" id=""cols="30" rows="10" style="boeder: none"  placeholder="吃完你感觉怎么样？快来说说早餐店环境、服务、味道、和其他的问题吧！！！"></textarea>
      </div>
    </div>
    <div class="center-box"></div>
    <div class="upload">
      <div class="photo-viods" @click="changeBlock">
        <div class="photo-viods-center">
          <img src="./img/photo.png" alt="哦。照片不见了" width="50" height="50" >
          <span>上传图片</span>
        </div>
      </div>

      <div class="photo-viods" @click="changeViods">
        <div class="photo-viods-center">
          <img src="./img/video.png" alt="哦。照片不见了" width="50" height="50" >
          <span>上传视频</span>
        </div>
      </div>
    </div>
    <div><p class="upload-footer">三张图有机会获得<span>100</span>积分</p></div>
    <div class="center-box"></div>
    <div class="breakfast-type">
      <p>早餐类型</p>
      <div class="breakfast-type-center">
        <span class="breakfast-type-center-c" @click="addColor(0)">包子</span>
        <span class="breakfast-type-center-c" @click="addColor(1)">豆浆</span>
        <span class="breakfast-type-center-c" @click="addColor(2)">稀饭</span>
        <span class="breakfast-type-center-c" @click="addColor(3)">面包</span>
        <span class="breakfast-type-center-c" @click="addColor(4)">凉皮</span>
      </div>
    </div>
    <div class="center-box"></div>
    <div class="footer-center">
      <div class="footer-center-left">
        <input type="checkbox">
        <p>匿名评论</p>
      </div>
    </div>
    <div class="footer-f">
      <div class="footer">
        <span class="footer-c" @click="alertA">发&nbsp;&nbsp;&nbsp;&nbsp;表</span>
        <span class="footer-c" @click="alertB">取&nbsp;&nbsp;&nbsp;&nbsp;消</span>
      </div>
    </div>
    <footer class="footer-fix">
      <div class="btn" @click="photoLeftFooter">拍照</div>
      <hr>
      <div class="btn" @click="photoAlum">从相册中选择</div>
      <hr>
      <div class="btn" @click="backA">--返回上一级--</div>
    </footer>

    <footer class="footer-fix1">
      <div class="btn" @click="photoLeftFooter">打开相机</div>
      <hr>
      <div class="btn" @click="backA">--返回上一级--</div>
    </footer>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'  //引入头部组件
  var count =true;
  export default {
    components: {
      headerBar
    },
    data() {
      return {}

    },
    methods: {
      changeColor: function (i) {
        $('.center-center').css('background-color', '#ffffff').eq(i).css('background-color', '#f2f2f2');
      },
      changeBlock:function (){
        if(count) {
          $('.footer-fix').css('bottom', '0px');
          count =!count;
        }else{
          $('.footer-fix').css('bottom', '-300px');
          count =!count;

        }
        },
      changeViods:function (){
        if(count) {
          $('.footer-fix1').css('bottom', '0px');
          count =!count;
        }else{
          $('.footer-fix1').css('bottom', '-200px');
          count =!count;

        }
      },
      addColor:function (i) {
        if(count){
          $('.breakfast-type-center-c').eq(i).css({'background-color':'#a3a3a3'});
          count =!count;
        }
        else{
          $('.breakfast-type-center-c').eq(i).css({'backgroundColor':'#ffffff'});
          count =!count;
        }
      },
      alertA:function(){
        alert('111');
      },
      alertB:function(){
        alert('222');
      },
      photoLeftFooter:function(){
        alert('555');
      },
      photoAlum:function(){
        alert('444');
      },
      backA:function(){
        alert('333');
  }

    }
  }
</script>
<style lang="scss" scoped>
  .main{
    font-size: 32px;
    position: relative;
    .center-box{
      height: 10px;
      width: 100%;
      border-bottom: 1px #b5b3b3 solid;
      background-color: #ccc;

    }
    .center{
      display: flex;
      justify-content: space-between;
      div:nth-of-type(5){
        border: none;
      }
      .center-center{
        width: 150px;
        border-right:1px #f2f2f2 solid;
        height: 120px;
        text-align: center;
        display: flex;
        padding: 20px 0;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;


      }
    }
    .address{
      padding-left: 20px;
      padding-top: 20px;
      margin-bottom: 20px;
      color: #6d6f71;
      span{
        border: 1px #ccc solid;
        padding: 10px 20px;
        border-radius: 15px;
      }
    }
    .btn{
      padding: 0 20px;
      font-size: 26px;
      .btn-center{
        textarea{
          width: 100%;
          height: 150px;
          p{
            padding-left: 20px;
          }
        }
      }
    }
    .upload{
      display: flex;
      .photo-viods{
        padding: 35px 0 0 30px;
        .photo-viods-center{
          width: 200px;
          height: 200px;
          background-color: #ccc;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          border: 1px #000000 dashed;
        }
      }
    }
    .upload-footer{
      padding: 10px 20px 10px 0;
      text-align: right;
      color: #ccc;
      span{
        color: red;
      }
    }
    .breakfast-type{
      padding-top: 20px;
      padding-left: 30px;
      .breakfast-type-center{
        display: flex;
        flex-wrap: wrap;
        span{
          padding: 10px 30px;
          width: 110px;
          text-align: center;
          margin-bottom: 25px;
          margin-right: 58px;
          border: 1px #f2f2f2 solid;
          border-radius: 15px;
        }
      }
      p{
        color: #666;
      }
    }
    .footer-center{
      padding: 30px;
      .footer-center-left{
        align-items: center;
        width: 200px;
        display: flex;
        justify-content: space-around;
        input{
          display: inline-block;
          width: 40px;
          height: 40px;
        }
      }
    }
    .footer-f {
      padding: 55px 70px 30px;
      .footer {
        text-align: center;
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
          background-color: #f69d9d;
          padding: 30px;
          width: 200px;
          border-radius: 30px;
          color: #ffffff;
        }
        span:nth-of-type(2) {
          background-color: #ccc;
        }
      }
    }
  .footer-fix{
    width: 100%;
    height: 300px;
    position: fixed;
    bottom:-300px;
    transition: all 0.8s ;
    .btn{
      background-color: #f8f9f9;
      text-align: center;
      line-height: 100px;
      height: 100px;
    }
  }
    .footer-fix1{
      width: 100%;
      height: 200px;
      position: fixed;
      bottom:-200px;
      transition: all 0.8s ;
      .btn{
        background-color: #f8f9f9;
        text-align: center;
        line-height: 100px;
        height: 100px;
      }
    }
  }
</style>
