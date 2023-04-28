<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Permissions</h2>
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-sm btn-primary ml-10 mb-12" @click="addEditModalBtn('add','')">
                                    Add New
                                </button>
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
                <section class="app-user-list">
                    <div class="card">
                        
                        <!-- Loading -->
                        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

                        <div class="list-top-header">
                            <div class="col_right">
                                <div v-if="selectedItems.length == 0">
                                    <span v-for="(item,index) in statusesCount" :key="index">
                                        <span v-if="item.count > 0">
                                            <span v-if="index != 0"> | </span>
                                            <router-link 
                                                class="page-status-link"
                                                :class="item.class"
                                                :to="Helpers.appEndPoint()+'/setup/permissions/'+item.key">
                                                {{item.label}}({{item.count}})
                                            </router-link>
                                        </span>
                                    </span>
                                </div>
                                <div v-else>
                                    <div class="bulk_action">                                    
                                        <v-select 
                                            class="dropdown"
                                            v-model="bulkAction"
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
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-sm"
                                            @click="bulkActionBtn"
                                        >
                                            Apply
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-sm ml-10"
                                            @click="bulkActionBtnBack"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col_right per_page_options">
                                <span>Show</span>
                                <v-select 
                                    class="dropdown"
                                    v-model="perPageAction"
                                    :clearable="false"
                                    :options="perPageOptions"
                                    label="label"
                                >
                                    <template v-slot:option="option">
                                        <div class="list-item" @click="perPageActionBtn(option)">
                                            {{ option.label }}
                                        </div>
                                    </template>
                                </v-select>
                                <span>entries</span>
                            </div>
                        </div>
                        <div class="table-responsive pt-0 min-h-300">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(col,index) in tableColumns" :key="index" 
                                            :class="[col.sorting?'sorting':'', col.class, col.field != 'id'?col.sort:'']"
                                        >
                                            <span class="sorting" v-if="col.sorting" @click="orderByBtn(col.field)"></span>
                                            <span v-if="col && col.field == 'id'">
                                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="all" v-model="allSelected" @change="selectAllItems" />
                                            </span>
                                            <span v-if="col.field != 'id'">
                                                {{col.label}}
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="setupPermissions.total > 0">
                                    <tr v-for="(item,index) in setupPermissions.data" :key="index">
                                        <td class="selectionTd">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" :value="item.id" v-model="selectedItems" @change="selectItem" />
                                        </td>
                                        <td>
                                            <div>
                                                {{item.name}}
                                            </div>
                                            <div class="list_separator">
                                                <span class="list_item link text-primary" v-for="(allow,allowIndex) in item.permissions_allows" :key="allowIndex" @click="addEditPermissionsAllowModalBtn('add','',item.id)">{{allow.slug}}</span>
                                                <span class="list_item link text-primary" @click="addEditPermissionsAllowModalBtn('add','',item.id)">Add New</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="Helpers.uniqueArrayObjects(item.role_permissions)">
                                                <span class="badge badge-light-warning mr-5 mb-5" v-for="(rp,rpIndex) in Helpers.uniqueArrayObjects(item.role_permissions)" :key="rpIndex">
                                                    <span v-if="rp.role">{{rp.role.name}}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            {{item.created_date}}
                                        </td>
                                        <td class="statusTd">
                                            <Status :status="item.status"></Status>
                                        </td>
                                        <td class="actionTd">
                                            <div class="btn-group">
                                                <a class="btn btn-sm dropdown-toggle hide-arrow icon-vertical-center" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <vue-feather class="icon" type="more-vertical" size="16"></vue-feather>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end" style="">
                                                    <button @click="addEditModalBtn('edit',item.id)"
                                                    v-if="item.status != 'trash'" class="dropdown-item icon-vertical-center"><vue-feather class="icon" type="file-text" size="16"></vue-feather>Edit</button>
                                                    <button @click="deleteBtn(item.id)" href="javascript:;" class="dropdown-item icon-vertical-center delete-record"><vue-feather class="icon" type="trash" size="16"></vue-feather>
                                                        <span v-if="activeStatus == 'trash'">Delete</span>
                                                        <span v-else>Trash</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
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
                        <div>
                            <div class="list-bottom-footer" v-if="setupPermissions.total > 0">
                                <div class="col_left">
                                    <div class="entries_showing">Showing {{setupPermissions.from}} to {{setupPermissions.to}} of {{setupPermissions.total}} entries</div>
                                </div>
                                <div class="col_right">
                                    <pagination 
                                        :data="setupPermissions" 
                                        :limit=2 
                                        @pagination-change-page="getItems"
                                    ></pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <Teleport to="body">
            <PermissionsModal 
                v-if="modalName == 'PermissionsModal'"
                :recordObj="{
                    recordId:recordId,
                    actionMode:actionMode,
                    activeStatus:activeStatus,
                    showModal:showModal,
                    modalName:modalName,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
            ></PermissionsModal>
        </Teleport>
            
        <Teleport to="body">
            <PermissionsAllowModal 
                v-if="modalName == 'PermissionsAllowModal'"
                :recordObj="{
                    recordId:recordId,
                    actionMode:actionMode,
                    activeStatus:activeStatus,
                    showModal:showModal,
                    modalName:modalName,
                    permission_id: permission_id,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
            ></PermissionsAllowModal>
        </Teleport>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import PermissionsModal from "@/components/modals/PermissionsModal.vue";
import PermissionsAllowModal from "@/components/modals/PermissionsAllowModal.vue";
import Status from "@/components/global/Status.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import Swal from 'sweetalert2'
import $ from "jquery"
import * as Helpers from "../../components/helpers/helpers"

export default defineComponent({
    name: "setup-permissions",
    components: {
        Status,
        PermissionsModal,
        PermissionsAllowModal,
        GlobalLoader,
    },
    created(){
        this.getItems()
    },
    methods:{},
    setup(){
        const route = useRoute();
        const router = useRouter();
        const pageLevelEndPoint = ref('/setup/permissions')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const selectedItems : any = ref([])
        const allSelected = ref(false)
        
        const activeStatus = ref(route.params.status?route.params.status:'all');
        const statusesCount = ref([])
        const setupPermissions : any = ref([]);
        const recordId = ref('');
        const permission_id : any = ref('')
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
                    setupPermissions.value = res.data.items
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
                const items :any = setupPermissions.value.data
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
            if (selectedItems.value.length == setupPermissions.value.data.length) {
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
            modalName.value = 'PermissionsModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const addEditPermissionsAllowModalBtn = (mode,itemId,parentItemId) => {
            actionMode.value = mode
            recordId.value = itemId
            permission_id.value = parentItemId
            showModal.value = true
            modalName.value = 'PermissionsAllowModal'
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

        const deleteBtn = (id:Number) => {
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

            setupPermissions,
            statusesCount,
            activeStatus,
            recordId,
            permission_id,
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
            addEditPermissionsAllowModalBtn,
            deleteBtn,

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
            sweetalertMessage,
            sweetalertAction,
            showModal,
            modalName,
            Helpers,
        }
    }
});
</script>