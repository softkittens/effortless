<script>
  import { onMount } from 'svelte'

  export let text = {},
    resolveHref = false

  let parsed = ''

  async function href(href) {
    if (resolveHref) {
      return await resolveHref(href)
    }
    return href
  }

  onMount(async () => await parse())

  async function parse() {
    parsed = text.plain_text
    if (text.annotations.bold) {
      parsed = `<strong>${parsed}</strong>`
    }
    if (text.annotations.color !== 'default') {
      parsed = `<span class="${text.annotations.color}">${parsed}</span>`
    }
    if (text.href) {
      parsed = `<a href="${await href(text.href)}" ${text.href.includes('http') ? 'target="_blank"' :''} >${parsed}</a>`
    }
  }
</script>

{@html parsed}
