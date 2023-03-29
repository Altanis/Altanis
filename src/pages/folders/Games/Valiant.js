import { useEffect, useState } from "react";

import VS1 from "../../../static/images/valiant1.png";
import VS2 from "../../../static/images/valiant2.png";
import FolderHierarchy from "../../../components/FolderHierarchy";

import { borders, colors, hoverBorders, hoverBackgrounds } from "../../../utils/Colors";
import FolderDefinitions from "../../../utils/Folders";
import { AnimatePresence, motion } from "framer-motion";

export default function Stratums() {
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
    
    const folders = ["Home", "Projects", "Games", "Valiant"]
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
                    <h1 className="inline text-lg font-bold">Source Code:</h1>
                    <h2 className="inline px-2 text-lg">The source code is available on <a href="https://github.com/Altanis/valiant.io" className="text-blue-400 underline">GitHub</a>.</h2>
                    
                    <br />

                    <h1 className="inline text-lg font-bold">Extended Description:</h1>
                    <h2 className="inline px-2 text-lg">
                        Valiant is a game currently online and <a href="https://valiant.rivet.game" className="text-blue-400 underline">available</a>, with courtesy of Rivet and its services.
                        The client was constructed through vanilla HTML/CSS and utilizes the HTMLCanvas2D API for rendering. 
                        The logic of the client was written into a modular TypeScript system, then bundled into a file using Webpack.
                        The server was created in TypeScript, <a href="https://npmjs.com/package/ws" className="text-blue-400 underline">using a publicly available WebSocket implementation</a>.
                        This game strengthens my foundation in applying math and physics to my engines.
                    </h2>

                    <br />

                    <h1 className="inline text-lg font-bold">Images of Game:</h1>
                    <div class="flex flex-row">
                        <img src={VS1} alt="Valiant Screenshot 1" className="w-1/2" />
                        <img src={VS2} alt="Valiant Screenshot 2" className="w-1/2" />
                    </div>
                </div>
            </div>
        </motion.div>
        </AnimatePresence>
	);
};