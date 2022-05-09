<template>
	<div>
		<button class="link" style="float: right" v-on:click="logout">
			Sign out
		</button>

		<div id="table" class="container">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">Monday</th>
						<th scope="col">Tuesday</th>
						<th scope="col">Wednesday</th>
						<th scope="col">Thursday</th>
						<th scope="col">Friday</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row" style="width: 118px">8:40 - 9:30</th>
						<td>{{ this.appointments.get("11") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("21") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("31") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("41") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("51") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">9:40 - 10:30</th>
						<td>{{ this.appointments.get("12") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("22") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("32") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("42") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("52") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">10:40 - 11:30</th>
						<td>{{ this.appointments.get("13") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("23") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("33") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("43") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("53") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">11:40 - 12:30</th>
						<td>{{ this.appointments.get("14") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("24") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("34") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("44") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("54") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">12:40 - 13:30</th>
						<td>{{ this.appointments.get("15") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("25") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("35") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("45") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("55") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">13:40 - 14:30</th>
						<td>{{ this.appointments.get("16") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("26") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("36") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("46") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("56") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">14:40 - 15:30</th>
						<td>{{ this.appointments.get("17") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("27") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("37") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("47") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("57") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">15:40 - 16:30</th>
						<td>{{ this.appointments.get("18") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("28") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("38") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("48") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("58") ? "FULL" : "" }}</td>
					</tr>
					<tr>
						<th scope="row">16:40 - 17:30</th>
						<td>{{ this.appointments.get("19") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("29") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("39") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("49") ? "FULL" : "" }}</td>
						<td>{{ this.appointments.get("59") ? "FULL" : "" }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="container">
			<div class="row justify-content-md-center">
				<div class="col-8">
					<form @submit.prevent="appCreate">
						<div class="form-control text-start">
							<select
								class="form-select"
								aria-label="Default select example"
								v-model="psy"
								@change="psyAppgetAll"
							>
								<option
									v-for="psy in psychologists"
									:value="psy.id"
									:key="psy.id"
								>
									{{ psy.name }}
								</option>
							</select>
						</div>
						<div class="form-control text-start">
							<select
								class="form-select"
								aria-label="Default select example"
								v-model="day"
							>
								<option selected>Select Day</option>
								<option value="1">Monday</option>
								<option value="2">Tuesday</option>
								<option value="3">Wednesday</option>
								<option value="4">Thursday</option>
								<option value="5">Friday</option>
							</select>
						</div>
						<div class="form-control text-start">
							<select
								class="form-select"
								aria-label="Default select example"
								v-model="hour"
							>
								<option selected>Select Time</option>
								<option value="1">8:40 - 9:30</option>
								<option value="2">9:40 - 10:30</option>
								<option value="3">10:40 - 11:30</option>
								<option value="4">11:40 - 12:30</option>
								<option value="5">12:40 - 13:30</option>
								<option value="6">13:40 - 14:30</option>
								<option value="7">14:40 - 15:30</option>
								<option value="8">15:40 - 16:30</option>
								<option value="9">16:40 - 17:30</option>
							</select>
						</div>

						<div>
							<button class="btn btn-primary" type="submit">
								Create Appointment
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<ul>
				<li v-for="(app, idx) in newApps" :key="idx">
					{{
						app.day.toString() +
							"      -      " +
							app.hour.toString() +
							"      -      " +
							app.psyName +
							"      "
					}}
					<button
						@click="deleteApp($event, app.id, app.psyId)"
						class="btn btn-danger btn-sm"
					>
						delete
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { logout } from "../utils";
import Big from "big.js";

export default {
	name: "SignedIn",

	components: {},

	data: function () {
		return {
			appointments: new Map([
				[11, ""],
				[12, ""],
				[13, ""],
				[14, ""],
				[15, ""],
				[16, ""],
				[17, ""],
				[18, ""],
				[19, ""],

				[21, ""],
				[22, ""],
				[23, ""],
				[24, ""],
				[25, ""],
				[26, ""],
				[27, ""],
				[28, ""],
				[29, ""],

				[31, ""],
				[32, ""],
				[33, ""],
				[34, ""],
				[35, ""],
				[36, ""],
				[37, ""],
				[38, ""],
				[39, ""],

				[41, ""],
				[42, ""],
				[43, ""],
				[44, ""],
				[45, ""],
				[46, ""],
				[47, ""],
				[48, ""],
				[49, ""],

				[51, ""],
				[52, ""],
				[53, ""],
				[54, ""],
				[55, ""],
				[56, ""],
				[57, ""],
				[58, ""],
				[59, ""],
			]),

			day: "",
			hour: "",
			psy: "",
			psychologists: {},
			myAppointments: new Map(),
		};
	},

	beforeMount() {
		if (this.isSignedIn) {
			this.getAllPsy();
			this.patAppGetAll();
		}
	},

	computed: {
		isSignedIn() {
			return window.walletConnection
				? window.walletConnection.isSignedIn()
				: false;
		},
		accountId() {
			return window.accountId;
		},
		contractId() {
			return window.contract ? window.contract.contractId : null;
		},
		networkId() {
			return window.networkId;
		},

		newApps() {
			let newApps = {};

			// eslint-disable-next-line no-unused-vars
			this.myAppointments.forEach((val, key) => {
				newApps[val.id] = {};
				let day = 0;
				let hour = 0;
				const psychologistName = this.psychologists[val.psyId].name;
				const psyId = this.psychologists[val.psyId].id;
				const id = val.id;

				newApps[val.id].psyName = psychologistName;
				newApps[val.id].psyId = psyId;
				newApps[val.id].id = id;

				if (val.day == 1) {
					day = "Monday";
				} else if (val.day == 2) {
					day = "Tuesday";
				} else if (val.day == 3) {
					day = "Wednesday";
				} else if (val.day == 4) {
					day = "Thursday";
				} else {
					day = "Friday";
				}

				newApps[val.id].day = day;

				if (val.hour == 1) {
					hour = "8:40 - 9:30";
				} else if (val.hour == 2) {
					hour = "9:40 - 10:30";
				} else if (val.hour == 3) {
					hour = "10:40 - 11:30";
				} else if (val.hour == 4) {
					hour = "11:40 - 12:30";
				} else if (val.hour == 5) {
					hour = "12:40 - 13:30";
				} else if (val.hour == 6) {
					hour = "13:40 - 14:30";
				} else if (val.hour == 7) {
					hour = "14:40 - 15:30";
				} else if (val.hour == 8) {
					hour = "15:40 - 16:30";
				} else {
					hour = "16:40 - 17:30";
				}

				newApps[val.id].hour = hour;
			});
			return newApps;
		},
	},

	methods: {
		getAllPsy() {
			window.contract.getAllPsy({}).then((psychologists) => {
				this.psychologists = psychologists;
			});
		},
		patAppGetAll() {
			window.contract
				.patAppGetAll({ patId: this.accountId })
				.then((appointments) => {
					console.log(appointments);
					this.myAppointments = new Map(Object.entries(appointments));
				});
		},
		psyAppgetAll() {
			console.log(this.psy);
			window.contract.psyAppGetAll({ psyId: this.psy }).then((appointments) => {
				if (appointments) {
					this.appointments = new Map(Object.entries(appointments));
				}
				console.log(this.appointments);
			});
		},
		appCreate() {
			console.log(this.psy);
			const price = Big(this.psychologists[this.psy].price || "0")
				.times(10 ** 24)
				.toFixed();
			const BOATLOAD_OF_GAS = Big(3)
				.times(10 ** 13)
				.toFixed();

			window.contract
				.appCreate(
					{
						day: Number(this.day),
						hour: Number(this.hour),
						psyId: this.psy,
						patId: this.accountId,
					},
					BOATLOAD_OF_GAS,
					price
				)
				.then((app) => {
					console.log(app);
					this.getAllPsy();
					this.psy = app.psyId;
					this.myappointments = this.patAppGetAll();
					this.appointments = this.psyAppgetAll();
				});
		},

		deleteApp(event, id, psyId) {
			console.log(id);
			console.log(psyId);
			window.contract.deleteApp({ id: id.toString(), psyId: psyId }).then(()=>{

				this.myappointments = this.patAppGetAll();
			});
		},

		logout: logout,
	},
};
</script>
