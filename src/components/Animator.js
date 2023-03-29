import { AnimatePresence, motion } from "framer-motion";

export default function Animator({ Element }) {
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
                transition={{ duration: 1 }}
            >
                {<Element />}
            </motion.div>
        </AnimatePresence>
    )
};