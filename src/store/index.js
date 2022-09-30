import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileName: null,
    profileCpf: null,
    profileBirthday: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    updateUser(state, payload){
      state.user = payload
    },
    setProfileAdmin(state, payload){
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileName = doc.data().name;
      state.profileCpf = doc.data().cpf;
      state.profileBirthday = doc.data().birthday;
    },
    setProfileInitials(state) {
      state.profileInitials = 
        state.profileName.match(/(\b\S)?/g).join("");
    },
    changeName(state, payload) {
      state.profileName = payload;
    },
    changeCpf(state, payload) {
      state.profileCpf = payload;
    },
    changeBirthday(state, payload) {
      state.profileBirthday = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}, user) {
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin);
      //console.log(dbResults);
    },
    async updateUserSettings ({ commit, state}) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        name: state.profileName,
        cpf: state.profileCpf,
        birthday: state.profileBirthday,
      });
      commit("setProfileInitials");
    }
  },
  modules: {
  }
})
