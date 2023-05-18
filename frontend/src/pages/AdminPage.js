import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import UsersApplicationListContainer from "../containers/UsersApplicationListContainer";
import SignupRequestListContainer from "../containers/SignupRequestListContainer";
import TodayMenuContainer from "../containers/TodayMenuContainer";
import NoticeListContainer from "../containers/NoticeListContainer";
import PenaltyDangerStudentsListContainer from "../containers/PenaltyDangerStudentsListContainer";

const AdminPage = () => {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div className="flex overflow-hidden bg-white pt-16">
        <SidebarContainer></SidebarContainer>
        <div id="main-content" className="h-full w-full bg-blue-100 relative overflow-y-auto lg:ml-64">
          <main>
            <div className="py-10 px-4">
              <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <UsersApplicationListContainer></UsersApplicationListContainer>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <SignupRequestListContainer></SignupRequestListContainer>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                  {/* 카드 */}
                  <TodayMenuContainer></TodayMenuContainer>
                </div>
              </div>
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 my-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <NoticeListContainer></NoticeListContainer>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <PenaltyDangerStudentsListContainer></PenaltyDangerStudentsListContainer>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
