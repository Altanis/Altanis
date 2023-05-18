import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Tag from "../../../components/Tag";
import FolderHierarchy from "../../../components/FolderHierarchy";

import { borders, colors, hoverBorders, hoverBackgrounds } from "../../../utils/Colors";
import FolderDefinitions from "../../../utils/Folders";
import { AnimatePresence, motion } from "framer-motion";

export default function Miscallaneous() {
	const projects = [
		{
			name: "QuizWiz",
			year: "3/18/2023 9:00 AM - 5:00 PM",
			desc: "A project to incentivize studying and productivity through statistics, sharing of study guides, and competitive games. Was created at an 8 hour hackathon hosted at The Bronx High School of Science, and won 3rd place.",
			tags: ["nodejs", "express", "database", "full-stack"],
			link: "https://github.com/Altanis/quizzwiz",
			type: "file"
		},
        {
            name: "Discord Gateway Wrapper",
            year: "August 2022 - September 2022",
            desc: "A lightweight TypeScript wrapper of the Discord WebSocket/REST API for ease with bot development.",
            tags: ["nodejs", "typescript"],
            link: "https://github.com/Altanis/discord-gateway-wrapper"
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
    
    const folders = ["Home", "Projects", "Miscallaneous"]
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
							<Link to={project.link} className="flex flex-wrap mt-2">
								<div key={idx} className={`px-6 py-4 duration-200 border border-gray-400 ${hoverTheme} hover:cursor-pointer rounded-3xl`}>
									<div className="pb-4 mb-4 border-b-4">
										<h1 className={`py-2 text-xl sm:text-2xl md:text-4xl ${theme}`}>
											<i className={`px-1 mx-5 ${project.type === "file" ? "fa-solid fa-file" : "fa-solid fa-folder"} text-lg sm:text-xl md:text-2xl opacity-50`}></i>
											{project.name}
										</h1>
										<h3 className="mb-4 text-md md:text-lg">
											{project.year}
										</h3>
										<div className="flex flex-wrap mt-2">
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