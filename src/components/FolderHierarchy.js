import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function FolderHierarchy({ folders, theme: {theme, hoverBackgroundTheme} }) {
    return (
        <div className="flex items-center space-x-2">
            {folders.map((folder, idx) => {
                return (
                    <Fragment key={idx}>
                        <Link to={folder.link}>
                            <div className={`flex items-center space-x-2 ${theme} duration-200 hover:text-white ${hoverBackgroundTheme} hover:cursor-pointer rounded-lg`}>
                                <i className={`px-1 ${folder.icon}`}></i>
                                <div className="text-3xl">{folder.name}</div>
                            </div>
                        </Link>
                        {idx !== folders.length - 1 && <div className="text-3xl">{"->"}</div>}
                    </Fragment>
                )
            })}
        </div>
    );
};