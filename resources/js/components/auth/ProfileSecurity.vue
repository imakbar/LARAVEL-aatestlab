<template>
<Transition name="modal">
    <div class="card" v-if="recordObj.activeTab == 'security'">
        <!-- Loading -->
        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

        <div class="card-body py-2 my-25">
            <div class="row">
                <div class="col-12 col-sm-6 mb-10">
                    <label class="form-label" for="account-old-password">Old password</label>
                    <div class="input-group form-password-toggle input-group-merge"
                        :class="[errors.old_password != null?'is-invalid':'']"
                    >
                        <input
                        :type="oldPassword"
                        class="form-control"
                        :class="[errors.old_password != null?'is-invalid':'']"
                        id="account-old-password"
                        v-model="profile.old_password"
                        placeholder="********"
                        data-msg="Please old password"
                        />
                        <div class="input-group-text cursor-pointer" @click="showPasswordBtn('oldPassword')">
                            <vue-feather class="icon" :type="[oldPassword=='text'?'eye-off':'eye']" size="14"></vue-feather>
                        </div>
                    </div>
                    <div class="invalid-feedback" :class="[errors.old_password != null?'d-block':'']" v-if="errors.old_password != null">{{errors.old_password[0]}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-6 mb-10" :key="key">
                    <label class="form-label" for="account-new-password">New Password</label>
                    <div class="input-group form-password-toggle input-group-merge"
                        :class="[errors.new_password != null?'is-invalid':'']"
                    >
                        <input
                        :type="newPassword"
                        class="form-control"
                        :class="[errors.new_password != null?'is-invalid':'']"
                        id="account-new-password"
                        v-model="profile.new_password"
                        placeholder="********"
                        />
                        <div class="input-group-text cursor-pointer" @click="showPasswordBtn('newPassword')">
                            <vue-feather class="icon" :type="[newPassword=='text'?'eye-off':'eye']" size="14"></vue-feather>
                        </div>
                    </div>
                    <div class="invalid-feedback" v-if="errors.new_password != null">{{errors.new_password[0]}}</div>
                </div>
                <div class="col-12 col-sm-6 mb-10">
                    <label class="form-label" for="account-confirm-new-password">Confirm New Password</label>
                    <div class="input-group form-password-toggle input-group-merge"
                        :class="[errors.confirm_new_password != null?'is-invalid':'']"
                    >
                        <input
                        :type="confirmNewPassword"
                        class="form-control"
                        :class="[errors.confirm_new_password != null?'is-invalid':'']"
                        id="account-confirm-new-password"
                        v-model="profile.confirm_new_password"
                        placeholder="********"
                        />
                        <div class="input-group-text cursor-pointer" @click="showPasswordBtn('confirmNewPassword')">
                            <vue-feather class="icon" :type="[confirmNewPassword=='text'?'eye-off':'eye']" size="14"></vue-feather>
                        </div>
                    </div>
                    <div class="invalid-feedback" v-if="errors.confirm_new_password != null">{{errors.confirm_new_password[0]}}</div>
                </div>
                <div class="col-12 mt-10">
                    <p class="fw-bolder">Password requirements:</p>
                    <ul class="mb-15">
                        <li class="mb-10">Minimum 8 characters long - the more, the better</li>
                        <li class="mb-10">At least one lowercase character</li>
                        <li>At least one number, symbol, or whitespace character</li>
                    </ul>
                </div>
                <div class="col-12">
                    <button @click.prevent="updateBtn()" type="submit" class="btn btn-primary me-1 mt-1">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</Transition>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { Actions, Mutations } from "../../store/enums/StoreEnums";
import Swal from 'sweetalert2'
import $ from "jquery"
import Helpers from "../../components/helpers/helpers"

import GlobalLoader from "@/components/global/Loader.vue";

export default defineComponent({
    name: "profile-security",
    components: {
        GlobalLoader,
    },
    props: {
        recordObj: {
            type: Object,
            required: true
        },
    },
    created(){
        // this.getItems()
    },
    methods:{},
    setup(){
        const store = useStore();
        const pageLevelEndPoint = ref('/profile/password')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const recordId = ref('');
        const actionMode = ref('')

        const showModal = ref(false)
        const activeTab = ref('')

        const profileTabBtn = (link) => {
            activeTab.value = link
        }

        const profile : any = ref({})
        const errors : any = ref([])

        const oldPassword = ref('password')
        const newPassword = ref('password')
        const confirmNewPassword = ref('password')

        // const addEditModalBtn = (mode,itemId) => {
        //     actionMode.value = mode
        //     recordId.value = itemId
        //     showModal.value = true
        //     activeTab.value = 'FileManagerModal'
        //     $("body").css({"overflow":"hidden","padding-right":"17px"});
        // }

        const closeModal = (data:any) => {
            $("body").css({"overflow":"visible","padding-right":"0"});
            if(data.showModal == false){
                showModal.value = data.showModal
            }
        }

        const selectedMediaFiles = (data:any) => {
            //console.log('selectedMediaFiles=',data)
        }
        const key : any = ref(0)

        const showPasswordBtn = (data:any) => {
            key.value = key.value+1
            if(data == 'oldPassword'){
                oldPassword.value = oldPassword.value=='text'?'password':'text'
            }
            if(data == 'newPassword'){
                newPassword.value = newPassword.value=='text'?'password':'text'
            }
            if(data == 'confirmNewPassword'){
                confirmNewPassword.value = confirmNewPassword.value=='text'?'password':'text'
            }
        }

        const updateBtn = () => {
            loaderSettings.value.active = true;
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, profile.value)
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
                            profile.value = {}
                        },100)
                    } else {
                        errors.value = res.data.errors
                        setTimeout(() => {
                            loaderSettings.value.active = false;
                        },100)
                    }
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
        
        return {
            store,
            loaderSettings,
            recordId,
            actionMode,
            // addEditModalBtn,
            closeModal,
            selectedMediaFiles,

            showModal,
            activeTab,

            profileTabBtn,

            profile,
            errors,

            oldPassword,
            newPassword,
            confirmNewPassword,
            showPasswordBtn,
            updateBtn,
            key,
        }
    }
});
</script>