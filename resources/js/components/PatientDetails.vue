<template>
    <div class="">
        
        <router-link :to="'/admin/case/'+patientId+'/'+caseId" class="btn btn-sm btn-primary ml-10 mb-12" v-if="Helpers.hasPermission('case_management','can_view')">
            Edit
        </router-link>
        <!-- <router-link :to="'/admin/case/'+patientId+'/'+caseId+'/receipt'" class="btn btn-sm btn-primary ml-10 mb-12" v-if="Helpers.hasPermission('case_management','can_view')">
            Receipt
        </router-link> -->
        <a :href="'/receipt/'+caseId" class="btn btn-sm btn-primary ml-10 mb-12" v-if="Helpers.hasPermission('case_management','can_view')" target="_blank">
            Receipt
        </a>
        <router-link :to="'/admin/case/'+patientId+'/'+caseId+'/payment'" class="btn btn-sm btn-primary ml-10 mb-12" v-if="Helpers.hasPermission('case_management','can_view')">
            Payment
        </router-link>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Status from "@/components/global/Status.vue";
import PermissionError from "@/components/global/PermissionError.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import Swal from 'sweetalert2'
import $ from "jquery"
import Helpers from "./helpers/helpers";
// import AddTestModal from "@/components/modals/AddTestModal.vue";

export default defineComponent({
    name: "patient-case-receipt",
    components: {
        Status,
        PermissionError,
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
        this.loadData()
    },
    methods:{},
    setup(){
        const route = useRoute();
        const router = useRouter();
        const patientId = route.params.patientId
        const caseId = route.params.caseId
        const pageLevelEndPoint = ref('/cases')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });
        
        const errors : any = ref([]);
        const sampleLocations : any = ref([]);
        const reffers : any = ref([]);
        
        const actionMode = ref('')
        const showModal = ref(false)
        const modalName = ref('')
        const patientTests : any = ref([])
        const patient : any = ref({})
        const caseTests : any = ref([])
        const caseData : any = ref({})

        const record : any = ref({})

        const btnLoader = ref({
            active: false,
            hideContent: true,
            activeContent: ''
        })

        const btnLoaderAction = (data:any) => {
            btnLoader.value.activeContent = data
        }

        const loadData = () => {
            console.log('patientId=',patientId,caseId)
            loaderSettings.value.active = true;
            getSampleLocations()
            getReffers()
            patientCheck()
        }

        const printBtn = () => {
            // Get the printable content
            var printableContent = $("#printMe").html();
            if (printableContent.length) {
                // Open the print dialog
                var printWindow : any = window.open();
                printWindow.document.write(printableContent);
                printWindow.print();
                printWindow.close();
            }
        }

        const removeBtn = (index:any) => {
            btnLoader.value.active = true;
            setTimeout(() => {
                patientTests.value.splice(index, 1);
                btnLoader.value.active = false;
            }, 1000);
        }

        const updateBtn = () => {
            // console.log('patientTests.value=',patientTests.value)
            record.value.tests = patientTests.value
            record.value.patient_id = route.params.patientId
            // console.log('record.value=',record.value)
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value+'', record.value)
                .then((res) => {
                    if(res.data.status == 'success'){
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
                    } else {
                        errors.value = res.data.errors
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
        }
        
		const getSampleLocations = () => {
			axios.get('/admin/get/sample-locations')
			.then((res) => {
				sampleLocations.value = res.data
            })
        }

        const getReffers = () => {
            axios.get(Helpers.completeUrl()+'/get/reffers')
            .then((res) => {
                reffers.value = res.data
            })
        }

        const patientCheck = () => {
            axios.post(Helpers.completeUrl()+'/patients/check',{
                patient_id: route.params.patientId
            })
            .then((res) => {
                if(res.data.exist == false){
                    window.location.href = Helpers.appUrl()+''+Helpers.appEndPoint()+'/cases'
                } else {
                    getData()
                }
            })
        }

        const getData = () => {
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/edit',{
                patient_id: route.params.patientId,
                case_id: route.params.caseId,
                actionMode: 'edit'
            })
                .then((res) => {
                    patient.value = res.data.patient
                    caseTests.value = res.data.caseTestsReceipt
                    record.value = res.data.itemData
                    caseData.value = {
                        caseMaxDate:res.data.caseMaxDate,
                        discountType:res.data.discountType,
                        subTotal:res.data.subTotal,
                        discount:res.data.discount,
                        discountedAmount:res.data.discountedAmount,
                        netTotal:res.data.netTotal,
                        paid:res.data.paid,
                        dueAmount:res.data.dueAmount
                    }
                    var details = res.data.itemData.patient_case_details
                    if(details.length > 0){
                        details.forEach((element:any) => {
                            patientTests.value.push({
                                maintest_id: element.main_test?element.main_test.id:'',
                                main_test_code: element.main_test?element.main_test.test_code:'',
                                main_test_name: element.main_test?element.main_test.test_name:'',
                                // main_test_rate: element.main_test?element.main_test.test_rate:'',
                                main_test_order_by: element.main_test?element.main_test.order_by:'',
                                subtest_id: element.sub_test?element.sub_test.id:'',
                                sub_test_code: element.sub_test?element.sub_test.test_code:'',
                                sub_test_name: element.sub_test?element.sub_test.test_name:'',
                                sub_test_rate: element.sub_test?element.sub_test.test_rate:'',
                                reporting_time: element.sub_test?element.sub_test.reporting_time:'',
                            })
                        });
                    }
                    loaderSettings.value.active = false;
                })
                .catch((error) => {
                    console.log(error)
                    loaderSettings.value.active = false;
                })
        }

        const addTestModalBtn = (mode,itemId) => {
            actionMode.value = mode
            showModal.value = true
            modalName.value = 'AddTestModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const loadParentData = (data:any) => {
            if(data.refresh){
                console.log('loadParentData=',JSON.stringify(data))
                // getItems(1)
                // if(data['data'].length > 0){
                //     data['data'].forEach((element:any) => {
                //         patientTests.value.push(element)
                //     });
                // }
                
                if(data['data'].length > 0){
                    data['data'].forEach((e:any) => {
                        patientTests.value.push(e)
                    });
                }

                // getTests(patientTests.value)
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
        
        return {
            pageLevelEndPoint,
            loaderSettings,

            errors,
            loadData,
            getSampleLocations,
            sampleLocations,

            sweetalertMessage,
            Helpers,
            record,

            addTestModalBtn,
            actionMode,
            showModal,
            modalName,

            loadParentData,
            closeModal,
            getReffers,
            reffers,
            patientTests,
            caseData,

            btnLoader,
            btnLoaderAction,
            updateBtn,
            removeBtn,
            patient,
            caseTests,
            printBtn,

            patientId,
            caseId,
        }
    }
});
</script>