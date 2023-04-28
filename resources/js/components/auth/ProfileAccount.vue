<template>
<Transition name="modal">
    <div class="card"
            v-if="recordObj.activeTab == 'account'">

        <!-- Loading -->
        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

        <div class="card-body py-2 my-25">
            <!-- header section -->
            <div class="d-flex align-items-center">
            <a href="#" class="me-25">
                <div v-if="profile.avatar" class="avatar avatar-xl">
                    <img :src="Helpers.mediaPath()+Helpers.getMedia(profile.avatar)['path']" alt="avatar">
                </div>
                <div v-else class="avatar bg-light-success avatar-xl">
                    <span class="avatar-content">
                        {{Helpers.shortName()}}
                    </span>
                </div>
            </a>
            <!-- upload media -->
            <div class="d-flex align-items-end mt-5 ms-1">
                <div>
                <label @click="addEditModalBtn('add',''),selectMediaBtn({field:'profile'})" for="account-upload" class="btn btn-sm btn-primary mb-10 me-75">Upload</label>
                <p class="mb-0">Allowed file types: png, jpg, jpeg.</p>
                </div>
            </div>
            <!--/ upload media -->
            </div>
            <!--/ header section -->

            <!-- form -->
            <form class="validate-form mt-2 pt-20">
            <div class="row">
                <div class="col-12 col-sm-6 mb-10">
                    <label class="form-label" for="accountFirstName">First Name</label>
                    <input
                        type="text"
                        class="form-control"
                        :class="[errors.first_name != null?'is-invalid':'']"
                        id="accountFirstName"
                        v-model="profile.first_name"
                        placeholder="John"
                        data-msg="Please enter first name"
                    />
                    <div class="invalid-feedback" v-if="errors.first_name != null">{{errors.first_name[0]}}</div>
                </div>
                <div class="col-12 col-sm-6 mb-10">
                    <label class="form-label" for="accountLastName">Last Name</label>
                    <input
                        type="text"
                        class="form-control"
                        :class="[errors.last_name != null?'is-invalid':'']"
                        id="accountLastName"
                        v-model="profile.last_name"
                        placeholder="Doe"
                        data-msg="Please enter last name"
                    />
                    <div class="invalid-feedback" v-if="errors.last_name != null">{{errors.last_name[0]}}</div>
                </div>
                <div class="col-12 col-sm-12 mb-10">
                    <label class="form-label" for="accountEmail">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        :class="[errors.email != null?'is-invalid':'']"
                        id="accountEmail"
                        v-model="profile.email"
                        placeholder="Email"
                    />
                    <div class="invalid-feedback" v-if="errors.email != null">{{errors.email[0]}}</div>
                </div>
                <div class="col-12 col-sm-6 mb-10">
                    <label class="form-label" for="accountPhoneNumber">Phone Number</label>
                    <input
                        type="text"
                        class="form-control account-number-mask"
                        :class="[errors.phone_number != null?'is-invalid':'']"
                        id="accountPhoneNumber"
                        v-model="profile.phone_number"
                        placeholder="Phone Number"
                    />
                    <div class="invalid-feedback" v-if="errors.phone_number != null">{{errors.phone_number[0]}}</div>
                </div>
                <div class="col-12 col-sm-6 mb-10">
                    <label class="form-label" for="accountMobileNumber">Mobile Number</label>
                    <input
                        type="text"
                        class="form-control account-number-mask"
                        :class="[errors.mobile_number != null?'is-invalid':'']"
                        id="accountMobileNumber"
                        v-model="profile.mobile_number"
                        placeholder="Mobile Number"
                    />
                    <div class="invalid-feedback" v-if="errors.mobile_number != null">{{errors.mobile_number[0]}}</div>
                </div>
                <div class="col-12 col-sm-12 mb-10">
                    <label class="form-label" for="accountAddress">Address</label>
                    <input
                        type="text"
                        class="form-control account-number-mask"
                        :class="[errors.address != null?'is-invalid':'']"
                        id="accountAddress"
                        v-model="profile.address"
                        placeholder="Address"
                    />
                    <div class="invalid-feedback" v-if="errors.address != null">{{errors.address[0]}}</div>
                </div>
                <div class="col-12 col-sm-12 mb-10">
                    <label class="form-label" for="aboutMe">About Me</label>
                    <textarea
                        type="text"
                        class="form-control account-number-mask"
                        :class="[errors.about_me != null?'is-invalid':'']"
                        id="aboutMe"
                        v-model="profile.about_me"
                        placeholder="About Me"
                    ></textarea>
                    <div class="invalid-feedback" v-if="errors.about_me != null">{{errors.about_me[0]}}</div>
                </div>
                <div class="col-12 mt-10">
                    <button @click.prevent="updateBtn()" type="submit" class="btn btn-primary mt-1 me-1">Save changes</button>
                </div>
            </div>
            </form>
            <!--/ form -->
        </div>

        <Teleport to="body">
            <FileManagerModal 
                :recordObj="{
                    recordId:recordId,
                    actionMode:actionMode,
                    activeStatus:activeStatus,
                    showModal:showModal,
                    modalName:modalName,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
                @selected-media-files="selectedMediaFiles"
            ></FileManagerModal>
        </Teleport>

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
import JwtService from "../../services/JwtService";

