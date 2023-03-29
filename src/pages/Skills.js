import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FolderHierarchy from "../components/FolderHierarchy";

import { borders, colors, hoverBackgrounds, hoverBorders } from "../utils/Colors";
import FolderDefinitions from "../utils/Folders";

import Badge from "../components/Badge";
import Image from "../static/images/altanis.png"

export default function Projects() {
	const skills = [];

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

    const folders = ["Home", "Skills"]
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
			<div className="transition ease-in-out delay-150 h-full py-32 mx-32">
				<div className="p-4">
					<FolderHierarchy folders={folders} theme={{theme, hoverBackgroundTheme}} />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					<Badge image={Image} size="40" />
				</div>
			</div>
		</motion.div>
        </AnimatePresence>
	);
}