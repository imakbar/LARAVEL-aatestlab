<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
            </div>
            <div class="content-body">
                <!-- Dashboard Ecommerce Starts -->
                <section id="dashboard-ecommerce">
                    <div class="row match-height">
                        <!-- Medal Card -->
                        <div class="col-xl-4 col-md-6 col-12">
                            <div class="card card-congratulation-medal">
                                <div class="card-body">
                                    <h5>Hi {{Helpers.firstName()}} {{Helpers.lastName()}}!</h5>
                                    <p class="card-text font-small-3">Welcome to the dashboard</p>
                                    <router-link class="btn btn-primary" :to="Helpers.appEndPoint()+'/profile'">My Profile</router-link>
                                </div>
                            </div>
                        </div>
                        <!--/ Medal Card -->
                    </div>
                </section>
                <!-- Dashboard Ecommerce ends -->

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import * as Helpers from "../components/helpers/helpers"

export default defineComponent({
    name: "dashboard",
    setup() {
        const route = useRoute();
        return {
            Helpers,
        }
    },
})
</script>
