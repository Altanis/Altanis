import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FolderHierarchy from "../components/FolderHierarchy";

import { borders, colors, hoverBackgrounds, hoverBorders } from "../utils/Colors";
import FolderDefinitions from "../utils/Folders";

import Badge from "../components/Badge";

import JSLogo from "../static/images/javascript.png";
import TSLogo from "../static/images/typescript.png";
import PythonLogo from "../static/images/python.png";
import JavaLogo from "../static/images/java.png";
import CppLogo from "../static/images/cpp.png";
import CLogo from "../static/images/c.png";
import RustLogo from "../static/images/rust.png";
import GoLogo from "../static/images/golang.png";

export default function Projects() {
	const skills = [
		{
			text: "JavaScript",
			image: JSLogo,
			badgeText: "Expert",
			badgeColor: "bg-green-500",
			borderColor: "border-yellow-500",
		},
		{
			text: "TypeScript",
			image: TSLogo,
			badgeText: "Expert",
			badgeColor: "bg-green-500",
			borderColor: "border-blue-500",
		},
		{
			text: "Python",
			image: PythonLogo,
			badgeText: "Proficient",
			badgeColor: "bg-blue-500",
			borderColor: "border-blue-500",
		},
		{
			text: "Java",
			image: JavaLogo,
			badgeText: "Proficient",
			badgeColor: "bg-blue-500",
			borderColor: "border-yellow-600",
		},
		{
			text: "C++",
			image: CppLogo,
			badgeText: "Proficient",
			badgeColor: "bg-blue-500",
			borderColor: "border-blue-500",
		},
		{
			text: "C",
			image: CLogo,
			badgeText: "Proficient",
			badgeColor: "bg-blue-500",
			borderColor: "border-blue-500",
		},
		{
			text: "Rust",
			image: RustLogo,
			badgeText: "Proficient",
			badgeColor: "bg-blue-500",
			borderColor: "border-orange-500",
		},
		{
			text: "GoLang",
			image: GoLogo,
			badgeText: "Beginner",
			badgeColor: "bg-red-400",
			borderColor: "border-sky-500",
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
				<h1 className="text-2xl underline px-2">Languages</h1>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16 my-10">
					{skills.map((skill, idx) => {
						return (
							<Badge 
								text={skill.text}
								image={skill.image}
								badgeText={skill.badgeText}
								badgeColor={skill.badgeColor}
								borderColor={skill.borderColor}
							></Badge>
						);
					})}
				</div>					
			</div>
		</motion.div>
        </AnimatePresence>
	);
}