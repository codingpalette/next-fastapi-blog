import Layout from "../components/Layout";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function Home() {
  const { data: events } = useSWR('/api/user/check', fetcher)

  return (
    <>
      <Layout>
        <div>
          sfdsf
        </div>
      </Layout>
    </>
  )
}

// Home.getLayout = function getLayout(page) {
//   return (
//
//       {page}
//     </Layout>
//   )
// }