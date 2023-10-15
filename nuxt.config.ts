// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      socketPort: 3002,
      url: "http://localhost"
    }
  },
  nitro: {
    plugins: ["./plugins/socket.io.server"]
  }
})
