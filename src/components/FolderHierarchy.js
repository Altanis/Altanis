import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function FolderHierarchy({ folders, theme: {theme, hoverBackgroundTheme} }) {
    return (
        <div className="flex items-center space-x-2">
            {folders.map((folder, idx) => {
                return (
                    <Fragment key={idx}>
                        <Link to={folder.link}>
                            <div className={`px-4 flex items-center space-x-2 ${theme} duration-200 hover:text-white ${hoverBackgroundTheme} hover:cursor-pointer rounded-full`}>
                                <i className={`px-1 ${folders.length <= 2 ? "text-md sm:text-2xl" : "text-xs sm:text-xl"} ${folder.icon}`}></i>
                                <div className={`${folders.length <= 2 ? "text-lg sm:text-3xl" : "text-xs sm:text-xl"}`}>{folder.name}</div>
                            </div>
                        </Link>
                        {idx !== folders.length - 1 && <div className="text-3xl">{"→"}</div>}
                    </Fragment>
                )
            })}
        </div>
    );
};