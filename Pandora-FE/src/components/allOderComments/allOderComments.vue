<template>
  <div class="main">
   <headerBar text="店铺所有评论"></headerBar>
    <div>
      <div class="nav">
        <mt-button size="small" @click.native.prevent="active = 'tab-container1'" @click="colorA(0)" class="nav-center" >全部评价(<span>{{lengthABCD.commentOneSize}}</span>)</mt-button>
        <mt-button size="small" @click.native.prevent="active = 'tab-container2'" @click="colorB(1)" class="nav-center" style="border: none">晒图(<span>{{lengthABCD.commentTwoSize }}</span>)</mt-button>
        <mt-button size="small" @click.native.prevent="active = 'tab-container3'" @click="colorC(2)" class="nav-center" style="border: none">低分(<span>{{lengthABCD.commentThreeSize}}</span>)</mt-button>
        <mt-button size="small" @click.native.prevent="active = 'tab-container4'" @click="colorD(3)" class="nav-center" style="border: none">最新(<span>{{lengthABCD.commentFourSize}}</span>)</mt-button>
      </div>
      <hr class="hr-color">
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" >
          <mt-tab-container-item id="tab-container1">
            <!-- cell组件 -->
            <div class="page-tab-container-center" v-for="item in data2">

              <div class="center-top"><img :src="item.userPhoto" alt="" width="40" height="40"></div>

              <div class="center-center">
                <div class="center-mid">
                  <div class="mid-top"><span>{{item.userNickname}}</span></div>
                  <div class="mid-bottom">
                    <div class="mid-bottom-left"></div>
                    <div class="mid-bottom-right">
                      打分
                      <img src="./img/Ddd.png" alt="" width="15" height="14" v-for="n in item.praiseLevel">
                      <img src="./img/Edd.png" alt="" width="15" height="14" v-for="n in 5-item.praiseLevel">

                    </div>
                  </div>
                </div>

                <div class="center-right">
                  <span>{{item.uploadTime}}</span>
                </div>
                <div class="comments">
                  <span>{{item.commentInfo }}</span>
                </div>
                <div class="addGood">
                  <div class="addGood-left">
                    <span>浏览(</span><span>15628</span>)
                  </div>
                  <div class="addGood-right">
                    <div class="addGood-right-center">
                      <label>
                          <input type="checkbox" style="display: none">
                        <span>&nbsp;</span>
                      </label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;赞</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>   <!--全部-->

          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2" class="colorA(1)"> <!--晒图-->
            <div class="page-tab-container-center" v-for="item in dataB">

              <div class="center-top"><img :src="item.userPhoto" alt="" width="40" height="40"></div>

              <div class="center-center">
                <div class="center-mid">
                  <div class="mid-top"><span>{{item.userNickname}}</span></div>
                  <div class="mid-bottom">
                    <div class="mid-bottom-left"></div>
                    <div class="mid-bottom-right">
                      打分
                      <img src="./img/Ddd.png" alt="" width="15" height="14" v-for="n in item.praiseLevel">
                      <img src="./img/Edd.png" alt="" width="15" height="14" v-for="n in 5-item.praiseLevel">
                    </div>
                  </div>
                </div>

                <div class="center-right">
                  <span>{{item.uploadTime}}</span>
                </div>
                <div class="comments">
                  <span>{{item.commentInfo }}</span>
                </div>
                <div class="addGood">
                  <div class="addGood-left">
                    <span>浏览(</span><span>2511</span>)
                  </div>
                  <div class="addGood-right">
                    <div class="addGood-right-center">
                      <label>
                        <input type="checkbox" style="display: none">
                        <span>&nbsp;</span>
                      </label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;赞</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </mt-tab-container-item><!--晒图-->
          <mt-tab-container-item id="tab-container3" class="colorA(2)"> <!--低分-->
            <div class="page-tab-container-center" v-for="item in dataC">

              <div class="center-top"><img :src="item.userPhoto" alt="" width="40" height="40"></div>

              <div class="center-center">
                <div class="center-mid">
                  <div class="mid-top"><span>{{item.userNickname}}</span></div>
                  <div class="mid-bottom">
                    <div class="mid-bottom-left"></div>
                    <div class="mid-bottom-right">
                      打分
                      <img src="./img/Ddd.png" alt="" width="15" height="14" v-for="n in item.praiseLevel">
                      <img src="./img/Edd.png" alt="" width="15" height="14" v-for="n in 5-item.praiseLevel">
                    </div>
                  </div>
                </div>

                <div class="center-right">
                  <span>{{item.uploadTime}}</span>
                </div>
                <div class="comments">
                  <span>{{item.commentInfo }}</span>
                </div>
                <div class="addGood">
                  <div class="addGood-left">
                    <span>浏览(</span><span>3562</span>)
                  </div>
                  <div class="addGood-right">
                    <div class="addGood-right-center">
                      <label>
                        <input type="checkbox" style="display: none">
                        <span>&nbsp;</span>
                      </label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;赞</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container4" class="colorA(3)"> <!--最新-->
            <div class="page-tab-container-center" v-for="item in dataD">
              <div class="center-top"><img :src="item.userPhoto" alt="" width="40" height="40"></div>

              <div class="center-center">
                <div class="center-mid">
                  <div class="mid-top"><span>{{item.userNickname}}</span></div>
                  <div class="mid-bottom">
                    <div class="mid-bottom-left"></div>
                    <div class="mid-bottom-right">
                      打分
                      <img src="./img/Ddd.png" alt="" width="15" height="14" v-for="n in item.praiseLevel">
                      <img src="./img/Edd.png" alt="" width="15" height="14" v-for="n in 5-item.praiseLevel">
                    </div>
                  </div>
                </div>

                <div class="center-right">
                  <span>{{item.uploadTime}}</span>
                </div>
                <div class="comments">
                  <span>{{item.commentInfo }}</span>
                </div>
                <div class="addGood">
                  <div class="addGood-left">
                    <span>浏览(</span><span>5225</span>)
                  </div>
                  <div class="addGood-right">
                    <div class="addGood-right-center">
                      <label>
                        <input type="checkbox" style="display: none">
                        <span>&nbsp;</span>
                      </label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;赞</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'
  import axios from 'axios'
  var addGoods = document.getElementsByClassName('addGood-right')[0];
  export default {
    name: 'page-tab-container',
    data() {
      return {
        active: 'tab-container1',
        data2: [],
        dataB: [],
        dataC: [],
        dataD: [],
        lengthABCD: [],
        lengthA: [],
        lengthB: [],
        lengthC: [],
        lengthD: []
      }
    },
    methods:{
      colorA:function (i) {
        for(var j=0;j<document.getElementsByClassName('nav-center').length;j++){
          document.getElementsByClassName('nav-center')[j].style.backgroundColor='#ffffff';
        }
        document.getElementsByClassName('nav-center')[i].style.backgroundColor='#ccc';
    },
      colorB:function (i) {
        for(var j=0;j<document.getElementsByClassName('nav-center').length;j++){
          document.getElementsByClassName('nav-center')[j].style.backgroundColor='#ffffff';
        }
        document.getElementsByClassName('nav-center')[i].style.backgroundColor='#ccc';
        axios.get('http://192.168.0.113:8080/comment?i=2').then(resp =>{
          let data = resp.data;
          this.dataB = Object.assign({},data.list);
          this.lengthB.push(data.length);
        }).catch(error =>{
          console.log(error)
        })
      }
      ,
      colorC:function (i) {
        for(var j=0;j<document.getElementsByClassName('nav-center').length;j++){
          document.getElementsByClassName('nav-center')[j].style.backgroundColor='#ffffff';
        }
        document.getElementsByClassName('nav-center')[i].style.backgroundColor='#ccc';
        axios.get('http://192.168.0.113:8080/comment?i=3').then(resp =>{
          let data = resp.data;
          this.dataC = Object.assign({}, data.list);
        }).catch(error =>{
          console.log(error)
        })
      },
      colorD:function (i) {
        for(var j=0;j<document.getElementsByClassName('nav-center').length;j++){
          document.getElementsByClassName('nav-center')[j].style.backgroundColor='#ffffff';
        }
        document.getElementsByClassName('nav-center')[i].style.backgroundColor='#ccc';
        axios.get('http://192.168.0.113:8080/comment?i=4').then(resp =>{
          let data = resp.data;
          this.dataD = Object.assign({},data.list);
        }).catch(error =>{
          console.log(error)
        })
      },
    _initData: function () {
      axios.get('http://192.168.0.113:8080/comment?i=1').then(resp =>{
        let data = resp.data;
        this.lengthABCD = Object.assign({}, data);
        this.data2 = Object.assign({}, data.list);
        console.log(data)
      }).catch(error =>{
        console.log(error)
      })
    }
    },
    created () {
      // 初始化商家数据
      this._initData()
    },
    components:{
      headerBar
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    display: inline-block;
  }
  .page-tab-container-center{
    height:250px;
    display: flex;
    border-bottom: 1px #ccc solid;
    padding: 0 20px;
    .center-top{
      padding-top: 10px;
      padding-right: 5px;
      img{
        border-radius: 50%;
      }
    }
      .center-center{align-items: center;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        font-size: 24px;
        .comments{
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          span{
            height: 20px;
            overflow: hidden;
          }
        }
      }

    .addGood{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .addGood-right{
        display: flex;
        width: 110px;
        height: 50px;
        border: 1px #666 solid;
        border-radius:10px; ;
        justify-content: center;
        .addGood-right-center{
          display: flex;
          align-items: center;
          label{
            position: relative;
            span{
              background: url("./img/peafact2.jpg") center no-repeat;
              padding: 20px 80px;
              display: inline;
              position: absolute;
              top: -34px;
              left: -80px;
            }
            input:checked ~span{
              background: url("./img/peafact1.jpg") center no-repeat;
            }
          }
          div{
            padding-top: 7px;
          }
        }
        span{
          font-size: 20px;
        }
      }
    }
  }

  .nav {
    display: flex;
    justify-content: space-between;
    .nav-center{
      width: 25%;
      height: 100px;
      background-color: #ffffff;
      border: none;
      font-size: 27px;
    }
    .nav-center:nth-of-type(1){
      background-color: #ccc;
    }

  }
  .hr-color{
    background-color: #fcfcfc;
  }
  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
</style>
