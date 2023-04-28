<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Roles</h2>
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

                <p class="mb-10">
                A role provided access to predefined menus and features so that depending <br />
                on assigned role an administrator can have access to what he need
                </p>

                <div class="row">
                    <div class="col-xl-4 col-lg-6 col-md-6" v-for="(role,roleIndex) in setupRoles.data" :key="roleIndex">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                <UsersAvatars :role="role"></UsersAvatars>
                                </div>
                                <div class="d-flex justify-content-between align-items-end mt-1 pt-10">
                                <div class="role-heading">
                                    <h4 class="fw-bolder">{{role.name}}</h4>
                                    <a class="role-edit-modal" @click="addEditModalBtn('edit',role.id)">
                                    <small class="fw-bolder">Edit Role</small>
                                    </a>
                                </div>
                                <a href="javascript:void(0);" class="text-body"><i data-feather="copy" class="font-medium-5"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm-5">
                                <div class="d-flex align-items-end justify-content-center h-100">
                                    <img
                                    src="/backend/app-assets/images/illustration/faq-illustrations.svg"
                                    class="img-fluid mt-2"
                                    alt="Image"
                                    width="85"
                                    />
                                </div>
                                </div>
                                <div class="col-sm-7">
                                <div class="card-body text-sm-end text-center ps-sm-0">
                                    <a
                                    @click="addEditModalBtn('add','')"
                                    class="stretched-link text-nowrap add-new-role"
                                    >
                                    <span class="btn btn-primary mb-1">Add New Role</span>
                                    </a>
                                    <p class="mb-0">Add role, if it does not exist</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <Teleport to="body">
            <RolesModal 
                :recordObj="{
                    recordId:recordId,
                    actionMode:actionMode,
                    activeStatus:activeStatus,
                    showModal:showModal,
                    modalName:modalName,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
            ></RolesModal>
        </Teleport>
            
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
import * as Helpers from "../../components/helpers/helpers"

export default defineComponent({
    name: "setup-roles",
    components: {
        UsersAvatars,
        Status,
        RolesModal,
        GlobalLoader,
    },
    created(){
        this.getItems()
    },
    methods:{},
    setup(){
        const route = useRoute();
        const pageLevelEndPoint = ref('/setup/roles')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const selectedItems : any = ref([])
        const allSelected = ref(false)
        
        const activeStatus = ref(route.params.status?route.params.status:'all');
        const statusesCount = ref([])
        const setupRoles : any = ref([]);
        const recordId = ref('');
        const role_id : any = ref('')
        const actionMode = ref('')
        const bulkAction : any = ref(null)
        const bulkOptions = ref([])
        
        const perPageAction : any = ref(25)
        const perPageOptions = ref([])
        const tableColumns : any = ref([])

        const orderByAction = ref({})

        const showModal = ref(false)
        const modalName = ref('')

        const getItems = (page = 1) => {
            loaderSettings.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/get?status='+activeStatus.value+'&page='+page,{
                perPageAction: perPageAction.value,
                orderByAction: orderByAction.value,
            })
                .then(res => {
                    setupRoles.value = res.data.items
                    statusesCount.value = res.data.statusesCount
                    bulkOptions.value = res.data.bulkOptions
                    perPageAction.value = res.data.items.per_page
                    perPageOptions.value = res.data.perPageOptions
                    allSelected.value = false
                    selectedItems.value = []
                    tableColumns.value = res.data.tableColumns
                    bulkAction.value = null
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
                .catch((error:any) => {
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
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
        }

        const selectAllItems = () => {
            if (allSelected.value) {
                const items :any = setupRoles.value.data
                const selectedData = items.map((u) => u.id);
                selectedItems.value = selectedData;
            } else {
                selectedItems.value = [];
            }
        }

        const selectItem = () => {
            checkSelectedItemsLength()
        }
        
        const checkSelectedItemsLength = () => {
            if (selectedItems.value.length == setupRoles.value.data.length) {
                allSelected.value = true;
            } else {
                allSelected.value = false;
            }
        }

        const bulkActionBtn = () => {
            if(bulkAction.value == 'trash' || bulkAction.value == 'delete'){
                var message = ''
                if(activeStatus.value=='trash'){
                    message = 'Do you want to delete it permanently!!'
                } else {
                    message = 'Do you want to trash it!!'
                }
                sweetalertAction({
                    icon: 'info',
                    requestedId: '',
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
                    requestType: activeStatus.value=='trash'?'delete':'trash'
                })
            } else {
                bulkActionRequest()
            }
        }

        const bulkActionRequest = () => {
            if(bulkAction.value){
                loaderSettings.value.active = true;
                axios.put(Helpers.completeUrl()+pageLevelEndPoint.value+'/bulk-action', {
                    bulkAction: bulkAction.value,
                    selectedItems: selectedItems.value,
                }).then(res => {
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

        const bulkActionBtnBack = () => {
            selectedItems.value = []
            allSelected.value = false
            bulkAction.value = null
        }

        const perPageActionBtn = (val) => {
            perPageAction.value = val.label
            getItems(1)
        }

        const clearSortInTableColumns = (val) => {
            if(orderByAction.value['field'] != val){
                for (const key in tableColumns.value) {
                    var obj : any = tableColumns.value[key];
                    obj['sort'] = ''
                }
            }
        }

        const orderByBtn = (val) => {
            clearSortInTableColumns(val)
            for (const key in tableColumns.value) {
                var obj : any = tableColumns.value[key];
                if(obj['field'] == val){
                    if(obj['sort'] == 'asc'){
                        obj['sort'] = 'desc'
                    } else {
                        obj['sort'] = 'asc'
                    }
                    orderByAction.value = obj
                    console.log('obj',JSON.stringify(obj))
                }
            }
            getItems(1)
        }

        const addEditModalBtn = (mode,itemId) => {
            actionMode.value = mode
            recordId.value = itemId
            showModal.value = true
            modalName.value = 'RolesModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const loadParentData = (data) => {
            if(data.refresh){
                getItems(1)
            }
        }

        const closeModal = (data) => {
            $("body").css({"overflow":"visible","padding-right":"0"});
            if(data.showModal == false){
                showModal.value = data.showModal
            }
        }

        const deleteBtn = (id) => {
            selectedItems.value = []
            var message = ''
            if(activeStatus.value=='trash'){
                bulkAction.value = 'delete'
                message = 'Do you want to delete it permanently!'
            } else {
                bulkAction.value = 'trash'
                message = 'Do you want to trash it!'
            }
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
                requestType: activeStatus.value=='trash'?'delete':'trash'
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
        
        return {
            pageLevelEndPoint,
            
            loaderSettings,

            setupRoles,
            statusesCount,
            activeStatus,
            recordId,
            role_id,
            actionMode,
            bulkAction,
            bulkOptions,
            selectItem,
            getItems,
            bulkActionBtn,
            bulkActionBtnBack,
            perPageActionBtn,
            orderByBtn,
            addEditModalBtn,
            loadParentData,
            closeModal,

            perPageAction,
            perPageOptions,

            orderByAction,
            tableColumns,
            clearSortInTableColumns,

            allSelected,
            selectedItems,
            selectAllItems,
            deleteBtn,
            sweetalertMessage,
            sweetalertAction,

            showModal,
            modalName,
        }
    }
});
</script>