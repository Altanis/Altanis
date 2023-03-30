export default function Tag({ tag }) {
    const mappings = new Map([
        ["nodejs", "bg-red-400"],
        ["websocket", "bg-green-400"],
        ["express", "bg-blue-400"],
        ["canvas", "bg-yellow-400"],
        ["physics", "bg-indigo-400"],
        ["full-stack", "bg-purple-400"],
        ["typescript", "bg-pink-400"],
        ["rust", "bg-[#B7410E]"],
        ["c++", "bg-[#00599C]"],
        ["json", "bg-[#E34F26]"],
        ["database", "bg-[#FCA121]"],
    ]);


    return (
        <span className={`px-2 py-1 mr-2 text-xs sm:text-sm text-white rounded-full ${mappings.get(tag)}`}>{tag}</span>
    );
};