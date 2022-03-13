<script setup lang="ts">
import { MapView } from "@here/harp.gl";
import { onMounted, provide } from "vue";
import {getDefer} from '../../utils/promise'
let mapPromise = getDefer()
let map;
provide("mapPromise",mapPromise)
onMounted(() => {
	map = new MapView({
		canvas:document.getElementById("globe") as HTMLCanvasElement,
		theme:
			"https://unpkg.com/@here/harp-map-theme@0.2.2/resources/berlin_tilezen_base.json",
	});
    mapPromise.resolve(map)
});
</script>
<template>
	<canvas id="globe"></canvas>
</template>
<style></style>
