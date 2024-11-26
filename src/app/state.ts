import { signal } from "@angular/core";

export const scenes = [
	{
		path: "models/cybertruck_scene.glb",
		mainColor: "#d688f6",
		name: "Simply   BMCAP",
		description:
			"“If you don't believe it or don't get it, I don't have the time to try to convince you, sorry.” Simply billion dollar market cap fr",
		price: "X icon",
		range: "Tg icon",
	},
] as const;

export type ShowroomScene = (typeof scenes)[number];

export const slide = signal(0);
