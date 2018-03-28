<template>
  <div class="storeDetails">
    <!--引入头部组件-->
    <headerBar :text="this.storeDetails.storeToDetail.storeName"></headerBar>
    <!--引入轮播图组件-->
    <div class="slider">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in swipeImg" :key="item.pic">
          <img :src="item.pic">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--店铺电话地址评分这些基础信息-->
    <div class="basicMessage">
      <div class="left">
        <P class="star"><img src="./img/star.png" v-for="n in storeDetails.storeToDetail.storeLevel"></P>
        <P class="address">地址：<span>{{storeDetails.storeToDetail.storeAddress}}</span></P>
      </div>
      <div class="right"><P class="tel">电话：<span>{{storeDetails.storeToDetail.storeTel}}</span></P></div>
    </div>
    <div class="main">

      <!--展示店铺热销食品-->
      <div class="mealMessage">
        <div class="comboMeal">
          <div class="topName">
            <div class="left">
              <div>团</div>
              <span>套餐</span>
            </div>
          </div>
          <div class="mealAll">
            <div class="meal" v-for="item in storeDetails.goodsToDetail
" @click="turnToGoodDetails(item)">
              <div class="top">
                <div class="left"><img :src="item.goodsPic"></div>
                <div class="right">
                  <p>{{item.goodsName}}</p>
                  <p>{{storeDetails.storeToDetail.workDates}}</p>
                </div>
              </div>
              <div class="bottom">
                <div class="left">
                  <p>￥{{item.currentPrice}}</p>
                  <p>门市价：￥<span>{{item.goodsPrice}}</span></p>
                </div>
                <div class="right">已售：<span>{{item.goodsSales}}</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!--评论-->
      <div class="comment">
          <div class="title" @click="turnToComment">
            <p>用户评价<span>（{{storeDetails.CommentCountToDetail}}）</span></p>
            <img src="./img/turnTo.png">
          </div>
          <!--评论选项卡-->
          <div class="choosecart">
            <div class="nav">
              <mt-button size="small" @click.native.prevent="active = 'tab-container1'" class="mt-button1 mt-button" @click="check(0)">全部</mt-button>
              <mt-button size="small" @click.native.prevent="active = 'tab-container2'" class="mt-button2 mt-button" @click="check(1)">最新</mt-button>
              <mt-button size="small" @click.native.prevent="active = 'tab-container3'" class="mt-button3 mt-button" @click="check(2)">晒图评价</mt-button>
            </div>
            <div class="tag">
              <div><p>味道赞<span>{{storeDetails.CommentKeyToDetail
                .delicious}}</span></p></div>
              <div><p>服务热情<span>{{storeDetails.CommentKeyToDetail
                .goodService}}</span></p></div>
              <div><p>很健康<span>{{storeDetails.CommentKeyToDetail
                .goodHealth}}</span></p></div>
              <div><p>位置好<span>{{storeDetails.CommentKeyToDetail
                .greatLocation}}</span></p></div>
            </div>
            <div class="line"></div>
            <div class="content">
              <mt-tab-container v-model="active">
                <mt-tab-container-item id="tab-container1">
                  <div class="oneComment" v-for="item in storeDetails.commentToDetail.allComment

