<template>
    <!-- BEGIN: Content-->
    <div class="app-content content" :key="loadKey">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body">
                <div class="auth-wrapper auth-cover">
                        
                    <!-- Loading -->
                    <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>
                    
                    <div class="auth-inner row m-0">
                        <!-- Brand logo-->
                        <a class="brand-logo" :href="HelperData.appEndPoint+'/login'">
                        <img height="40" :src="HelperData.mediaPath+HelperData.appLogoDark" :alt="HelperData.appName">
                        <!-- <h2 class="brand-text text-primary ms-1">{{HelperData.appName}}</h2> -->
                        </a>
                        <!-- /Brand logo-->
                        <!-- Left Text-->
                        <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
                            <div class="w-100 d-lg-flex align-items-center justify-content-center px-5"><img class="img-fluid" src="/backend/app-assets/images/pages/forgot-password-v2-dark.svg" alt="Login V2"/></div>
                        </div>
                        <!-- /Left Text-->
                        <!-- Login-->
                        <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                            <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                                <h2 class="card-title fw-bold mb-10">Forgot Password? 🔒</h2>
                                <p class="card-text mb-2">Enter your email and we'll send you instructions to reset your password</p>
                                <div class="auth-login-form mt-12">
                                    <div class="mb-10">
                                        <label class="form-label" for="email">Email</label>
                                        <input class="form-control" id="email" type="text" v-model="record.email" placeholder="john@example.com" autofocus="" tabindex="1"/>
                                    </div>
                                    
                                    <button @click="login(),btnLoaderAction('login')" class="btn btn-primary w-100" tabindex="4" type="button">
                                        <span v-if="btnLoader.active && btnLoader.activeContent == 'login'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span :class="[btnLoader.active && btnLoader.activeContent == 'login'?'visually-hidden':'']">Send reset link</span>
                                    </button>

                                </div>
                                <p class="text-center mt-12"><a :href="HelperData.appEndPoint+'/login'" class="d-flex justify-content-center align-items-center"><vue-feather type="chevron-left" size="16"></vue-feather> Back to login</a></p>
                            </div>
                        </div>
                        <!-- /Login-->
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
import Helpers from "../../components/helpers/helpers"

import { useStore } from "vuex";
import { Actions, Mutations } from "../../store/enums/StoreEnums";

export default defineComponent({
    name: "forgot-password",
    components: {
        GlobalLoader
    },
    created(){
        // this.isAlreadyLoggedIn()
        this.loadHelper()
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const pageLevelEndPoint = ref('/forgot-password')
        
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

        const loadKey : any = ref(0)
        const HelperData : any = ref({})

        const record = ref({
            email: ""
        })
        const errors : any = ref([])

        const login = async () => {
            btnLoader.value.active = true;
            const resData = await store.dispatch(Actions.FORGOT_PASSWORD, record.value);
            const [errorName] = Object.keys(store.getters.getErrors);
            const error = store.getters.getErrors[errorName];

            if (!error) {
                sweetalertMessage({
                    status: 'success',
                    title: '',
                    message: 'Reset link sent successfully',
                    position: 'bottom-end',
                    timer: 3000,
                    progressBar: true,
                    toast: true,
                    showConfirmButton: false,
                })
            } else {
                sweetalertMessage({
                    status: 'error',
                    title: '',
                    message: error,
                    position: 'bottom-end',
                    timer: 3000,
                    progressBar: true,
                    toast: true,
                    showConfirmButton: false,
                })
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

        const loadHelper = () => {
            axios.get(`${Helpers.appUrl()}`+'/app-config')
                .then((res) => {
                    loadKey.value = loadKey.value+1
                    // HelperData.value.appEndPoint = Helpers.appEndPoint()
                    // HelperData.value.mediaPath = Helpers.mediaPath()
                    HelperData.value.appLogoLight = res.data['logos']['logo_light']['path']
                    HelperData.value.appLogoDark = res.data['logos']['logo_dark']['path']
                    HelperData.value.appName = res.data['general']['app_name']
                    loadKey.value = loadKey.value+1
                })
                .catch((error) => {
                    console.log(error)
                })
            // loadKey.value = loadKey.value+1
            HelperData.value.appEndPoint = Helpers.appEndPoint()
            HelperData.value.mediaPath = Helpers.mediaPath()
            // HelperData.value.appLogoLight = Helpers.appLogoLight()
            // HelperData.value.appLogoDark = Helpers.appLogoDark()
            // HelperData.value.appName = Helpers.appName()
            // loadKey.value = loadKey.value+1
        }

        return {
            store,
            pageLevelEndPoint,
            loaderSettings,
            btnLoader,
            record,
            errors,
            sweetalertMessage,
            btnLoaderAction,
            login,
            Helpers,
            HelperData,
            loadHelper,
            loadKey,
        }
    },
})
</script>
