import { useEffect, useState } from "react";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import { useRecoilValueLoadable } from "recoil";
import { userAuthInfoSelector } from "../state";
import { studentListSelector } from "../state";
import Pagination from "react-js-pagination";

const StudentListPage = () => {
  const userAuthInfo = useRecoilValueLoadable(userAuthInfoSelector);
  const studentListSelectorRecoil = useRecoilValueLoadable(studentListSelector);
  const [studentList, setStudentList] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  const pageChangeHandler = (page) => {
    setPage(page);
  };

  const searchStudent = (e) => {
    const searchResult = [];

    studentListSelectorRecoil.contents.data.filter((student) => {
      // console.log(e.target.value);
      if (student.student_name.includes(e.target.value)) {
        // console.log(student.student_name);
        searchResult.push(student);
      }

      // console.log(searchResult);
      setStudentList(searchResult);
    });
  };

  const searchDepartment = (e) => {
    const searchResult = [];

    studentListSelectorRecoil.contents.data.filter((student) => {
      // console.log(e.target.value);
      if (student.student_department.includes(e.target.value)) {
        // console.log(student.student_department);
        searchResult.push(student);
      }

      // console.log(searchResult);
      setStudentList(searchResult);
    });
  };

  const searchRoom = (e) => {
    const searchResult = [];

    studentListSelectorRecoil.contents.data.filter((student) => {
      // console.log(e.target.value);
      if (student.student_room.toString().includes(e.target.value)) {
        // console.log(student.student_room);
        searchResult.push(student);
      }

      // console.log(searchResult);
      setStudentList(searchResult);
    });
  };

  useEffect(() => {
    if (userAuthInfo.state === "hasValue" && userAuthInfo.contents.data.isLogin === "True" && userAuthInfo.contents.data.isAdmin === false) {
      alert("관리자만 접근 가능합니다.");
      window.location.href = "/main";
    }
  }, [userAuthInfo.state]);

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div className="flex overflow-hidden pt-16">
        <SidebarContainer></SidebarContainer>
        <div id="main-content" className="h-full w-full bg-blue-200 relative overflow-y-auto lg:ml-56">
          <main>
            <div className="py-9 px-4">
              <div className="w-full grid grid-cols-1 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold leading-none text-gray-900">학생 목록</h1>
                  </div>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="검색할 학생의 이름"
                    onChange={searchStudent}
                  />
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="검색할 학생의 학과"
                    onChange={searchDepartment}
                  />
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="검색할 학생의 호실"
                    onChange={searchRoom}
                  />
                  <div className="p-3">
                    <div className="overflow-x-auto rounded-lg border border-blue-500 shadow-md">
                      <table className="table-auto w-full">
                        <thead className="font-semibold text-gray-700 bg-blue-100">
                          <tr>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">학번</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">이름</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">학과</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">호실</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">상점</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">벌점</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">연락처</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold ">이메일</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y div divide-gray-200 text-center">
                          {/* 검색 input이 비었을때 */}
                          {studentListSelectorRecoil.state === "hasValue" &&
                            studentList.length === 0 &&
                            studentListSelectorRecoil.contents.data.slice(offset, offset + 10).map((student) => {
                              return (
                                <tr className="hover:bg-blue-100" key={student.student_id}>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_id}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_name}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_department}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_room}호</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-blue-600">{student.bonus_point}점</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-red-600">{student.penalty_point}점</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_contact}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_email}</td>
                                </tr>
                              );
                            })}
                          {/* 검색 input에 값을 입력했을때 */}
                          {studentList.length !== 0 &&
                            studentList.slice(offset, offset + 10).map((student) => {
                              return (
                                <tr className="hover:bg-blue-100" key={student.student_id}>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_id}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_name}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_department}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_room}호</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-blue-600">{student.bonus_point}점</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-red-600">{student.penalty_point}점</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_contact}</td>
                                  <td className="p-2 whitespace-nowrap font-medium text-gray-800">{student.student_email}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* 검색 input이 비었을때 */}
                  {studentListSelectorRecoil.state === "hasValue" && studentList.length === 0 && (
                    <div className="mx-auto items-center flex justify-center mt-6">
                      <Pagination
                        innerClass="inline-flex items-center -space-x-px bg-white"
                        itemClassFirst="block px-3 py-2 ml-0 leading-tight border border-gray-300 rounded-l-lg"
                        itemClassLast="block px-3 py-2 leading-tight border border-gray-300 rounded-r-lg"
                        itemClass="block px-3 py-2 leading-tight border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white"
                        activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={studentListSelectorRecoil.contents.data.length}
                        pageRangeDisplayed={5}
                        prevPageText={"<"}
                        nextPageText={">"}
                        onChange={pageChangeHandler}
                      />
                    </div>
                  )}
                  {/* 검색 input에 값을 입력했을때 */}
                  {studentList.length !== 0 && (
                    <div className="mx-auto items-center flex justify-center mt-6">
                      <Pagination
                        innerClass="inline-flex items-center -space-x-px bg-white"
                        itemClassFirst="block px-3 py-2 ml-0 leading-tight border border-gray-300 rounded-l-lg"
                        itemClassLast="block px-3 py-2 leading-tight border border-gray-300 rounded-r-lg"
                        itemClass="block px-3 py-2 leading-tight border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white"
                        activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={studentList.length}
                        pageRangeDisplayed={5}
                        prevPageText={"<"}
                        nextPageText={">"}
                        onChange={pageChangeHandler}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StudentListPage;