">
                    <img :src="item.userPhoto" class="photo">
                    <div class="details">
                      <p class="name">{{item.userNickname}}</p>
                      <div class="starTime">
                        <div class="star">
                          <img src="./img/star.png" v-for="item in item.praiseLevel">
                        </div>
                        <p>{{item.createTime}}</p>
                      </div>
                      <p>{{item.commentInfo}}</p>
                    </div>
                    <img  v-if="item.pic != null" :src="item" v-for="item in item.pic" style="width: 100px; height: 100px;">
                  </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">
                  <div class="oneComment" v-for="item in storeDetails.commentToDetail.newComment">
                    <img :src="item.userPhoto" class="photo">
                    <div class="details">
                      <p class="name">{{item.userNickname}}</p>
                      <div class="starTime">
                        <div class="star">
                          <img src="./img/star.png" v-for="item in item.praiseLevel">
                        </div>
                        <p>{{item.createTime}}</p>
                      </div>
                      <p>{{item.commentInfo}}</p>
                    </div>
                  </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container3">
                  <div class="oneComment" v-for="item in storeDetails.commentToDetail.withPic">
                    <img :src="item.userPhoto" class="photo">
                    <div class="details">
                      <p class="name">{{item.userNickname}}</p>
                      <div class="starTime">
                        <div class="star">
                          <img src="./img/star.png" v-for="item in item.praiseLevel">
                        </div>
                        <p>{{item.createTime}}</p>
                      </div>
                      <p>{{item.commentInfo}}</p>
                      <div class="commentPic">
                        <img v-for="item in item.pic" :src="item">
                      </div>
                    </div>
                  </div>
                </mt-tab-container-item>
              </mt-tab-container>
            </div>
          </div>
      </div>
      <!--更多信息-->
      <div class="more">
        <div class="title">更多信息</div>
        <div class="content">
          <div class="time">
            <p>营业时间：周一至周日<br>午市：11:00-14:30<br>晚市：17:00-23:00</p>
          </div>
          <div class="message">
            <div class="cardTip">
              <img src="./img/card.png">
              <p>刷卡</p>
            </div>
            <div class="wifiTip">
              <img src="./img/wifi.png">
              <p>WIFI</p>
            </div>
            <div class="babyTip">
              <img src="./img/baby.png">
              <p>宝宝椅</p>
            </div>
            <div class="sofaTip">
              <img src="./img/Sofa.png">
              <p>沙发位</p>
            </div>
            <div class="smokeTip">
              <img src="./img/noSmoke.png">
              <p>禁止吸烟</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'//引入头部组件
  import axios from 'axios'
