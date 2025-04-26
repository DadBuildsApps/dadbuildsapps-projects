import React from "react";
import { createRoot } from "react-dom/client";
import TermsOfService from "./components/wanowa/TermsOfService";

const container = document.getElementById("root");
createRoot(container).render(
    <React.StrictMode>
        <TermsOfService />
    </React.StrictMode>
);
