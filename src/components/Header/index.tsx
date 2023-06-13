import Image from "next/image";
import { Container } from "./styles";

import logoImg from "@/assets/logo.svg";

export function Header() {
  return (
    <Container>
      <Image src={logoImg} alt="ty" />
    </Container>
  );
}
