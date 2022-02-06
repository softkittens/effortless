<script>
  import '$assets/reset.postcss'
  import { onMount } from 'svelte'
  import { loadNavFromFiles } from './cms/services'
  let nav = []

  onMount(async () => {
    nav = await loadNavFromFiles()
  })
</script>

<aside>
  <nav>
    <ul>
      {#each nav as item}
        <li><a href="/admin/{item}">{item}</a></li>
      {/each}
    </ul>
  </nav>
</aside>

<main>
  <slot />
</main>

<style>
  aside {
    width: 250px;
    position: fixed;
  }

  li a {
    text-transform: capitalize;
  }

  main {
    margin-left: 250px;
  }
</style>
