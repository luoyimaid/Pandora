<template>
  <div class="addAddress">
    <!--引入头部组件-->
    <headerbar text="新增收货地址" class="head"></headerbar>
    <div class="main">
      <!--输入信息-->
      <div class="main-top">
        <div class="name">
          <div class="needpadding">收&nbsp;货&nbsp;人&nbsp;:</div>
          <input type="text" placeholder="请输入收货人姓名">
          <div class="nameErr">姓名输入不符合规则</div>
        </div>
        <div class="hr"></div>
        <div class="tel">
          <div>联系电话:</div>
          <input type="text" placeholder="请输入11位手机号">
          <div class="telErr">联系电话输入不符合规则</div>
        </div>
        <div class="hr"></div>
        <div class="address">
          <div>所在地区:</div>
          <input type="text" placeholder="请输入省市区名称">
          <div class="areaErr">地区输入不符合规则</div>
        </div>
        <div class="hr"></div>
        <div class="addDetails">
          <div>详细地址:</div>
          <textarea placeholder="请输入详细地址，不少于5字"></textarea>
          <div class="addDetailsErr">详细地址输入不正确</div>
        </div>
        <div class="footer" @click="test">
          确定添加
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import headerbar from '@/components/base/headerbar/headerbar'//引入头部组件
  import axios from "axios"
  export default {
    name: 'app',
    components:{
      headerbar
  },
    data () {
      return {

      }
    },
    methods: {
      _initData(){
      },
      test:function() {
        var aInput = document.getElementsByTagName("input");
        var addDetail = document.getElementsByTagName("textarea")[0];
        var nameWrong = document.getElementsByClassName("nameErr")[0];
        var telWrong = document.getElementsByClassName("telErr")[0];
        var areaWrong = document.getElementsByClassName("areaErr")[0];
        var addDetailsWrong = document.getElementsByClassName("addDetailsErr")[0];
        var reName =  /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/;
        var reTel =  /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        var reAddress = /^[\u4E00-\u9FA5]{3,}$/;
        var reAddressDetails = /^[\u4E00-\u9FA5]{5,}$/;
        if(reName.test(aInput[0].value)){
          nameWrong.style.display = "none";
        }
        if(reTel.test(aInput[1].value)){
          telWrong.style.display = "none";
        }
        if(reAddress.test(aInput[2].value)){
          areaWrong.style.display = "none";
        }
        if(reAddressDetails.test(addDetail.value)){
          addDetailsWrong.style.display = "none";
        }

        if(!reName.test(aInput[0].value)){
          nameWrong.style.display = "block";
        }else if(!reTel.test(aInput[1].value)){
          telWrong.style.display = "block";
        }else if(!reAddress.test(aInput[2].value)){
          areaWrong.style.display = "block";
        }else if(!reAddressDetails.test(addDetail.value)){
          addDetailsWrong.style.display = "block";
        }else{
          nameWrong.style.display = "none";
          telWrong.style.display = "none";
          areaWrong.style.display = "none";
          addDetailsWrong.style.display = "none";
          axios.post("http://192.168.0.114:8080/rener/updateUserMsg/addUserAddress",{
              consignee : aInput[0].value,
              tel : aInput[1].value,
              area : aInput[2].value,
              address : addDetail.value,
          }).then(res =>{
            console.log(res.data);
            if(res.data == 1){
              alert("添加成功！");
              aInput[0].value = "";
              aInput[1].value = "";
              aInput[2].value = "";
              addDetail.value = "";
            }
          }).catch(err => {
            console.log(err)
          });
        }

      }
    },
    created () {
      // 初始化商家数据
      this._initData()
    }
  }

</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .addAddress{

    .main{
      width: 100%;
      height: 800px;
      .main-top{
        .hr{
          width:100%;
          height:1px;
          background-color: #ccc;
        }
        .name,.tel,.address{
          div:nth-of-type(1){
            padding-left:50px;
            font-size:32px;
            color: $color-dark-blue;
            display: inline-block;
          }
          div:nth-of-type(2){
            font-size: 32px;
            color: $color-dark-pink;
            padding-left:50px;
            display: none;
          }
          input{
            width:500px;
            height:80px;
            border:none;
          }
          input::-webkit-input-placeholder{
            font-size: 25px;
            line-height: 30px;
          }
        }
        .name{
          padding-left:3px;
          input{
            margin-left:5px;
          }
        }
        .addDetails{
          div:nth-of-type(1){
            padding-left:50px;
            font-size:32px;
            color: $color-dark-blue;
            display: inline-block;
            margin:10px 0;
          }
          textarea{
            width:645px;
            margin-left:50px;
            display: block;
            height:200px;
          }
          textarea::-webkit-input-placeholder{
            font-size: 25px;
          }
          div:nth-of-type(2){
            font-size: 32px;
            color: $color-dark-pink;
            padding-left:50px;
            display: none;
          }
        }
      }
      .footer{
        position: absolute;
        height:100px;
        background-color: $color-dark-blue;
        width:100%;
        font-size: 32px;
        color: #fff;
        text-align: center;
        line-height: 100px;
        bottom:0;
      }
    }

  }
</style>
