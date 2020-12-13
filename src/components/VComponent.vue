<template>
    <section class="mb-7 text-center">
      <h1
        class="font-weight-bold mb-2 headline"
        v-text="`${heading}`"
      />
    </section>
</template>

<script>
  export default {
    name: 'VComponent',

    props: {
      heading: {
        type: String,
        default: '',
      },
      link: {
        type: String,
        default: '',
      },
    },
  }
</script>
