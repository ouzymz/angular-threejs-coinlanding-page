import {
	ChangeDetectionStrategy,
	Component,
	effect,
	signal,
} from "@angular/core";
import { scenes, slide } from "./state";
@Component({
	selector: "app-overlay",
	standalone: true,
	template: `
		@if (isMobile()) {
			<div
				class="fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-white transition-opacity duration-1000 "
				[class]="!visible() ? ['opacity-0'] : []"
			>
				<div class="flex justify-between items-center ">
					<img
						style=" width:30dvw;min-width: 30dvh;"
						src="/bmcap-logo.png"
						alt=""
					/>
				</div>

				<!-- <div
					class="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4"
				>
					<svg
						(click)="onPrevClick()"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="{1.5}"
						stroke="currentColor"
						class="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
						/>
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="{1.5}"
						stroke="currentColor"
						class="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
						(click)="onNextClick()"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
						/>
					</svg>
				</div> -->

				<div
					class="gap-1 bg-gradient-to-t from-gray-800  pt-20 pb-3 p-4 flex items-center flex-col text-center"
				>
					@let slide = scenes[displaySlide()];
					<div class="flex items-center gap-2 mt-10">
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://t.me/BMCAPFR')"
								class="flex gap-2 items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-1x-mobile"
							>
								<img
									src="telegram-icon.png"
									alt="price"
									class="redirect-img-mobile"
								/>
							</div>
						</div>
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://x.com/1bmcap')"
								class="flex gap-2 items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-1x-mobile"
							>
								<img
									src="twitter-icon.png"
									alt="price"
									class="redirect-img-mobile"
								/>
							</div>
						</div>
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://www.dexscreener.com')"
								class="flex gap-2 items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-1x-mobile"
							>
								<img
									src="dex-icon.png"
									alt="price"
									class="redirect-img-mobile"
								/>
							</div>
						</div>
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://www.pump.fun')"
								class="flex items-center gap-2 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-2x-mobile"
							>
								<img src="buy-icon.png" alt="buy" class="buy-img-mobile" />
							</div>
						</div>
					</div>
					<h4 class="text-2xl mb-3 mt-3">
						{{ slide.name }}
					</h4>
					<div
						(click)="copyCA(slide.ca)"
						class="relative p-4 border-2 border-white rounded-[20px]  items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
					>
						<span class="text-opacity-60 font-semibold ">Copy CA:</span>
						<span class="text-opacity-60 italic">{{ slide.ca }}</span>
					</div>
				</div>
			</div>
		} @else {
			<div
				class="fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-white transition-opacity duration-1000 "
				[class]="!visible() ? ['opacity-0'] : []"
			>
				<div class="flex justify-between items-center  pr-8 mt-2 ">
					<img
						style=" width:30dvw;min-width: 40dvh;"
						src="/bmcap-logo.png"
						alt=""
					/>

					<div class="flex items-center gap-1 mt-10 mb-10">
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://t.me/BMCAPFR')"
								class="flex gap-2 items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-1x mr-1"
							>
								<img src="telegram-icon.png" alt="price" class="redirect-img" />
							</div>
						</div>
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://x.com/1bmcap')"
								class="flex gap-2 items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-1x mr-1"
							>
								<img src="twitter-icon.png" alt="price" class="redirect-img" />
							</div>
						</div>
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://www.dexscreener.com')"
								class="flex gap-2 items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-1x mr-6"
							>
								<img src="dex-icon.png" alt="price" class="redirect-img" />
							</div>
						</div>
						<div class="flex flex-col items-center">
							<div
								(click)="redirectTo('https://www.pump.fun')"
								class="flex items-center gap-2 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer button-2x"
							>
								<img src="buy-icon.png" alt="buy" class="buy-img" />
							</div>
						</div>
					</div>
				</div>

				<!-- <div
					class="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4"
				>
					<svg
						(click)="onPrevClick()"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="{1.5}"
						stroke="currentColor"
						class="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
						/>
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="{1.5}"
						stroke="currentColor"
						class="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
						(click)="onNextClick()"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
						/>
					</svg>
				</div> -->

				<div
					class="gap-2 bg-gradient-to-t from-gray-800  pt-20 pb-10 p-4 flex items-center flex-col text-center "
				>
					@let slide = scenes[displaySlide()];

					<h4 class="text-2xl mb-6 ">
						{{ slide.name }}
					</h4>
					<div
						(click)="copyCA(slide.ca)"
						class="relative p-4 border-2 border-white rounded-[14px]  items-center pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
					>
						<span class="text-opacity-60 font-semibold ">Copy CA:</span>
						<span class="text-opacity-60 italic">{{ slide.ca }}</span>
					</div>
				</div>
			</div>
		}
	`,
	styles: `
		.button-1x {
			border: solid 3px white;
			border-radius: 20px;
			padding: 5px;
		}
		.redirect-img {
			width: 3dvw;
			height: 3dvw;
			min-width: 35px;
			min-height: 35px;
			max-width: 90px;
			max-height: 90px;
		}
		.button-2x {
			background-color: rgba(35, 255, 89, 0.47);
			border: solid 5px white;
			border-radius: 20px;
			padding: 5px;
		}
		.buy-img {
			width: 6dvw;
			height: 3dvw;
			min-width: 70px;
			min-height: 35px;
			max-width: 180px;
			max-height: 90px;
		}
		.button-1x-mobile {
			border: solid 3px white;
			border-radius: 10px;
			padding: 3px;
		}
		.redirect-img-mobile {
			width: 3dvw;
			height: 3dvw;
			min-width: 30px;
			min-height: 30px;
			max-width: 90px;
			max-height: 90px;
		}
		.button-2x-mobile {
			background-color: rgba(35, 255, 89, 0.47);
			border: solid 5px white;
			border-radius: 10px;
			padding: 3px;
		}
		.buy-img-mobile {
			width: 8dvw;
			height: 2dvw;
			min-width: 60px;
			min-height: 30px;
			max-width: 180px;
			max-height: 90px;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overlay {
	scenes = scenes;
	displaySlide = signal(slide());
	visible = signal(false);
	isMobile = signal(false);

	ngOnInit() {
		if (window.innerWidth <= window.innerHeight) {
			console.log(window.innerWidth, window.innerHeight);
			this.isMobile.set(true);
		} else {
			this.isMobile.set(false);
		}
	}

	constructor() {
		effect(() => {
			setTimeout(() => {
				this.visible.set(true);
			}, 1000);
		});

		effect(
			() => {
				const currentSlide = slide();
				this.visible.set(false);
				setTimeout(() => {
					this.displaySlide.set(currentSlide);
					this.visible.set(true);
				}, 2600);
			},
			{ allowSignalWrites: true },
		);
	}

	onNextClick() {
		slide.update((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
	}

	onPrevClick() {
		slide.update((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
	}

	redirectTo(href: string) {
		window.open(href, "_blank");
	}
	copyCA(CA: string) {
		navigator.clipboard.writeText(CA).then(
			() => {
				console.log("Copied successfully!");

			},
			(err) => {
				console.error("Failed to copy: ", err);
				alert("Failed to copy CA.");
			},
		);
	}
}
