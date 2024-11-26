import { login, logout, getInfo,add } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name:'',
    avatar:'',
    id:'',
    admin:'',
    school:'',
    emial:'',
    wx:'',
    phone:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME:(state,username)=>{
    state.name=username;
  },
  SET_AVATAR: (state,avatar) => {
    state.avatar = avatar
  },
  SET_ID:(state,id)=>{
    state.id=id;
  },
  SET_ADMIN:(state,admin)=>{
    state.admin=admin;
  },
  SET_PHONE:(state,phone)=>{
    state.phone=phone;
  },
  SET_SCHOOL:(state,school)=>{
    state.school=school;
  },
  SET_WX:(state,wx)=>{
    state.wx=wx;
  },
  SET_EMIAL:(state,emial)=>{
    state.emial=emial;
  },
  
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   console.log(userInfo);
  //   return new Promise((resolve, reject) => {
  //     login(userInfo.username,userInfo.password).then(response => {
  //       const { data } = response
  //       console.log(data);
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       console.log(data.token);
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
   login({commit},userInfo) {
    
    const { username, password } = userInfo
    console.log(userInfo);
    //console.log(commit);
    return new Promise((resolve, reject) => {
      login(userInfo).then((response) => {
        console.log(response);
        //commit('SET_TOKEN', response.data.token);
        console.log(response.data);
        console.log("数据已存储")
        console.log(response.data.username);
        commit('SET_NAME',response.data.username);
        commit('SET_AVATAR',response.data.avatar);
        commit('SET_ID',response.data.id);
        commit('SET_ADMIN', response.data.is_admin);
        commit('SET_TOKEN', response.data.token);
        commit('SET_SCHOOL', response.data.school);
        commit('SET_PHONE', response.data.phone);
        commit('SET_EMIAL', response.data.emial);
        commit('SET_WX', response.data.wx);
        
      console.log(window.sessionStorage.getItem("user"));
     console.log(state);
     console.log("9.20res"+response);
     if(response.token!="") setToken(response.data.token);
        sessionStorage.setItem('user',JSON.stringify(this.state.user));
        console.log(JSON.parse(window.sessionStorage.getItem("user")));
        console.log(state);
        resolve()
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  setstore({commit,state}){
    console.log("1");
    return new Promise((resolve, reject) =>{
      console.log("2")
      
      const user=JSON.parse(window.sessionStorage.getItem("user"));
      console.log(user.name);
      commit('SET_NAME',user.name);
        commit('SET_AVATAR',user.avatar);
        commit('SET_ID',user.id);
        commit('SET_ADMIN', user.is_admin);
        commit('SET_TOKEN', user.token);
         commit('SET_SCHOOL', user.school);
        commit('SET_PHONE', user.phone);
        commit('SET_EMIAL', user.emial);
        commit('SET_WX', user.wx);
        console.log("3");
        console.log(state);
         resolve();
    }).catch(error => {
      console.log(error);
        reject(error)
    })
  },
  // get user info
  getInfo({ commit, state }) {
     state.user=JSON.parse(window.sessionStorage.getItem("user"));
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        console.log("token",token);
        const { username, avatar } = data
        console.log(data);
        commit('SET_USERNAME', username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    
    const user=JSON.parse(window.sessionStorage.getItem("user"));
    return new Promise((resolve, reject) => {
      logout(user).then(() => {
         // must remove  token  first
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  add({commit},state){
    console.log("add");
    console.log(state);
    return new Promise((resolve,reject)=>{
      add(state).then((res)=>{
        console.log("成功");
        resolve()
      }).catch(error=>{
        reject(error);
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

