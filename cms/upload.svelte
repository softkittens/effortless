<script>
  import FileInput from 'effortless/components/FileInput.svelte'
  import Editor from 'effortless/components/Editor.svelte';
  import { http } from 'effortless'

  function upload({detail:file}) {
    http.upload('/admin/api/upload', file)
  }
</script>

<h1>Admin</h1>
<FileInput on:change={upload}>Upload</FileInput>
<Editor />
