import { styled } from "@/styles";

const PAGE_WIDTH = "1024px";

export const LayoutContainer = styled("div", {});

export const HeaderContainer = styled("div", {
  display: "flex",
  width: "100%",
  height: "200px",

  backgroundColor: "$gray700",

  "& > header": {
    width: PAGE_WIDTH,
  },
});

export const PageContainer = styled("main", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const PageContent = styled("div", {
  width: PAGE_WIDTH,
});
