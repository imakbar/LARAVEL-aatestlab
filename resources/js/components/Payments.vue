<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Payments</h2>
                        </div>
                    </div>
                </div>
                <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                    <div class="mb-1 breadcrumb-right">
                    </div>
                </div>
            </div>
            <div class="content-body" ref="loadingRefContainer">
                
                <div class="row">
                    <div class="col-sm-3 mb-15">
                        <label class="form-label">Patient#</label>
                        <input type="text" class="form-control" @change.prevent="getItems()" v-model="search.patient_number" />
                    </div>
                    <div class="col-sm-3 mb-15">
                        <label class="form-label">Patient Name</label>
                        <input type="text" class="form-control" @change.prevent="getItems()" v-model="search.name" />
                    </div>
                    <div class="col-sm-3 mb-15">
                        <label class="form-label">Patient Mobile</label>
                        <input type="text" class="form-control" @change.prevent="getItems()" v-model="search.mobile" />
                    </div>
                    <div class="col-sm-3 mb-15">
                        <label class="form-label">Gender</label>
                        <v-select
                            id="gender_id"
                            class="dropdown bg-white"
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
                    <div class="col-sm-4 mb-15">
                        <label class="form-label">Reffer(Doctor)</label>
                        <v-select
                            id="gender_id"
                            class="dropdown bg-white"
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
                    <div class="col-sm-8 mb-15">
                        <label class="form-label">Address</label>
                        <input type="text" class="form-control" @change.prevent="getItems()" v-model="search.address" />
                    </div>
                    <div class="col-sm-6 mb-15">
                        <label class="form-label">Date</label>
                        <VueDatePicker v-model="search.date" range multi-calendars />
                    </div>
                    <div class="col-sm-6 mb-15">
                        <button @click.prevent="getItems()">Search</button>
                    </div>
                </div>

                <section class="app-user-list">
                    <div class="card">
                        
                        <!-- Loading -->
                        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

                        <div v-if="Helpers.hasPermission('case_management','can_view')">
                            <div class="list-top-header">
                                <div class="col_right">
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
                                                <span v-if="col.field != 'id'">
                                                    {{col.label}}
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="payments.total > 0">
                                        <tr v-for="(item,index) in payments.data" :key="index">
                                            <td>
                                                <div>
                                                    <div class="mt-10 mb-10">
                                                        {{ item.patient_number }} 
                                                        <strong>{{ item.name?' / '+item.name:'' }}</strong> 
                                                        {{ item.gender?' / '+item.gender:'' }} 
                                                        {{ item.age?' / '+item.age:'' }} 
                                                        {{ item.mobile?' / '+item.mobile:'' }} 
                                                        {{ item.address?' / '+item.address:'' }}
                                                    </div>
                                                </div>
                                                <!-- <span v-for="(t,tIndex) in item.patient_case_details" :key="tIndex">
                                                    <span class="badge bg-primary cursor-pointer mr-4 mt-2 mb-2" v-if="t.sub_test">
                                                        {{ t.sub_test.test_name }}
                                                    </span>
                                                </span> -->
                                            </td>
                                            <td>
                                                <span>{{item.case_number}}</span>
                                            </td>
                                            <td>
                                                <span>{{item.paid}}</span>
                                            </td>
                                            <td>
                                                <div>{{Helpers.durationFormat(item.created_at)}}</div>
                                                <div>{{Helpers.dateFormat(item.created_at,'YYYY-MM-DD')}}</div>
                                                <div>{{Helpers.dateFormat(item.created_at,'hh:mm a')}}</div>
                                            </td>
                                            <td>
                                                <ProfileAvatarAndName :user="item.created_by"></ProfileAvatarAndName>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <div class="list-bottom-footer" v-if="payments.total > 0">
                                    <div class="col_left">
                                        <div class="entries_showing">Showing {{payments.from}} to {{payments.to}} of {{payments.total}} entries</div>
                                    </div>
                                    <div class="col_right">
                                        <pagination 
                                            :data="payments" 
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
        
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// import feather from 'feather-icons';
import { Actions, Mutations } from "../store/enums/StoreEnums";

import Status from "@/components/global/Status.vue";
import PermissionError from "@/components/global/PermissionError.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import Swal from 'sweetalert2'
import Helpers from "./helpers/helpers";
import PatientAvatarAndName from "@/components/global/PatientAvatarAndName.vue";
import ProfileAvatarAndName from "@/components/global/ProfileAvatarAndName.vue";

export default defineComponent({
    name: "payments",
    components: {
        Status,
        PermissionError,
        GlobalLoader,
        PatientAvatarAndName,
        ProfileAvatarAndName,
    },
    created(){
        this.getItems()
        this.loadData()
    },
    setup(){
        const route = useRoute();
        
        const userRoleType = ref(route.params.userRoleType);

        const appEndPoint = ref(process.env.MIX_APP_END_POINT)
        const apiEndPoint = ref(process.env.MIX_APP_API_END_POINT)
        const pageLevelEndPoint = ref('/payments')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });
        
        const payments : any = ref([]);
        const recordId = ref('');
        const actionMode = ref('')
        
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

        const getItems = (page = 1) => {
            loaderSettings.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/get?page='+page,{
                search: search.value,
                perPageAction: perPageAction.value,
                orderByAction: orderByAction.value,
            })
                .then(res => {
                    payments.value = res.data.items
                    perPageAction.value = res.data.items.per_page
                    perPageOptions.value = res.data.perPageOptions
                    tableColumns.value = res.data.tableColumns
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
        
        return {
            appEndPoint,
            apiEndPoint,
            pageLevelEndPoint,
            
            loaderSettings,

            payments,
            userRoleType,
            recordId,
            actionMode,
            getItems,
            perPageActionBtn,
            orderByBtn,
            loadParentData,
            closeModal,

            perPageAction,
            perPageOptions,
            orderByAction,
            tableColumns,
            clearSortInTableColumns,
            sweetalertMessage,

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