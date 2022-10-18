<template>
    <div class="product-card-wrap">
        
        <div class="product-cards container">
            <ProductsCard :product="product" v-for="(product, index) in productsCards" :key="index" />
        </div>
    </div>
</template>

<script>
import ProductsCard from "../components/ProductsCard";
export default {
    name: "AdminPanel",
    components: { ProductsCard },
    computed: {
        productsCards() {
            return this.$store.getters.productsBaseCards;
        },
        user() {
            return this.$store.state.user;
        },

        editProduct: {
        get() {
            return this.$store.state.editProduct
        },
        set(payload){
            this.$store.commit("toggleEditProduct", payload);
        },
    }
    },  
    beforeDestroy(){
        this.$store.commit("toggleEditProduct", false);
    }
};
</script>

<style lang="scss" scoped>
.product-cards{
  position: relative;

  .toggle-edit {
   display: flex;
   align-items: center;
   position: absolute;
   top: -70px;
   right: 0px;
   
   span {
    margin-right: 16px;
   }

   input[type="checkbox"] {
    position: relative;
    border: none;
    //-webkit-appearance: none;
    background: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
   }

   input[type="checkbox"]:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #303030;
    transform: scale(1.1);
    transition: 750ms ease all;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
   }

   input:checked[type="checkbox"]:before {
    background: #fff;
    left: 52px;
   }
  }
 }
</style>