<script>
  import Nav from "../components/Nav.svelte";
  import Tailwindcss from "../components/Tailwindcss.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Tailwindcss />

<Nav {segment} />

<main>
  <slot />
</main>
