// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      socketPort: 3002,
      url: "http://localhost"
    }
  },
  modules: ["@tresjs/nuxt"],
  nitro: {
    plugins: ["./plugins/socket.io.server"]
  }
})
