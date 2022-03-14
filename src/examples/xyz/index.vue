<script setup lang="ts">
import Globe from "@/components/map/globe.vue";
import { MapView } from "@here/harp-mapview";
import { GeoCoordinates } from "@here/harp-geoutils";
import { WebTileDataSource } from "@here/harp-webtile-datasource";
import { XYZProvider } from "@/components/map/XYZProvider";
// https://manage.thunderforest.com/dashboard
const apiKey = "2764ec12b74445659e110b1af66df0a9";
const dataSourceList: {
	name: string;
	url: string;
	parameter?: { [key: string]: string };
}[] = [
	{
		name: "osm",
		url: "https://tile.openstreetmap.org",
	},
	{
		name: "thunderforest-cycle",
		url: "https://tile.thunderforest.com/cycle/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-transport",
		url: "https://tile.thunderforest.com/transport/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-landscape",
		url: "https://tile.thunderforest.com/landscape/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-outdoors",
		url: "https://tile.thunderforest.com/outdoors/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-transport-dark",
		url: "https://tile.thunderforest.com/transport-dark/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-spinal-map",
		url: "https://tile.thunderforest.com/spinal-map/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-pioneer",
		url: "https://tile.thunderforest.com/pioneer/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-mobile-atlas",
		url: "https://tile.thunderforest.com/mobile-atlas/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-neighbourhood",
		url: "https://tile.thunderforest.com/neighbourhood/",
		parameter: { apiKey },
	},
	{
		name: "thunderforest-atlas",
		url: "https://tile.thunderforest.com/atlas/",
		parameter: { apiKey },
	},
];
let mapView: MapView;
const onLoaded = (map: MapView) => {
	map.lookAt({
		target: new GeoCoordinates(39.9, 116.4),
		zoomLevel: 17,
		tilt: 40,
	});
	mapView = map;
	onChange({ target: { value: "osm" } });
};
let lastDataSource: WebTileDataSource;
function onChange(evt: any) {
	const value = evt.target.value;
	const item = dataSourceList.find((x) => x.name === value);
	if (item) {
		if (lastDataSource) {
			if (mapView) {
				mapView.removeDataSource(lastDataSource);
			}
		}
		lastDataSource = new WebTileDataSource({
			dataProvider: new XYZProvider({
				baseUrl: item.url,
				parameter: item.parameter,
			}),
		});
		mapView.addDataSource(lastDataSource);
	}
}
</script>
<template>
	<div class="form-group">
		<label for="exampleSelect1" class="form-label mt-4">数据源</label>
		<select class="form-select" id="exampleSelect1" @change="onChange">
			<option v-for="item in dataSourceList" :key="item.name">
				{{ item.name }}
			</option>
		</select>
	</div>
	<Globe @loaded="onLoaded" mapControl projection="3d"></Globe>
</template>
<style scoped>
.form-group {
	z-index: 1;
	position: absolute;
	width: 20vw;
}
.form-label {
	color: black;
}
</style>
