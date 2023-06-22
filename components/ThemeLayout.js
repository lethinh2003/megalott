import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";
import useAuth from "../hooks/useAuth";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
  }
  pre {
    ${"" /* max-width: 700px; */}
    width: 100%;
    color: #ffffff;
    font-size: 2rem;
    padding: 1.5rem 1rem;
    overflow-x: auto;
    background-color: ${({ theme }) => theme.palette.background.preCode};

    code {
      color: #ffffff;
      background-color: unset;
      font-weight: 500;
      &:before, &:after
    {
      content: "";
    }

    }
  }

    code {
    font-weight: 600;

    color: ${({ theme }) => (theme.palette.mode === "dark" ? "#ffffff" : "#1b1b1b")};
    overflow-x: auto;
  

    &:before, &:after
    {
      content: "${"`"}";
    }
  } 
  ::-webkit-scrollbar-thumb {

  &:hover {
  }
}
`;

const getDesignTokens = (mode) => ({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "initial",
          fontFamily: "Noto Sans",
          color: theme.palette.text.secondary,

          "&:hover": {},
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "none",
          fontSize: "1.4rem",
          borderRadius: "3rem",
          textTransform: "initial",
          fontFamily: "Noto Sans",
          color: theme.palette.text.primary,
          background: "linear-gradient(180deg,#ee8d8d,red)",
          padding: "4px 13px",
          "&.Mui-disabled": {
            opacity: 0.8,
          },
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#fff",
            borderColor: "#005cbf",
          },
        }),
      },
    },
  },
  typography: {
    fontSize: 21,
    fontFamily: ["Noto Sans", "League Spartan", "Bebas Neue", "IBM Plex Sans", "Poppins", "sans-serif"].join(","),
  },
  palette: {
    mode,

    background: {
      ...(mode === "dark"
        ? {
            default: "#0e1217",
            preCode: "#000000",
          }
        : {
            default: "#ffffff",
            preCode: "#000000",
          }),
    },

    text: {
      ...(mode === "light"
        ? {
            first: "#25396f",
            primary: "#ffffff",
            secondary: "#000000",
          }
        : {
            first: "#ffffff",
            primary: "#fff",
            secondary: "#a8b3cf",
          }),
    },
    color: {
      ...(mode === "light"
        ? {
            primary: "#ff6464",
            secondary: "#000000",
          }
        : {
            primary: "#ff6464",
            secondary: "#a8b3cf",
          }),
    },
  },
});

const ThemeLayout = (props) => {
  const isAuthenticated = useAuth(true);
  const theme = createTheme(getDesignTokens("light"));
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        {props.children}
      </ThemeProvider>
    </>
  );
};
export default ThemeLayout;
