<script setup lang="ts">
import Globe from "@/components/map/globe.vue";
import { MapView } from "@here/harp-mapview";
import {GeoCoordinates,} from '@here/harp-geoutils'
import {VectorTileDataSource,APIFormat} from '@here/harp-vectortile-datasource'
import {OmvDataSource} from '@here/harp-omv-datasource'
const onLoaded = (map:MapView) => {
	console.log("loaded map", map);
	map.lookAt({
		target: new GeoCoordinates(40.70398928, -74.01319808),
		zoomLevel: 17,
		tilt: 40,
	});
	const vectorTileDataSource = new VectorTileDataSource({
		authenticationCode: apikey,
	});
	map.addDataSource(vectorTileDataSource);
	const dataSource = new OmvDataSource({
		baseUrl: "https://tile.openstreetmap.jp/data/japan",
		apiFormat: APIFormat.TomtomV1,
		// styleSetName: "osm",
	});
	// map.addDataSource(dataSource);

};
const apikey = "J0IJdYzKDYS3nHVDDEWETIqK3nAcxqW42vz7xeSq61M";
</script>
<template>
	<Globe @loaded="onLoaded" :apikey="apikey" mapControl></Globe>
</template>
<style></style>
