<template>
  <div class="all-address">
    <div class="shipping-address">
      {{text}}
      <img src="./back.png" class="shipping-address-back">
      <div class="shipping-address-left" @click="backToBefore">BACK</div>
      <div class="shipping-address-new" @click="toNewAddress">新增</div>
    </div>
    <div class="address-list-f">
      <div class="address-list">
        <div class="page-cell">
          <div class="single-address" v-for="(item,index) in singleAddress"  @click="toPayPage(index)">
            <mt-cell-swipe :right="rightButtons" :title="item.consignee">{{item.consigneeTel}}</mt-cell-swipe>
            <mt-cell-swipe :right="rightButtons" :title="item.consigneeAddress"></mt-cell-swipe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        singleAddress: []
      }
    },
    methods:{
      _initAddress:function(){
        let getUrl = 'http://192.168.0.114:8080/rener/userAddress/findUserAddress?addressId=-1';
        axios.get(getUrl).then(resp => {
          let data = resp.data;
          this.singleAddress = Object.assign([],data);
          console.log(this.singleAddress);
        }).catch(err => {
          console.log(err);
        })
      },
      backToBefore:function(){
        this.$router.back(-1);
      },
      toNewAddress:function(){
        this.$router.push({
          path:"/addAddress"
        })
      },
      toPayPage:function(index){
        let that = this;
        let getUrl = 'http://192.168.0.114:8080/rener/order/changeAddress';
        axios.get(getUrl,{params:{
          addressId:this.singleAddress[index].addressId
        }}).then(resp => {
          console.log(this.singleAddress[index].addressId)
          that.$router.push({
            path:"/pay"
          })
        }).catch(err => {
          console.log(err);
        })
      }
    },
    props: {
      text: {
        type: String,
        default: '选择收货地址',
      },
    },
    created() {
      this.rightButtons = [
        {
          content: '删除',
          style: { background: '#f27473', color: '#fff' },
          handler: () => {
            this.$messagebox('delete');
//            this.click();
          },
//          click:function(){
//            document.getElementsByClassName("single-address").style.display = "none";
//          }
        }
      ];
      this._initAddress();
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .all-address{
    .shipping-address{
      width: 100%;
      height:70px;
      overflow: hidden;
      color: #fff;
      text-align: center;
      line-height:70px;
      font-size: $font-size-one;
      background-color: $color-dark-blue;
      position: relative;
      .shipping-address-left{
        font-size: $font-size-one;
        color: $color-dark-blue;
        text-align: center;
        line-height:40px;
      }
      .shipping-address-back,.shipping-address-left{
        width:113px;
        height:39px;
        position: absolute;
        left:15px;
        top:15px;
      }
      .shipping-address-new{
        font-size: $font-size-one;
        position: absolute;
        right:15px;
        top:0;
      }
    }
    .address-list-f{
      position: fixed;
      width:100%;
      height:100%;
      .address-list{
        height:100%;
        background-color: #eee;
      }
    }
  }
</style>
