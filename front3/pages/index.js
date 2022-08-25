import Layout from "../components/Layout";
import fetcher from "../utils/fetcher";
import useSWR, { SWRConfig } from 'swr'

export default function Home() {
  const { data: userData } = useSWR('/api/user/check', fetcher)

  return (
    <>
      <Layout>
        <div>
          Home
        </div>
      </Layout>
    </>
  )
}

// export async function getStaticProps () {
//   // `getStaticProps` is executed on the server side.
//   const categoryData = await fetcher('/api/category/list')
//   return {
//     props: {
//       fallback: {
//         '/api/category/list': categoryData
//       }
//     }
//   }
// }

// export async function getServerSideProps(context) {
//
// }

// Home.getLayout = function getLayout(page) {
//   return (
//
//       {page}
//     </Layout>
//   )
// }