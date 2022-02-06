<script>
  import { onMount } from 'svelte'
  import { http } from 'effortless'

  export let name,
    columns = []

  let data = []

  onMount(async () => {
    ;({ data } = await http.get(`/admin/api/${name}`, { columns }))
  })
</script>

<section>
  <header>
    {#each columns as column}
      <div class="col">{column}</div>
    {/each}
  </header>
  {#each data as row}
    <div class="row">
      {#each Object.keys(row) as key}
        <div class="col">{row[key]}</div>
      {/each}
    </div>
  {/each}
</section>

<style lang="postcss">
  header,
  .row {
    display: flex; /* aligns all child elements (flex items) in a row */
  }

  .col {
    flex: 1; /* distributes space on the line equally among items */
  }
</style>
