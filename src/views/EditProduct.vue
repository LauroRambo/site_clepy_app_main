<template>
 <div class="product">
  <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
  <Loading v-show="loading"/>
  <div class="container">
   <h2>Editar Produto</h2>
   <div class="product-info">
    <div class="input">
     <label for="productName">Nome do produto:</label>
     <input type="text" id="productName" v-model="productName" />
    </div>
    <div class="input">
     <label for="productModel">Modelo do produto:</label>
     <input type="text" id="productModel" v-model="productModel" />
    </div>
    <div class="input">
     <label for="productDescription">Descrição do produto:</label>
     <input type="text" id="productDescription" v-model="productDescription" />
    </div>
    <div class="input">
     <label for="productValue">Valor do aluguel:</label>
     <input type="number" id="productValue" v-model="productValue" />
    </div>
    <div class="upload-file">
     <label for="product-Photo">Imagens do Produto:</label>
     <input type="file" ref="productPhoto" id="product-Photo" @change="fileChange" accept=".png, .jpg, .jpeg"/>
     <span>arquivo: {{this.$store.state.productPhotoName}}</span>
    </div>
    
    <button @click="updateProduct">Editar</button>
   </div>
  </div>
 </div>
</template>
   
<script>
import Modal from "../components/Modal";
import Loading from "../components/Loading.vue";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
export default {
    name: "EditProduct",
    components: {
        Modal,
        Loading,
    },
    data() {
        return {
            file: null,
            modalMessage: "Produto Cadastrado!",
            modalActive: null,
            error: null,
            errorMsg: null,
            loading: null,
            routeID: null,
            currentProduct: null,
        }
    },

    async mounted() {
        this.routeID = this.$route.params.productId;
        this.currentProduct = await this.$store.state.productsBase.filter(product => {
            return product.productId === this.routeID;
        });
        this.$store.commit('setProductState', this.currentProduct[0])
    },
    methods: {

        fileChange(){
            this.file = this.$refs.productPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        },

        async updateProduct() {
            const dataBase = db.collection('products').doc(this.routeID);
            if (this.productName.lenght !== 0 && this.productDescription.lenght !== 0)  {
                if (this.file){
                    this.loading = true;
                    const storageRef = firebase.storage().ref();
                    const docRef = storageRef.child(`documents/ProductsPhotos/${this.$store.state.productPhotoName}`);
                    docRef.put(this.file).on("state_changed", (snapshot) => {
                        console.log(snapshot);
                    }, (err) =>{
                        console.log(err);
                    }, async () => {
                        const downloadURL = await docRef.getDownloadURL();

                        await dataBase.update({
                            productName: this.productName,
                            productModel: this.productModel,
                            productDescription: this.productDescription,
                            productValue: this.productValue,
                            productPhotoName: this.productPhotoName,
                            productPhoto:  downloadURL,
                        });
                        await this.$store.dispatch("updateProduct", this.routeID);
                        this.loading = false;
                        this.$router.push({ name: "AdminPanel"});
                    }
                    );
                    return;
                }
                this.Loading = true;
                await dataBase.update({
                    produproductName: this.productName,
                    productModel: this.productModel,
                    productDescription: this.productDescription,
                    productValue: this.productValue,
                });
                await this.$store.dispatch('updateProduct', this.routeID);
                this.loading = false;
                this.$router.push({name: "AdminPanel"});
                return;
            }
            this.error =  true;
            this.errorMsg = "Preencha todos os campos!";
            setTimeout(() => {
                this.error = false;
            }, 5000);
        }
    },
    computed: {
        profileId() {
            return this.$store.state.profileId;
        },
        productPhotoName() {
            return this.$store.state.productPhotoName;
        },
        productName: {
            get() {
                return this.$store.state.productName;
            },
            set(payload) {
                this.$store.commit("updateProductName", payload);
            },
        },
        productModel: {
            get() {
                return this.$store.state.productModel;
            },
            set(payload) {
                this.$store.commit("updateProductModel", payload);
            },
        },
        productDescription: {
            get() {
                return this.$store.state.productDescription;
            },
            set(payload) {
                this.$store.commit("updateProductDescription", payload);
            },
        },
        productValue: {
            get() {
                return this.$store.state.productValue;
            },
            set(payload) {
                this.$store.commit("updateProductValue", payload);
            },
        },
        
    },
}
</script>

<style lang="scss" scoped>
.product {
.container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
    text-align: center;
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
    }

    .product-info {
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 32px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 32px auto;

    .initials {
    position: initial;
    width: 80px;
    height: 80px;
    font-size: 32px;
    background-color: #303030;
    color: #fff;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    }

    .admin-badge {
    display: flex;
    align-self: center;
    color: #fff;
    font-size: 14px;
    padding: 8px 24px;
    border-radius: 8px;
    background-color: #303030;
    margin: 16px 0;
    text-align: center;
    text-transform: capitalize;

    .icon {
    width: 14px;
    height: auto;
    margin-right: 8px;
    }
    }

    .input {
    margin: 16px 0;

    label {
    font-size: 14px;
    display: block;
    padding-bottom: 6px;
    }
    input {
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 8px;
    height: 50px;
    @media(min-width: 900px) {

    }

    &:focus {
        outline: none;
    }
    }
    }

    button {
    align-self: center;
    }
    }
}
}
</style>