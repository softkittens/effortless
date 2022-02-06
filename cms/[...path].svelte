<script context="module">
  export { load } from './admin'
</script>

<script>
  import Layout from 'effortless/admin/layout.svelte'
  export let Component
  
  const nav = ['projects', 'schools']
</script>

<Layout {nav}>
  <svelte:component this={Component} />
</Layout>
