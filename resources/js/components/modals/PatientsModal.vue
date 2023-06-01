<template>
    <Transition name="modal">
        <div
            v-if="recordObj.showModal && recordObj.modalName == 'PatientsModal'"
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
                                <span v-if="recordObj.actionMode == 'add'">Add New Patient</span>
                                <span v-if="recordObj.actionMode == 'edit'">Edit Patient</span>
                            </h1>
                        </div>

                        <div class="row">
                            <div class="col-sm-6 mb-10">
                                <label class="form-label" for="name">Name</label>
                                <input type="text" v-model="record.name" id="name" class="form-control" :class="[errors.name != null?'is-invalid':'']" />
                                <div class="invalid-feedback" :class="[errors.name != null?'d-block':'']" v-if="errors.name != null">{{errors.name[0]}}</div>
                            </div>
                            <div class="col-sm-2 mb-10">
                                <label class="form-label" for="age">Age</label>
                                <input type="text" v-model="record.age" id="age" class="form-control" :class="[errors.age != null?'is-invalid':'']" />
                                <div class="invalid-feedback" :class="[errors.age != null?'d-block':'']" v-if="errors.age != null">{{errors.age[0]}}</div>
                            </div>
                            <div class="col-sm-4 mb-5">
                                <label for="mobile" class="form-label">Mobile</label>
                                <input v-model="record.mobile" type="text" class="form-control" id="mobile" ref="focusinput" :class="[errors.mobile != null?'is-invalid':'']">
                                <small class="text-size-11 d-block text-danger">
                                    <span v-if="errors.mobile != null">{{errors.mobile[0]}}</span>
                                </small>
                            </div>
                            <div class="col-sm-6 mb-5">
                                <label for="gender_id" class="form-label">Gender</label>
                                <v-select
                                    id="gender_id"
                                    class="dropdown"
                                    :class="[errors.gender_id != null?'is-invalid':'']"
                                    v-model="record.gender_id"
                                    placeholder="--Select--"
                                    :clearable="true"
                                    :reduce="(option) => option.id"
                                    :options="genders"
                                    label="title"
                                >
                                    <template v-slot:option="option">
                                        <div class="list-item">
                                            {{ option.title }}
                                        </div>
                                    </template>
                                </v-select>
                                <small class="text-size-11 d-block text-danger">
                                    <span v-if="errors.gender_id != null">{{errors.gender_id[0]}}</span>
                                </small>
                            </div>
                            <div class="col-sm-6 mb-5">
                                <label for="reffer_id" class="form-label">Reffers</label>
                                <v-select
                                    id="reffer_id"
                                    class="dropdown"
                                    :class="[errors.reffer_id != null?'is-invalid':'']"
                                    v-model="record.reffer_id"
                                    placeholder="--Select--"
                                    :clearable="true"
                                    :reduce="(option) => option.id"
                                    :options="reffers"
                                    label="name"
                                >
                                    <template v-slot:option="option">
                                        <div class="list-item">
                                            {{ option.name }}
                                        </div>
                                    </template>
                                </v-select>
                                <small class="text-size-11 d-block text-danger">
                                    <span v-if="errors.reffer_id != null">{{errors.reffer_id[0]}}</span>
                                </small>
                            </div>
                            <div class="col-sm-12 mb-5">
                                <label for="address" class="form-label">Address</label>
                                <input v-model="record.address" type="text" class="form-control" id="address" ref="focusinput" :class="[errors.address != null?'is-invalid':'']">
                                <small class="text-size-11 d-block text-danger">
                                    <span v-if="errors.address != null">{{errors.address[0]}}</span>
                                </small>
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

            <!-- <Teleport to="body">
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
            </Teleport> -->

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
    name: "patients-modal",
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
                if(val.modalName == 'PatientsModal'){
                    // if(val.actionMode == 'edit'){
                        this.loadData()
                        this.getData()
                    // }
                    this.getRolesData()
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
        const pageLevelEndPoint = ref('/patients')
        
        const bulkOptions = ref([])
        const record : any = ref({
            // email: "",
            // first_name: "",
            // last_name: "",
            // password: "",
            // confirm_password: "",
            // avatar: '',
            // role_id: '',
            // media_meta: '',
            name: "",
            age: "",
            mobile: "",
            gender_id: "",
            reffer_id: "",
            address: "",
            status: "",
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
        
        const genders : any = ref([]);
        const reffers : any = ref([]);

        const loadData = () => {
            getGenders()
            getReffers()
        }
        
		const getGenders = () => {
			axios.get(Helpers.completeUrl()+'/get/genders')
			.then((res) => {
				genders.value = res.data
            })
        }

		const getReffers = () => {
			axios.get(Helpers.completeUrl()+'/get/reffers')
			.then((res) => {
				reffers.value = res.data
            })
        }

        const btnLoaderAction = (data:any) => {
            btnLoader.value.activeContent = data
        }

        // const getRoles = ref([])

        const saveBtn = () => {
            btnLoader.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/save', record.value)
                .then((res) => {
                    btnLoader.value.active = false;
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
                })
                .catch((error:any) => {
                    btnLoader.value.active = false;
                    var errorData = error.response.data
                    errors.value = errorData.errors
                    var errorMessage : any = '';
                    if(errorData.errors && errorData.errors.length > 0){
                        errorMessage = errorData.errors[0]; // Get the first resData message
                    } else if (Object.keys(errorData.errors).length > 0) {
                        const errorMessages = Object.values(errorData.errors);
                        errorMessage = errorMessages.shift(); // Get the first resData message
                    } else {
                        errorMessage = errorData.message
                    }
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: errorMessage,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                });
        }

        const getData = () => {
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/edit',props.recordObj)
                .then((res) => {
                    if(props.recordObj.recordId){
                        record.value = res.data.itemData
                    } else {
                        record.value.status = Helpers.selectFirstObjectData(res.data.bulkOptions,'key')
                    }
                    bulkOptions.value = res.data.bulkOptions
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        const updateBtn = () => {
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, record.value)
                .then((res) => {
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
                })
                .catch((error:any) => {
                    btnLoader.value.active = false;
                    var errorData = error.response.data
                    errors.value = errorData.errors
                    var errorMessage : any = '';
                    if(errorData.errors && errorData.errors.length > 0){
                        errorMessage = errorData.errors[0]; // Get the first resData message
                    } else if (Object.keys(errorData.errors).length > 0) {
                        const errorMessages = Object.values(errorData.errors);
                        errorMessage = errorMessages.shift(); // Get the first resData message
                    } else {
                        errorMessage = errorData.message
                    }
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: errorMessage,
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
            
            loadData,
            getGenders,
            getReffers,
            genders,
            reffers,
        }
    },
})
</script>