<script>
  // import {ray} from 'node-ray'
  export let paragraph = {};

  function parse(text) {
    let parsed = text.plain_text;
    if (text.annotations.color !== 'default') {
      parsed = `<span class="${text.annotations.color}">${parsed}</span>`;
    }
    if (text.href) {
      parsed = `<a href="${text.href}">${parsed}</a>`;
    }
    return parsed;
  }
</script>

<p>
  {#each paragraph.text as text}
    {@html parse(text)}
  {/each}
</p>
