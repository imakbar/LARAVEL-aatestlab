<template>
    <Transition name="modal">
        <div
            v-if="recordObj.showModal && recordObj.modalName == 'FileManagerModal'"
            class="modal-mask modal modal-overlay"
            >
            <div class="modal-dialog modal-fullscreen fancy-scroll">
                <div class="modal-content modal-container">
                    <div class="modal-header">
                        <button v-if="actionMode == 'show'" @click="switchBtn('add')" class="btn btn-primary w-150 mr-10">Upload Files</button>
                        <button v-if="actionMode == 'add'" @click="switchBtn('show')" class="btn btn-primary w-150 mr-10">Media Library</button>
                        <div class="file-manager-content-header d-flex justify-content-between align-items-center"
                            v-if="actionMode == 'show'"
                        >
                            <div class="d-flex align-items-center fm-search">
                                <div class="input-group input-group-merge shadow-none m-0 flex-grow-1"> 
                                    <span class="input-group-text border-0 bg-none">
                                        <vue-feather class="icon" type="search" size="14"></vue-feather>
                                    </span>
                                    <input @input="getItems()" v-model="search.name" type="text" class="form-control files-filter border-0 bg-transparent" placeholder="Search">
                                </div>
                            </div>
                        </div>
                        <button @click="closeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-sm-2 pb-35 pt-0">
                        
                    <!-- Loading -->
                    <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>
                    
                    <input 
                         v-if="actionMode == 'add'"
                        type="file" 
                        class="form-control" 
                        @change="addBtn" 
                        multiple
                    />
                    
                    <div v-if="actionMode == 'show'" class="custom-file-manager file-manager-application mt-20">
                        <div class="content-area-wrapper container-xxl p-0">
                            <div class="file-manager-main-content">
                                <div class="file-manager-content-body p-0 bg-none">
                                    <!-- Files Container Starts -->
                                    <div class="view-container" v-if="uploadedFiles.total > 0">

                                        <div class="card file-manager-item file fancyCheckbox" v-for="(item,index) in uploadedFiles.data" :key="index">
                                            <input v-model="selectedMediaFiles" :value="item" type="checkbox" class="checkbox" :id="item.id" />
                                            <label class="checkbox-label" :for="item.id">
                                                <div class="card-img-top file-logo-wrapper">
                                                    <img v-if="Helpers.findInArray(item.thumbnails,{thumbnail:'thumbnail'}) != false" :src="Helpers.mediaPath()+Helpers.findInArray(item.thumbnails,{thumbnail:'thumbnail'})['path']" class="w-100" />
                                                    <img v-else :src="item.path" class="w-100" />
                                                </div>
                                                <div class="card-body">
                                                    <div class="content-wrapper">
                                                        <p class="card-text file-name mb-0">{{item.name}}.{{item.extension}}</p>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <!-- <img :src="Helpers.mediaIcon(item.extension)['icon']" alt="file-icon" height="20" /> -->
                                                        <p class="card-text file-size mb-0">{{Helpers.fileSize(item.size)}}</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="d-none flex-grow-1 align-items-center no-result mb-3" v-else>
                                        <i data-feather="alert-circle" class="me-50"></i>
                                        No Results
                                    </div>
                                    <!-- /Files Container Ends -->
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    </div>

                    <div class="modal-footer c-modal-footer filemanager-footer"
                        :class="[
                            selectedMediaFiles.length > 0?'bg-primary text-right':'justify-content-between'
                        ]"
                        v-if="actionMode == 'show'"
                    >
                        <div v-if="selectedMediaFiles.length > 0"
                            :class="[
                                selectedMediaFiles.length == 0?'d-flex justify-content-between align-items-center w-100':''
                            ]"
                            >
                            <button @click="selectBtn()" type="button" class="btn btn-danger me-1">Select</button>
                            <button @click="closeModal()" type="reset" class="btn btn-white text-white" data-bs-dismiss="modal" aria-label="Close" ref="Close">Cancel</button>
                        </div>
                        <div class="d-flex justify-content-between align-items-center w-100" v-if="uploadedFiles.total > 0 && selectedMediaFiles.length == 0">
                            <div class="col_left">
                                <div class="entries_showing mb-0">Showing {{uploadedFiles.from}} to {{uploadedFiles.to}} of {{uploadedFiles.total}} entries</div>
                            </div>
                            <div class="col_right">
                                <pagination 
                                    class="mb-0"
                                    :data="uploadedFiles" 
                                    :limit=2 
                                    @pagination-change-page="getItems"
                                ></pagination>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
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
import $, { each } from "jquery";
import GlobalLoader from "@/components/global/Loader.vue";
import * as Helpers from "../helpers/helpers";

