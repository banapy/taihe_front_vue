<script setup lang="ts">
import { ref } from "vue";
const list = ref<
	{ title: string; description: string; link: string; img: string }[]
>([
	{
		title: "title1",
		description: "description1",
		link: "",
		img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0607%252F6b8bd691j00quaiy0002wc000hs00n0c.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648127382&t=d659a11bfe32614a35bb617dc550aa25",
	},
]);
</script>
<template>
	<div class="d-flex flex-row justify-conten-start">
		<div class="card w-25" v-for="it in list">
			<h3 class="card-header">{{ it.title }}</h3>
			<img :src="it.img" />
			<div class="card-body">
				<p class="card-text">
					{{ it.description }}
				</p>
			</div>
		</div>
	</div>
</template>
<style></style>
