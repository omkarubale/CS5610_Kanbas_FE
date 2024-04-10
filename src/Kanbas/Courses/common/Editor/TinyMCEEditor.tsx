import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditorType } from "tinymce";
import { useRef } from "react";

const TinyMCEEditor = ({ initialValue, onGetContent }:
    { initialValue: string, onGetContent: (content: string) => void }) => {
    // TODO move this later to env file
    const API_KEY = "mhgsbn0hpoxglrhp0i5yksi6m4rk8nkutj2fn8qxn9cn7s9i";
    const editorRef = useRef<TinyMCEEditorType | null>(null);

    const handleGetContent = () => {
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            console.log(content);
            onGetContent(content);
        }
    };

    return (
        <Editor
            apiKey={API_KEY}
            initialValue={initialValue}
            onInit={(evt, editor) => {
                editorRef.current = editor;
                editorRef.current.on('change', handleGetContent);
            }}
            init={{
                height: 500,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    );
};

export default TinyMCEEditor;