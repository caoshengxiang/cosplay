<template>
    <div class="goodDetails_name_img">
        <div ref="box">
            <div class="img-show main-img">
                <div id="box">
                    <div style="width: 100%;height: 100%" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @mousemove="mouseMove">
                        <img id="small"
                             ref="smallBox"
                             :src="imgUrl">
                        <b id="shadow" ref="shadowBox"></b>
                    </div>
                    <div id="showDetails" ref="showDetailsBox">
                        <img :src="imgUrl" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="little_img">
            <div class="left" @click="move_left"><i class="el-icon-arrow-left"></i></div>
            <ul class="img-line" ref="imgBox">
                <li
                        @click='showImg(img)'
                        v-for="img in imgUrls"
                        :key="img">
                    <el-image
                            :class="{active: imgUrl === img}"
                            style="width: 70px; height: 70px" fit="cover"
                            :src="img"></el-image>
                </li>
            </ul>
            <div class="right" @click="move_right"><i class="el-icon-arrow-right"></i></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'goodImgs',
    props: {
      imgUrls: {
        default () {
          return []
        },
      },
      initIndex: {
        type: Number,
        default: 0
      },
    },
    data () {
      return {
        // 大图片默认显示第一张
        imgUrl: '',
        timer: ''
      }
    },
    watch: {
      imgUrls () {
        // console.info(this.imgUrls, this.initIndex)
        this.imgUrl = this.imgUrls[this.initIndex]
      }
    },
    methods: {
      showImg (img) {
        this.imgUrl = img
      },
      move_right () {
        let box = this.$refs.imgBox
        // if (box.scrollLeft <= 300) {
        // box.scrollLeft += 160
        // }
        this.animate(box, 160)
      },
      move_left () {
        let box = this.$refs.imgBox
        if (box.scrollLeft >= 0) {
          // box.scrollLeft -= 160
          this.animate(box, -160)
        }
      },
      animate (target, len) {
        if (this.timer) {
          clearInterval(this.timer)
        }
        let box = target
        let boxLeftLen = box.scrollLeft
        let t = 0.3 // 完成动画时间s
        let intervalTime = 5 // ms
        let a = len / (t * 1000 / intervalTime) // 偏移
        this.timer = setInterval(() => {
          box.scrollLeft += a
          if (len >= 0 && boxLeftLen + len <= box.scrollLeft) {
            clearInterval(this.timer)
          }
          if (len < 0 && boxLeftLen + len >= box.scrollLeft) {
            clearInterval(this.timer)
          }
        }, intervalTime)
      },
      /* 图片局部放大 */
      mouseEnter () {
        this.$refs.shadowBox.style.display = 'block'
        this.$refs.showDetailsBox.style.display = 'block'
      },
      mouseLeave () {
        this.$refs.shadowBox.style.display = 'none'
        this.$refs.showDetailsBox.style.display = 'none'
      },
      mouseMove (ev) {
        const box = this.$refs.box
        const smallBox = this.$refs.smallBox
        const mask = this.$refs.shadowBox
        const bigImg = this.$refs.showDetailsBox.firstChild

        let x = ev.pageX - box.offsetLeft // 被绑定元素到父元素的差值
        let y = ev.pageY - box.offsetTop
        x = x - mask.offsetWidth / 2
        y = y - mask.offsetHeight / 2

        if (x < 0) {
          x = 0
        }
        if (x > smallBox.offsetWidth - mask.offsetWidth) {
          x = smallBox.offsetWidth - mask.offsetWidth
        }

        if (y < 0) {
          y = 0
        }
        if (y > smallBox.offsetHeight - mask.offsetHeight) {
          y = smallBox.offsetHeight - mask.offsetHeight
        }

        console.log(ev.pageX, box.offsetLeft)
        mask.style.left = x + 'px' // 小图片移动多少
        mask.style.top = y + 'px'

        bigImg.style.left = -bigImg.offsetWidth / smallBox.offsetWidth * x + 'px' // 图片成比例缩放原理
        bigImg.style.top = -bigImg.offsetHeight / smallBox.offsetHeight * y + 'px'
      },
    },
    created () {
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="less">
    .goodDetails_name_img {
        .img-show {
            width: 300px;
            height: 300px
        }

        .little_img {
            width: 300px;
            height: 90px;
            display: flex;
            margin-top: 14px;

            .img-line {
                display: flex;
                width: 268px;
                overflow: hidden;

                li {
                    margin-right: 5px;
                    box-sizing: border-box;
                    transition: transform .3s;

                    .active {
                        border: 1px solid #FBA423;
                    }
                }
            }

            .left {
                width: 16px;
                height: 70px;
                line-height: 70px;
                background-color: #7f7f7f;
                color: #ffffff;
                cursor: pointer;
            }

            .right {
                width: 16px;
                height: 70px;
                background-color: #7f7f7f;
                color: #ffffff;
                line-height: 70px;
                cursor: pointer;
            }
        }

        .main-img {
            width: 300px;
            height: 300px;
            border: 1px solid #E5E5E5;
            position: relative;

            #box {
                width: 300px;
                height: 300px;
                position: relative; //父级开始定位
                #small {
                    width: 300px;
                    height: 300px;
                }

                #shadow {
                    display: none;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background-color: #000;
                    opacity: 0.3;
                    width: 150px; //高亮区域宽高与小图宽高、放大图区域宽高成比例
                    height: 150px;
                }

                #showDetails {
                    width: 500px;
                    height: 500px;
                    display: none;
                    position: absolute;
                    top: 0px;
                    left: 310px;
                    overflow: hidden;
                    border: #ededed 1px solid;
                    background-color: #FFFFFF;
                    z-index: 3;

                    img {
                        position: absolute; //放大图定位移动
                    }
                }
            }
        }

    }
</style>
