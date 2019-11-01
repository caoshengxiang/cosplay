export const serverUrl = process.env.VUE_APP_SERVER_BASE_URL // server地址
export const serverFileUrl = process.env.VUE_APP_SERVER_FILE_URL // server地址
export const env = process.env.VUE_APP_ENV

export const uploadExternalOsUrl = serverUrl + '/common/upload/aws'

console.log(serverUrl, env)
