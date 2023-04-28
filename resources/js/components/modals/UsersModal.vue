<template>
    <Transition name="modal">
        <div
            v-if="recordObj.showModal && recordObj.modalName == 'UsersModal'"
            class="modal-mask modal modal-overlay"
            >
            <div class="modal-dialog modal-lg fancy-scroll">
                <div class="modal-content">
                    <div class="modal-header bg-transparent">
                        <button @click="closeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-sm-2 pb-35 pt-0">
                        <div class="text-center mb-20">
                            <h1 class="mb-1">
                                <span v-if="recordObj.actionMode == 'add'">Add New User</span>
                                <span v-if="recordObj.actionMode == 'edit'">Edit User</span>
                            </h1>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 mb-10">
                                <label class="form-label" for="email">Email</label>
                                <input type="text" v-model="record.email" id="email" class="form-control" :class="[errors.email != null?'is-invalid':'']" />
                                <div class="invalid-feedback" :class="[errors.email != null?'d-block':'']" v-if="errors.email != null">{{errors.email[0]}}</div>
                            </div>
                            <div class="col-sm-6 mb-10">
                                <label class="form-label" for="first_name">First Name</label>
                                <input type="text" v-model="record.first_name" id="first_name" class="form-control" :class="[errors.first_name != null?'is-invalid':'']" />
                                <div class="invalid-feedback" :class="[errors.first_name != null?'d-block':'']" v-if="errors.first_name != null">{{errors.first_name[0]}}</div>
                            </div>
                            <div class="col-sm-6 mb-10">
                                <label class="form-label" for="last_name">Last Name</label>
                                <input type="text" v-model="record.last_name" id="last_name" class="form-control" :class="[errors.last_name != null?'is-invalid':'']" />
                                <div class="invalid-feedback" :class="[errors.last_name != null?'d-block':'']" v-if="errors.last_name != null">{{errors.last_name[0]}}</div>
                            </div>
                            <div class="col-sm-6 mb-10" v-if="recordObj.actionMode != 'add'">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" v-model="record.password" id="password" class="form-control" :class="[errors.password != null?'is-invalid':'']" />
                                <div class="invalid-feedback" :class="[errors.password != null?'d-block':'']" v-if="errors.password != null">{{errors.password[0]}}</div>
                            </div>
                            <div class="col-sm-6 mb-10" v-if="recordObj.actionMode != 'add'">
                                <label class="form-label" for="confirm_password">Confirm Password</label>
                                <input type="password" v-model="record.confirm_password" id="confirm_password" class="form-control" :class="[errors.confirm_password != null?'is-invalid':'']" />
                                <div class="invalid-feedback" :class="[errors.confirm_password != null?'d-block':'']" v-if="errors.confirm_password != null">{{errors.confirm_password[0]}}</div>
                            </div>
                            <div class="col-sm-12 mb-10">
                                <!-- upload media -->
                                <div class="d-flex align-items-center">
                                    <a class="mr-15">
                                        <div v-if="record.avatar" class="avatar avatar-lg">
                                            <img :src="Helpers.mediaPath()+Helpers.getMedia(record.avatar)['path']" alt="avatar">
                                        </div>
                                        <div v-else class="avatar bg-light-success avatar-lg text-uppercase">
                                            <span class="avatar-content">
                                                <span v-if="record.first_name">
                                                    {{Helpers.getShortName(record.first_name)}}
                                                </span>
                                                <span v-if="record.last_name">
                                                    {{Helpers.getShortName(record.last_name)}}
                                                </span>
                                            </span>
                                        </div>
                                    </a>
                                    <div class="d-flex align-items-end mt-5 ms-1">
                                        <div>
                                        <label @click="addEditModalBtn('add',''),selectMediaBtn({field:'avatar'})" for="account-upload" class="btn btn-sm btn-primary mb-10 me-75">Upload</label>
                                        <!-- <input type="file" id="account-upload" hidden accept="image/*" /> -->
                                        <!-- <button type="button" id="account-reset" class="btn btn-sm btn-outline-secondary mb-15">Reset</button> -->
                                        <p class="mb-0">Allowed file types: png, jpg, jpeg.</p>
                                        </div>
                                    </div>
                                </div>
                                <!--/ upload media -->
                            </div>
                            <div class="col-md-12 mb-10">
                                <label class="form-label" for="role_id">Role</label>
                                <v-select
                                    disabled="true"
                                    id="role_id"
                                    class="dropdown"
                                    :class="[errors.role_id != null?'is-invalid':'']"
                                    v-model="record.role_id"
                                    placeholder="Role"
                                    :clearable="true"
                                    :reduce="(option) => option.id"
                                    :options="getRoles"
                                    label="name"
                                >
                                    <template v-slot:option="option">
                                        <div class="list-item">
                                            <vue-feather class="icon" type="user" size="16"></vue-feather>
                                            {{ option.name }}
                                        </div>
                                    </template>
                                </v-select>
                                <div class="invalid-feedback" v-if="errors.role_id != null">{{errors.role_id[0]}}</div>
                            </div>
                            <div class="col-md-12 mb-10">
                                <label class="form-label" for="status">Status</label>
                                <v-select
                                    id="status"
                                    class="dropdown"
                                    :class="[errors.status != null?'is-invalid':'']"
                                    v-model="record.status"
                                    placeholder="Bulk actions"
                                    :clearable="true"
                                    :reduce="(option) => option.key"
                                    :options="bulkOptions"
                                    label="label"
                                >
                                    <template v-slot:option="option">
                                        <div class="list-item">
                                            <vue-feather class="icon" :type="option.icon" size="16"></vue-feather>
                                            {{ option.label }}
                                        </div>
                                    </template>
                                </v-select>
                                <div class="invalid-feedback" :class="[errors.status != null?'d-block':'']" v-if="errors.status != null">{{errors.status[0]}}</div>
                            </div>
                            <!-- <div class="col-12 mt-20">
                                <button v-if="recordObj.recordId" @click="updateBtn()" type="button" class="btn btn-primary me-1">Update</button>
                                <button v-else @click="saveBtn()" type="button" class="btn btn-primary me-1">Submit</button>
                                <button @click="closeModal()" type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close" ref="Close">Cancel</button>
                            </div> -->
                        </div>
                    </div>
                    <div class="modal-footer c-modal-footer btn-center">
                        <button v-if="recordObj.recordId" @click="updateBtn(),btnLoaderAction('update')" type="button" class="btn btn-primary me-1">
                            <span v-if="btnLoader.active && btnLoader.activeContent == 'update'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span :class="[btnLoader.active && btnLoader.activeContent == 'update'?'visually-hidden':'']">Update</span>
                        </button>
                        <button v-else @click="saveBtn(),btnLoaderAction('save')" type="button" class="btn btn-primary me-1">
                            <span v-if="btnLoader.active && btnLoader.activeContent == 'save'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span :class="[btnLoader.active && btnLoader.activeContent == 'save'?'visually-hidden':'']">Save</span>
                        </button>
                        <button @click="closeModal()" type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close" ref="Close">Cancel</button>
                    </div>
                </div>
            </div>

            <Teleport to="body">
                <FileManagerModal 
                    :recordObj="{
                        recordId:recordIdFM,
                        actionMode:actionModeFM,
                        activeStatus:activeStatus,
                        showModal:showModalFM,
                        modalName:modalNameFM,
                    }" 
                    @refresh-parent-data="loadParentData"
                    @close-modal="closeModalFM"
                    @selected-media-files="selectedMediaFiles"
                ></FileManagerModal>
            </Teleport>

        </div>
    </Transition>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Actions, Mutations } from "../../store/enums/StoreEnums";
