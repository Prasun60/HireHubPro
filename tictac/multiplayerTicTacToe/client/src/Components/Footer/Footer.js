import DarkMode from "../../Assets/Svgs/DarkMode";
import LinkSvg from "../../Assets/Svgs/Link";
import "./Footer.css";

const Footer = ({ setShowModal }) => {
  return (
    <footer>
      <LinkSvg setShowModal={setShowModal} />
      <DarkMode />
    </footer>
  );
};

export default Footer;
