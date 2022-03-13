<script setup lang="ts">
import Globe from "@/components/map/globe.vue";
import { MapView } from "@here/harp-mapview";
import { GeoCoordinates } from "@here/harp-geoutils";
import {
	VectorTileDataSource,
} from "@here/harp-vectortile-datasource";
import { apikey } from "@/components/map/util";
const onLoaded = (map: MapView) => {
	map.lookAt({
		target: new GeoCoordinates(40.70398928, -74.01319808),
		zoomLevel: 17,
		tilt: 40,
	});
	map.setTheme("./resources/berlin_tilezen_base_globe.json");
	const vectorTileDataSource = new VectorTileDataSource({
		authenticationCode: apikey,
	});
	map.addDataSource(vectorTileDataSource);
};
</script>
<template>
	<Globe @loaded="onLoaded" mapControl projection="3d"></Globe>
</template>
<style></style>
