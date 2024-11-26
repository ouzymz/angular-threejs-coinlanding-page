import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { extend, injectStore, NgtArgs } from "angular-three";
import { NgtsMeshWobbleMaterial } from "angular-three-soba/materials";
import {
	NgtsEnvironment,
	NgtsRenderTexture,
	NgtsRenderTextureContent,
} from "angular-three-soba/staging";
import * as THREE from "three";
import { scenes } from "../state";
import { RenderTextureScene } from "./render-texture-scene";

extend(THREE);

@Component({
	standalone: true,
	template: `
		<ngt-color *args="['#ececec']" attach="background" />
		<ngt-ambient-light [intensity]="0.2 * Math.PI" />

		<ngts-environment [options]="{ preset: 'city' }" />

		<app-camera-handler [slideDistance]="slideDistance" />

		<ngts-mesh-wobble-material [options]="{ color: scene.mainColor }" />

		<ngt-mesh [position]="[0 * (viewport().width + slideDistance), 0, 0]">
			<ngt-plane-geometry *args="[viewport().width, viewport().height]" />
			<ngt-mesh-basic-material [toneMapped]="false">
				<ngts-render-texture>
					<app-render-texture-scene *renderTextureContent [scene]="scene" />
				</ngts-render-texture>
			</ngt-mesh-basic-material>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtArgs,
		NgtsEnvironment,
		NgtsRenderTexture,
		NgtsRenderTextureContent,
		RenderTextureScene,
		NgtsMeshWobbleMaterial,
	],
})
export class Scene {
	Math = Math;
	scene = scenes[0];

	private store = injectStore();
	viewport = this.store.select("viewport");
	camera = this.store.select('camera')
	constructor(){
		this.camera().position.set(0,0,15)
		console.log(this.camera().position)
	}

	slideDistance = 1;


}
