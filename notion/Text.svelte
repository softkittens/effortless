<script>
  export let text = {};

  function parse(text) {
    let parsed = text.plain_text
    if (text.annotations.bold) {
      parsed = `<strong>${parsed}</strong>`
    }
    if (text.annotations.color !== 'default') {
      parsed = `<span class="${text.annotations.color}">${parsed}</span>`
    }
    if (text.href) {
      parsed = `<a href="${text.href}">${parsed}</a>`
    }
    return parsed
  }
</script>

{@html parse(text)}