export default defineComponent({
    name: "profile-account",
    components: {
        FileManagerModal,
        GlobalLoader,
    },
    props: {
        recordObj: {
            type: Object,
            required: true
        },
    },
    created(){
        this.getProfile()
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
        const errors : any = ref([]);

        const profileTabBtn = (link) => {
            activeTab.value = link
        }

        const addEditModalBtn = (mode,itemId) => {
            actionMode.value = mode
            recordId.value = itemId
            showModal.value = true
            modalName.value = 'FileManagerModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const selectMediaBtn = (data:any) => {
            var mediaSettings = Helpers.defaultThumbnailSizes()['profile']
            mediaSettings['field'] = data.field
            store.dispatch(Actions.SET_SELECT_MEDIA_ACTION,mediaSettings);
            window.dispatchEvent(new CustomEvent(
                'fileManagerModalListener', 
                {
                    detail: {
                        value:true
                    }
                }
            ))
            // console.log('SET_SELECT_MEDIA_ACTION after',JSON.stringify(store.state.SelectMediaModule.select_media_data))
        }

        const closeModal = (data) => {
            $("body").css({"overflow":"visible","padding-right":"0"});
            if(data.showModal == false){
                showModal.value = data.showModal
            }
        }

        const selectedMediaFiles = (data) => {
            // profile.value.avatar = res.data.profile.avatar
            profile.value.avatar = data.files[0]
            profile.value.media_meta = data.mediaMeta
            //console.log('selectedMediaFiles=',data)
        }

        const updateBtn = () => {
            loaderSettings.value.active = true;
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, profile.value)
                .then((res) => {
                    if(res.data.status == 'success'){
                        store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });
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
                        window.dispatchEvent(new CustomEvent(
                            'profileUpdateListener', 
                            {
                                detail: {
                                    value:true,
                                    data: profile.value
                                }
                            }
                        ))
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
            axios.get(Helpers.completeUrl()+pageLevelEndPoint.value)
                .then((res) => {
                    // https://www.npmjs.com/package/vue3-lazyload
                    profile.value = res.data
                    if(res.data.profile){
                        profile.value.avatar = res.data.profile.avatar
                        profile.value.first_name = res.data.profile.first_name
                        profile.value.last_name = res.data.profile.last_name
                        profile.value.phone_number = res.data.profile.phone_number
                        profile.value.mobile_number = res.data.profile.mobile_number
                        profile.value.address = res.data.profile.address
                        profile.value.about_me = res.data.profile.about_me
                    }
                    loaderSettings.value.active = false;
                })
        }
        
        return {
            store,
            pageLevelEndPoint,
            
            loaderSettings,
            errors,

            recordId,
            actionMode,
            addEditModalBtn,
            selectMediaBtn,
            closeModal,
            selectedMediaFiles,
            updateBtn,

            showModal,
            modalName,

            profileTabBtn,
            activeTab,

            profile,
            getProfile,
            Helpers,
        }
    }
});
</script>