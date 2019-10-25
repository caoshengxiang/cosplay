import Vue from 'vue'

import MetaInfo from 'vue-meta-info'

// meonment 作为全局方法
import moment from 'moment'
import webStorage from 'webStorage'
import VueCookies from 'vue-cookies'
import { serverUrl, serverFileUrl } from '../utils/const'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

// 富文本n
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillRedefine } from 'vue-quill-editor-upload'

import { targetNewPage } from '../utils/routerUtil'

Vue.prototype.$moment = (t, format) => {
  if (!t) {
    return ''
  }
  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  // console.log(moment(t).format(format))
  return moment(t).format(format)
}
Vue.prototype.$webStorage = webStorage
VueCookies.config(2 * 60 * 60) // 单位秒，配置默认有效期
Vue.prototype.$VueCookies = VueCookies
Vue.prototype.$targetNewPage = targetNewPage

/* 全局组件 */
Vue.use(MetaInfo)

// 服务本vue-quill-editor
let Tool = [ // 可选参数  选择工具栏的需要哪些功能  默认是全部
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],

  [{ 'header': 1 }, { 'header': 2 }], // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  // [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
  [{ 'direction': 'rtl' }], // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['image', 'video', 'link'],

  ['clean'], // remove formatting button
]

let editorOption = quillRedefine({
  // 图片上传的设置
  uploadConfig: {
    action: serverUrl + '/common/upload', // 必填参数 图片上传地址
    // action: serverUrl + '/file/upload', // 必填参数 图片上传地址
    // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
    // 你必须把返回的数据中所包含的图片地址 return 回去
    res: (respnse) => {
      return serverFileUrl + respnse.data.url
    },
    methods: 'POST', // 可选参数 图片上传方式  默认为post
    // token: webStorage.getItem('userInfo').authKey, // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'file', // 可选参数 文件的参数名 默认为img
    size: 10 * 1024, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon', // 可选参数 可上传的图片格式
    // input点击事件  formData是提交的表单实体
    change: (formData) => {
    },
    // 设置请求头 xhr: 异步请求， formData: 表单对象
    header: (xhr, formData) => {
      xhr.setRequestHeader('authKey', webStorage.getItem('userInfo').authKey)
      formData.append('authKey', webStorage.getItem('userInfo').authKey)
    },
    // start: function (){}
    start: () => {
    }, // 可选参数 接收一个函数 开始上传数据时会触发
    end: () => {
    }, // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
    success: () => {
    }, // 可选参数 接收一个函数 上传数据成功时会触发
    error: () => {
    }, // 可选参数 接收一个函数 上传数据中断时会触发
  },
  // 以下所有设置都和vue-quill-editor本身所对应
  placeholder: '请输入内容', // 可选参数 富文本框内的提示语
  theme: '', // 可选参数 富文本编辑器的风格
  toolOptions: Tool, // 可选参数  选择工具栏的需要哪些功能  默认是全部

  handlers: {}, // 可选参数 重定义的事件，比如link等事件
})

Vue.use(VueQuillEditor, editorOption)
