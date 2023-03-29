import { useEffect, useState } from "react";
import FolderHierarchy from "../../../components/FolderHierarchy";

import { borders, colors, hoverBorders, hoverBackgrounds } from "../../../utils/Colors";
import FolderDefinitions from "../../../utils/Folders";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DiepLBBot() {
	const [theme, setTheme] = useState("text-orange-400");
	const [borderTheme, setBorderTheme] = useState("border-orange-400");
    const [hoverTheme, setHoverTheme] = useState("hover:bg-orange-400");
    const [hoverBackgroundTheme, setHoverBackgroundTheme] = useState("bg-black-400");
	useEffect(() => {
		const idx = Math.floor(Math.random() * colors.length);
		setTheme(colors[idx]);
		setBorderTheme(borders[idx]);
        setHoverTheme(hoverBorders[idx]);
        setHoverBackgroundTheme(hoverBackgrounds[idx]);
    }, []);
    
    const folders = ["Home", "Projects", "Reverse Engineering", "Diep"]
        .map(f => FolderDefinitions.find(d => d.name === f));

    const pageVariants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    };

    return (
        <AnimatePresence mode="wait">
        <motion.div
            initial="hidden"
            animate="enter"
            variants={pageVariants}
            transition={{ duration: 0.25 }}
        >
            <div className="h-full px-2 py-32 mx-32">
                <div className="px-0 p-4">
                    <FolderHierarchy folders={folders} theme={{theme, hoverBackgroundTheme}} />
                </div>

                <div>
                    <h1 className="inline text-lg font-bold">Extended Description:</h1>
                    <h2 className="py-2 text-lg">
                        Diep.io is an online game written in C++ for both the server and client, and the client is compiled to WASM using Emscripten.
                        The game has a websocket protocol that allows for communication between the server and its clients.
                        Over the course of some time, I was able to fully reverse the protocol and <Link to="https://github.com/Altanis/diep-lb-bot" className="text-blue-400 underline">implement a bot that can pass by the server's anti-cheat</Link>.
                        I contributed to two reversal projects, <Link to="https://github.com/ABCxFF/diepindepth" className="text-blue-400 underline">DiepInDepth</Link> which reversed most of
                        the client and the server, and <Link to="https://github.com/ABCxFF/diepcustom" className="text-blue-400 underline">DiepCustom</Link>, an application of this reversal to
                        create a custom Diep.io server with relatively no disparities in gameplay.
                    </h2>
                </div>
            </div>
        </motion.div>
        </AnimatePresence>
	);
};