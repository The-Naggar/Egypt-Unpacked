import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-brand">Egypt Unpacked</div>
                <div className="footer-meta">© {new Date().getFullYear()} All rights reserved.</div>
            </div>
        </footer>
    );
}