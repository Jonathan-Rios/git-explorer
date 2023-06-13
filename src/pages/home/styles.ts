import { styled } from "@/styles";

export const Container = styled("main", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",

  width: "100%",
});

export const Form = styled("form", {
  display: "flex",
  width: "100%",

  backgroundColor: "$gray500",

  padding: "1rem",
  marginTop: "-40px",

  border: "1px solid $gray700",
  borderRadius: "8px",

  gap: "1rem",

  input: {
    all: "unset",
    height: "40px",

    width: "100%",
    backgroundColor: "$gray700",
    borderRadius: "4px",
    border: "1px solid $gray400",
    padding: "0 0.5rem",

    transition: "border 0.15s",

    "&:focus": {
      border: "1px solid $green700",
    },
  },

  button: {
    all: "unset",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",

    cursor: "pointer",
    height: "40px",
    width: "120px",
    padding: "0 0.5rem",

    backgroundColor: "$green500",
    borderRadius: "4px",
    border: "1px solid $green500",

    color: "$white",
    fontSize: "$_16",
    fontWeight: "$medium",
    lineHeight: "$short",

    transition: "background-color 0.15s",

    "&:hover": {
      backgroundColor: "$green700",
    },

    "&:disabled": {
      backgroundColor: "$gray400",
      border: "1px solid $gray400",
    },
  },
});

export const Content = styled("div", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",

  width: "100%",

  pre: {
    backgroundColor: "$gray700",
    whiteSpace: "pre-wrap",
    padding: "2rem",
    borderRadius: "8px",
  },
});

export const RepositoriesList = styled("section", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",

  marginTop: "1rem",
});

export const Repository = styled("div", {
  display: "flex",
  flexDirection: "column",

  border: "1px solid $gray700",

  background: "$gray500",
  borderRadius: "8px",
  padding: "1rem",
  gap: "1rem",
  height: "140px",

  h4: {
    color: "$white",
  },

  p: {
    color: "$gray300",
  },
});
