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
                                <h2 class="card-title fw-bold mb-10">Reset Password? 🔒</h2>
                                <p class="card-text mb-2">Your new password must be different from previously used passwords</p>
                                <div class="auth-login-form mt-12" :key="key">
                                    
                                    <div class="input-group form-password-toggle input-group-merge mb-10"
                                        :class="[errors.password != null?'is-invalid':'']"
                                    >
                                        <input
                                        :type="newPassword"
                                        class="form-control"
                                        :class="[errors.password != null?'is-invalid':'']"
                                        id="account-new-password"
                                        v-model="record.password"
                                        placeholder="********"
                                        />
                                        <div class="input-group-text cursor-pointer" @click="showPasswordBtn('newPassword')">
                                            <vue-feather class="icon" :type="[newPassword=='text'?'eye-off':'eye']" size="14"></vue-feather>
                                        </div>
                                    </div>
                                    
                                    <div class="input-group form-password-toggle input-group-merge mb-10"
                                        :class="[errors.confirm_password != null?'is-invalid':'']"
                                    >
                                        <input
                                        :type="confirmNewPassword"
                                        class="form-control"
                                        :class="[errors.confirm_password != null?'is-invalid':'']"
                                        id="account-new-password"
                                        v-model="record.confirm_password"
                                        placeholder="********"
                                        />
                                        <div class="input-group-text cursor-pointer" @click="showPasswordBtn('confirmNewPassword')">
                                            <vue-feather class="icon" :type="[confirmNewPassword=='text'?'eye-off':'eye']" size="14"></vue-feather>
                                        </div>
                                    </div>
                                    
                                    <button @click="resetPassword(),btnLoaderAction('resetPassword')" class="btn btn-primary w-100" tabindex="4" type="submit">
                                        <span v-if="btnLoader.active && btnLoader.activeContent == 'resetPassword'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span :class="[btnLoader.active && btnLoader.activeContent == 'resetPassword'?'visually-hidden':'']">Reset password</span>
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
import Helpers from "../helpers/helpers"

import { useStore } from "vuex";
import { Actions, Mutations } from "../../store/enums/StoreEnums";

export default defineComponent({
    name: "reset-password",
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
        const pageLevelEndPoint = ref('/reset-password')

        const userId = ref(route.params.userId)
        const token = ref(route.params.token)
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const btnLoader = ref({
            active: false,
            hideContent: true,
            activeContent: ''
        })

        const newPassword = ref('password')
        const confirmNewPassword = ref('password')

        const btnLoaderAction = (data) => {
            btnLoader.value.activeContent = data
        }

        const loadKey : any = ref(0)
        const HelperData : any = ref({})

        const record = ref({})
        const errors : any = ref([])
        const key : any = ref(0)

        const showPasswordBtn = (data:any) => {
            key.value = key.value+1
            if(data == 'newPassword'){
                newPassword.value = newPassword.value=='password'?'text':'password'
            }
            if(data == 'confirmNewPassword'){
                confirmNewPassword.value = confirmNewPassword.value=='password'?'text':'password'
            }
        }

        const resetPassword = async () => {
            btnLoader.value.active = true;
            var data : any = record.value
            data.userId = userId.value
            data.token = token.value
            const resData = await store.dispatch(Actions.RESET_PASSWORD, record.value);
            const [errorName] = Object.keys(store.getters.getErrors);
            const error = store.getters.getErrors[errorName];

            if (!error) {
                sweetalertMessage({
                    status: 'success',
                    title: '',
                    message: 'Password reset successfully',
                    position: 'bottom-end',
                    timer: 3000,
                    progressBar: true,
                    toast: true,
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    window.location.href = `${Helpers.appEndPoint()}`+'/login';
                }, 3000);
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
            resetPassword,
            Helpers,
            showPasswordBtn,
            newPassword,
            confirmNewPassword,
            key,
            userId,
            token,
            HelperData,
            loadHelper,
            loadKey,
        }
    },
})
</script>
