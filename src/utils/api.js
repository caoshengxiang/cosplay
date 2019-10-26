/*
* axios.request(config)
* axios.get(url[, config])
* axios.delete(url[, config])
* axios.head(url[, config])
* axios.post(url[, data[, config]])
* axios.put(url[, data[, config]])
* axios.patch(url[, data[, config]])
*
* */

// import utils from '../utils/utils'

import $axios from '../utils/axiosConfig' // axios配置文件

export default {
  common: {
    upload (params, success, error) {
      $axios.post('common/upload', params,
        { 'Content-Type': 'multipart/form-data' }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  account: {
    login (params) {
      return new Promise((resolve, reject) => {
        $axios.post('users/login', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    logout (params) {
      // return new Promise((resolve, reject) => {
      //   $axios.get('user/logout', {
      //     params: params,
      //   }).then((res) => {
      //     resolve(res.data)
      //   }).catch((err) => {
      //     reject(new Error(err))
      //   })
      // })
    },
    updatePwd (params) {
      return new Promise((resolve, reject) => {
        $axios.post('users/update/pass', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  product: {
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.get('product/list', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    detail (params) {
      return new Promise((resolve, reject) => {
        $axios.get('product/detail', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    add (params) {
      return new Promise((resolve, reject) => {
        $axios.post('product/add', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    del (params) {
      return new Promise((resolve, reject) => {
        $axios.delete('product/delete', { params: params }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    update (params) {
      return new Promise((resolve, reject) => {
        $axios.put(`product/update/${params._id}`, params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  news: {
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.get('news/list', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    detail (params) {
      return new Promise((resolve, reject) => {
        $axios.get('news/detail', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    add (params) {
      return new Promise((resolve, reject) => {
        $axios.post('news/add', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    del (params) {
      return new Promise((resolve, reject) => {
        $axios.delete('news/delete', { params: params }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    update (params) {
      return new Promise((resolve, reject) => {
        $axios.put(`news/update/${params._id}`, params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  faqs: {
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.get('faqs/list', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    detail (params) {
      return new Promise((resolve, reject) => {
        $axios.get('faqs/detail', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    add (params) {
      return new Promise((resolve, reject) => {
        $axios.post('faqs/add', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    del (params) {
      return new Promise((resolve, reject) => {
        $axios.delete('faqs/delete', { params: params }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    update (params) {
      return new Promise((resolve, reject) => {
        $axios.put(`faqs/update/${params._id}`, params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  banner: {
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.get('banner/list', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    detail (params) {
      return new Promise((resolve, reject) => {
        $axios.get('banner/detail', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    add (params) {
      return new Promise((resolve, reject) => {
        $axios.post('banner/add', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    del (params) {
      return new Promise((resolve, reject) => {
        $axios.delete('banner/delete', { params: params }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    update (params) {
      return new Promise((resolve, reject) => {
        $axios.put(`banner/update/${params._id}`, params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  params: {
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.get('params/list', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    detail (params) {
      return new Promise((resolve, reject) => {
        $axios.get('params/detail', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    add (params) {
      return new Promise((resolve, reject) => {
        $axios.post('params/add', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    del (params) {
      return new Promise((resolve, reject) => {
        $axios.delete('params/delete', { params: params }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    update (params) {
      return new Promise((resolve, reject) => {
        $axios.put(`params/update/${params._id}`, params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  email: {
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.get('email/list', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    detail (params) {
      return new Promise((resolve, reject) => {
        $axios.get('email/detail', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    add (params) {
      return new Promise((resolve, reject) => {
        $axios.post('email/add', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    del (params) {
      return new Promise((resolve, reject) => {
        $axios.delete('email/delete', { params: params }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    update (params) {
      return new Promise((resolve, reject) => {
        $axios.put(`email/update/${params._id}`, params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    send (params) {
      return new Promise((resolve, reject) => {
        $axios.post('email/send', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
}
