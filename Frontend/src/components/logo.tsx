import "../styles/components/header.scss"
import LogoHeader from "../assets/terraquest.webp"

const Logo  = () => {
    return (
        <div className="logo">
            <a href="/">
                <img src={LogoHeader} alt="Logo TerraQuest"/>
                <div className="f_up_text_logo">TerraQuest</div>
            </a>
        </div>
    );
};

export default Logo;