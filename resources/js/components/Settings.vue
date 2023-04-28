<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Settings</h2>
                            <!-- modal trigger button -->
                            <div class="d-flex align-items-center">
                                <!-- <button type="button" class="btn btn-sm btn-primary ml-10 mb-12">
                                    Add New
                                </button> -->
                            </div>
                            <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><router-link :to="'/admin'">Dashboard</router-link>
                                    </li>
                                    <li class="breadcrumb-item active">{{activeTab}}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                    <div class="mb-1 breadcrumb-right">
                        <!-- <div class="dropdown">
                            <button class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="grid"></i></button>
                            <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="app-todo.html"><i class="me-1" data-feather="check-square"></i><span class="align-middle">Todo</span></a><a class="dropdown-item" href="app-chat.html"><i class="me-1" data-feather="message-square"></i><span class="align-middle">Chat</span></a><a class="dropdown-item" href="app-email.html"><i class="me-1" data-feather="mail"></i><span class="align-middle">Email</span></a><a class="dropdown-item" href="app-calendar.html"><i class="me-1" data-feather="calendar"></i><span class="align-middle">Calendar</span></a></div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="content-body" ref="loadingRefContainer">
                <section class="app-user-list">

                    <div class="row mt-15">
                        <div class="col-md-3">
                            <ul class="nav nav-pills mb-2 full-width-nav-pills">
                                <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'general'?'active':'']"
                                    @click="settingTabBtn('general')">
                                        <vue-feather class="icon" type="minus" size="14"></vue-feather>
                                        <span class="fw-bold">General</span>
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'twilio'?'active':'']"
                                    @click="settingTabBtn('twilio')">
                                        <vue-feather class="icon" type="minus" size="14"></vue-feather>
                                        <span class="fw-bold">Twilio</span>
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'smtp'?'active':'']"
                                    @click="settingTabBtn('smtp')">
                                        <vue-feather class="icon" type="minus" size="14"></vue-feather>
                                        <span class="fw-bold">SMTP</span>
                                    </button>
                                </li>
                                <!-- <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'captcha'?'active':'']"
                                    @click="settingTabBtn('captcha')">
                                        <vue-feather class="icon" type="minus" size="14"></vue-feather>
                                        <span class="fw-bold">Captcha</span>
                                    </button>
                                </li> -->
                                <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'logos'?'active':'']"
                                    @click="settingTabBtn('logos')">
                                        <vue-feather class="icon" type="minus" size="14"></vue-feather>
                                        <span class="fw-bold">Logos</span>
                                    </button>
                                </li>
                                <!-- <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'socials'?'active':'']"
                                    @click="settingTabBtn('socials')">
                                        <vue-feather class="icon" type="minus" size="14"></vue-feather>
                                        <span class="fw-bold">Socials</span>
                                    </button>
                                </li> -->
                            </ul>
                        </div>
                        <div class="col-md-9">

                            <SettingsGeneral 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                                @refresh-parent-data="loadParentData"
                            ></SettingsGeneral>
                            <SettingsTwilio 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                                @refresh-parent-data="loadParentData"
                            ></SettingsTwilio>
                            <SettingsSmtp 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                                @refresh-parent-data="loadParentData"
                            ></SettingsSmtp>
                            <SettingsCaptcha 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                                @refresh-parent-data="loadParentData"
                            ></SettingsCaptcha>
                            <SettingsLogos 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                                @refresh-parent-data="loadParentData"
                            ></SettingsLogos>
                            <SettingsSocials 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                                @refresh-parent-data="loadParentData"
                            ></SettingsSocials>

                            <!-- Tab -->
                            <!-- <Transition name="modal">
                                <div class="card">

                                    <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

                                    <div class="card-body py-2 my-25">
                                        <div class="mb-10 row">
                                            <div class="col-sm-3">
                                                <label class="col-form-label" :for="'app_name'">App Name</label>
                                            </div>
                                            <div class="col-sm-9">
                                                <input type="text" :id="'app_name'" class="form-control" v-model="general.app_name" :placeholder="'App Name'">
                                            </div>
                                        </div>
                                        <div class="mb-10 row">
                                            <div class="col-sm-3">
                                                <label class="col-form-label" :for="'app_title'">App Title</label>
                                            </div>
                                            <div class="col-sm-9">
                                                <input type="text" :id="'app_title'" class="form-control" v-model="general.app_title" :placeholder="'App Title'">
                                            </div>
                                        </div>
                                        <div class="mb-10 row">
                                            <div class="col-sm-3">
                                                <label class="col-form-label" :for="'app_url'">App URL</label>
                                            </div>
                                            <div class="col-sm-9">
                                                <input type="text" :id="'app_url'" class="form-control" v-model="general.app_url" :placeholder="'App URL'">
                                            </div>
                                        </div>
                                        <div class="mb-10 row">
                                            <div class="col-sm-3">
                                                <label class="col-form-label" :for="'app_email'">App Email</label>
                                            </div>
                                            <div class="col-sm-9">
                                                <input type="text" :id="'app_email'" class="form-control" v-model="general.app_email" :placeholder="'App Email'">
                                            </div>
                                        </div>
                                        <div class="mb-10 row">
                                            <div class="col-sm-3">
                                                <label class="col-form-label" :for="'app_copyright'">App Copyright</label>
                                            </div>
                                            <div class="col-sm-9">
                                                <input type="text" :id="'app_copyright'" class="form-control" v-model="general.app_copyright" :placeholder="'App Copyright'">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-9 offset-sm-3">
                                                <button @click.prevent="saveBtn()" type="reset" class="btn btn-primary me-1 waves-effect waves-float waves-light">Submit</button>
                                                <button type="reset" class="btn btn-outline-secondary waves-effect">Reset</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </Transition> -->
                            <!-- /Tab -->

                        </div>
                    </div>
                        
                </section>
            </div>
        </div>
            
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Actions, Mutations } from "../store/enums/StoreEnums";
import Swal from 'sweetalert2'
import $ from "jquery"
import Helpers from "../components/helpers/helpers"
import ApiService from "../services/ApiService"
import JwtService from "../services/JwtService"

