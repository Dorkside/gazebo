<template>
  <div class="bg-white">
    <div class="h-screen relative min-h-screen landing-bg bg-fixed">
      <div
        class="absolute top-0 left-0 bottom-0 right-0 z-0 opacity-100 bg-gradient-to-r from-black to-transparent"
      />
      <div
        class="container relative mx-auto min-h-full flex flex-wrap flex-row-reverse"
      >
        <div
          class="max-w-lg mx-auto min-w-50 min-h-full flex flex-col items-center justify-center"
        >
          <event-list-wrapper />
        </div>
        <div
          class="max-w-lg mx-auto min-w-50 min-h-full flex flex-col items-center justify-center"
        >
          <h1 class="text-5xl font-bold mb-8 font-serif text-white">
            <logo-title />
          </h1>
          <h2 class="text-2xl font-bold mb-8 font-sans text-white">
            A calendar you will want to show
          </h2>
          <p class="text-lg mb-12 text-white">
            The perfect solution for adding beautiful, customizable event
            listings to your website.
          </p>
          <nuxt-link
            to="/calendars"
            class="btn btn-primary"
          >
            Get Started
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="h-screen min-h-screen">
      <div
        class="max-w-lg mx-auto min-h-full flex flex-col items-center justify-center"
      >
        <h2
          class="text-4xl font-black mb-8 font-serif uppercase leading-7 border-4 border-black p-1"
        >
          Emb<br>
          edd<br>
          ing
        </h2>
        <p class="text-gray-600 text-lg mb-12">
          Our platform lets you seamlessly embed a stylish event calendar on
          your website, giving your visitors a user-friendly tool to discover
          and keep track of upcoming events.
        </p>
      </div>
    </div>

    <div class="h-screen min-h-screen">
      <div
        class="max-w-lg mx-auto min-h-full flex flex-col items-center justify-center"
      >
        <h2
          class="text-4xl font-black mb-8 font-serif bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-primary"
        >
          <span class="font-black">C</span>
          <span class="font-extrabold">us</span>
          <span class="font-bold">to</span>
          <span class="font-semibold">m</span>
          <span class="font-medium">i</span>
          <span class="font-normal">z</span>
          <span class="font-light">at</span>
          <span class="font-extralight">io</span>
          <span class="font-thin">n</span>
        </h2>
        <p class="text-gray-600 text-lg mb-12">
          With a variety of customizable themes and options, you can tailor the
          calendar to match your website's branding and design.
        </p>
      </div>
    </div>

    <div class="h-screen min-h-screen">
      <div
        class="max-w-lg mx-auto min-h-full flex flex-col items-center justify-center"
      >
        <h2 class="text-4xl font-thin mb-8 font-serif">
          Simplicity
        </h2>
        <p class="text-gray-600 text-lg mb-12">
          Plus, Gazebo is incredibly simple to use. Transform your website into
          the go-to destination for events with Gazebo.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-bg {
  background-image: url("~/assets/images/bg.png");
  background-size: cover;
  background-position: center;
}
</style>
