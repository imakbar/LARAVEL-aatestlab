<template>
    <!-- BEGIN: Content-->
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body">
                <div class="auth-wrapper auth-cover">
                    <div class="auth-inner row m-0">
                        <!-- Brand logo-->
                        <a class="brand-logo" :href="Helpers.appEndPoint()+'/login'">
                        <img height="80" :src="Helpers.mediaPath()+Helpers.appLogoLight()" :alt="Helpers.appName()">
                        <!-- <h2 class="brand-text text-primary ms-1">{{Helpers.appName()}}</h2> -->
                        </a>
                        <!-- /Brand logo-->
                        <!-- Left Text-->
                        <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
                            <div class="w-100 d-lg-flex align-items-center justify-content-center px-5"><img class="img-fluid" src="/backend/app-assets/images/pages/register-v2.svg" alt="Register V2"/></div>
                        </div>
                        <!-- /Left Text-->
                        <!-- Register-->
                        <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                            <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                                <h2 class="card-title fw-bold mb-10">Adventure starts here 🚀</h2>
                                <form class="auth-register-form mt-12">
                                <p class="card-text mb-2">Make your app management easy and fun!</p>
                                    <div class="mb-10">
                                        <label class="form-label" for="first_name">Name</label>
                                        <input v-model="record.first_name" class="form-control" id="first_name" type="text" placeholder="johndoe" :class="[errors.first_name != null?'is-invalid':'']" aria-describedby="first_name" autofocus="" tabindex="1"/>
                                        <div class="invalid-feedback" :class="[errors.first_name != null?'d-block':'']" v-if="errors.first_name != null">{{errors.first_name[0]}}</div>
                                    </div>
                                    <div class="mb-10">
                                        <label class="form-label" for="email">Email</label>
                                        <input v-model="record.email" class="form-control" id="email" type="text" placeholder="john@example.com" 
                                        :class="[errors.email != null?'is-invalid':'']" 
                                        aria-describedby="email" tabindex="2"/>
                                        <div class="invalid-feedback" :class="[errors.email != null?'d-block':'']" v-if="errors.email != null">{{errors.email[0]}}</div>
                                    </div>
                                    <div class="mb-10">
                                        <label class="form-label" for="password">Password</label>
                                        <div class="input-group input-group-merge form-password-toggle" :class="[errors.password != null?'is-invalid':'']">
                                            <input v-model="record.password" class="form-control form-control-merge" id="password" type="password" placeholder="············" :class="[errors.password != null?'is-invalid':'']" aria-describedby="password" tabindex="3"/><span class="input-group-text cursor-pointer"><vue-feather class="icon" type="eye" size="14"></vue-feather></span>
                                        </div>
                                        <div class="invalid-feedback" :class="[errors.password != null?'d-block':'']" v-if="errors.password != null">{{errors.password[0]}}</div>
                                    </div>
                                    <div class="mb-10">
                                        <label class="form-label" for="confirm_password">Confirm Password</label>
                                        <div class="input-group input-group-merge form-password-toggle" :class="[errors.password != null?'is-invalid':'']">
                                            <input v-model="record.confirm_password" class="form-control form-control-merge" id="confirm_password" type="password" placeholder="············" :class="[errors.confirm_password != null?'is-invalid':'']" aria-describedby="confirm_password" tabindex="3"/><span class="input-group-text cursor-pointer"><vue-feather class="icon" type="eye" size="14"></vue-feather></span>
                                        </div>
                                        <div class="invalid-feedback" :class="[errors.confirm_password != null?'d-block':'']" v-if="errors.confirm_password != null">{{errors.confirm_password[0]}}</div>
                                    </div>
                                    <div class="mb-10">
                                        <div class="form-check">
                                            <input class="form-check-input" id="register-privacy-policy" type="checkbox" tabindex="4"/>
                                            <label class="form-check-label" for="register-privacy-policy">I agree to<a href="#">&nbsp;privacy policy & terms</a></label>
                                        </div>
                                    </div>
                                    <button @click="submitBtn(),btnLoaderAction('submit')" class="btn btn-primary w-100" tabindex="4" type="button">
                                        <span v-if="btnLoader.active && btnLoader.activeContent == 'submit'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span :class="[btnLoader.active && btnLoader.activeContent == 'login'?'visually-hidden':'']">Sign up</span>
                                    </button>
                                </form>
                                <p class="text-center mt-12"><span>Already have an account?</span><a :href="'/admin/login'"><span>&nbsp;Sign in instead</span></a></p>
                            </div>
                        </div>
                        <!-- /Register-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Content-->
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2'
import GlobalLoader from "@/components/global/Loader.vue";

import { useStore } from "vuex";
import { Actions, Mutations } from "../../store/enums/StoreEnums";

export default defineComponent({
    name: "register",
    components: {
        GlobalLoader
    },
    created(){
        // this.isAlreadyLoggedIn()
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const pageLevelEndPoint = ref('/register')

        const errors : any = ref([]);
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const btnLoader = ref({
            active: false,
            hideContent: true,
            activeContent: ''
        })

        const btnLoaderAction = (data) => {
            btnLoader.value.activeContent = data
        }

        const record = ref({
            first_name: "Muhammad Akbar",
            email: "m.akbarsarwar2@gmail.com",
            password: "admin@123",
            confirm_password: "admin@123"
        })

        const showPassword = ref('password')

        const submitBtn = async () => {
            btnLoader.value.active = true;
            const resData = await store.dispatch(Actions.REGISTER, record.value);
            // const [errorName] = Object.keys(store.getters.getErrors.errors);
            // const error = store.getters.getErrors.errors[errorName];

            console.log('store.getters',resData)
            
            if (resData.status == 'success') {
                errors.value = []
                sweetalertMessage({
                    status: 'success',
                    title: '',
                    message: resData.message,
                    position: 'bottom-end',
                    timer: 5000,
                    progressBar: true,
                    toast: true,
                    showConfirmButton: false,
                })
            } else {
                errors.value = resData.errors
            }
            btnLoader.value.active = false;
        }

        const sweetalertMessage = (data) => {
            const Toast = Swal.mixin({
                toast: data.toast,
                position: data.position,
                timer: data.timer,
                timerProgressBar: data.progressBar,
                showConfirmButton: data.showConfirmButton,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            if(data.toast == true){
                Toast.fire({
                    icon: data.status,
                    title: data.title,
                    text: data.message
                })
            } else {
                Swal.fire({
                    icon: data.status,
                    title: data.title,
                    text: data.message,
                })
            }
        }

        const showPasswordBtn = (data:any) => {
            showPassword.value = showPassword.value=='text'?'password':'text'
        }

        return {
            store,
            pageLevelEndPoint,

            // isAlreadyLoggedIn,
            
            sweetalertMessage,

            loaderSettings,
            btnLoader,
            btnLoaderAction,
            record,
            submitBtn,

            errors,

            showPassword,
            showPasswordBtn,
        }
    },
})
</script>
