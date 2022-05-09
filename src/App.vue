<template>

	<div id="root">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
		<SignedOut v-show="!isSignedIn" />
		<SignedIn v-show="isSignedIn" />
	</div>
	
</template>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

<script>
import "./global.css";
import getConfig from "./config";
import SignedOut from "./components/SignedOut.vue";
import SignedIn from "./components/SignedIn.vue";

// eslint-disable-next-line no-undef
const nearConfig = getConfig(process.env.NODE_ENV || "development");
console.log(
	`networkId:${nearConfig.networkId} CONTRACT_NAME:${nearConfig.contractName}`
);
window.networkId = nearConfig.networkId;

export default {
	created() {
		document.title = "new-awesome-project";
	},
	name: "App",
	components: {
		SignedOut,
		SignedIn,
	},

	computed: {
		isSignedIn() {
			return window.walletConnection.isSignedIn();
		},
	},
};
</script>

