import { Psychologist, Appointment, Patient } from "./model";
import { Context, u128, PersistentUnorderedMap, MapEntry } from "near-sdk-as";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Psychologist related methods */
export function psyGetOne(id: string): Psychologist | null {
	return Psychologist.read(id);
}
export function psyCreate(name: string, price: u8): Psychologist | null {
	return Psychologist.create(name, price);
}
export function updatePsy(
	id: string,
	name: string,
	price: u8
): Psychologist | null {
	return Psychologist.update(id, name, price);
}

export function deletePsy(): void {
	Psychologist.delete();
}

export function getAllPsy(): Map<string, Psychologist> {
	return Psychologist.getAll();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Patient related methods */
export function patGetOne(id: string): Patient | null {
	return Patient.read(id);
}
export function patCreate(name: string): Patient {
	return Patient.create(name);
}
export function updatePat(id: string, name: string): Patient | null {
	return Patient.update(id, name);
}

export function deletePat(): void {
	Patient.delete();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Appointment related methods */

export function patAppGetAll(patId: string): Map<String, Appointment> | null {
	return Appointment.patAppRead(patId);
}

export function psyAppGetAll(psyId: string): Map<String, Appointment> | null {
	return Appointment.psyAppRead(psyId);
}

export function appCreate(
	day: u8,
	hour: u8,
	psyId: string,
	patId: string
): Appointment {
	return Appointment.create(day, hour, psyId, patId);
}

export function updateApp(
	id: string,
	day: u8,
	hour: u8,
	psyId: string
): Appointment | null {
	return Appointment.update(id, day, hour, psyId);
}

export function deleteApp(id: string, psyId:string):string {
	Appointment.delete(id,psyId);

	return id
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
