<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Patients</h2>
                            <!-- modal trigger button -->
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-sm btn-primary ml-10 mb-12" @click="addEditModalBtn('add','')" v-if="Helpers.hasPermission('patient_management','can_add')">
                                    Add New
                                </button>
                            </div>
                            <!-- <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><router-link :to="'/admin'">Dashboard</router-link>
                                    </li>
                                    <li class="breadcrumb-item"><router-link :to="'#'">Setup</router-link>
                                    </li>
                                    <li class="breadcrumb-item active">Users
                                    </li>
                                </ol>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                    <div class="mb-1 breadcrumb-right">
                        <!-- <div class="dropdown">
                            <button class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="grid"></i></button>
                            <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="app-todo.html"><i class="me-1" data-feather="check-square"></i><span class="align-middle">Todo</span></a><a class="dropdown-item" href="app-chat.html"><i class="me-1" data-feather="message-square"></i><span class="align-middle">Chat</span></a><a class="dropdown-item" href="app-email.html"><i class="me-1" data-feather="mail"></i><span class="align-middle">Email</span></a><a class="dropdown-item" href="app-calendar.html"><i class="me-1" data-feather="calendar"></i><span class="align-middle">Calendar</span></a></div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="content-body" ref="loadingRefContainer">
                
                <div class="row">
                    <div class="col-sm-1 mb-15">
                        <label class="form-label">Patient#</label>
                        <input type="text" class="form-control" @change.prevent="getItems()" v-model="search.patient_number" />
                    </div>
                    <div class="col-sm-3 mb-15">
                        <label class="form-label">Patient Name</label>
                        <input type="text" class="form-control" @change.prevent="getItems()" v-model="search.name" />
                    </div>
                    <div class="col-sm-2 mb-15">
                        <label class="form-label">Gender</label>
                        <v-select
                            id="gender_id"
                            class="dropdown"
                            v-model="search.gender_id"
                            placeholder="--Select--"
                            :clearable="true"
                            :reduce="(option) => option.id"
                            :options="genders"
                            label="title"
                            @close="getItems()"
                        >
                            <template v-slot:option="option">
                                <div class="list-item">
                                    {{ option.title }}
                                </div>
                            </template>
                        </v-select>
                    </div>
                    <div class="col-sm-3 mb-15">
                        <label class="form-label">Reffer(Doctor)</label>
                        <v-select
                            id="gender_id"
                            class="dropdown"
                            v-model="search.reffer_id"
                            placeholder="--Select--"
                            :clearable="true"
                            :reduce="(option) => option.id"
                            :options="reffers"
                            label="name"
                            @close="getItems()"
                        >
                            <template v-slot:option="option">
                                <div class="list-item">
                                    {{ option.name }}
                                </div>
                            </template>
                        </v-select>
                    </div>
                    <div class="col-sm-3 mb-15">
                        <label class="form-label">Address</label>
                        <input type="text" class="form-control" @change.prevent="getItems()" v-model="search.address" />
                    </div>
                </div>

                <section class="app-user-list">
                    <div class="card">
                        
                        <!-- Loading -->
                        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

                        <div v-if="Helpers.hasPermission('patient_management','can_view')">
                            <div class="list-top-header">
                                <div class="col_right">
                                    <div v-if="selectedItems.length == 0">
                                        <span v-for="(item,index) in statusesCount" :key="index">
                                            <span v-if="item.count > 0">
                                                <span v-if="index != 0"> | </span>
                                                <router-link 
                                                    class="page-status-link"
                                                    :class="item.class"
                                                    :to="appEndPoint+'/patients/'+item.key">
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
                                    <tbody v-if="patients.total > 0">
                                        <tr v-for="(item,index) in patients.data" :key="index">
                                            <td class="selectionTd">
                                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" :value="item.id" v-model="selectedItems" @change="selectItem" />
                                            </td>
                                            <td>
                                                <div class="d-flex justify-content-left align-items-center">
                                                    <div class="avatar-wrapper" v-if="item">
                                                        <span class="mr-15">
                                                            <PatientAvatar :user="item"></PatientAvatar>
                                                        </span>
                                                    </div>
                                                    <div class="d-flex flex-column">
                                                        <span class="text-size-11 text-bold">{{item.patient_number}}</span>
                                                        <span class="user_name text-body text-truncate" v-if="item">
                                                            <span class="fw-bolder">
                                                                {{item.name}}
                                                            </span>
                                                        </span>
                                                        <small class="emp_post text-muted">
                                                            {{item.address}}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span v-if="item.cases && item.cases.length > 0">
                                                    <div>
                                                        {{ item.cases[0].created_date }}
                                                    </div>
                                                    <span v-if="item.cases[0] && item.cases[0].details">
                                                        <span v-for="(t,subIndex) in item.cases[0].details" :key="subIndex">
                                                            <span v-if="t.main_test" class="badge mr-4 mt-2 mb-2 bg-primary">{{t.main_test.test_name}}</span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="item.gender">{{item.gender.title}}</span>
                                            </td>
                                            <td>
                                                <span>{{item.created_date}}</span>
                                            </td>
                                            <td class="statusTd">
                                                <Status :status="item.status"></Status>
                                            </td>
                                            <td class="actionTd" v-if="
                                                Helpers.hasPermission('patient_management','can_update') ||
                                                Helpers.hasPermission('patient_management','can_delete')
                                            ">
                                                <div class="btn-group">
                                                    <a class="btn btn-sm dropdown-toggle hide-arrow icon-vertical-center" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <vue-feather class="icon" type="more-vertical" size="16"></vue-feather>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-end" style="">
                                                        <router-link 
                                                            v-if="Helpers.hasPermission('patient_management','can_update')"
                                                            class="dropdown-item icon-vertical-center"
                                                            :to="appEndPoint+'/case/'+item.id">
                                                            <vue-feather class="icon" type="clipboard" size="16"></vue-feather> Add Case
                                                        </router-link>
                                                        <button @click="addEditModalBtn('edit',item.id)"
                                                        v-if="item.status != 'trash' && Helpers.hasPermission('patient_management','can_update')" class="dropdown-item icon-vertical-center"><vue-feather class="icon" type="file-text" size="16"></vue-feather>Edit</button>
                                                        <button @click="deleteBtn(item.id)" v-if="Helpers.hasPermission('patient_management','can_delete')" href="javascript:;" class="dropdown-item icon-vertical-center delete-record"><vue-feather class="icon" type="trash" size="16"></vue-feather>
                                                            <span v-if="activeStatus == 'trash'">Delete</span>
                                                            <span v-else>Trash</span>
                                                        </button></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <div class="list-bottom-footer" v-if="patients.total > 0">
                                    <div class="col_left">
                                        <div class="entries_showing">Showing {{patients.from}} to {{patients.to}} of {{patients.total}} entries</div>
                                    </div>
                                    <div class="col_right">
                                        <pagination 
                                            :data="patients" 
                                            :limit=2 
                                            @pagination-change-page="getItems"
                                        ></pagination>
                                    </div>
                                </div>
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
            <PatientsModal 
                :recordObj="{
                    recordId:recordId,
                    actionMode:actionMode,
                    activeStatus:activeStatus,
                    showModal:showModal,
                    modalName:modalName,
                    roleId:roleId,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
            ></PatientsModal>
        </Teleport>
        
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// import feather from 'feather-icons';
import { Actions, Mutations } from "../store/enums/StoreEnums";

