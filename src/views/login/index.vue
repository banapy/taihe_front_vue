<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
const form = reactive({
	username: "",
	password: "",
});
const router = useRouter();
const signIn = () => {
	console.log(form);
};
</script>
<template>
	<div class="main-body">
		<div class="form-group has-success">
			<label class="form-label mt-4" for="inputValid">账号</label>
			<input
				type="text"
				class="form-control"
				@input="(e) => (form.username = e.target?.value)"
			/>
			<div class="valid-feedback">Success! You've done it.</div>
		</div>
		<div class="form-group has-danger">
			<label class="form-label mt-4" for="inputInvalid">密码</label>
			<input
				type="text"
				class="form-control"
				@input="(e) => (form.password = e.target?.value)"
			/>
			<div class="invalid-feedback">
				Sorry, that username's taken. Try another?
			</div>
		</div>
		<div class="d-flex justify-content-center mt-4">
			<button type="button" class="btn btn-primary mr-2" @click="signIn">
				登录
			</button>
			<button type="button" class="btn btn-link">
				<router-link to="/register">注册</router-link>
			</button>
		</div>
	</div>
</template>
<style scoped>
.main-body {
	width: 40%;
}
</style>
