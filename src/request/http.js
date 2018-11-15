import axios from 'axios'
import qs from 'qs' //用来序列化post类型的参数
import router from '@/router/index'

// 设置默认请求地址
axios.defaults.baseURL = "http://127.0.0.1:3000/api"

// 设置请求超时的时间
axios.defaults.timeOut = 10000

//post 请求设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export default axios


// import store from '@/store/index';请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
)


//响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 400: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 400:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
      }
      return Promise.reject(error.response);
    }
  });

// 403 token过期
// 登录过期对用户进行提示
// 清除本地token和清空vuex中token对象
// 跳转登录页面                
//   case 403:
//     Toast({
//       message: '登录过期，请重新登录',
//       duration: 1000,
//       forbidClick: true
//     });
//     // 清除token
//     localStorage.removeItem('token');
//     store.commit('loginSuccess', null);
//     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
//     setTimeout(() => {
//       router.replace({
//         path: '/login',
//         query: {
//           redirect: router.currentRoute.fullPath
//         }
//       });
//     }, 1000);
//     break;

//     // 404请求不存在
//   case 404:
//     Toast({
//       message: '网络请求不存在',
//       duration: 1500,
//       forbidClick: true
//     });
//     break;
// 其他错误，直接抛出错误提示
// default:
//   Toast({
//     message: error.response.data.message,
//     duration: 1500,
//     forbidClick: true
//   });
