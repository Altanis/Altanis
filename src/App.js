import "./index.css";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homescreen from "./pages/Home";
import Projects from "./pages/Projects";

import Games from "./pages/folders/Games/Games";
import Stratums from "./pages/folders/Games/Stratums";
import Valiant from "./pages/folders/Games/Valiant";
import ReverseEngineering from "./pages/folders/ReverseEngineering/ReverseEngineering";

import OSS from "./pages/folders/OSS/OSS";
import Diep from "./pages/folders/ReverseEngineering/Diep";
import Miscallaneous from "./pages/folders/Miscallaneous/Miscallaneous";
import Skills from "./pages/Skills";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homescreen />} />
                <Route path="/projects" element={<Projects />} />
                
                <Route path="/projects/games" element={<Games />} />
                <Route path="/projects/games/stratums" element={<Stratums />} />
                <Route path="/projects/games/valiant" element={<Valiant />} />

                <Route path="/projects/oss" element={<OSS />} />

                <Route path="/projects/reverse-engineering" element={<ReverseEngineering />} />
                <Route path="/projects/reverse-engineering/diep" element={<Diep />} />
            
                <Route path="/projects/miscallaneous" element={<Miscallaneous />} />

                <Route path="/skills" element={<Skills />} />
                <Route path="*" element={<Homescreen />} />
            </Routes>
        </BrowserRouter>
    );
};