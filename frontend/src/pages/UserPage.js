import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import OwnApplicationListContainer from "../containers/OwnApplicationListContainer";
import NoticeListContainer from "../containers/NoticeListContainer";
import TodayMenuContainer from "../containers/TodayMenuContainer";
import UserPointInfoContainer from "../containers/UserPointInfoContainer";

const UserPage = () => {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div className="flex overflow-hidden pt-16">
        <SidebarContainer></SidebarContainer>
        <div id="main-content" className="h-full w-full bg-blue-200 relative overflow-y-auto lg:ml-56">
          <main>
            <div className="py-9 px-4">
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <UserPointInfoContainer></UserPointInfoContainer>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                  {/* 카드 */}
                  <TodayMenuContainer></TodayMenuContainer>
                </div>
              </div>
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 my-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  <OwnApplicationListContainer></OwnApplicationListContainer>
                  {/* 카드 */}
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <NoticeListContainer></NoticeListContainer>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserPage;
