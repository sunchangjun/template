var app = getApp()
Page({
  data: {
    awardsList: {},
    animationData: {},
    chanceRemain:null,
    disabled:"disabled",
    able:"able",
    turning:false,
    scale:1,
    contentHeight:null
  },
  gotoList: function() {
    wx.switchTab({
      url: '../list/list'
    })
  },

  /**
   * 抽奖处理函数：
   */
  getLottery: function () {
    var that = this;
  
    //减少抽奖次数：
    this.setData({
      chanceRemain:that.data.chanceRemain-1,
      turning:true
    });
    setTimeout(function(){
      that.setData({
        turning:false
      })
    },4500)
    // var awardIndex = Math.random() * 6 >>> 0;
    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
        runNum = 8,
        awardIndex=0;
    // if (awardIndex < 2) awardsConfig.chance = false
    // console.log(awardIndex)
    //设置概率：随机从数组中抽取一个数，数组中越大的数出现的次数越少，以此实现概率差异
    var Parr=[150,100,,100,60,60,60,30,30,30,30,10,10,0,0];
    var PrandomNum = Math.random() * 13 >>> 0;
    switch (Parr[PrandomNum]){
      case 0:
        awardIndex=5
        break
      case 10:
        awardIndex = 0
        break
      case 30:
        awardIndex = 1
        break
      case 60:
        awardIndex = 2
        break
      case 100:
        awardIndex = 3
        break
      case 150:
        awardIndex = 4
        break
    }
    console.log("奖品序号："+awardIndex);
    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    console.log('deg', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
    console.log('deg', app.runDegs)

    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export()
    })

     // 记录奖品
    var winAwards = wx.getStorageSync('winAwards') || {data:[]}
    winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
    wx.setStorageSync('winAwards', winAwards)

    // 中奖提示
    setTimeout(function() {
      wx.showModal({
        title: awardsConfig.awards[awardIndex].name==="\n再接再厉" ?"很遗憾,并没有中奖":'恭喜',
        content: awardsConfig.awards[awardIndex].name==="\n再接再厉"?"再接再厉吧" :'获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      })

    }, 4000);
    

    /*wx.request({
      url: '../../data/getLottery.json',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(data) {
        console.log(data)
      },
      fail: function(error) {
        console.log(error)
        wx.showModal({
          title: '抱歉',
          content: '网络异常，请重试',
          showCancel: false
        })
      }
    })*/
  },
  onReady: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
        contentHeight:res.windowHeight
        });
        if(res.windowWidth<360){
          that.setData({
            scale:0.9
          })
        }else if(res.windowWidth>500){
          that.setData({
            scale: 1.4
          })
        }
      },
    })
    // getAwardsConfig
    app.awardsConfig = {
      chance:99,
      awards:[
        { 'index': 0, 'name': '金元宝10个', 'img':'../../image/+100.png'},
        { 'index': 1, 'name': '金元宝30个', 'img': '../../image/+150.png'},
        { 'index': 2, 'name': '金元宝60个', 'img': ''},
        { 'index': 3, 'name': '金元宝100个', 'img': '../../image/+10.png'},
        { 'index': 4, 'name': '金元宝150个', 'img': '../../image/+30.png'},
        { 'index': 5, 'name': '\n再接再厉', 'img':'../../image/+60.png'}
      ]
    }
    
    // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))
    that.setData({
      chanceRemain: app.awardsConfig.chance
    })

    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
        len = awardsConfig.length,
        rotateDeg = 360 / len / 2 + 90,
        html = [],
        turnNum = 1 / len;  // 文字旋转 turn 值
    var ctx = wx.createContext();
    for (var i = 0; i < len; i++) {
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(150, 150);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((360 / len * i - rotateDeg) * Math.PI/180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0,  2 * Math.PI / len, false);

      // 颜色间隔
      if (i % 2 == 0) {
          ctx.setFillStyle('rgba(255,184,32,.1)');
      }else{
          ctx.setFillStyle('rgba(255,203,63,.1)');
      }

      // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('rgba(228,55,14,.1)');
      ctx.stroke();

      // 恢复前一个状态
      ctx.restore();

      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name, img: awardsConfig[i].img });      
    };

    that.setData({
        awardsList: html
      });

    // 对 canvas 支持度太差，换种方式实现
    // wx.drawCanvas({
    //   canvasId: 'lotteryCanvas',
    //   actions: ctx.getActions()
    // })
  }
})