export default defineComponent({
    name: "file-manager-modal",
    components: {
        GlobalLoader,
    },
    emit: ["refresh-parent-data","close-modal","selected-media-files"],
    props: {
        recordObj: {
            type: Object,
            required: true
        },
    },
    watch:{
        recordObj: {
            handler: function (val, oldVal) {
                this.showModal = val.showModal
                if(val.showModal == true && val.modalName == 'FileManagerModal'){
                    $("body").css({"overflow":"hidden","padding-right":"17px"});
                    this.getItems()
                } else {
                    $("body").css({"overflow":"visible","padding-right":"0"});
                }
            },
            deep: true
        },
    },
    create(){
        this.getItems()
    },
    setup(props, {emit}) {
        const store = useStore();
        const route = useRoute();
        const pageLevelEndPoint = ref('/upload')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });
        
        const bulkOptions = ref([])
        const record : any = ref({});
        const errors : any = ref([]);

        const addEditModalClose = ref(null)

        const showModal = ref(props.recordObj.showModal)
        const modalName = ref(props.recordObj.modalName)
        const modalSettings = ref({
            preventClick: "false",
            zIndexAuto: "true",
            zIndexBase: "10000",
            zIndex: "true",
            transition: "vfm"
        })

        const mediaMeta : any = ref({})
        const uploadedFiles = ref([])
        const field : any = ref('')
        
        const perPageAction : any = ref(25)
        const perPageOptions = ref([])
        const search = ref({})

        const selectedMediaFiles = ref([])
        const actionMode = ref('show')

        onMounted(() => {
            window.addEventListener('fileManagerModalListener', (event) => {
                if (event['detail'].value) {
                    mediaMeta.value = store.state.SelectMediaModule.select_media_data
                    field.value = store.state.SelectMediaModule.select_media_data.field
                }
            })
        })

        const addBtn = (e:any) => {
            e.preventDefault();
            var files : any = []
            var data = new FormData();

            var count = 1
            for (let file of e.target.files) {
                // console.log('file=',file)
                try {
                    console.log('mediaMeta=',mediaMeta)
                    files.push({
                        key:mediaMeta.value['fileName']+count,
                        name:file['name'],
                        type:file['type'],
                    });
                    data.append(mediaMeta.value['fileName']+count,file)
                    count++
                } catch {}
            }

            data.append('mediaMeta',JSON.stringify(mediaMeta.value))
            data.append('files',JSON.stringify(files))
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/add', data)
                .then(function (res) {

                    if(res.data.status == 'success'){
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
                        getItems()
                    } else {
                        for (const key in res.data.errors) {
                            const err = res.data.errors[key][0]
                            // console.log('err',err)
                            sweetalertMessage({
                                status: res.data.status,
                                title: '',
                                message: err,
                                position: 'bottom-end',
                                timer: 5000,
                                progressBar: true,
                                toast: true,
                                showConfirmButton: false,
                            })
                        }
                    }
                })
                .catch(function (err) {
                    console.log('err',err)
                });
        }

        const getItems = (page = 1) => {
            console.log('getItems=')
            loaderSettings.value.active = true;
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'?page='+page,{
                search: search.value,
            })
                .then((res) => {
                    uploadedFiles.value = res.data
                    actionMode.value = 'show'
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        const parentToChild = () => {
            emit('refresh-parent-data', {refresh:true})
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
                                // selectedMediaFiles.value.push(data.requestedId)
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
                                // selectedMediaFiles.value.push(data.requestedId)
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

        const closeModal = () => {
            // $("body").css({"overflow":"visible","padding-right":"0"});
            record.value = {}
            // role_permissions.value = []
            emit('close-modal', {showModal:false})
        }

        const switchBtn = (data:any) => {
            actionMode.value = data
        }

        const selectBtn = () => {
            if(mediaMeta.value.fileSelection == 'single'){
                var filesData = selectedMediaFiles.value[0]
                selectedMediaFiles.value = []
                selectedMediaFiles.value = [filesData]
            }
            emit('selected-media-files', {
                files:selectedMediaFiles.value,
                mediaMeta: mediaMeta.value,
                field: field.value,
            })
            selectedMediaFiles.value = []
            closeModal()
        }

        return {
            pageLevelEndPoint,
            loaderSettings,
            bulkOptions,
            record,
            errors,

            field,

            parentToChild,
            sweetalertMessage,
            sweetalertAction,
            closeModal,
            switchBtn,
            selectBtn,

            addEditModalClose,
            showModal,
            modalName,
            modalSettings,

            perPageAction,
            perPageOptions,
            search,

            addBtn,
            mediaMeta,
            getItems,
            uploadedFiles,
            Helpers,
            selectedMediaFiles,
            actionMode,

        }
    },
})
</script>