<template>
  <div>
    <h1>Counter: {{ counter }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>

  <Scene />
</template>
<script setup>


const counter = ref(0)
const { $io } = useNuxtApp()
onMounted(()=> {})

$io.connect()

$io.on(SocketEvent.new_count, (message) => {
  counter.value = message
})

const increment = () => {
  $io.emit(SocketEvent.up, { value: 5})
}

const decrement = () => {
  $io.emit(SocketEvent.down, { value: 5})
}
</script>