// import Loading from 'vue3-loading-overlay';
// import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
// import { createPopper } from '@popperjs/core';

import PatientsModal from "@/components/modals/PatientsModal.vue";
import Status from "@/components/global/Status.vue";
import PatientAvatar from "@/components/global/PatientAvatar.vue";
import PermissionError from "@/components/global/PermissionError.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import Swal from 'sweetalert2'
import Helpers from "./helpers/helpers";

export default defineComponent({
    name: "patients",
    components: {
        Status,
        PatientAvatar,
        PermissionError,
        PatientsModal,
        // Loading,
        GlobalLoader,
    },
    // props:{
    //     propHeightChanged:Number,
    //     singleDashboard:Object,
    //     widget: {
    //         type: Object,
    //         required: true
    //     },
    // },
    // emit: ['get-data'],
    // watch:{
        // widget_data: function(value) { 
        //   this.settings()
        // }
    // },
    watch: {
        // perPageAction: function (newVal) {
        //     alert(1)
        //     this.perPageActionBtn();
        // }
    },
    // mounted() {
    //     console.log('Component mounted.')
    // },
    created(){
        this.getItems()
        this.loadData()
    },
    // destroyed() {},
    methods:{
        // perPageActionBtn2(val){
        //     console.log('perPageActionBtn2',val)
        // },
        // withPopper(dropdownList, component, { width }) {
        //     /**
        //      * We need to explicitly define the dropdown width since
        //      * it is usually inherited from the parent with CSS.
        //      */
        //     dropdownList.style.width = width

        //     /**
        //      * Here we position the dropdownList relative to the $refs.toggle Element.
        //      *
        //      * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
        //      * the dropdownList overlap by 1 pixel.
        //      *
        //      * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
        //      * wrapper so that we can set some styles for when the dropdown is placed
        //      * above.
        //      */
        //     const popper = createPopper(component.$refs.toggle, dropdownList, {
        //         placement: 'bottom',
        //         modifiers: [
        //             {
        //                 name: 'offset',
        //                 options: {
        //                     offset: [0, -1],
        //                 },
        //             },
        //             {
        //                 name: 'toggleClass',
        //                 enabled: true,
        //                 phase: 'write',
        //                 fn({ state }) {
        //                     component.$el.classList.toggle(
        //                         'drop-up',
        //                         state.placement === 'bottom'
        //                     )
        //                 },
        //             },
        //         ],
        //     })

        //     /**
        //      * To prevent memory leaks Popper needs to be destroyed.
        //      * If you return function, it will be called just before dropdown is removed from DOM.
        //      */
        //     return () => popper.destroy()
        // },
    },
    setup(){
        const route = useRoute();
        
        const userRoleType = ref(route.params.userRoleType);
        const activeStatus = ref(route.params.status?route.params.status:'all');

        // const icons = Object.keys(feather.icons);
        const appEndPoint = ref(process.env.MIX_APP_END_POINT)
        const apiEndPoint = ref(process.env.MIX_APP_API_END_POINT)
        const pageLevelEndPoint = ref('/patients')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const selectedItems : any = ref([])
        const allSelected = ref(false)
        
        const statusesCount = ref([])
        // const totalItems = ref(0)
        const patients : any = ref([]);
        const recordId = ref('');
        const actionMode = ref('')
        const bulkAction : any = ref(null)
        const bulkOptions = ref([])
        
        const perPageAction : any = ref(25)
        const perPageOptions = ref([])
        const tableColumns : any = ref([])

        const orderByAction = ref({})

        const showModal = ref(false)
        const modalName = ref('')
        const roleId : any = ref('')

        const search : any = ref({})
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
        
        onMounted(() => {
            // window.addEventListener('mousemovenow', (event) => {
            //     if (event['detail'].value) {}
            // })
        });
        
        // const onCancelLoader =() => {
        //   console.log('User cancelled the loader.')
        // };

        const getItems = (page = 1) => {
            loaderSettings.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/get?status='+activeStatus.value+'&page='+page,{
                search: search.value,
                perPageAction: perPageAction.value,
                orderByAction: orderByAction.value,
            })
                .then(res => {
                    patients.value = res.data.items
                    // // totalItems.value = res.data.totalItems
                    statusesCount.value = res.data.statusesCount
                    bulkOptions.value = res.data.bulkOptions
                    perPageAction.value = res.data.items.per_page
                    perPageOptions.value = res.data.perPageOptions
                    allSelected.value = false
                    selectedItems.value = []
                    tableColumns.value = res.data.tableColumns
                    bulkAction.value = null
                    roleId.value = res.data.roleId
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

        // const editBtn = (itemId) => {
        //     recordId.value = itemId
        // }

        const selectAllItems = () => {
            if (allSelected.value) {
                const items :any = patients.value.data
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
            if (selectedItems.value.length == patients.value.data.length) {
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
                    requestedId: '',
                    status: 'warning',
                    title: 'Are you sure?',
                    message: message,
                    position: 'bottom-end',
                    confirmationBtn: true,
                    confirmButtonText: 'Yes',
                    cancelBtn: true,
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
                axios.put(process.env.MIX_APP_URL+`${apiEndPoint.value}`+`${appEndPoint.value}`+pageLevelEndPoint.value+'/bulk-action', {
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

            // if(orderByAction.value.field != val){
            //         orderByAction.value.orderBy = 'asc'
            // } else {
            //     if(orderByAction.value.orderBy == 'asc'){
            //         orderByAction.value.orderBy = 'desc'
            //     }else{
            //         orderByAction.value.orderBy = 'asc'
            //     }
            // }
            // orderByAction.value.field = val
        }

        const addEditModalBtn = (mode,itemId) => {
            actionMode.value = mode
            recordId.value = itemId
            showModal.value = true
            modalName.value = 'PatientsModal'
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
                requestedId: id,
                status: 'warning',
                title: 'Are you sure?',
                message: message,
                position: 'bottom-end',
                confirmationBtn: true,
                confirmButtonText: 'Yes',
                cancelBtn: true,
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
                showConfirmButton: data.confirmationBtn,
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
                    } else {
                        Toast.fire({
                            icon: data.status,
                            title: data.title,
                            text: data.message
                        })
                    }
                } else {
                    // not worked on it yet
                    if(data.requestedId != '' && data.requestType == 'trash'){
                        Swal.fire({
                            title: data.title,
                            text: data.message,
                            icon: 'info',
                            showCloseButton: true,
                            showCancelButton: true,
                            focusConfirm: true,
                            confirmButtonText:
                                '<i class="fa fa-thumbs-up"></i> Great!',
                            confirmButtonAriaLabel: 'Thumbs up, great!',
                            cancelButtonText:
                                '<i class="fa fa-thumbs-down"></i>',
                            cancelButtonAriaLabel: 'Thumbs down'
                        })
                    } else {
                        // if(data.status == 'success' || data.status == 'error' || data.status == 'warning' || data.status == 'info' || data.status == 'question'){
                            Swal.fire({
                                title: data.title,
                                text: data.message,
                                icon: 'info',
                                showCloseButton: true,
                                showCancelButton: true,
                                focusConfirm: true,
                                confirmButtonText:
                                    '<i class="fa fa-thumbs-up"></i> Great!',
                                confirmButtonAriaLabel: 'Thumbs up, great!',
                                cancelButtonText:
                                    '<i class="fa fa-thumbs-down"></i>',
                                cancelButtonAriaLabel: 'Thumbs down'
                            })
                        // }
                    }
                }
            }
        }
        
        return {
            // icons,
            appEndPoint,
            apiEndPoint,
            pageLevelEndPoint,
            
            loaderSettings,
            // isLoading,
            // isLoadingFullPage,

            patients,
            statusesCount,
            activeStatus,
            userRoleType,
            // totalItems,
            recordId,
            actionMode,
            bulkAction,
            bulkOptions,
            selectItem,
            // editBtn,
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
            Helpers,
            roleId,
            search,
            loadData,
            genders,
            reffers,
        }
    }
});
</script>