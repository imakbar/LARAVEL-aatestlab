<template>
    <Transition name="modal">
        <div
            v-if="recordObj.showModal && recordObj.modalName == 'PermissionsAllowModal'"
            class="modal-mask modal modal-overlay"
            >
            <div class="modal-dialog fancy-scroll">
                <div class="modal-content modal-container">
                    <div class="modal-header bg-transparent">
                        <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-sm-2 pb-35 pt-0">
                        <div class="text-center mb-2">
                            <h1 class="mb-1">
                                <span v-if="recordObj.actionMode == 'add'">Add New Permissions Allow</span>
                                <span v-if="recordObj.actionMode == 'edit'">Edit Permissions Allow</span>
                            </h1>
                            <p><span v-if="recordObj.actionMode == 'add'">Add New</span><span v-if="recordObj.actionMode == 'edit'">Edit</span> permission as per your requirements.</p>
                        </div>

                        <div class="alert alert-warning" role="alert" v-if="record.id">
                            <h6 class="alert-heading">Warning!</h6>
                            <div class="alert-body">
                                By editing the permission name, you might break the system permissions functionality. Please ensure you're
                                absolutely certain before proceeding.
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 mb-10">
                                <div class="input-group">
                                    <input type="text" v-model="record.name" id="name" class="form-control" :class="[errors.name != null?'is-invalid':'']" placeholder="Name" />
                                    <button v-if="record.id" @click="updateBtn()" type="button" class="btn btn-primary">Update</button>
                                    <button v-else @click="saveBtn()" type="button" class="btn btn-primary">Submit</button>
                                </div>
                                <div class="invalid-feedback" :class="[errors.name != null?'d-block':'']" v-if="errors.name != null">{{errors.name[0]}}</div>
                            </div>
                        </div>
                    </div>
                        
                    <!-- Loading -->
                    <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

                    <div class="table-responsive pt-0 min-h-300">
                        <table class="table table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th width="60"></th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th class="actionTh">Action</th>
                                </tr>
                            </thead>
                            <draggable 
                                v-if="setupPermissionsAllows.length > 0"
                                v-model="setupPermissionsAllows"
                                :component-data="{
                                    tag: 'tbody',
                                    type: 'transition-group',
                                    name: !drag ? 'flip-list' : null
                                }"
                                tag="tbody"
                                item-key="name"
                                v-bind="dragOptions"
                                @start="drag = true"
                                @end="drag = false"
                                handle=".handle"
                                @change="moveBtn"
                            >
                                <template #item="{ element }">
                                    <tr>
                                        <td class="text-center handle">
                                            <vue-feather class="icon d-inline-block mt-7" type="menu" size="16"></vue-feather>
                                        </td>
                                        <td>
                                            {{element.name}}
                                        </td>
                                        <td>
                                            {{element.slug}}
                                        </td>
                                        <td class="actionTd">
                                            <div class="btn-group">
                                                <a class="btn btn-sm dropdown-toggle hide-arrow icon-vertical-center" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <vue-feather class="icon" type="more-vertical" size="16"></vue-feather>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end" style="">
                                                    <button @click="addEditBtn('edit',element.id)"
                                                    v-if="element.status != 'trash'" class="dropdown-item icon-vertical-center"><vue-feather class="icon" type="edit" size="16"></vue-feather>Edit</button>
                                                    <button @click="deleteBtn(element.id)" href="javascript:;" class="dropdown-item icon-vertical-center delete-record"><vue-feather class="icon" type="trash" size="16"></vue-feather>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </draggable>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <div class="pt-20 pb-20">
                                            No record found!
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
import Swal from 'sweetalert2'
import $ from "jquery"
import * as Helpers from "../../components/helpers/helpers"

import GlobalLoader from "@/components/global/Loader.vue";

