import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Tag from "../../../components/Tag";
import FolderHierarchy from "../../../components/FolderHierarchy";

import { borders, colors, hoverBorders, hoverBackgrounds } from "../../../utils/Colors";
import FolderDefinitions from "../../../utils/Folders";
import { AnimatePresence, motion } from "framer-motion";

export default function Games() {
	const projects = [
		{
			name: "Valiant.io",
			year: "January 2023 - Current",
			desc: "A multiplayer online game similar to Florr.io and Soul Knight where you duel mobs and players to collect loot.",
			tags: ["nodejs", "websocket", "canvas", "full-stack", "physics"],
			link: "/projects/games/valiant",
			type: "file"
		},
		{
			name: "Stratums.io",
			year: "June 2022 - Current",
			desc: "A multiplayer online game where you farm resources, duel others, and ally to take over the arena.",
			tags: ["nodejs", "websocket", "express", "canvas", "physics", "full-stack"],
			link: "/projects/games/stratums",
			type: "file"
        },
        {
            name: "DiepShowdown",
            year: "September 2022 - December 2022",
            desc: "A game with a dueling system similar to Pokemon Showdown, but with tanks and mechanics derived from Diep.io.",
            tags: ["nodejs", "websocket", "express", "full-stack"],
            link: "https://github.com/Altanis/DiepShowdown",
            type: "file"
        },
        {
            name: "Wordle Beyond",
            year: "June 2022 - June 2022",
            desc: "A singleplayer Wordle clone, and a multiplayer Wordle where you race to find the word the fastest against the clock.",
            tags: ["nodejs", "websocket", "express", "full-stack", "database"],
            link: "https://github.com/Altanis/wordle",
            type: "file"
        },
        {
            name: "Mafia Backend",
            year: "March 2022 - June 2022",
            desc: "A backend which could support Mafia games with a variety of roles and mechanics, as well as a sophisticated login/register system.",
            tags: ["nodejs", "websocket", "express", "database"],
	    link: "https://github.com/Altanis/mafia-backend",
            type: "file"
        }
	];

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
    
    const folders = ["Home", "Projects", "Games"]
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
			<div className="h-full py-32 mx-32">
				<div className="p-4">
					<FolderHierarchy folders={folders} theme={{theme, hoverBackgroundTheme}} />
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 my-10">
					{projects.map((project, idx) => {
						return (
							<Link to={project.link}>
								<div key={idx} className={`px-6 py-4 duration-200 border border-gray-400 ${hoverTheme} hover:cursor-pointer rounded-3xl glow`}>
									<div className="pb-4 mb-4 border-b-4">
										<h1 className={`py-2 text-xl sm:text-2xl md:text-4xl ${theme}`}>
											<i className={`px-1 mx-5 ${project.type === "file" ? "fa-solid fa-file" : "fa-solid fa-folder"} text-lg sm:text-xl md:text-2xl opacity-50`}></i>
											{project.name}
										</h1>
										<h3 className="mb-4 text-md md:text-lg">
											{project.year}
										</h3>
										<div>
											{project.tags.map((tag, idx) => {
												return <Tag tag={tag} />;
											})}
										</div>
									</div>
									<p className="text-xs sm:text-md md:text-lg">{project.desc}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</motion.div>
		</AnimatePresence>
	);
};
