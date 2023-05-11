import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAuthInfoSelector } from "../state";

const Sidebar = ({ onLogout }) => {
    const userAuthInfo = useRecoilValue(userAuthInfoSelector);

    return (
        <>
            <aside
                id="sidebar"
                className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-[width] duration-75"
                aria-label="Sidebar"
            >
                <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-300 bg-white pt-0">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 bg-white divide-y space-y-1">
                            <ul className="space-y-2 pb-2">
                                <li>
                                    <button
                                        onClick={onLogout}
                                        className="text-base text-gray-900 font-normal rounded-lg flex w-full items-center p-2 hover:bg-gray-100 group"
                                    >
                                        <span className="ml-3">로그아웃</span>
                                    </button>
                                </li>
                                {userAuthInfo.data.isAdmin && (
                                    <li>
                                        <Link
                                            to="/managePoint"
                                            className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                                        >
                                            <span className="ml-3">상벌점 부여</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
        </>
    );
};

export default Sidebar;
