<template>
    <div class="form-wrap">
     <form class="register">
      <p class="login-register">
      Já possui uma conta?
       <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Crie sua conta</h2>
      <div class="inputs">
       <div class="input">
        <input type="text" placeholder="Seu nome" v-model="name">
        <user class="icon" />
       </div>
       <div class="input">
        <input type="text" placeholder="Seu CPF" v-model="cpf">
        <user class="icon" />
       </div>
       <div class="input">
        <input type="date" placeholder="Data de Nascimento" v-model="birthday">
        <user class="icon" />
       </div>
       <div class="input">
        <input type="text" placeholder="Email" v-model="email">
        <email class="icon" />
       </div>
       <div class="input">
        <input type="password" placeholder="Senha" v-model="password">
        <password class="icon" />
       </div>
       <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Registrar</button>
      <div class="angle"></div>
     </form>
     <div class="background"></div>
    </div>
   </template>
   
   <script>
   import email from "../assets/Icons/envelope-regular.svg";
   import password from "../assets/Icons/lock-alt-solid.svg";
   import user from "../assets/Icons/user-alt-light.svg";
   import firebase from "firebase/app";
   import "firebase/auth";
   import db from "../firebase/firebaseInit"
   export default {
    name: "Register",
    components: {
     email,
     password,
     user,
    },
    data() {
     return {
      name: "",
      cpf: "",
      birthday: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
     };
    },
    methods: {
     async register(){
      if (
       this.email !== "" &&
       this.password !== "" &&
       this.name !== "" &&
       this.cpf !== "" &&
       this.birthday !== ""
      ) {
       this.error = false;
       this.errorMsg = "";
       const firebaseAuth = await firebase.auth();
       const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
       const result = await createUser;
       const dataBase = db.collection("users").doc(result.user.uid);
       await dataBase.set({
        name:  this.name,
        cpf: this.cpf,
        birthday: this.birthday,
        email: this.email,
       });
       this.$router.push({ name: "AdminPanel" });
       return;
      }
      this.error = true;
      this.errorMsg = "Preencha todos o campos!";
      return;
     },
    }
   };
   </script>
   
   <style lang="scss" scoped>
   .register {
    h2 {
     max-width: 350px;
    }
   }
   </style>