export default defineComponent({
    name: "setup-permissions-allow-modal",
    components: {
        GlobalLoader
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
                this.getItems()
                this.showModal = val.showModal
                this.record.permission_id = val.permission_id?val.permission_id:''
                // console.log('recordObj=',val.showModal)
                if(val.showModal == true){
                    $("body").css({"overflow":"hidden","padding-right":"17px"});
                } else {
                    $("body").css({"overflow":"visible","padding-right":"0"});
                }
            },
            deep: true
        },
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    created(){
        this.getItems()
    },
    setup(props, {emit}) {
        const route = useRoute();
        const pageLevelEndPoint = ref('/setup/permissions-allow')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const selectedItems : any = ref([])
        const allSelected = ref(false)
        
        const bulkOptions = ref([])
        const record : any = ref(props.recordObj);
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
        const setupPermissionsAllows : any = ref([]);
        
        const bulkAction : any = ref(null)

        const getItems = () => {
            loaderSettings.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/get',{
                permission_id: props.recordObj.permission_id
            })
                .then(res => {
                    setupPermissionsAllows.value = res.data.items
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
        }

        const addEditBtn = (mode,itemId) => {
            record.value.id = itemId
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/edit',record.value)
                .then((res) => {
                    record.value = res.data.itemData
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        const saveBtn = () => {
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/save', record.value)
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
                            clear()
                        },100)
                    } else {
                        errors.value = res.data.errors
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
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
                            clear()
                        },100)
                    } else {
                        errors.value = res.data.errors
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const deleteBtn = (id) => {
            selectedItems.value = []
            var message = 'Do you want to delete'
            sweetalertAction({
                icon: 'info',
                requestedId: id,
                status: 'warning',
                title: 'Are you sure?',
                message: message,
                position: 'bottom-end',
                showCloseButton: true,
                confirmBtn: true,
                confirmButtonText: 'Yes',
                cancelBtn: true,
                cancelButtonText: 'Cancel',
                timer: 0,
                progressBar: false,
                toast: true,
                requestType: 'delete'
            })
        }
        
        const moveBtn = () => {
            setupPermissionsAllows.value.map((item, index) => {
                item.order_by = index + 1
            });
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value+'/order-by', setupPermissionsAllows.value)
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
                                bulkAction.value = data.requestType,
                                selectedItems.value.push(data.requestedId)
                                bulkActionRequest()
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
                            position: data.position,
                            showCloseButton: data.showCloseButton,
                            showCancelButton: data.cancelBtn,
                            confirmButtonText: data.confirmButtonText,
                            cancelButtonText: data.cancelButtonText,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                bulkAction.value = data.requestType,
                                selectedItems.value.push(data.requestedId)
                                bulkActionRequest()
                            }
                        })
                    } else {
                        Swal.fire({
                            title: data.title,
                            text: data.message,
                            icon: data.icon,
                            showCloseButton: data.showCloseButton,
                            showCancelButton: data.cancelBtn,
                            confirmButtonText: data.confirmButtonText,
                            cancelButtonText: data.cancelButtonText,
                        })
                    }
                }
            }
        }

        const bulkActionRequest = () => {
            if(bulkAction.value){
                loaderSettings.value.active = true;
                axios.put(Helpers.completeUrl()+pageLevelEndPoint.value+'/bulk-action', {
                    bulkAction: bulkAction.value,
                    selectedItems: selectedItems.value,
                }).then(res => {
                    parentToChild()
                    getItems()
                    selectedItems.value = []
                    checkSelectedItemsLength()
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
            }
        }
        
        const checkSelectedItemsLength = () => {
            if (selectedItems.value.length == setupPermissionsAllows.value.length) {
                allSelected.value = true;
            } else {
                allSelected.value = false;
            }
        }

        const closeModal = () => {
            emit('close-modal', {showModal:false})
            record.value = {}
        }

        const clear = () => {
            record.value.id = ''
            record.value.name = ''
        }

        return {
            pageLevelEndPoint,
            
            loaderSettings,

            bulkOptions,
            record,
            errors,

            saveBtn,
            updateBtn,
            parentToChild,
            sweetalertMessage,
            sweetalertAction,
            closeModal,
            addEditBtn,
            deleteBtn,

            addEditModalClose,
            showModal,
            modalName,
            modalSettings,
            
            getItems,
            setupPermissionsAllows,
            clear,
            moveBtn,

            allSelected,
            selectedItems,
            bulkAction,
        }
    },
})
</script>