export default {
  name: 'swipe',
  components:{
    headerBar
  },
  data () {
    return {
      active:'tab-container1',
      title:'',
      storeDetails:[],
      nowPrice1:'',
      nowPrice2:'',
      swipeImg:[
      ],
      imgLength:0,
    }
  },
  methods:{
    _initOrderListData () {
      axios.get('http://192.168.0.114:8080/rener/colles/selectStoreDetails?',{
        params : {
          storeId : this.$route.query.storeId
        }
      }).then(res => {
          this.storeDetails = Object.assign([], res.data);
          console.log(this.storeDetails);
          let swipePic = this.storeDetails.storeToDetail.storePic;
        for(let i = 0;i < swipePic.length;i++){
          let obj = {};
          obj.title = "店内";
          obj.pic = swipePic[i];
          this.swipeImg.push(obj);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    check:function(t){
      var aBtn = document.getElementsByClassName('mt-button');
      for(let i=0;i<aBtn.length;i++){
        aBtn[i].style.backgroundColor = '#fff';
        aBtn[i].style.color = '#9bb1c8';
      }
      aBtn[t].style.backgroundColor = '#9bb1c8';
      aBtn[t].style.color = '#fff';
    },
    turnToGoodDetails:function(item){
      let id = item.goodsId;
      this.$router.push({
        path: '/goodDetails',
        query : {
          goodsId : id
        }
      })
    },
    turnToComment:function(){
      this.$router.push({
        path: '/allOderComments'
      })
    },
  },
  created () {
    // 初始化列表数据
    this._initOrderListData()
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .storeDetails{
    .slider{
      height:400px;
      img{
        width:100%;
        height:400px;
      }
    }
    .basicMessage{
      background-color: #fff;
      padding:20px 30px 25px;
      .left{
        .address{
          font-size: $font-size-two;
          color:$color-dark-pink;
          span{
            color: #000;
          }
        }
        .star{
          img{
            width:21px;
            height:20px;
            margin-right:5px;
          }
        }
      }
      .right{
        .tel{
          font-size: $font-size-two;
          color:$color-dark-pink;
          span{
            color: #000;
          }
        }
      }
    }
    .main{
      background-color: $color-light-blue;
      padding:0 30px 20px;
      .mealMessage{
        padding:15px 0;
        .comboMeal{
          background-color: #fff;
          .topName{
            padding:7px 25px 0 3px;
            .left{
              div{
                width:24px;
                height:27px;
                background-color: $color-light-blue;
                color: #fff;
                font-size: $font-size-two;
                line-height: 27px;
                text-align: center;
                display: inline-block;
              }
              span{
                color:$color-dark-pink;
                font-size: $font-size-two;
              }
            }
          }
          .mealAll{
            display: flex;
            justify-content: space-around;
            .meal{
              padding:11px 0 0 5px;
              width:305px;
              .top{
                display: flex;
                justify-content: flex-start;
                .left{
                  margin-right:10px;
                  img{
                    width:100px;
                    height: 90px;
                  }
                }
                .right{
                  p:nth-of-type(1){
                    font-size:$font-size-three;
                  }
                  p:nth-of-type(2){
                    font-size:$font-size-four;
                    color: #ccc;
                  }
                }
              }
              .bottom{
                .left{
                  p:nth-of-type(1){
                    color: $color-dark-pink;
                    font-size:$font-size-two;
                  }
                  p:nth-of-type(2){
                    color: #ccc;
                    font-size:$font-size-four;
                    width:200px;
                  }
                }
                .right{
                  color: #999;
                  margin-top:7px;
                }
              }
            }
            .line{
              width:2px;
              height:160px;
              background-color: #ccc;
            }
          }
        }
      }
      .comment{
        background-color: #fff;
        .title{
          padding:10px 30px 0 10px;
          display: flex;
          justify-content: space-between;
          p{
            font-size: $font-size-two;
            color: $color-dark-pink;
            span{
              font-size:$font-size-three;
              color: $color-dark-blue;
            }
          }
          img{
            width:14px;
            height:23px;
          }
        }
        .choosecart{
          .nav{
            width:540px;
            height:60px;
            background-color: $color-dark-blue;
            display: flex;
            justify-content: center;
            margin:23px 0 0 70px;
            .mt-button{
              font-size:$font-size-one;
              height:60px;
              padding:0 50px;
              background-color: #fff;
              color: $color-dark-blue;
            }
            .mt-button1{
              background-color: $color-dark-blue;
              color: #fff;
            }
          }
          .tag{
            display: flex;
            justify-content: flex-start;
            padding-left: 22px;
            margin-top: 30px;
            flex-wrap: wrap;
            div{
              background-color: #999;
              border-radius: 22px;
              padding:2px;
              margin-right: 10px;
              margin-top:10px;
              p{
                background-color: #fff;
                height:44px;
                padding:0 26px;
                line-height: 44px;
                font-size:$font-size-two;
                color: #999;
                border-radius: 22px;
                span{
                  margin-left: 8px;
                }
              }
            }
          }
          .line{
            background-color: #ccc;
            height:1px;
            margin:35px 20px;
          }
          .content{
            .oneComment{
              display: flex;
              justify-content: center;
              margin-bottom:30px;
              .photo{
                width:64px;
                height:61px;
                margin-right: 18px;
                border-radius: 50%;
              }
              .details{
                width:510px;
                p{
                  font-size:$font-size-two;
                }
                p:nth-of-type(2){
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .starTime{
                  display: flex;
                  justify-content: space-between;
                  img{
                    width:21px;
                    height:20px;
                    margin-right:8px;
                  }
                  p{
                    color: #666;
                  }
                }
                .commentPic{
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: flex-start;
                  align-items: center;
                  margin-top: 10px;
                    img{
                      width:100px;
                      height:100px;
                      display: inline;
                      margin-right:10px;
                    }
                }
              }
            }
          }
        }
      }
      .more{
        background-color: #fff;
        padding:10px;
        margin-top:18px;
        .title{
          font-size:$font-size-two;
          color: $color-dark-pink;
        }
        .content{
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          padding-right:30px;
          margin-top:10px;
          .time{
            p{
              font-size:$font-size-two;
              color: #666;
              padding-left:45px;
              background: url("./img/clock.png") no-repeat 0 1px;
            }
          }
          .message{
            width:250px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .cardTip,.wifiTip,.babyTip,.sofaTip,.smokeTip{
              display: flex;
              justify-content: flex-start;
              margin-right:10px;
              img{
                margin-top:10px;
                width:20px;
                height:20px;
              }
              p{
                font-size: $font-size-two;
                color: #666;
              }
            }
            .cardTip{
              margin-left:5px;
            }
            .wifiTip{
              margin-left:50px;
            }
            .sofaTip{
              margin-left:30px;
            }
          }
        }
      }
    }
  }
</style>
