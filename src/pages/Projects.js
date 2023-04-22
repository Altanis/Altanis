import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import FolderHierarchy from "../components/FolderHierarchy";
import Tag from "../components/Tag";

import { borders, colors, hoverBackgrounds, hoverBorders } from "../utils/Colors";
import FolderDefinitions from "../utils/Folders";

export default function Projects() {
	const projects = [
		{
			name: "Games",
			year: "January 2022 - Current",
			desc: "A collection of games I have created with minimal abstractions.",
			tags: ["nodejs", "typescript", "websocket", "database", "physics"],
			type: "folder",
			link: "/projects/games"
		},
		{
			name: "OSS",
			year: "January 2023 - Current",
			desc: "A collection of open source projects that I have created including databases, websocket implementations, and spatial hashgrids, on my GitHub page.",
			tags: ["nodejs", "typescript", "c++", "rust", "websocket", "database"],
			type: "folder",
			link: "/projects/oss"
        },
		{
			name: "Miscellaneous",
			year: "January 2022 - Current",
			desc: "A collection of projects that I have created that do not fit into the other categories, such as websites and minor projects.",
			tags: ["nodejs", "typescript", "full-stack"],
			type: "folder",
			link: "/projects/miscallaneous"
		},
        {
            name: "Reverse Engineering",
            year: "March 2020 - Current",
            desc: "Reverse engineering and scripting in online browser games, through: clientspoofing, WASM/memory injection, and more. Fueled from my boredom during the pandemic, and developed my passion for programming to inexpressible amounts.",
            tags: ["nodejs"],
            type: "folder",
            link: "/projects/reverse-engineering"
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

    const folders = ["Home", "Projects"]
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
}
