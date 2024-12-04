import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function PageLayout({ children, navBgColor }) {
  return (
    <>
      <Navbar bgColor={navBgColor} />
      {children}
      <Footer />
    </>
  );
}
