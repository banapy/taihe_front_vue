<script setup lang="ts">
import { onMounted, provide, onBeforeUnmount, PropType } from "vue";
import { Defer, getDefer } from "../../utils/promise";
// import harp from "harp";
import { MapView } from "@here/harp-mapview";
import { sphereProjection, mercatorProjection } from "@here/harp-geoutils";
import { MapControls, MapControlsUI } from "@here/harp-map-controls";
let mapPromise:Defer<MapView> = getDefer();
let map:MapView
const props = defineProps({
	apiKey: String,
	mapControl: {
		type: Boolean,
		default: false,
	},
	projection: {
		type: String as PropType<"2d" | "3d">,
		default: "3d",
	},
});
const emit = defineEmits(["loaded"]);
provide("mapPromise", mapPromise);
onMounted(() => {
	let projection =
		props.projection === "3d" ? sphereProjection : mercatorProjection;
	const canvas = document.getElementById("globe") as HTMLCanvasElement;
	map = new MapView({
		canvas,
		projection: projection,
		theme:
			"https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_night_reduced.json",
	});
	map.resize(window.innerWidth, window.innerHeight);
	window.onresize = () => map.resize(window.innerWidth, window.innerHeight);
	emit("loaded", map);
	const mapControls = new MapControls(map);
	if (props.mapControl) {
		const ui = new MapControlsUI(mapControls);
		canvas.parentElement?.appendChild(ui.domElement);
	}
});
onBeforeUnmount(() => {
	map && map.dispose();
});
</script>
<template>
	<canvas id="globe"></canvas>
</template>
<style>
#globe {
	width: 100%;
	height: 100%;
}
</style>
