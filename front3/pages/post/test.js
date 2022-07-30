import React, {useState} from 'react'
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
import parser from "html-react-parser";
import 'suneditor/dist/css/suneditor.min.css';
import {Button} from "@mui/material"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});


const Test = () => {

  const [value, setValue] = useState('')

  return(
    <>
      <Layout>
        <Button onClick={() => console.log(value)}>test</Button>
        <SunEditor
          lang="ko"
          setContents={value}
          onChange={setValue}

          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript"
              ],
              ["fontColor", "hiliteColor"],
              ["align", "list", "lineHeight"],
              ["outdent", "indent"],
              ["table", "horizontalRule", "link", "image", "video"],
              ["preview", "print"],
              ["removeFormat"]
            ]
          }}
        />

        <div style={{marginTop: '50px'}} >
          <div className="sun-editor">
            <div className="sun-editor-editable">
              {parser(value)}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Test