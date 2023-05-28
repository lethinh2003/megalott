export const rootStyles = {
  backgroundColor: "background.default",
  borderRadius: "1.5rem",
};
export const inputStyles = {
  color: "text.secondary",
  paddingLeft: "15px",
  fontSize: "1.5rem",
  padding: "1.5rem",
};

export const rootInputStyles = {
  "&:hover fieldset": {
    border: "1px solid #62b4f6!important",
    borderRadius: "1.5rem",
  },
  "&:focus-within fieldset, &:focus-visible fieldset": {
    border: "1px solid #62b4f6!important",
  },
};
