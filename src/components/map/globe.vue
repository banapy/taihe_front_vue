<script setup lang="ts">
import { onMounted, provide, onBeforeUnmount, PropType } from "vue";
import { Defer, getDefer } from "../../utils/promise";
// import harp from "harp";
import {
	MapView,
	MapViewAtmosphere,
	AtmosphereLightMode,
} from "@here/harp-mapview";
import { sphereProjection, mercatorProjection } from "@here/harp-geoutils";
import { MapControls, MapControlsUI } from "@here/harp-map-controls";
let mapPromise: Defer<MapView> = getDefer();
let map: MapView;
const props = defineProps({
	mapControl: {
		type: Boolean,
		default: false,
	},
	atmosphere: {
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
	});
	map.resize(window.innerWidth, window.innerHeight);
	window.onresize = () => map.resize(window.innerWidth, window.innerHeight);
	emit("loaded", map);
	const mapControls = new MapControls(map);
	if (props.mapControl) {
		const ui = new MapControlsUI(mapControls, {
			zoomLevel: "input",
			projectionSwitch: true,
		});
		canvas.parentElement?.appendChild(ui.domElement);
	}
	if (props.atmosphere) {
		const { camera, projection, mapAnchors } = map;
		const updateCallback = () => map.update();
		const atmosphere = new MapViewAtmosphere(
			mapAnchors,
			camera,
			projection,
			map.renderer.capabilities,
			updateCallback
		);
		atmosphere.lightMode = AtmosphereLightMode.LightDynamic;
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
	z-index: 0;
}
</style>
