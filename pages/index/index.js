let col1H = 0;
let col2H = 0;
let addressJ = 112.6002100000;
let addressW = 37.8531500000;

Page({
  onShareAppMessage: function () {
    return {
      title: '御逸轩家具',
      path: '/pages/index/index',
      data:{data},

    }
  },
    data: {
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
        flag: true
    },

    onLoad: function () {
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });

                this.loadImages();
            }
        })
    },

    onImageLoad: function (e) {
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width;         //图片原始宽度
        let oImgH = e.detail.height;        //图片原始高度
        let imgWidth = this.data.imgWidth;  //图片设置的宽度
        let scale = imgWidth / oImgW;        //比例计算
        let imgHeight = oImgH * scale;      //自适应高度

        let images = this.data.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }

        imageObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;

        if (col1H <= col2H) {
            col1H += imgHeight;
            col1.push(imageObj);
        } else {
            col2H += imgHeight;
            col2.push(imageObj);
        }

        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };

        if (!loadingCount) {
            data.images = [];
        }

        this.setData(data);
    },

    loadImages: function () {
        let images = [
            { pic: "../../images/1.jpg", height: 0 },
            { pic: "../../images/2.jpg", height: 0 },
            { pic: "../../images/3.jpg", height: 0 },
            { pic: "../../images/4.jpg", height: 0 },
            { pic: "../../images/5.jpg", height: 0 },
            { pic: "../../images/6.jpg", height: 0 },
            { pic: "../../images/7.jpg", height: 0 },
            { pic: "../../images/8.jpg", height: 0 },
            { pic: "../../images/9.jpg", height: 0 },
            { pic: "../../images/10.jpg", height: 0 },
            { pic: "../../images/11.jpg", height: 0 },
            { pic: "../../images/12.jpg", height: 0 }
        ];

        let baseId = "img-" + (+new Date());

        for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
        }

        this.setData({
            loadingCount: images.length,
            images: images
        });
    
    },

    kefuclick:function(){

    },
    //显示
    show: function () {

      this.setData({ flag: false })

    },
    //消失

    hide: function () {

      this.setData({ flag: true })

    },
    callPhone:function(){
      var that = this
      this.setData({ flag: true }),
      wx.makePhoneCall({
        phoneNumber: '13834539719',
        success: function () {
          console.log("成功拨打电话")
        }
      })
    },
    showAddress:function(){
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function (res) {
          // success  
          wx.openLocation({
            latitude: addressW, // 纬度，范围为-90~90，负数表示南纬  
            longitude: addressJ, // 经度，范围为-180~180，负数表示西经      
            name: '太原市郝庄正街9号东城现代家具城001号', //打开后显示的地址名称
            address: '太原市郝庄正街9号东城现代家具城001号' //打开后显示的地址汉字
          })
        }
      })  
    },

})