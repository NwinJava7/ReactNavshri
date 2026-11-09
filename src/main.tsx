import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Store } from "@/components/Store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Store />
  </StrictMode>,
);
