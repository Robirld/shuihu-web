import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
const shajax = axios.create({
    baseURL: debug ? 'sh' : 'http://127.0.0.1:8003',
    timeout: 10000,
    responseType: 'json',
    withCredentials: false, // 表示跨域请求时是否需要使用凭证
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
})

export default shajax