// import SettingsTab from "@/components/auth/SettingsTab.vue"
import GlobalLoader from "@/components/global/Loader.vue";

import SettingsGeneral from "@/components/partials/SettingsGeneral.vue"
import SettingsTwilio from "@/components/partials/SettingsTwilio.vue"
import SettingsSmtp from "@/components/partials/SettingsSmtp.vue"
import SettingsCaptcha from "@/components/partials/SettingsCaptcha.vue"
import SettingsLogos from "@/components/partials/SettingsLogos.vue"
import SettingsSocials from "@/components/partials/SettingsSocials.vue"


export default defineComponent({
    name: "profile",
    components: {
        GlobalLoader,
        // SettingsTab,
        SettingsGeneral,
        SettingsTwilio,
        SettingsSmtp,
        SettingsCaptcha,
        SettingsLogos,
        SettingsSocials,
    },
    created(){
        // if(Helpers.roleSlug() != 'super_admin'){
        //     this.router.push({ name: 'not-authorized' })
        // }
        // this.notAuthorized()
        this.getSettings()
    },
    methods:{},
    setup(){
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const pageLevelEndPoint = ref('/settings')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const settings : any = ref([])
        const general : any = ref({})

        const recordId = ref('');
        const actionMode = ref('')

        const activeTab = ref('general')

        const notAuthorized = () => {
            if(Helpers.roleSlug() != 'super_admin'){
                router.push({ name: 'not-authorized' })
            }
        }

        const settingTabBtn = (link) => {
            activeTab.value = link
        }

        const loadParentData = (data) => {
            if(data.refresh){
                ApiService.get(process.env.MIX_APP_END_POINT+"/app-settings")
                .then((res) => {
                    JwtService.saveAppSettings(JSON.stringify(res.data))
                    // store.dispatch(Actions.APP_SETTINGS_ACTION,res.data);
                })
            }
        }

        const getSettings = () => {
            
            // ApiService.get(process.env.MIX_APP_END_POINT+"/app-settings")
            // .then((res) => {
            //     JwtService.saveAppSettings(JSON.stringify(res.data))
            //     // store.dispatch(Actions.APP_SETTINGS_ACTION,res.data);
            // })

            // loaderSettings.value.active = true;
            // axios.get(Helpers.completeUrl()+pageLevelEndPoint.value)
            //     .then(res => {
            //         settings.value = res.data
            //         // activeTab.value = res.data[0]?res.data[0]['slug']:''
            //         setTimeout(() => {
            //             loaderSettings.value.active = false;
            //         },500)
            //     })
        }

        const saveBtn = () => {
            loaderSettings.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value,{
                general:general.value
            })
                .then(res => {
                    // console.log('res.data',res.data)
                    sweetalertMessage({
                        status: res.data.status,
                        title: '',
                        message: res.data.message,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
                .catch(error => {
                    loaderSettings.value.active = false;
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.statusText,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                })
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
                    position: data.position,
                    timer: data.timer,
                    timerProgressBar: data.progressBar,
                    showConfirmButton: data.showConfirmButton,
                    icon: data.status,
                    title: data.title,
                    text: data.message,
                })
            }
        }

        const selectedMediaFiles = (data) => {
            //console.log('selectedMediaFiles=',data)
        }
        
        return {
            store,
            router,
            // pageLevelEndPoint,
            
            loaderSettings,

            settings,
            general,

            recordId,
            actionMode,
            getSettings,
            loadParentData,
            selectedMediaFiles,

            settingTabBtn,
            activeTab,

            saveBtn,
            notAuthorized,
        }
    }
});
</script>