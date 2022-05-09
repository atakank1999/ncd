import {
	Context,
	PersistentUnorderedMap,
} from "near-sdk-as";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const psychologists = new PersistentUnorderedMap<string, Psychologist>(
	"psy"
);

export const patients = new PersistentUnorderedMap<string, Patient>("pat");

export const appointmentsPat = new PersistentUnorderedMap<
	string,
	Map<string, Appointment>
>("appat");

export const appointmentsPsy = new PersistentUnorderedMap<
	string,
	Map<string, Appointment>
>("appsy");


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@nearBindgen
export class Appointment {
	id: string;
	day: u8;
	hour: u8;
	psyId: string;
	patId: string;

	constructor(day: u8, hour: u8, psy: string, pat: string) {
		this.id = day.toString() + hour.toString();
		this.day = day;
		this.hour = hour;
		this.psyId = psy;
		this.patId = pat;
	}

	////////////////////////////////////////////////////////////////
	/* Static methods for Patient class starts here */

	static create(day: u8, hour: u8, psyId: string, patId: string): Appointment {
		assert(day <= 5, "The value of the day can't be bigger than 5");
		assert(day >= 1, "The value of the day can't be less than 1");

		assert(hour <= 9, "The value of the hour can't be bigger than 9");
		assert(hour >= 1, "The value of the hour can't be less than 1");

		const appointment = new Appointment(day, hour, psyId, patId);

		let map = appointmentsPat.get(patId);
		if (map == null) {
			map = new Map<string, Appointment>();
		}
		const id = day.toString() + hour.toString();
		map.set(id, appointment);
		appointmentsPat.set(patId, map);

		map = appointmentsPsy.get(psyId);
		if (map == null) {
			map = new Map<string, Appointment>();
		}
		map.set(id, appointment);

		appointmentsPsy.set(psyId, map);

		return appointment;
	}

	static patAppRead(patId: string): Map<string, Appointment> | null {
		const appointments = appointmentsPat.get(patId);
		return appointments;
	}

	static psyAppRead(psyId: string): Map<string, Appointment> | null {
		const appointments = appointmentsPsy.get(psyId);
		return appointments;
	}

	static update(
		id: string,
		day: u8,
		hour: u8,
		psyId: string
	): Appointment | null {
		assert(day <= 5, "The value of the day can't be bigger than 5");
		assert(day >= 1, "The value of the day can't be less than 1");

		assert(hour <= 9, "The value of the hour can't be bigger than 9");
		assert(hour >= 1, "The value of the hour can't be less than 1");

		const map = appointmentsPat.get(Context.sender);

		assert(map, "You are not an registered patient");

		if (map) {
			assert(
				map.keys().includes(id),
				"Appointment with this ID couldn't be found"
			);
			let app = map.get(id);
			if (app.day != day || app.hour != hour || app.psyId != psyId) {
				app.day = day;
				app.hour = hour;
				app.id = day.toString() + hour.toString();

				if (psyId != app.psyId) {
					const mapPsy = appointmentsPsy.get(app.psyId);
					if (mapPsy) {
						mapPsy.delete(id);
						appointmentsPsy.set(app.psyId, mapPsy);
					}
					app.psyId = psyId;
				}

				map.delete(id);
				map.set(day.toString() + hour.toString(), app);
				appointmentsPat.set(app.patId, map);

				let map2 = appointmentsPsy.get(psyId);

				assert(map2, "psychologist couldn't be found");

				if (map2) {
					map2.set(day.toString() + hour.toString(), app);
					appointmentsPsy.set(psyId, map2);
					return app;
				}
			}
		}

		return null;
	}

	static delete(id: string, psyId: string): void {
		const map = appointmentsPat.get(Context.sender);

		assert(map, "You are not an registered patient");
		if (map) {
			assert(
				map.keys().includes(id),
				"Appointment with this ID couldn't be found on patient appointments"
			);
			map.delete(id);
			appointmentsPat.set(Context.sender, map);
		}

		const map2 = appointmentsPsy.get(psyId);
		assert(map2, "psychologist couldn't be found");
		if (map2) {
			assert(
				map2.keys().includes(id),
				"Appointment with this ID couldn't be found on psychologist appointments"
			);
			map2.delete(id);
			appointmentsPsy.set(psyId, map2);
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@nearBindgen
export class Psychologist {
	name: string;
	id: string;
	price: u8;

	constructor(name: string, id: string, price: u8) {
		this.name = name;
		this.id = id;
		this.price = price;
	}

	static create(name: string, price: u8): Psychologist | null {
		const id = Context.sender;
		if (id == "psychologist.testnet" || id == "psychologist2.testnet") {
			const psy = new Psychologist(name, id, price);
			psychologists.set(id, psy);
			return psy;
		}
		return null;
	}

	static read(id: string): Psychologist | null {
		return psychologists.get(id);
	}

	static update(id: string, name: string, price: u8): Psychologist | null {
		let psy = psychologists.get(id);
		if (psy) {
			psy.name = name;
			psy.price = price;
		}

		return psy;
	}

	static delete(): void {
		psychologists.delete(Context.sender);
	}

	static getAll(): Map<string, Psychologist> {
		const map = new Map<string, Psychologist>();
		for (let i = 0; i < psychologists.keys.length; i++) {
			map.set(
				psychologists.keys()[i],
				psychologists.getSome(psychologists.keys()[i])
			);
		}

		return map;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@nearBindgen
export class Patient {
	name: string;
	id: string;

	constructor(name: string, id: string) {
		this.name = name;
		this.id = id;
	}

	static create(name: string): Patient {
		const id = Context.sender;
		const pat = new Patient(name, id);
		patients.set(id, pat);
		return pat;
	}

	static read(id: string): Patient | null {
		return patients.get(id);
	}

	static update(id: string, name: string): Patient | null {
		let pat = patients.get(id);
		if (pat) {
			pat.name = name;
		}

		return pat;
	}

	static delete(): void {
		patients.delete(Context.sender);
	}
}
