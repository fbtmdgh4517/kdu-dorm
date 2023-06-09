const UserCurrentPoint = ({ studentInfo }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 조회</h1>
      </div>
      <div className="bg-gray-100 border border-gray-300 text-center p-3 rounded-lg shadow-md">
        <div className="pb-4 border-b-2">
          <span className="font-bold">
            {studentInfo.contents.student_name} {studentInfo.contents.student_id}
          </span>
          <span> 의 현재 상벌점</span>
        </div>
        <div className="flex flex-row mt-4">
          <div className="w-1/2 py-2 border-r-2">
            <span>상점 :</span>
            <span className="text-blue-700 font-bold">{studentInfo.contents.bonus_point}</span>
          </div>
          <div className="w-1/2 py-2">
            <span>벌점 :</span>
            <span className="text-red-500 font-bold">{studentInfo.contents.penalty_point}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCurrentPoint;
