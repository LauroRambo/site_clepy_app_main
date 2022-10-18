import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productsBase: [],
    productsLoaded: null,
    productName: "",
    productModel: "",
    productDescription: "",
    productPhotoName: "",
    productPhotoFileURL: null,
    productValue: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileName: null,
    profileCpf: null,
    profileBirthday: null,
    profileId: null,
    profileInitials: null,
    
  },
  getters: {
    productsBaseCards(state) {
      return state.productsBase.slice(0,6);
    },
  },
  mutations: {
    updateProductName(state, payload) {
      state.productName = payload;
    },
    updateProductDescription(state, payload) {
      state.productDescription = payload;
    },
    updateProductModel(state, payload) {
      state.productModel = payload;
    },
    updateProductValue(state, payload) {
      state.productValue = payload;
    },
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
    filterProducts(state, payload) {
      state.productsBase = state.productsBase.filter((product) => product.productId !== payload);
    },
    changeBirthday(state, payload) {
      state.profileBirthday = payload;
    },
    fileNameChange(state, payload) {
      state.productPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.productPhotoFileURL = payload;
    },
    toggleEditProduct(state, payload){
      state.editProduct = payload;
    },
    setProductState(state, payload) {
      state.productName = payload.productName;
      state.productModel = payload.productModel;
      state.productDescription = payload.productDescription;
      state.productValue = payload.productValue;
      state.productPhotoFileURL = payload.productPhoto;
      state.productPhotoName = payload.productPhotoName;
    }
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
    },
    async getProducts({ state }) {
      const dataBase = await db.collection('products').orderBy('date', 'desc'); 
      const dbResults = await dataBase.get();
      
      dbResults.forEach((doc) => {
        if (!state.productsBase.some(product => product.productId === doc.id)){
          const data = {
            productId: doc.data().productId,
            productDescription: doc.data().productDescription,
            productPhoto: doc.data().productPhoto,
            productName: doc.data().productName,
            productValue: doc.data().productValue,
            productModel: doc.data().productModel,
            profileId: doc.data().profileId,
            productPhotoName: doc.data().productPhotoName,
          };
          state.productsBase.push(data);
        }
      });
      state.productsLoaded = true;
      console.log(state.productsBase);
      
    }, 
    async deleteProduct({commit}, payload) {
      const getProduct = await db.collection("products").doc(payload);
      await getProduct.delete();
      commit("filterProducts", payload);
    },
    async updateProduct({commit, dispatch}, payload){
      commit ("filterProducts", payload);
      await dispatch("getProducts");
    }
  },
  modules: {
  }
})
