import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    axios
      .post(
        "/auth/signupRequest",
        {
          student_name: data.student_name,
          student_id: data.student_id,
          student_department: data.student_department,
          student_contact: data.student_contact,
          student_room: data.student_room,
          student_password: data.student_password,
          student_email: data.student_email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.isSuccess === "True") {
          setSuccessMessage("회원가입 신청이 완료되었습니다. 관리자의 승인을 기다려주세요. 승인이나 거절이 완료되면 이메일로 알려드립니다.");
          alert("회원가입 신청이 완료되었습니다. 관리자의 승인을 기다려주세요. 승인이나 거절이 완료되면 이메일로 알려드립니다.");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    if (phoneNumber.length === 11) {
      setPhoneNumber(phoneNumber.replace(/ /g, "").replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3"));
    } else if (phoneNumber.length === 13) {
      setPhoneNumber(phoneNumber.replace(/-/g, "").replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3"));
    }
  }, [phoneNumber]);

  return (
    <>
      <Link className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center" to="/">
        경동대학교 기숙사 외박신청
      </Link>
      <div className="border border-blue-200 max-w-sm w-11/12 mx-auto rounded-xl shadow-md px-8 py-6 bg-white mb-4">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="container mx-auto mb-5">
            <label htmlFor="name" className="font-medium">
              이름
            </label>
            <input
              {...register("student_name", {
                required: {
                  value: true,
                  message: "이름을 입력하세요",
                },
              })}
              id="student_name"
              className={
                errors.student_name
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              placeholder="ex) 홍길동"
            />
            {errors.student_name && <span className="text-red-500">{errors.student_name.message}</span>}
          </div>
          <div className="container mx-auto mb-5">
            <label htmlFor="student_id" className="font-medium">
              학번
            </label>
            <input
              {...register("student_id", {
                required: { value: true, message: "학번을 입력하세요" },
                minLength: {
                  value: 7,
                  message: "학번은 7자이어야 합니다.",
                },
                maxLength: {
                  value: 7,
                  message: "학번은 7자이어야 합니다.",
                },
                validate: {
                  isNumber: (value) => {
                    if (isNaN(value)) {
                      return "숫자만 입력하세요";
                    }
                    return true;
                  },
                },
              })}
              id="student_id"
              className={
                errors.student_id
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              placeholder="ex) 2024129"
            />
            {errors.student_id && <span className="text-red-500">{errors.student_id.message}</span>}
          </div>
          <div className="container mx-auto mb-5">
            <label htmlFor="student_department" className="font-medium">
              학과
            </label>
            {/* <input
              {...register("student_department", {
                required: {
                  value: true,
                  message: "학과를 입력하세요",
                },
              })}
              id="student_department"
              className={
                errors.student_department
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              placeholder="ex) OOO학과"
            /> */}
            <select
              {...register("student_department", {
                required: {
                  value: true,
                  message: "학과를 입력하세요",
                },
              })}
              id="student_department"
              className={
                errors.student_department
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              placeholder="ex) OOO학과"
            >
              <option value="">학과를 선택하세요</option>
              <option value="건축공학과">건축공학과</option>
              <option value="건축디자인학과">건축디자인학과</option>
              <option value="경영학과">경영학과</option>
              <option value="경찰학과">경찰학과</option>
              <option value="공공복지정보관리학과">공공복지정보관리학과</option>
              <option value="국제융합학부">국제융합학부</option>
              <option value="군사학과">군사학과</option>
              <option value="디자인학과">디자인학과</option>
              <option value="사회복지학과">사회복지학과</option>
              <option value="소프트웨어학과">소프트웨어학과</option>
              <option value="스포츠마케팅학과">스포츠마케팅학과</option>
              <option value="외식사업학과">외식사업학과</option>
              <option value="유아교육과">유아교육과</option>
              <option value="체육학과">체육학과</option>
              <option value="컴퓨터공학과">컴퓨터공학과</option>
              <option value="토목공학과">토목공학과</option>
              <option value="항공서비스학과">항공서비스학과</option>
              <option value="행정학과">행정학과</option>
              <option value="호텔관광경영학과">호텔관광경영학과</option>
              <option value="호텔조리학과">호텔조리학과</option>
            </select>
            {errors.student_department && <span className="text-red-500">{errors.student_department.message}</span>}
          </div>
          <div className="container mx-auto mb-5">
            <label htmlFor="student_contact" className="font-medium">
              연락처
            </label>
            <input
              {...register("student_contact", {
                required: {
                  value: true,
                  message: "연락처를 입력하세요",
                },
              })}
              id="student_contact"
              className={
                errors.student_contact
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              value={phoneNumber}
              onChange={onChangePhoneNumber}
              placeholder="ex) 010-1234-5678 (-포함)"
            />
            {errors.student_contact && <span className="text-red-500">{errors.student_contact.message}</span>}
          </div>
          <div className="container mx-auto mb-5">
            <label htmlFor="student_email" className="font-medium">
              이메일
            </label>
            <input
              {...register("student_email", {
                required: {
                  value: true,
                  message: "이메일을 입력하세요",
                },
              })}
              id="student_email"
              className={
                errors.student_email
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              placeholder="ex) abc123@email.com"
            />
            {errors.student_email && <span className="text-red-500">{errors.student_email.message}</span>}
          </div>
          <div className="container mx-auto mb-5">
            <label htmlFor="student_room" className="font-medium">
              호실
            </label>
            <input
              {...register("student_room", {
                required: {
                  value: true,
                  message: "호실을 입력하세요",
                },
                minLength: {
                  value: 3,
                  message: "호실은 3자이어야 합니다.",
                },
                maxLength: {
                  value: 3,
                  message: "호실은 3자이어야 합니다.",
                },
                validate: {
                  isNumber: (value) => {
                    if (isNaN(value)) {
                      return "숫자만 입력하세요";
                    }
                    return true;
                  },
                },
              })}
              id="student_room"
              className={
                errors.student_room
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              placeholder="ex) 123"
            />
            {errors.student_room && <span className="text-red-500">{errors.student_room.message}</span>}
          </div>
          <div className="container mx-auto mb-5">
            <label htmlFor="student_password" className="font-medium">
              비밀번호
            </label>
            <input
              {...register("student_password", {
                required: {
                  value: true,
                  message: "비밀번호를 입력하세요",
                },
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자 이상이어야 합니다.",
                },
              })}
              id="student_password"
              className={
                errors.student_password
                  ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                  : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
              }
              type="password"
              placeholder="6자 이상"
            />
            {errors.student_password && <span className="text-red-500">{errors.student_password.message}</span>}
          </div>
          <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
            회원가입
          </button>
        </form>
        {successMessage && <div className="text-center text-green-600 font-medium text-lg mt-4">{successMessage}</div>}
      </div>
    </>
  );
};

export default SignupPage;
