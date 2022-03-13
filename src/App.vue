<script setup lang="ts">
import MyHeader from "./components/header/index.vue";
</script>
<template>
	<MyHeader></MyHeader>
	<router-view></router-view>
</template>
<style scoped>
#app {
}
.main-body {
	width: 75%;
	margin: 0 auto;
}
</style>
