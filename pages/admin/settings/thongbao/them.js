import { Backdrop, Box, Breadcrumbs, Button, CircularProgress, FormControl, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../../../components/admin/Layout";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../../custom/textfield";
export default function MyEditor() {
  const { data: session, status } = useSession();
  const [tieuDe, setTieuDe] = useState("");
  const [hinhAnh, setHinhAnh] = useState("");
  const [noiDung, setNoiDung] = useState("");

  const editorRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("../../../../ckeditor5-34.1.0-8ogafsbogmr7"),
    };
    setEditorLoaded(true);
  }, []);
  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            setIsLoadingUploadImage(true);

            fetch(`${process.env.ENDPOINT_SERVER}/api/v1/admin/upload-file`, {
              method: "post",
              body: body,
              headers: { Authorization: `Bearer ${session.user.accessToken}` },
            })
              .then((res) => res.json())
              .then((res) => {
                setIsLoadingUploadImage(false);
                resolve({
                  default: res.data,
                });
              })
              .catch((err) => {
                if (err.response) {
                  setIsLoadingUploadImage(false);
                  toast.error(err.response.data.message);
                }

                reject(err);
              });
          });
        });
      },
    };
  };
  const uploadPlugin = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  };
  const handleClickSubmit = async () => {
    try {
      if (!tieuDe || !hinhAnh || !noiDung) {
        toast.error("Vui lòng nhập đầy đủ các mục");
        return;
      }
      setIsLoading(true);
      const results = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/admin/thong-bao/them`, {
        tieuDe,
        hinhAnh,
        noiDung,
      });
      toast.success("Thêm thông báo thành công");
      setIsLoading(false);
      setTieuDe("");
      setHinhAnh("");
      setNoiDung("");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Thêm thông báo - Trang quản trị Admin</title>
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
            color: "text.secondary",
            gap: "10px",
            padding: "40px 20px",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Admin
            </Link>
            <Link underline="hover" color="inherit" href="/admin/settings">
              Settings
            </Link>
            <Link underline="hover" color="inherit" href="/admin/settings/thongbao">
              Thông báo
            </Link>
            <Typography>Thêm mới</Typography>
          </Breadcrumbs>
          <h1
            className="title"
            style={{
              fontSize: "2.5rem",
            }}
          >
            Thêm mới thông báo
          </h1>
          {!editorLoaded && <div>Editor loading</div>}
          {editorLoaded && session && session.user && (
            <>
              <FormControl fullWidth>
                <Typography>Tiêu đề</Typography>
                <InputComponent
                  onChange={(e) => setTieuDe(e.target.value)}
                  placeholder="Tiêu đề"
                  size="small"
                  type="text"
                  fullWidth
                  value={tieuDe}
                  sx={{
                    ...rootStyles,
                  }}
                  InputProps={{
                    sx: {
                      ...rootInputStyles,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...inputStyles,
                    },
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <Typography>Link hình ảnh Banner</Typography>
                <InputComponent
                  onChange={(e) => setHinhAnh(e.target.value)}
                  placeholder="Hình ảnh"
                  size="small"
                  type="text"
                  fullWidth
                  value={hinhAnh}
                  sx={{
                    ...rootStyles,
                  }}
                  InputProps={{
                    sx: {
                      ...rootInputStyles,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...inputStyles,
                    },
                  }}
                />
              </FormControl>
              <Typography>Nội dung</Typography>

              <Box sx={{ width: "100%", color: "black", fontSize: "2rem" }}>
                <CKEditor
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  editor={ClassicEditor}
                  data={noiDung}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setNoiDung(data);
                  }}
                />
              </Box>
              <Button
                sx={{
                  pointerEvents: isLoadingUploadImage ? "none" : "visible",
                  opacity: isLoadingUploadImage ? "0.7" : "1",
                }}
                variant="outlined"
                onClick={handleClickSubmit}
              >
                {isLoadingUploadImage ? "Đang tải ảnh..." : "Tạo"}
              </Button>
            </>
          )}
        </Box>
      </Layout>
    </>
  );
}
