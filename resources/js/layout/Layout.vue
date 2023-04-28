<template>
    <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />

    <!-- BEGIN: Header-->
    <nav class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
        <div class="navbar-container d-flex content">
            <div class="bookmark-wrapper d-flex align-items-center">
                <ul class="nav navbar-nav d-xl-none">
                    <li class="nav-item">
                        <a class="nav-link menu-toggle" href="#">
                            <vue-feather class="ficon" type="menu" size="14"></vue-feather>
                        </a>
                    </li>
                </ul>
            </div>
            <ul class="nav navbar-nav align-items-center ms-auto">
                <!-- <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-style"><i class="ficon" data-feather="sun"></i></a></li> -->
                <li class="nav-item dropdown dropdown-user"><a class="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="user-nav d-sm-flex d-none">
                            <span class="user-name fw-bolder">
                                {{profile.first_name}}
                                {{profile.last_name}}
                            </span>
                            <span class="user-status">{{Helpers.role()}}</span>
                        </div>
                        <span class="avatar" v-if="profile.avatar">
                            <img class="round" :src="Helpers.mediaPath()+profile.avatar" alt="avatar" height="40" width="40">
                        </span>
                        <span class="avatar bg-light-success avatar-lg" v-else>
                            <span class="avatar-content">
                                {{profile.short_name}}
                            </span>
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
                        <router-link to="/admin/profile" class="dropdown-item"><vue-feather class="icon" type="user" size="16"></vue-feather> Profile</router-link>
                        <router-link to="/admin/settings" class="dropdown-item" v-if="Helpers.roleSlug() == 'super_admin'">
                            <vue-feather class="icon" type="settings" size="16"></vue-feather> 
                            Settings
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a @click="logout()" class="dropdown-item"><vue-feather class="icon" type="power" size="16"></vue-feather> Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <!-- END: Header-->

    <AsideMenu></AsideMenu>

    <!-- BEGIN: Content-->
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path" />
        </transition>
    </router-view>
    <!-- <router-view></router-view> -->

    <div id="gistsx"></div>

    <!-- END: Content-->
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import $ from "jquery"
import postscribe from 'postscribe'

import { useStore } from "vuex";
import { Actions, Mutations } from "../store/enums/StoreEnums";
import Helpers from "../components/helpers/helpers"
import Swal from 'sweetalert2'

import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';

import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from "../components/helpers/config";

import AsideMenu from "@/components/core/AsideMenu.vue";
import KTLoader from "@/components/global/KTLoader.vue";
export default defineComponent({
    components: {
        AsideMenu,
        KTLoader,
    },
    created(){
        // console.log('1=',Helpers.findInArray(Helpers.currentUserThumbnails(),{thumbnail:'thumbnail'})['path'])
        // this.getNotifications()
    },
    setup() {

        const appEndPoint = ref(process.env.MIX_APP_END_POINT)
        const apiEndPoint = ref(process.env.MIX_APP_API_END_POINT)

        onMounted(() => {
            // var pusher = new Pusher("0f1ac7001644a223b6ed", {
            //     cluster: "us2",
            // });

            // var channel = pusher.subscribe("messaging-development");

            // channel.bind("channel-name-messaging", (data:any) => {
            //     // getNotifications()
            //     console.log('omggg realtime bro',data)
            // });

        });

        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const count = ref(0)
        const notifications = ref([])
        const unseens = ref(0)

        const profile :any = ref({
            avatar: Helpers.findInArray(Helpers.currentUserThumbnails(),{thumbnail:'thumbnail'})['path'],
            first_name: Helpers.firstName(),
            last_name: Helpers.lastName(),
            short_name: Helpers.shortName(),
        })

        const authAvatar :any = ref(Helpers.findInArray(Helpers.currentUserThumbnails(),{thumbnail:'thumbnail'})['path'])

        onMounted(() => {
            //check if current user is authenticated
            if (!store.getters.isUserAuthenticated) {
                router.push({ name: "login" });
            } else {
                $(".page-loader").css({"display":"none"});
            }

            window.addEventListener('profileUpdateListener', (event) => {
                if (event['detail'].value) {
                    profile.value.avatar = Helpers.findInArray(event['detail'].data.avatar.thumbnails,{thumbnail:'thumbnail'})['path']
                    profile.value.first_name = event['detail'].data.first_name
                    profile.value.last_name = event['detail'].data.last_name
                    profile.value.short_name = event['detail'].data.first_name[0]+event['detail'].data.last_name[0]
                }
            })

            nextTick(() => {
                // reinitializeComponents();
            });

            window.addEventListener('haveSeenMessages', (event) => {
                if (event['detail'].value) {
                    // getNotifications()
                }
            })

        });
        
        const logout = () => {
            store.dispatch(Actions.LOGOUT).then(() => router.push({ name: "login" }));
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

        return {
            appEndPoint,
            store,
            logout,
            loaderEnabled,
            loaderLogo,
            Helpers,
            profile,
            authAvatar,
            sweetalertMessage,
        }
    },
})
</script>
<style lang="css">
.slide-enter-active,
.slide-leave-active {
    transition: opacity 1s, transform 1s;
}
.slide-enter-from,
.slide-leave-from {
    opacity: 0;
    transform: translateX(-30%);
}
.moveUp-enter-active,
.moveUp-leave-active {
    animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
    0% { opacity: 0s; }
    50% { opacity: 0.5s; }
    100% { opacity: 1s; }
}
/* .moveUp-leave-active {
    animation: moveUp 0.3s ease-in;
}
@keyframes moveUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-400px); }
} */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>