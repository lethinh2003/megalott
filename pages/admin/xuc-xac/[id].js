import { Backdrop, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/admin/Layout";
import ChiTietPhien from "../../../components/admin/panel/xucxac/ChiTietPhien";
import LichSuCuoc from "../../../components/admin/panel/xucxac/LichSuCuoc";
const ChiTiet = ({ ID }) => {
  const { data: session, status } = useSession();

  const [isModal, setIsModal] = useState(false);
  const [text, setText] = useState("");
  const editorRef = useRef();
  const editorContentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);

  const [dataCode, setDataCode] = useState(null);
  const [dataStatus, setDataStatus] = useState(true);
  const [dataContent, setDataContent] = useState("");
  useEffect(() => {
    const getSource = async () => {
      try {
        setIsLoading(true);
        const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/source-codes/detail/${ID}`);
        setDataCode(results.data.data);
        setDataStatus(results.data.data.status);
        editorContentRef.current = results.data.data.content;

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    };
    if (status === "authenticated") {
      //   getSource();
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Chi Tiết Game Xúc Xắc 3P - Trang quản trị Admin</title>
      </Head>
      <Layout>
        <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            bgcolor: "background.default",
            justifyContent: "center",
            color: "text.primary",
            gap: "10px",
            padding: "40px 20px",
          }}
        >
          <ChiTietPhien ID={ID} />
          <LichSuCuoc ID={ID} />
        </Box>
      </Layout>
    </>
  );
};
export default ChiTiet;
export const getServerSideProps = async (context) => {
  const { params } = context;
  const ID = params.id;

  return {
    props: {
      ID: ID,
    },
  };
};
