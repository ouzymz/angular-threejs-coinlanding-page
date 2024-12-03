import { signal } from "@angular/core";

export const scenes = [
	{
		path: "models/8x-token-with-candles.glb",
		mainColor: "#d688f6",
		name: "If you don't believe it or don't get it, I don't have the time to try to convince you, sorry.” Simply billion~dollar~mcap",
		ca:
			"NOT LAUNCHED YET! AVAIBLE AFTER LAUNCH. WAIT UNTIL 6 DECEMBER",
		price: "X icon",
		range: "Tg icon",
	},
] as const;

export type ShowroomScene = (typeof scenes)[number];

export const slide = signal(0);
