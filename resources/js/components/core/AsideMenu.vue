<template>
    <!-- BEGIN: Main Menu-->
    <div class="main-menu menu-fixed menu-accordion menu-shadow menu-light" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item me-auto">
                    <a class="navbar-brand" :href="Helpers.appEndPoint()">
                        <span class="brand-logo">
                            <img :src="Helpers.mediaPath()+Helpers.appLogoLight()" :alt="Helpers.appName()">
                        </span>
                        <!-- <h2 class="brand-text">{{Helpers.appName()}}</h2> -->
                    </a>
                </li>
                <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse"><i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i><i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i></a></li>
            </ul>
        </div>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                <li class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()"><vue-feather class="icon" type="home" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Dashboard">Dashboard</span></router-link></li>

                <!-- <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class=" navigation-header"><span data-i18n="Tests">Tests</span><i data-feather="more-horizontal"></i></li> -->
                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/tests'"><vue-feather class="icon" type="droplet" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Users">Tests</span></router-link></li>
                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/patients'"><vue-feather class="icon" type="users" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Users">Patients</span></router-link></li>
                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/cases'"><vue-feather class="icon" type="clipboard" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Users">Cases</span></router-link></li>
                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/doctors'"><vue-feather class="icon" type="smile" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Doctors">Doctors</span></router-link></li>

                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class=" navigation-header"><span data-i18n="Users">Users</span><i data-feather="more-horizontal"></i></li>
                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/users/super-admins'"><vue-feather class="icon" type="users" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Users">Super Admins</span></router-link></li>
                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'employee'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/users/employee'"><vue-feather class="icon" type="users" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Users">Employee</span></router-link></li>
                <!-- <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/users/normal-users'"><vue-feather class="icon" type="users" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Users">Normal Users</span></router-link></li> -->
                
                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class=" navigation-header"><span data-i18n="Others">Others</span><i data-feather="more-horizontal"></i></li>
                <!-- <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/groups'"><vue-feather class="icon" type="users" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Users">Groups</span></router-link></li> -->

                <li v-if="Helpers.roleSlug() == 'super_admin' || Helpers.roleSlug() == 'administrator'" class="nav-item"><a class="d-flex align-items-center" href="#"><vue-feather class="icon" type="shield" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Roles & Permissions">Roles & Permissions</span></a>
                    <ul class="menu-content">
                        <li>
                            <router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/setup/roles'"><vue-feather class="icon" type="minus" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Roles">Roles</span></router-link>
                        </li>
                        <li>
                            <router-link class="d-flex align-items-center" :to="Helpers.appEndPoint()+'/setup/permissions'"><vue-feather class="icon" type="minus" size="16"></vue-feather><span class="menu-title text-truncate" data-i18n="Permissions">Permissions</span></router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <!-- END: Main Menu-->
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import * as Helpers from "../../components/helpers/helpers"

export default defineComponent({
  name: "main-menu",
    setup() {
        const route = useRoute();
        return {
            Helpers,
        }
    },
})
</script>