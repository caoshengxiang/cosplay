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
  account: {
    login (params) {
      return new Promise((resolve, reject) => {
        $axios.get('user/login', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    logout (params) {
      return new Promise((resolve, reject) => {
        $axios.get('user/logout', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    updatePwd (params) {
      return new Promise((resolve, reject) => {
        $axios.get('user/password/edit', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  code: {
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.get('auth', {
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
        $axios.post('auth',
          params
        ).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    edit (params) {
      return new Promise((resolve, reject) => {
        $axios.put(`auth/${params.id}`,
          params
        ).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    delete (params) {
      return new Promise((resolve, reject) => {
        $axios.delete(`auth/${params.id}`, {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  }
}
