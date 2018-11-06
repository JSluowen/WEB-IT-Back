import base from './base'
import axios from '@/request/http'
import qs from 'qs'

const user = {
    // 管理员登录
    login(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.login}`,qs.stringify(params)).then((res)=>{
                resolve(res.data)
            }).catch((err)=>{
                reject(err.data)
            })
        })
    },
    userLoading(){
        return new Promise((resolve,reject)=>{
            axios.get(`${base.userLoading}`).then((res)=>{
                resolve(res.data)
            }).catch((err)=>{
                reject(err.data)
            })
        })
    }
}

export default user