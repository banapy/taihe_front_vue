<script setup lang="ts">
import Globe from "@/components/map/globe.vue";
import { MapView } from "@here/harp-mapview";
import { GeoCoordinates } from "@here/harp-geoutils";
import {
	VectorTileDataSource,
	APIFormat,
} from "@here/harp-vectortile-datasource";
import mapbox2harp from "@/components/map/mapbox2harp";
import { mapstyle } from "./style";
const onLoaded = (map: MapView) => {
	const theme = {
		styles: {
			osm: mapbox2harp(mapstyle as mapboxgl.Style),
		},
		textStyles: [
			{
				name: "smallSign",
				color: "#000000",
				fontCatalogName: "fira",
			},
			{
				name: "smallSignLight",
				color: "#FFFFFF",
				fontCatalogName: "fira",
			},
			{
				name: "placeMarker",
				color: "#60FF60",
				fontCatalogName: "fira",
			},
		],
		fontCatalogs: [
			{
				name: "fira",
				url: "https://heremaps.github.io/harp-map-editor/fonts/Default_FontCatalog.json",
			},
		],
	};
	map.setTheme(theme);
	map.lookAt({
		target: new GeoCoordinates(35.68, 139.77),
		zoomLevel: 13.3,
		tilt: 40,
	});
	const dataSource = new VectorTileDataSource({
		baseUrl: "https://tile.openstreetmap.jp/data/asia",
		apiFormat: APIFormat.TomtomV1,
		styleSetName: "osm",
	});
	map.addDataSource(dataSource);
};
</script>
<template>
	<Globe @loaded="onLoaded" mapControl projection="3d"></Globe>
</template>
<style></style>
