import React from "react";
import { hydrateRoot } from "react-dom/client";
import Home from "../app/page";
import "../app/globals.css";

const container = document.getElementById("app");
if (!container) throw new Error("Missing page container");
hydrateRoot(container, <Home />);
