<script>
  import Text from './Text.svelte'
  export let block
</script>

{#if block.type === 'paragraph'}
  <p>
    {#each block.paragraph.text as text}
      <Text {text} />
    {/each}
  </p>
{/if}

{#if block.type === 'heading_2'}
  <h2>{block.heading_2?.text[0]?.plain_text}</h2>
{/if}

{#if block.type === 'heading_3'}
  <h3>{block.heading_3?.text[0]?.plain_text}</h3>
{/if}

{#if block.type === 'image'}
  <img src={block.image?.external?.url} alt="" />
{/if}

{#if block.type === 'callout'}
  <div class="callout {block.callout.color}">
    {#each block.callout.text as text}
      <p><Text {text} /></p>
    {/each}
  </div>
{/if}

{#if block.type === 'bulleted_list_item'}
  <ul>
    <li>{block.bulleted_list_item.text[0].text.content}</li>
    {#if block.has_children}
      {#each block.children as child}
        <li>{child.bulleted_list_item.text[0].text.content}</li>
      {/each}
    {/if}
  </ul>
{/if}
