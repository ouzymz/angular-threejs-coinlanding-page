import {
	ChangeDetectionStrategy,
	Component,
	computed,
	CUSTOM_ELEMENTS_SCHEMA,
	input,
	signal,
} from "@angular/core";
import { NgtArgs } from "angular-three";
import { NgtsPerspectiveCamera } from "angular-three-soba/cameras";
import { NgtsOrbitControls } from "angular-three-soba/controls";
import { injectGLTF } from "angular-three-soba/loaders";
import {
	NgtsAccumulativeShadows,
	NgtsEnvironment,
	NgtsLightformer,
	NgtsRandomizedLights,
} from "angular-three-soba/staging";
import { BackSide, MathUtils, Mesh } from "three";
import { ShowroomScene } from "../state";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

injectGLTF.preload(() => ["models/8x-token-with-candles.glb"],{useDraco:true});

const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

@Component({
	selector: "app-render-texture-scene",
	standalone: true,
	template: `
		@let name = scene().name;
		@let mainColor = scene().mainColor;

		<ngt-color *args="['#ffffff']" attach="background" />
		<ngt-group [name]="name" [dispose]="null">
			<ngts-perspective-camera
				[options]="{ makeDefault: true, position:isMobile()? [4, 0, 5]:[3,3,8], near: 0.5 }"
			/>
			<ngts-orbit-controls
				[options]="{
					autoRotate: true,
					enablePan: false,
					maxPolarAngle: DEG2RAD * 75,
					minDistance: 6,
					maxDistance: 20,
					autoRotateSpeed: 0.5,
				}"
			/>

			<ngt-primitive *args="[model()]" [parameters]="{ scale: ratioScale }" />

			<ngt-ambient-light [intensity]="0.1 * Math.PI" color="pink" />
			<ngts-accumulative-shadows
				[options]="{
					frames: 100,
					alphaTest: 0.75,
					scale: 30,
					position: [0, -0.005, 0],
					color: 'pink',
					opacity: 0.8,
				}"
			>
				<ngts-randomized-lights
					[options]="{
						amount: 4,
						radius: 9,
						intensity: 0.8 * Math.PI,
						ambient: 0.25,
						position: [10, 5, 15],
					}"
				/>
				<ngts-randomized-lights
					[options]="{
						amount: 4,
						radius: 5,
						intensity: 0.5 * Math.PI,
						position: [-5, 5, 15],
						bias: 0.001,
					}"
				/>
			</ngts-accumulative-shadows>
			<ngts-environment [options]="{ blur: 0.8, background: true }">
				<ng-template>
					<ngt-mesh [scale]="15">
						<ngt-sphere-geometry />
						<ngt-mesh-basic-material [color]="mainColor" [side]="BackSide" />
					</ngt-mesh>

					<ngts-lightformer
						[options]="{
							position: [5, 0, -5],
							form: 'rect',
							intensity: 1,
							color: 'blue',
							scale: [3, 5],
							target: [0, 0, 0],
						}"
					/>
					<ngts-lightformer
						[options]="{
							position: [-5, 0, 1],
							form: 'circle',
							intensity: 1,
							color: 'green',
							scale: [2, 5],
							target: [0, 0, 0],
						}"
					/>
					<ngts-lightformer
						[options]="{
							position: [-3, 3, 3],
							form: 'circle',
							intensity: 1,
							color: 'purple',
							scale: [2, 5],
							target: [0, 0, 0],
						}"
					/>
					<ngts-lightformer
						[options]="{
							position: [-5, 3, -3],
							form: 'circle',
							intensity: 1,
							color: 'yellow',
							scale: [2, 5],
							target: [0, 0, 0],
						}"
					/>
					<ngts-lightformer
						[options]="{
							position: [0, 5, -2],
							form: 'ring',
							intensity: 0.5,
							color: 'orange',
							scale: [10, 5],
							target: [0, 0, 0],
						}"
					/>
					<ngts-lightformer
						[options]="{
							position: [0, 0, 5],
							form: 'rect',
							intensity: 1,
							color: 'green',
							scale: [10, 5],
							target: [0, 0, 0],
						}"
					/>
				</ng-template>
			</ngts-environment>
		</ngt-group>
	`,

	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtArgs,
		NgtsPerspectiveCamera,
		NgtsOrbitControls,
		NgtsAccumulativeShadows,
		NgtsRandomizedLights,
		NgtsEnvironment,
		NgtsLightformer,
	],
})
export class RenderTextureScene {
	isMobile = signal<boolean>(false)
	ngOnInit() {
		if (window.innerWidth <= window.innerHeight) {
			console.log(window.innerWidth, window.innerHeight);
			this.isMobile.set(true);
		} 
	}

	Math = Math;
	DEG2RAD = MathUtils.DEG2RAD;
	BackSide = BackSide;
	ratioScale = ratioScale;

	scene = input.required<ShowroomScene>();

	private gltf = injectGLTF(() => this.scene().path);
	model = computed(() => {
		const gltf = this.gltf();
		if (!gltf) return null;
		const model = gltf.scene;
		model.traverse((child) => {
			if ((child as Mesh).isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		return model;
	});
}
