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
    },
    userDelete(params){       
        return new Promise((resolve,reject)=>{
            axios.get(`${base.userDelete}`,{params}).then((res)=>{
                resolve(res.data)
            }).catch((err)=>{
                reject(err.data)
            })
        })
    },
    userPass(params){
        return new Promise((resolve,reject)=>{
            axios.get(`${base.userPass}`,{params}).then((res)=>{
                resolve(res.data)
            }).catch((error)=>{
                reject(error)
            })
        })
    }
}

export default user