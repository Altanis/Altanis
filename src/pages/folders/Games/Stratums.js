import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SS1 from "../../../static/images/stratums1.png";
import SS2 from "../../../static/images/stratums2.png";
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
    
    const folders = ["Home", "Projects", "Games", "Stratums"]
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

                <div class="text-xs sm:text-lg">
                    <h1 className="inline font-bold">Source Code:</h1>
                    <h2 className="inline px-2 text-md sm:text-lg">The source code is private.</h2>
                    
                    <br />

                    <h1 className="inline font-bold">Extended Description:</h1>
                    <h2 className="inline px-2 text-md sm:text-lg">
                        Stratums is a game currently online and available at <a href="https://stratums.io" className="text-blue-400 underline">stratums.io</a>.
                        The client was constructed through vanilla HTML/CSS/JS, and renders the client through the native HTMLCanvas2D API.
                        The server was created in Node.js using our own optimized websocket server absraction layer to communicate with clients. 2D physics are calculated on the server with our own optimized physics engine, as well as an optimized spatial hashgrid for collision detection.
                        The construction of the game took around two months, and the rest was spent on optimization and bugfixing.
                        This was a great learning experience for me, as it was my first base to learn how to apply math and physics in game/physics engines, and also rendering in a 2D canvas.
                    </h2>

                    <br />

                    <h1 className="inline font-bold">Images of Game:</h1>
                    <div class="flex flex-row">
                        <img src={SS2} alt="Stratums Screenshot 2" className="w-1/2" />
                        <img src={SS1} alt="Stratums Screenshot 1" className="w-1/2" />
                    </div>
                </div>
            </div>
        </motion.div>
        </AnimatePresence>
	);
};