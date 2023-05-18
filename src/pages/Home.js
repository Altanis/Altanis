import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { useEffect, useState } from "react";

export default function IconGroup() {
    const iconTypes = [
        { type: "fab fa-github", color: "text-[#333333]", link: "https://github.com/Altanis/" },
        // [COMING SOON!] { type: "fab fa-linkedin", color: "text-blue-400" },
        { type: "fab fa-youtube", color: "text-[#FF0000]", link: "https://www.youtube.com/channel/UCFuob9RO7W-Io-_zx-no1wg" },
        { type: "fab fa-discord", color: "text-[#5865F2]", link: "https://discord.com/users/765239557666111509" },
    ];

    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");

    useEffect(() => {
        setTimeout(() => {
            const finalText1 = "I'm";
            const finalText2 = "Altanis.";
    
            let i = 0, j = 0;
            const interval = setInterval(() => {
                const characters = finalText1.substring(0, i);
                setText1(characters);
                i++;
    
                if (i > finalText1.length) {
                    const characters = finalText2.substring(0, j);
                    setText2(characters);
                    j++;
    
                    if (j > finalText2.length) {
                        clearInterval(interval);
                    }
                }
            }, 50);
        }, 250);
    }, [])

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
            <div className="h-screen">
                {[...Array(iconTypes.length)].map((_, i) => {
                    const { type, color, link } = iconTypes[i];
                    return (
                        <Link to={link}>
                            <Icon key={i} offset={(i * 2 * Math.PI) / iconTypes.length} type={type} color={color} />
                        </Link>
                    );
                })}
                <div className="flex items-center justify-center h-screen flex-col">
                    <div className="inline-flex text-3xl md:text-8xl font-bold">
                        <span className="mr-3 text-left md:mr-5">{text1}</span>
                        <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-blue-600 md:mr-5">{text2}</span>
                    </div>
                    <p className="text-sm md:text-lg text-center underline decoration-yellow-500 pb-14 w-[486.42px]">I'm a freshman who enjoys programming; specifically game & full stack development, as well as reverse engineering games.</p>
                    <div className="flex flex-col text-xl font-bold">
                        <Link
                            to="/projects"
                            className="mr-3 text-center text-red-400 underline decoration-blue-500 hover:cursor-pointer hover:-translate-y-1 duration-200 md:mr-5"
                        >
                            Projects
                        </Link>
                        <Link
                            to="/skills"
                            className="mr-3 text-center text-green-400 underline decoration-blue-500 hover:cursor-pointer hover:-translate-y-1 duration-200 md:mr-5"
                        >
                            Skills
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
        </AnimatePresence>
    );
};