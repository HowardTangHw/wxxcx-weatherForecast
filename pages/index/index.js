var amapFile = require('../../libs/amap-wx.js'); //引入高德api
var AMap = new amapFile.AMapWX({ key: '54ebb7743ba678743fde0a75157c3ab9' });
Page({
  data: {
    weather: {},
    today: '',
    city: ''
  },
  onLoad: function (option) {
    // 当前天气
    let cb = (d) => {
      this.setData({
        today: d.liveData.reporttime,  //更新当前日期
        city: d.city.data,
        weather: {
          wendu: d.liveData.temperature,
          xx: {
            type: d.weather.text + ':' + d.weather.data,
            fx: d.winddirection.text + ':' + d.winddirection.data,
            fl: d.windpower.text + ':' + d.windpower.data,
            sd: d.humidity.text + ':' + <d className="humidity data"></d>,
          }
        }
      });
      this.getWeather(t2);
    }
    let t = {
      type: 'live',
      fn: cb,
      city:''
    }
    this.getWeather(t);
    // 未来天气预报
    let cb2 = (d) => {
      let weather = this.data.weather;
      let c=d.forecast.casts;
      console.log(weather);
      weather.forecast=[];
      for (let i in c){
        weather.forecast.push(c[i]);
      }
      this.setData({
        weather:weather
      })
    }
    let t2 = {
      type: 'forecast',
      fn: cb2,
      city:''
    }
    
  },
  getWeather: function (t) {
    AMap.getWeather({
      type: t.type,
      city:t.city,
      success: (data) => {
        t.fn & t.fn(data);
      },
      fail: (info) => {
        return info;
      }
    })
  }
})

// console.log(AMap);
AMap.getWeather({
  type: "forecast",
  success: (data) => {
    // console.log(data);
  },
  fail: (info) => {
    // console.log(info);
  }
})