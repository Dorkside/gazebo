<script setup></script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="bg-gray-900 text-white w-64 flex-none py-12">
      <!-- Navigation Links -->
      <nav class="mt-6">
        <ul class="text-sm font-medium">
          <li>
            <nuxt-link
              to="/dashboard"
              class="flex items-center py-2 px-4 text-gray-400 hover:text-white transition-colors"
              :class="{ 'text-white': $route.path === '/dashboard' }"
            >
              <span class="mdi mdi-view-dashboard-outline mr-3" />
              Dashboard
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/calendars"
              class="flex items-center py-2 px-4 text-gray-400 hover:text-white transition-colors"
              :class="{ 'text-white': $route.path === '/calendars' }"
            >
              <span class="mdi mdi-calendar-month-outline mr-3" />
              Calendars
            </nuxt-link>
          </li>
          <!-- Additional Configurable Element -->
          <li>
            <nuxt-link
              to="/settings"
              class="flex items-center py-2 px-4 text-gray-400 hover:text-white transition-colors"
              :class="{ 'text-white': $route.path === '/settings' }"
            >
              <span class="mdi mdi-account-outline mr-3" />
              Settings
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
