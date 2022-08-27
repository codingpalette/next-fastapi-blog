import React, {useState} from 'react'
import Layout from "../../components/Layout";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const MDEditor2 = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

const Test2 = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e)
  }

  return(
    <>
      <Layout>
        <div>
          <MDEditor value={value} onChange={setValue} />
        </div>
        {MDEditor && (
          <div className="container" data-color-mode="dart">
            <MDEditor2 source="Hello Markdown!" />
          </div>

        )}

      </Layout>
    </>
  )
}

export default Test2