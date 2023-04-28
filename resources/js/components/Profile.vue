<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Profile</h2>
                            <!-- modal trigger button -->
                            <div class="d-flex align-items-center">
                                <!-- <button type="button" class="btn btn-sm btn-primary ml-10 mb-12">
                                    Add New
                                </button> -->
                            </div>
                            <!-- <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><router-link :to="'/admin'">Dashboard</router-link>
                                    </li>
                                    <li class="breadcrumb-item"><router-link :to="'#'">Setup</router-link>
                                    </li>
                                    <li class="breadcrumb-item active">Profile
                                    </li>
                                </ol>
                            </div> -->
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
                                <!-- account -->
                                <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'account'?'active':'']"
                                    @click="profileTabBtn('account')">
                                        <vue-feather class="icon" type="user" size="14"></vue-feather>
                                        <span class="fw-bold">Account</span>
                                    </button>
                                </li>
                                <!-- security -->
                                <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'security'?'active':'']"
                                    @click="profileTabBtn('security')">
                                        <vue-feather class="icon" type="lock" size="14"></vue-feather>
                                        <span class="fw-bold">Security</span>
                                    </button>
                                </li>
                                <!-- connection -->
                                <!-- <li class="nav-item">
                                    <button class="nav-link" 
                                    :class="[activeTab == 'connections'?'active':'']"
                                    @click="profileTabBtn('connections')">
                                        <vue-feather class="icon" type="link" size="14"></vue-feather>
                                        <span class="fw-bold">Connections</span>
                                    </button>
                                </li> -->
                            </ul>
                        </div>
                        <div class="col-md-9">

                            <ProfileAccount 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                            ></ProfileAccount>
                            <ProfileSecurity 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                            ></ProfileSecurity>
                            <ProfileConnections 
                                :recordObj="{
                                    recordId:recordId,
                                    activeTab:activeTab,
                                }"
                            ></ProfileConnections>

                        </div>
                    </div>
                        
                </section>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Actions, Mutations } from "../store/enums/StoreEnums";
import Swal from 'sweetalert2'
import $ from "jquery"

// import FileManagerModal from "@/components/modals/FileManagerModal.vue";
import ProfileAccount from "@/components/auth/ProfileAccount.vue"
import ProfileSecurity from "@/components/auth/ProfileSecurity.vue"
import ProfileConnections from "@/components/auth/ProfileConnections.vue"
// import TestModal from "@/components/modals/TestModal.vue";
// import Status from "@/components/global/Status.vue";
import GlobalLoader from "@/components/global/Loader.vue";

export default defineComponent({
    name: "profile",
    components: {
        GlobalLoader,
        ProfileAccount,
        ProfileSecurity,
        ProfileConnections,
    },
    created(){
    },
    methods:{},
    setup(){
        const store = useStore();
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });
        const recordId = ref('');
        const actionMode = ref('')
        const activeTab = ref('account')

        const profileTabBtn = (link) => {
            activeTab.value = link
        }

        return {
            store,
            loaderSettings,
            recordId,
            actionMode,
            profileTabBtn,
            activeTab,
        }
    }
});
</script>