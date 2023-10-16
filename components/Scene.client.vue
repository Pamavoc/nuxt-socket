<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
    power-preference="high-performance"
    preserve-drawing-buffer
    physically-correct-lights
  >
    <OrbitControls />
    <TresPerspectiveCamera
      :position="[1, 2, 5]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <TresScene>
      <TresMesh ref="boxRef" :position="position" cast-shadow>
          <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshStandardMaterial color="teal" />
      </TresMesh>

      <TresMesh ref="sphereRef" :scale="1" cast-shadow>
        <TresSphereGeometry :args="[1, 100, 100]" />
        <TresMeshStandardMaterial
          v-bind="pbrTexture"
          displacement-scale="0.2"
        />
      </TresMesh>
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas, useLoader, useTexture, useRenderLoop, TresInstance } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

const sphereRef: Ref<TresInstance | null> = ref(null);
const { resume, onLoop } = useRenderLoop();

const position = { x: 0, y: 0, z: 0 }
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)

resume();

onLoop(({ delta, elapsed }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
  if (sphereRef.value) {
    sphereRef.value.rotation.y = delta;
  }

  if(boxRef.value) {
    boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3
  }
});

const pbrTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalGL.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
});
</script>