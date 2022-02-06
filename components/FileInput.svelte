<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let files, input, className, tag = 'button';
  export {className as class}

  function handle(e) {
    dispatch('change', e.target.files[0])
  }
</script>

<input
  type="file"
  style="display: none;"
  bind:value={files}
  bind:this={input}
  on:change={handle}
/>

{#if tag === 'button'}
  <button class={className} on:click|preventDefault={() => input.click()}>
    <slot />
  </button>
{/if}
