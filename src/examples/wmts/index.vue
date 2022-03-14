<script setup lang="ts">
import Globe from "@/components/map/globe.vue";
import { MapView } from "@here/harp-mapview";
import { GeoCoordinates } from "@here/harp-geoutils";
import { WebTileDataSource } from "@here/harp-webtile-datasource";
import { WMTSProvider } from "@/components/map/WMTSProvider";
const onLoaded = (map: MapView) => {
	map.lookAt({
		target: new GeoCoordinates(39.9, 116.4),
		zoomLevel: 17,
		tilt: 40,
	});
	const dataSource = new WebTileDataSource({
		dataProvider: new WMTSProvider({
			baseUrl: "http://t0.tianditu.gov.cn/vec_w/wmts",
			parameter: {
				format: "tiles",
				layer: "vec",
				maximumLevel: "1",
				minimumLevel: "18",
				service: "wmts",
				tk: "5ac36718ffda736958317e215b8664a7",
			},
		}),
	});
	map.addDataSource(dataSource);
};
</script>
<template>
	<Globe @loaded="onLoaded" mapControl projection="3d"></Globe>
</template>
<style></style>
