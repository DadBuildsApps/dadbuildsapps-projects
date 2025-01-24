import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./PrivacyPolicy.scss"; // Import the SCSS file

const PrivacyPolicy = () => {
  const shadowRootRef = useRef(null);

  useEffect(() => {
    if (shadowRootRef.current && !shadowRootRef.current.shadowRoot) {
      const shadowRoot = shadowRootRef.current.attachShadow({ mode: "open" });

      // Dynamically load the compiled CSS from Vite
      import("./PrivacyPolicy.scss").then((module) => {
        const style = document.createElement("style");
        style.textContent = module.default; // Vite compiles SCSS into a default export
        shadowRoot.appendChild(style); // Add the CSS to the Shadow DOM
      });

      // Create a container for the content
      const contentContainer = document.createElement("div");
      shadowRoot.appendChild(contentContainer);

      // Render the React content inside the Shadow DOM
      const root = createRoot(contentContainer);
      root.render(
        <div className="privacy-policy">
          <div className="privacy-policy-card">
            <h1>Privacy Policy</h1>
            <p>Your privacy is important to us. This Privacy Policy explains how we handle your information when you use our app or website.</p>
            <h2>Information We Collect</h2>
            <ul>
              <li><b>Personal Information:</b> Name, email, or any data you provide via contact forms.</li>
              <li><b>Usage Data:</b> Information about how you interact with our site.</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Respond to inquiries or messages.</li>
              <li>Improve the functionality of our website or app.</li>
            </ul>
            <h2>Your Rights</h2>
            <p>You can request access to, correction of, or deletion of your data by contacting us at <a href="mailto:hello@dadbuildsapps.com">hello@dadbuildsapps.com</a>.</p>
          </div>
        </div>
      );
    }
  }, []);

  return <div ref={shadowRootRef}></div>;
};

export default PrivacyPolicy;