import Swal from 'sweetalert2'
import $ from "jquery";
import * as Helpers from "../../components/helpers/helpers"

import FileManagerModal from "@/components/modals/FileManagerModal.vue";
import GlobalLoader from "@/components/global/Loader.vue";

export default defineComponent({
    name: "users-modal",
    components: {
        FileManagerModal,
        GlobalLoader,
    },
    emit: ["refresh-parent-data","close-modal"],
    props: {
        recordObj: {
            type: Object,
            required: true
        },
    },
    watch:{
        recordObj: {
            handler: function (val, oldVal) {
                this.getRolesData()
                if(val.modalName == 'UsersModal'){
                    this.getData()
                    if(val.actionMode == 'edit'){
                        this.record.role_id = val.roleId
                    } else {
                        // console.log('this.getRoles=',this.getRoles)
                        if(this.getRoles.length > 0){
                            this.getRoles.forEach((element:any) => {
                                // console.log('element=',element)
                                if(element.slug == val.userRoleType){
                                    this.record.role_id = element.id
                                    // alert(element.id)
                                }
                            });
                        }
                    }
                    // this.record.agency_id = val.agencyId
                    this.showModal = val.showModal
                }
                if(val.showModal == true){
                    $("body").css({"overflow":"hidden","padding-right":"17px"});
                } else {
                    $("body").css({"overflow":"visible","padding-right":"0"});
                }
            },
            deep: true
        },
    },
    setup(props, {emit}) {
        const store = useStore();
        const route = useRoute();
        const pageLevelEndPoint = ref('/users')
        
        const bulkOptions = ref([])
        const record : any = ref({
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirm_password: "",
            avatar: '',
            role_id: '',
            media_meta: '',
        });
        const errors : any = ref([]);

        const addEditModalClose = ref(null)

        const showModal = ref(props.recordObj.showModal)

        const btnLoader = ref({
            active: false,
            hideContent: true,
            activeContent: ''
        })

        const recordIdFM = ref('');
        const actionModeFM = ref('')

        const showModalFM = ref(false)
        const modalNameFM = ref('')

        const getRoles = ref([])

        const btnLoaderAction = (data:any) => {
            btnLoader.value.activeContent = data
        }

        // const getRoles = ref([])

        const saveBtn = () => {
            btnLoader.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/save', record.value)
                .then((res) => {
                    btnLoader.value.active = false;
                    if(res.data.status == 'success'){
                        errors.value = []
                        parentToChild()
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
                            closeModal()
                        },1000)
                    } else {
                        errors.value = res.data.errors
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
                    }
                })
                .catch((error) => {
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.data.message,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                    btnLoader.value.active = false;
                });
        }

        const getData = () => {
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/edit',props.recordObj)
                .then((res) => {
                    if(props.recordObj.recordId){
                        record.value = res.data.itemData
                        record.value.email = res.data.itemData.email
                        record.value.first_name = res.data.itemData.profile.first_name
                        record.value.last_name = res.data.itemData.profile.last_name
                        record.value.role_id = res.data.itemData.role_id
                        if(res.data.itemData.profile){
                            record.value.avatar = res.data.itemData.profile.avatar
                        }
                    }
                    bulkOptions.value = res.data.bulkOptions
                    record.value.status = Helpers.selectFirstObjectData(res.data.bulkOptions,'key')
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        const updateBtn = () => {
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, record.value)
                .then((res) => {
                    if(res.data.status == 'success'){
                        errors.value = []
                        parentToChild()
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
                            closeModal()
                        },1000)
                    } else {
                        errors.value = res.data.errors
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
                    }
                })
                .catch((error) => {
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.data.message,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                });
        };

        const parentToChild = () => {
            emit('refresh-parent-data', {refresh:true})
        }

        const addEditModalBtn = (mode,itemId) => {
            actionModeFM.value = mode
            recordIdFM.value = itemId
            showModalFM.value = true
            modalNameFM.value = 'FileManagerModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const selectMediaBtn = (data:any) => {
            // console.log('SET_SELECT_MEDIA_ACTION before',store.state.SelectMediaModule.select_media_data)
            store.dispatch(Actions.SET_SELECT_MEDIA_ACTION,{
                field: data.field,
                fileName: 'image',
                fileMimes: 'jpeg,jpg,png,pdf,svg,gif,zip',
                fileSelection: 'single', //single, multiple
                fileMax: 1, //how many files can select at a time
                fileSize: 100000, //file size in kb to mb
                thumbnailSizes: [
                    {
                        name: 'thumbnail',
                        size: {
                            width: 150,
                            height: 150,
                        }
                    },
                    {
                        name: '300x300',
                        size: {
                            width: 300,
                            height: 300,
                        }
                    },
                    {
                        name: '1024x1024',
                        size: {
                            width: 1024,
                            height: 1024,
                        }
                    }
                ]
            });
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

        const closeModalFM = (data:any) => {
            $("body").css({"overflow":"visible","padding-right":"0"});
            if(data.showModal == false){
                showModalFM.value = false
            }
        }

        const selectedMediaFiles = (data:any) => {
            // console.log('data.files[0]=',data)
            // profile.value.avatar = res.data.profile.avatar
            record.value[data.field] = data.files[0]
            record.value.media_meta = data.mediaMeta
            // console.log('selectedMediaFiles=',data.files[0])
        }

        // const cancelBtn = () => {
        //     record.value = {}
        // }

        // const getRolesData = () => {
        //     axios.get(Helpers.completeUrl()+pageLevelEndPoint.value+'/roles/get?status=active&sort=desc')
        //         .then((res) => {
        //             getRoles.value = res.data
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        // }

        const getRolesData = () => {
            axios.get(Helpers.completeUrl()+'/setup/roles/get?status=active&sort=desc')
                .then((res) => {
                    getRoles.value = res.data
                })
                .catch((error) => {
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.data.message,
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
                    icon: data.status,
                    title: data.title,
                    text: data.message,
                })
            }
        }

        const closeModal = () => {
            emit('close-modal', {showModal:false})
            record.value = {}
        }

        return {
            pageLevelEndPoint,

            bulkOptions,
            record,
            errors,

            saveBtn,
            getData,
            updateBtn,
            parentToChild,
            sweetalertMessage,
            closeModal,

            addEditModalClose,
            showModal,

            btnLoader,
            btnLoaderAction,

            recordIdFM,
            actionModeFM,
            showModalFM,
            modalNameFM,
            
            addEditModalBtn,
            selectMediaBtn,
            closeModalFM,
            selectedMediaFiles,
            Helpers,

            getRolesData,
            getRoles,
        }
    },
})
</script>