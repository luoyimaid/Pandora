import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
// import personalCenter from '@/components/personalCenter/personalCenter'
// import registered from '@/components/registered/registered'
Vue.use(Router)
const allComments=(resolve) =>{
  import('@/components/allComments/allComments').then((module) =>{
      resolve(module)
  })
}

//路由懒加载
const addComments = (resolve) => {
  import('@/components/addComments/addComments').then((module) => {
    resolve(module)
  })
};
const goodlist = (resolve) => {
    import('@/components/goodlist/goodlist').then((module) => {
      resolve(module)
    })
  };

const serviceCenter = (resolve) => {
  import('@/components/serviceCenter/serviceCenter').then((module) => {
    resolve(module)
  })
};
const photoAlbum = (resolve) => {
  import('@/components/photoAlbum/photoAlbum').then((module) => {
    resolve(module)
  })
}

const pay = (resolve) => {
  import('@/components/pay/pay').then((module) => {
    resolve(module)
  })
}

const personalFormation = (resolve) => {
      import('@/components/personalFormation/personalFormation').then((module) => {
        resolve(module)
      })
    }

const search = (resolve) => {
  import('@/components/search/search').then((module) => {
    resolve(module)
  })
}

const collect = (resolve) => {
  import('@/components/collect/collect').then((module) => {
    resolve(module)
  })
}
const goodDetails = (resolve) => {
  import('@/components/goodDetails/goodDetails').then((module) => {
    resolve(module)
  })
}

const orderDetails = (resolve) => {
  import('@/components/orderDetails/orderDetails').then((module) => {
    resolve(module)
  })
}

const manubar = (resolve) => {
  import('@/components/manubar/manubar').then((module) => {
    resolve(module)
  })
}
const Order = (resolve) => {
  import('@/components/order/order').then((module) => {
    resolve(module)
  })
}
const personalCenter = (resolve) => {
  import('@/components/personalCenter/personalCenter').then((module) => {
    resolve(module)
  })
}
const registered = (resolve) => {
  import('@/components/registered/registered').then((module) => {
    resolve(module)
  })
};
const shippingAddress = (resolve) => {
  import('@/components/shippingAddress/shippingAddress').then((module) => {
    resolve(module);
  })
};
const login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
};
const complaints = (resolve) => {
  import('@/components/complaints/complaints').then((module) => {
    resolve(module)
  })
};
const friendsShow = (resolve) => {
  import('@/components/friendsShow/friendsShow').then((module) => {
    resolve(module)
  })
};
const storeDetails = (resolve) => {
  import('@/components/storeDetails/storedetails').then((module) => {
    resolve(module)
  })
};

const shoppingCar = (resolve) => {
  import('@/components/shoppingCar/shoppingCar').then((module) => {
    resolve(module)
  })
};

const forgotPassword = (resolve) => {
  import('@/components/forgotPassword/forgotPassword').then((module) => {
    resolve(module)
  })
};
const changThepassword = (resolve) => {
  import('@/components/changeThePassword/changThePassword').then((module) => {
    resolve(module)
  })
};

const lyIndex = (resolve) => {
  import('@/components/index/index').then((module) => {
    resolve(module)
  })
};
const addAddress = (resolve) => {
  import('@/components/addAddress/addAddress').then((module) => {
    resolve(module)
  })
};

const allOdercomments = (resolve) => {
  import('@/components/allOdercomments/allOdercomments').then((module) => {
    resolve(module)
  })
};

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/Lyindex'
      },
      {
         title: '首页',
         path: '/index',
         name: 'index',
         component: index
      },
      {
        title: "商品信息列表",
        path: "/goodlist",
        name: "goodlist",
        component: goodlist
      },
      {
        title: "我的收藏",
        path: '/collect',
        name: 'collect',
        component: collect
      },
      {
        title: '功能页',
        path: '/manubar',
        name: 'manubar',
        component: manubar
      },
      {

        title: '订单页',
        path: '/order',
        name: 'order',
        component: Order
      },
      {
        title: '收货地址',
        path: '/shippingAddress',
        name:'shippingAddress',
        component:shippingAddress
      },
      {
        title: "个人中心",
        path: '/personalCenter',
        name: 'personalCenter',
        component: personalCenter
      },
       {

         title: '注册',
           path: '/registered',
         name: 'registered',
         component: registered
       },
      {
        title: "登录",
        path: '/login',
        name: 'login',
        component: login
      },
      {
        title: '个人信息',
        path: '/personalFormation',
        name: 'personalFormation',
        component: personalFormation
      },
      {
        title: '服务中心',
        path: '/serviceCenter',
        name: 'serviceCenter',
        component: serviceCenter
      },
      {
        title: '相册展示',
        path: '/photoAlbum',
        name: 'photoAlbum',
        component: photoAlbum
      },
      {
          title: '订单详情',
          path: '/orderDetails',
          name: 'orderDetails',
          component: orderDetails
      },
      {
        title: '添加评论',
        path: '/addComments',
        name: 'addComments',
        component: addComments
      },
    {
      title: '投诉页面',
      path: '/complaints',
      name: 'complaints',
      component: complaints
    },
    {
      title: '好友展示',
      path: '/friendsShow',
      name: 'friendsShow',
      component: friendsShow
    },
    {
      title: "店铺详情",
      path: '/storeDetails',
      name: 'storeDetails',
      component: storeDetails
    },
    {
        title: '商品详情',
        path: '/goodDetails',
        name: 'goodDetails',
        component: goodDetails
      },
    {
      title: "登录",
      path: '/login',
      name: 'login',
      component: login
    },
    {
      title: "找回密码",
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: forgotPassword
    },
    {
      title: '搜索',
      path: '/search',
      name: 'search',
      component: search
    },
    {
      title: '结算',
      path: '/pay',
      name: 'pay',
      component: pay
    },

      {
        title:"购物车",
        path:'/shoppingCar',
        name:'shoppingCar',
        component:shoppingCar
      },
    {
      title: '所有评论',
      path: '/allComments',
      name: 'allComments',
      component: allComments
    },
      {
      title: "修改密码",
      path: '/changThepassword',
      name: 'changThepassword',
      component: changThepassword
      },
    {
      title:"个人中心",
      path:'/personalCenter',
      name:'personalCenter',
      component:personalCenter
    },
    {
      title: "注册",
      path: '/registered',
      name: 'registered',
      component: registered
    },
    {
      title: '首页',
      path: '/lyIndex',
      name: 'lyIndex',
      component: lyIndex
    },
      {
        title:"新增地址页",
        path:'/addAddress',
        name:'addAddress',
        component:addAddress
      }, {
      title:"店铺所有评论",
      path:'/allOdercomments',
      name:'allOdercomments',
      component:allOdercomments
    }
  ]
})
