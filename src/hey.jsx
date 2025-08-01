import React from "react";
import { createRoot } from "react-dom/client";
import Hey from "./components/hey/hey.jsx";

const container = document.getElementById("root");
createRoot(container).render(
    <React.StrictMode>
        <Hey />
    </React.StrictMode>
);
