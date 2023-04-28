<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Jobs</h2>
                            <div class="d-flex align-items-center">
                                <!-- <button type="button" class="btn btn-sm btn-primary ml-10 mb-12" @click="addEditModalBtn('add','')">
                                    Add New
                                </button> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                    <div class="mb-1 breadcrumb-right">
                    </div>
                </div>
            </div>
            <div class="content-body" ref="loadingRefContainer">

                <!-- <p class="mb-10">
                A role provided access to predefined menus and features so that depending <br />
                on assigned role an administrator can have access to what he need
                </p> -->

                <div class="row">
                    <div class="col-xl-4 col-lg-6 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-end mt-1 pt-10">
                                    <div class="role-heading" style="width: 100%;">
                                        <div>
                                            {{migratePersons}}
                                        </div>
                                        <div>
                                            <h4 class="fw-bolder mt-10">Persons</h4>
                                            <!-- <a @click="jobStartBtn('edit')" class="role-edit-modal">
                                                <small class="fw-bolder">Start</small>
                                            </a> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
            
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import RolesModal from "@/components/modals/RolesModal.vue";
import Status from "@/components/global/Status.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import UsersAvatars from "@/components/global/UsersAvatars.vue";
import Swal from 'sweetalert2'
import $ from "jquery"
import * as Helpers from "../components/helpers/helpers"

export default defineComponent({
    name: "jobs",
    components: {
        UsersAvatars,
        Status,
        RolesModal,
        GlobalLoader,
    },
    created(){
        this.getItems()
        window.setInterval(() => {
            this.getItems()
        }, 30000) // 60000 milliseconds = one minute
    },
    methods:{},
    setup(){
        const route = useRoute();
        const pageLevelEndPoint = ref('/jobs')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const jobBtn = () => {
            alert('asd');
        }

        const migratePersons : any = ref(0);

        const jobStartBtn = () => {
            loaderSettings.value.active = true;
            axios.get(Helpers.appUrl()+'/hourly-update')
                .then(res => {
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
                .catch((error:any) => {
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
        }

        const getItems = (page = 1) => {
            loaderSettings.value.active = true;
            axios.get(Helpers.completeUrl()+pageLevelEndPoint.value+'/migrated-persons')
                .then(res => {
                    migratePersons.value = res.data.persons
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
                .catch((error:any) => {
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
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
        
        return {
            pageLevelEndPoint,
            loaderSettings,
            getItems,
            sweetalertMessage,
            jobBtn,
            migratePersons,
            jobStartBtn,
        }
    }
});
</script>