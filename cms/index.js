export async function load({ session, params }) {

  if (!session.user && params.path !== 'login') {
    return { redirect: '/login', status: 302 }
  }


  const segments = params.path.split('/')



  const paths = {
    '' : import('effortless/admin/index.svelte') //dashboard
  }

  return {
    props: {
      Component: (await paths['']).default
    }
  }
}
