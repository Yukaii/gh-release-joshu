<template>
  <div>
    {{ status }}
    {{ data }}
    <button @click="signIn">Sign In</button>
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth();
</script>
