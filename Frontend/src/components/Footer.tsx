import "../styles/components/footer.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoHeader from "../assets/terraquest.webp";

const Footer = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <footer className="footer">
            <div className="footer_up">
                <div className="f_up_1">
                    <div className="f_up_logo_section">
                        <Link to="/">
                            <img src={LogoHeader} alt="logo" />
                            <div className="f_up_text_logo">TerraQuest</div>
                        </Link>
                    </div>
                    <div className="f_up_icon_section">
                    </div>
                </div>

                <div
                    className={`footer_section ${activeSection === "odkryj" ? "active" : ""}`}
                    onClick={() => toggleSection("odkryj")}
                >
                    <p className="footer_p">Odkryj</p>
                    <ul>
                        <li><Link to="/explore">Planer podróży</Link></li>
                        <li><Link to="/weather">Pogoda</Link></li>
                        <li><Link to="/newsletter">Newsletter</Link></li>
                        <li><a href="#">Specjalne oferty</a></li>
                    </ul>
                </div>

                <div
                    className={`footer_section ${activeSection === "produkty" ? "active" : ""}`}
                    onClick={() => toggleSection("produkty")}
                >
                    <p className="footer_p">Nasze produkty</p>
                    <ul>
                        <li><a href="https://github.com/BergFilip/TerraQuest_web" target="_blank" rel="noopener noreferrer">Website App</a></li>
                        <li><a href="https://github.com/KolegaTatar/TerraQuest_mobile" target="_blank" rel="noopener noreferrer">Mobile App</a></li>
                        <li><a href="https://github.com/KolegaTatar/SkyVision_desktop" target="_blank" rel="noopener noreferrer">Desktop App</a></li>
                        <li><a href="https://www.figma.com/proto/VAEeMmg1rGRkZhTuEwuFnK/Platforma-do-Planowania-Podr%C3%B3%C5%BCy-i-Rezerwacji-TerraQuest?node-id=0-1&p=f&t=tY3MevuZcr4uMUzy-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=354%3A3719&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer">Project</a></li>
                    </ul>
                </div>

                <div
                    className={`footer_section ${activeSection === "informacje" ? "active" : ""}`}
                    onClick={() => toggleSection("informacje")}
                >
                    <p className="footer_p">Informacje ogólne</p>
                    <ul>
                        <li><Link to="/about">O TerraQuest</Link></li>
                        <li><Link to="/help">Pomoc</Link></li>
                        <li><Link to="/privacypolicies">Polityka Prywatności</Link></li>
                        <li><Link to="/user">Moje konto</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer_mid">
                Copyright © 2025 TerraQuest. Wszystkie prawa zastrzeżone.
            </div>
            <div className="footer_down">
                Created by Wiktor Tatarynowicz, Filip Berg, Jacek Prokop
            </div>
        </footer>
    );
};

export default Footer;
