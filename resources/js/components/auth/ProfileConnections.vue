<template>
<Transition name="modal">
    <div class="card" v-if="recordObj.activeTab == 'connections'">
        <!-- Loading -->
        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

        <div class="card-body py-2 my-25" v-if="setupSocials.length > 0">
            <div class="row" v-for="(social,index) in setupSocials" :key="index">
                <label class="col-form-label col-12 col-sm-3 mb-10" :for="social.name">{{social.name}}</label>
                <div class="col-12 col-sm-9 mb-10">
                    <input
                        type="text"
                        class="form-control"
                        @input="onChangeSocial()"
                        :class="[errors[social.slug] != null?'is-invalid':'']"
                        :id="social.name"
                        v-model="social.url"
                        :placeholder="social.name"
                    />
                    <div class="invalid-feedback" :class="[errors[social.slug] != null?'d-block':'']" v-if="errors[social.slug]">{{errors[social.slug][0]}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-3"></div>
                <div class="col-12 col-sm-9">
                    <button @click.prevent="updateBtn()" type="submit" class="btn btn-primary me-1 mt-1">Save changes</button>
                </div>
            </div>
        </div>
        <div class="card-body py-2 my-25 text-center" v-else>
            No record found!
            <div class="mt-10" v-if="Helpers.hasPermission('setup_social','can_add')">
                <router-link 
                    class="btn btn-primary"
                    :to="Helpers.appEndPoint()+'/setup/socials'">
                        Add Social
                </router-link>
            </div>
        </div>
    </div>
</Transition>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Actions, Mutations } from "../../store/enums/StoreEnums";
import Swal from 'sweetalert2'
import $ from "jquery"
import Helpers from "../../components/helpers/helpers"

import FileManagerModal from "@/components/modals/FileManagerModal.vue";
import GlobalLoader from "@/components/global/Loader.vue";

export default defineComponent({
    name: "profile-connections",
    components: {
        FileManagerModal,
        GlobalLoader,
    },
    props: {
        recordObj: {
            type: Object,
            required: true,
        },
    },
    watch: {
        recordObj: {
            handler: function (val, oldVal) {
                console.log('val=',val)
                if(val.activeTab == 'connections'){
                    this.getSocials()
                    this.getProfile()
                }
            },
            deep: true
        },
    },
    created(){
        // this.getProfile()
    },
    methods:{},
    setup(){
        const store = useStore();
        const route = useRoute();
        const pageLevelEndPoint = ref('/profile')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const recordId = ref('');
        const actionMode = ref('')

        const showModal = ref(false)
        const modalName = ref('')

        const activeTab = ref('account')

        const profile : any = ref({})
        const errors : any = ref([])

        const setupSocials = ref([])

        const profileTabBtn = (link) => {
            activeTab.value = link
        }

        const onChangeSocial = () => {
            profile.value.socials = setupSocials.value
        }

        const updateBtn = () => {
            loaderSettings.value.active = true;
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value+'/socials', profile.value)
                .then((res) => {
                    if(res.data.status == 'success'){
                        errors.value = []
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
                        },100)
                    } else {
                        errors.value = res.data.errors
                        setTimeout(() => {
                            loaderSettings.value.active = false;
                        },100)
                    }
                })
                .catch((error) => {
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
                });
        }

        const getSocials = () => {
            loaderSettings.value.active = true;
            axios.get(Helpers.completeUrl()+'/setup/socials/get?status=active&sort=asc&column=order_by')
                .then((res) => {
                    setupSocials.value = res.data
                    // console.log('getSocials res.data=',res.data)
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },100)
                })
                .catch((error) => {
                    console.log(error);
                });
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

        const sweetalertAction = (data) => {
            const Toast = Swal.mixin({
                toast: data.toast,
                position: data.position,
                showConfirmButton: data.confirmBtn,
                showCancelButton: data.cancelBtn,
                confirmButtonText: data.confirmButtonText,
                timer: data.timer,
                timerProgressBar: data.progressBar,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            if(data.status == 'success' || data.status == 'error' || data.status == 'warning' || data.status == 'info' || data.status == 'question'){
                if(data.toast == true){
                    if(data.requestType == 'trash' || data.requestType == 'delete'){
                        Toast.fire({
                            icon: data.status,
                            title: data.title,
                            text: data.message
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // bulkAction.value = data.requestType,
                                // selectedItems.value.push(data.requestedId)
                                // bulkActionRequest()
                            }
                        })
                    } else {
                        Toast.fire({
                            icon: data.status,
                            title: data.title,
                            text: data.message
                        })
                    }
                } else {
                    if(data.requestType == 'trash' || data.requestType == 'delete'){
                        Swal.fire({
                            title: data.title,
                            text: data.message,
                            icon: data.icon,
                            showCloseButton: data.showCloseButton,
                            showCancelButton: data.cancelBtn,
                            confirmButtonText: data.confirmButtonText,
                            cancelButtonText: data.cancelButtonText,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // bulkAction.value = data.requestType,
                                // selectedItems.value.push(data.requestedId)
                                // bulkActionRequest()
                            }
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
            }
        }

        const getProfile = () => {
            loaderSettings.value.active = true;
            axios.get(Helpers.completeUrl()+pageLevelEndPoint.value, profile.value)
                .then((res) => {
                    profile.value = res.data
                    getSocialSettings(res.data.socials)
                    loaderSettings.value.active = false
                })
        }

        const getSocialSettings = (arrayData) => {
            // console.log('getSocialSettings=',arrayData)
            // console.log('setupSocials.value=',setupSocials.value)
            setupSocials.value.forEach((item:any) => {
                var x : any = Helpers.findInArray(arrayData,{social_id:item['id']})
                // console.log('item2=',Helpers.findInArray(arrayData,{social_id:item['id']}))
                item.url = x.url
                item.slug = item.slug
                onChangeSocial()
                // alert(item.slug)
            });
            // return arrayData
        }
        
        return {
            store,
            pageLevelEndPoint,
            
            loaderSettings,
            errors,

            recordId,
            actionMode,
            updateBtn,

            showModal,
            modalName,

            profileTabBtn,
            activeTab,

            profile,
            getProfile,
            Helpers,

            getSocials,
            setupSocials,
            onChangeSocial,
        }
    }
});
</script>