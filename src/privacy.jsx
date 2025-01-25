import React from "react";
import { createRoot } from "react-dom/client";
import PrivacyPolicy from "./components/privacy/PrivacyPolicy";

const container = document.getElementById("root");
createRoot(container).render(
    <React.StrictMode>
        <PrivacyPolicy />
    </React.StrictMode>
);
