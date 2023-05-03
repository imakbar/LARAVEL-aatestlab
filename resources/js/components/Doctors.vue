<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Doctors</h2>
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-sm btn-primary ml-10 mb-12" @click="addEditModalBtn('add','')" v-if="Helpers.hasPermission('doctors_management','can_add')">
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

                        <div v-if="Helpers.hasPermission('doctors_management','can_view')">
                            <div class="list-top-header">
                                <div class="col_right">
                                    <div v-if="selectedItems.length == 0">
                                        <span v-for="(item,index) in statusesCount" :key="index">
                                            <span v-if="item.count > 0">
                                                <span v-if="index != 0"> | </span>
                                                <router-link 
                                                    class="page-status-link"
                                                    :class="item.class"
                                                    :to="Helpers.appEndPoint()+'/doctors/'+item.key">
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
                                <div class="col_right">
                                </div>
                            </div>
                            <div class="table-responsive pt-0 min-h-300">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="60"></th>
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
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" @input.prevent="getItems()" v-model="search.name">
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" @input.prevent="getItems()" v-model="search.mobile">
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" @input.prevent="getItems()" v-model="search.clinic">
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    <draggable 
                                        v-if="setupTemplateVariables.length > 0"
                                            v-model="setupTemplateVariables"
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
                                                <td class="selectionTd">
                                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" :value="element.id" v-model="selectedItems" @change="selectItem" />
                                                </td>
                                                <td>
                                                    <div>
                                                        {{element.name}}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {{element.mobile}}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {{element.clinic}}
                                                    </div>
                                                </td>
                                                <td class="statusTd">
                                                    <Status :status="element.status"></Status>
                                                </td>
                                                <td class="actionTd" v-if="
                                                    Helpers.hasPermission('doctors_management','can_update') ||
                                                    Helpers.hasPermission('doctors_management','can_delete')
                                                ">
                                                    <div class="btn-group">
                                                        <a class="btn btn-sm dropdown-toggle hide-arrow icon-vertical-center" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <vue-feather class="icon" type="more-vertical" size="16"></vue-feather>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-end" style="">
                                                            <button @click="addEditModalBtn('edit',element.id)"
                                                            v-if="element.status != 'trash' && Helpers.hasPermission('doctors_management','can_update')" class="dropdown-item icon-vertical-center"><vue-feather class="icon" type="file-text" size="16"></vue-feather>Edit</button>
                                                            <button @click="deleteBtn(element.id)" v-if="Helpers.hasPermission('doctors_management','can_delete')" href="javascript:;" class="dropdown-item icon-vertical-center delete-record"><vue-feather class="icon" type="trash" size="16"></vue-feather>
                                                                <span v-if="activeStatus == 'trash'">Delete</span>
                                                                <span v-else>Trash</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                    </draggable>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6">
                                                <div class="pt-20 pb-20">
                                                    No record found!
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-else>
                            <PermissionError></PermissionError>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <Teleport to="body">
            <DoctorsModal 
                v-if="modalName == 'DoctorsModal'"
                :recordObj="{
                    recordId:recordId,
                    actionMode:actionMode,
                    activeStatus:activeStatus,
                    showModal:showModal,
                    modalName:modalName,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
            ></DoctorsModal>
        </Teleport>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import DoctorsModal from "@/components/modals/DoctorsModal.vue";
import Status from "@/components/global/Status.vue";
import PermissionError from "@/components/global/PermissionError.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import Swal from 'sweetalert2'
import $ from "jquery"
// import Helpers from "../../components/helpers/helpers"
import Helpers from "./helpers/helpers";

export default defineComponent({
    name: "doctors",
    components: {
        Status,
        PermissionError,
        DoctorsModal,
        GlobalLoader,
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
    methods:{},
    setup(){
        const route = useRoute();
        const router = useRouter();
        const pageLevelEndPoint = ref('/doctors')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const selectedItems : any = ref([])
        const allSelected = ref(false)
        
        const activeStatus = ref(route.params.status?route.params.status:'all');
        const statusesCount = ref([])
        const setupTemplateVariables : any = ref([]);
        const recordId = ref('');
        const actionMode = ref('')
        const bulkAction : any = ref(null)
        const bulkOptions = ref([])
        const errors : any = ref([]);
        const search : any = ref({})
        
        const tableColumns : any = ref([])

        const orderByAction = ref({})

        const showModal = ref(false)
        const modalName = ref('')

        const getItems = () => {
            loaderSettings.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/get?status='+activeStatus.value,{
                search: search.value,
                orderByAction: orderByAction.value,
            })
                .then(res => {
                    setupTemplateVariables.value = res.data.items
                    statusesCount.value = res.data.statusesCount
                    bulkOptions.value = res.data.bulkOptions
                    allSelected.value = false
                    selectedItems.value = []
                    tableColumns.value = res.data.tableColumns
                    bulkAction.value = null
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
                .catch(error => {
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
                const items :any = setupTemplateVariables.value
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
            if (selectedItems.value.length == setupTemplateVariables.value.length) {
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

        const clearSortInTableColumns = (val) => {
            if(orderByAction.value['field'] != val){
                for (const key in tableColumns.value) {
                    var obj : any = tableColumns.value[key];
                    obj['sort'] = ''
                }
            }
        }

        const orderByBtn = (val) => {
            // console.log('tableColumns before=',tableColumns.value)
            clearSortInTableColumns(val)
            // console.log('tableColumns after=',tableColumns.value)
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
            getItems()
        }

        const addEditModalBtn = (mode,itemId) => {
            actionMode.value = mode
            recordId.value = itemId
            showModal.value = true
            modalName.value = 'DoctorsModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const loadParentData = (data) => {
            if(data.refresh){
                getItems()
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
        
        const moveBtn = () => {
            setupTemplateVariables.value.map((item, index) => {
                item.order_by = index + 1
            });
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value+'/order-by', setupTemplateVariables.value)
                .then((res) => {
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

            setupTemplateVariables,
            statusesCount,
            activeStatus,
            recordId,
            actionMode,
            bulkAction,
            bulkOptions,
            selectItem,
            getItems,
            errors,

            bulkActionBtn,
            bulkActionBtnBack,
            orderByBtn,
            addEditModalBtn,
            deleteBtn,

            loadParentData,
            closeModal,
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
            moveBtn,
            search,
        }
    }
});
</script>