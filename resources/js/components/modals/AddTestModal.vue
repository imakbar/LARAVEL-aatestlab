<template>
    <Transition name="modal">
        <div
            v-if="recordObj.showModal && recordObj.modalName == 'AddTestModal'"
            class="modal-mask modal modal-overlay"
            >
            <div class="modal-dialog modal-lg fancy-scroll">
                <div class="modal-content">
                    <div class="modal-header bg-transparent">
                        <button @click="closeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-sm-2 pb-35 pt-0">
                        
                        <!-- Loading -->
                        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

                        <!-- <div class="text-center mb-20">
                            <h1 class="mb-1">
                                <span v-if="recordObj.actionMode == 'add'">Add New Test</span>
                                <span v-if="recordObj.actionMode == 'edit'">Edit Test</span>
                            </h1>
                        </div> -->

                        <!-- <div class="list-top-header">
                            <div class="col_right">
                                Tests
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
                        </div> -->

                        <div class="table-responsive pt-0 min-h-300">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Main Test Code</th>
                                        <th>Main Test Name</th>
                                        <th>Sub Test Code</th>
                                        <th>Sub Test Name</th>
                                        <th>Sub Test Rate</th>
                                        <!-- <th></th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" class="form-control form-control-sm" @change.prevent="getItems()" v-model="search.main_test_code">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-control-sm" @change.prevent="getItems()" v-model="search.main_test_name">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-control-sm" @change.prevent="getItems()" v-model="search.sub_test_code">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-control-sm" @change.prevent="getItems()" v-model="search.sub_test_name">
                                        </td>
                                        <td></td>
                                        <!-- <td></td> -->
                                    </tr>
                                </tbody>
                                <tbody v-if="tests.length > 0">
                                    <tr v-for="(item,index) in tests" :key="index">
                                        <td>
                                            <span>{{item.main_test_code}}</span>
                                        </td>
                                        <td>
                                            <span class="link text-primary" @click.prevent="selectTest({item,type:'main_test'})">{{item.main_test_name}}</span>
                                        </td>
                                        <td>
                                            <span>{{item.sub_test_code}}</span>
                                        </td>
                                        <td>
                                            <span class="link text-primary" @click.prevent="selectTest({item,type:'sub_test'})">{{item.sub_test_name}}</span>
                                        </td>
                                        <td>
                                            <span>{{item.sub_test_rate}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <div>
                            <div class="list-bottom-footer" v-if="tests.total > 0">
                                <div class="col_left">
                                    <div class="entries_showing">Showing {{tests.from}} to {{tests.to}} of {{tests.total}} entries</div>
                                </div>
                                <div class="col_right">
                                    <pagination 
                                        :data="tests" 
                                        :limit=2 
                                        @pagination-change-page="getItems"
                                    ></pagination>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <!-- <div class="modal-footer c-modal-footer btn-center">
                        <button @click="closeModal()" type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close" ref="Close">Cancel</button>
                    </div> -->
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
import $ from "jquery";
import * as Helpers from "../../components/helpers/helpers"

import GlobalLoader from "@/components/global/Loader.vue";

export default defineComponent({
    name: "add-test-modal",
    components: {
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
                if(val.modalName == 'AddTestModal'){
                    // if(val.actionMode == 'edit'){
                        this.getItems()
                    // }
                    // this.showModal = val.showModal
                }
                if(val.showModal == true){
                    this.selectedTests = []
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
        
        const errors : any = ref([]);
        const tests : any = ref([]);
        
        const perPageAction : any = ref(25)
        const search : any = ref({})
        const perPageOptions = ref([])
        const tableColumns : any = ref([])
        const orderByAction = ref({})

        const selectedTests : any = ref([])

        const btnLoader = ref({
            active: false,
            hideContent: true,
            activeContent: ''
        })
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        const childToParent = () => {
            var data = selectedTests.value
            emit('refresh-parent-data', {refresh:true,data})
        }

        const selectTest = (data:any) => {
            // console.log('selectTest=',data)
            if(data['type'] == 'main_test'){
                var getArray = Helpers.lodashFilterByValue(tests.value,'maintest_id',data['item']['maintest_id'])
                // console.log('getArray',getArray)
                if(getArray.length > 0){
                    getArray.forEach((e:any) => {
                        selectedTests.value.push(e)
                    });
                }
            } else {
                selectedTests.value.push(data['item'])
            }
            childToParent()
            sweetalertMessage({
                status: 'success',
                title: '',
                message: 'Test added',
                position: 'bottom-end',
                timer: 1000,
                progressBar: true,
                toast: true,
                showConfirmButton: false,
            })
        }

        const btnLoaderAction = (data:any) => {
            btnLoader.value.activeContent = data
        }

        const getItems = (page = 1) => {
            loaderSettings.value.active = true;
            errors.value = []
            axios.post(Helpers.completeUrl()+'/get/tests'+'?page='+page,{
                search: search.value,
                perPageAction: perPageAction.value,
                orderByAction: orderByAction.value,
            })
                .then((res) => {
                    tests.value = res.data.tests
                    perPageOptions.value = res.data.perPageOptions
                    // console.log('res.data=',res.data)
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
                .catch((error) => {
                    console.log(error)
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
        }

        const parentToChild = () => {
            emit('refresh-parent-data', {refresh:true})
        }

        const perPageActionBtn = (val) => {
            perPageAction.value = val.label
            getItems(1)
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
            // selectedTests.value = []
            emit('close-modal', {showModal:false})
        }

        return {
            pageLevelEndPoint,

            errors,

            getItems,
            parentToChild,
            sweetalertMessage,
            closeModal,
            loaderSettings,

            btnLoader,
            btnLoaderAction,

            Helpers,
            tests,

            search,
            perPageAction,
            perPageOptions,
            tableColumns,
            orderByAction,
            perPageActionBtn,

            selectedTests,
            selectTest,

        }
    },
})
</script>