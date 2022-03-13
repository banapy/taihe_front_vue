<script setup lang="ts">
import { onMounted, provide } from "vue";
import { getDefer } from "../../utils/promise";
import harp from 'harp'
let mapPromise = getDefer();
let map;
const apikey = "J0IJdYzKDYS3nHVDDEWETIqK3nAcxqW42vz7xeSq61M";

provide("mapPromise", mapPromise);
onMounted(() => {
	const canvas = document.getElementById("globe") as HTMLCanvasElement
	const mapView = new harp.MapView({
		canvas,
		theme:
			"https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_night_reduced.json",
	});

	// center the camera to New York
	mapView.lookAt({
		target: new harp.GeoCoordinates(40.70398928, -74.01319808),
		zoomLevel: 17,
		tilt: 40,
	});

	const mapControls = new harp.MapControls(mapView);
	const ui = new harp.MapControlsUI(mapControls);
	canvas.parentElement.appendChild(ui.domElement);
	mapView.resize(window.innerWidth, window.innerHeight);
	window.onresize = () => mapView.resize(window.innerWidth, window.innerHeight);

	const vectorTileDataSource = new harp.VectorTileDataSource({
		authenticationCode: apikey
	});
	mapView.addDataSource(vectorTileDataSource);
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
