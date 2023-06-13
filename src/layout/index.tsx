import { Header } from "@/components/Header";
import {
  HeaderContainer,
  LayoutContainer,
  PageContainer,
  PageContent,
} from "./styles";

interface AppLayoutProps {
  header?: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
}

export function AppLayout({ children, header }: AppLayoutProps) {
  return (
    <LayoutContainer>
      <HeaderContainer>{header ? header : <Header />}</HeaderContainer>

      <PageContainer>
        <PageContent>{children}</PageContent>
      </PageContainer>
    </LayoutContainer>
  );
}
