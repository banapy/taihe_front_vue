<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user";
const userStore = useUserStore();
const router = useRouter();
const signIn = () => {
	router.push("/login");
};
</script>
<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/home">太和地理</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarColor01"
				aria-controls="navbarColor01"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarColor01">
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<router-link class="nav-link active" to="/home"
							>首页<span class="visually-hidden">(current)</span></router-link
						>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/data">数据</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/analysis">分析</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/map">地图</router-link>
					</li>
				</ul>
				<ul class="navbar-nav">
					<li>
						<form class="d-flex">
							<input
								class="form-control me-sm-2"
								type="text"
								placeholder="关键词"
							/>
							<button class="btn btn-secondary my-2 my-sm-0" type="submit">
								Search
							</button>
						</form>
					</li>
					<li class="nav-item dropdown">
						<template v-if="!userStore.isSignIn">
							<button
								type="button"
								class="btn btn-outline-dark"
								@click="signIn"
							>
								登录
							</button>
						</template>
						<template v-else>
							<a
								class="nav-link dropdown-toggle"
								data-bs-toggle="dropdown"
								href="#"
								role="button"
								aria-haspopup="true"
								aria-expanded="false"
								>我</a
							>
							<div class="dropdown-menu">
								<a class="dropdown-item" href="#">基本资料</a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#">注销</a>
								<a class="dropdown-item" href="#">Separated link</a>
							</div>
						</template>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<style></style>
