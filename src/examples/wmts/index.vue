<script setup lang="ts">
import Globe from "@/components/map/globe.vue";
import { MapView } from "@here/harp-mapview";
import { GeoCoordinates } from "@here/harp-geoutils";
const onLoaded = (map: MapView) => {
	map.lookAt({
		target: new GeoCoordinates(40.70398928, -74.01319808),
		zoomLevel: 17,
		tilt: 40,
	});
	
};
</script>
<template>
	<Globe @loaded="onLoaded" mapControl projection="3d"></Globe>
</template>
<style></style>
