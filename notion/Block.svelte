<script>
    export let type, paragraph;
</script>

{#if type === 'paragraph'}
    <p>{paragraph?.text[0]?.text?.content}</p>
{/if}
