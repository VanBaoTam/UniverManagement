const BASE_URL = "http://localhost:5999/v1/api";
const SIDEBAR_INSTRUCTORS = [
  { id: 1, name: "Điểm danh", link: "/AttendanceInstructor" },
  { id: 2, name: "Danh sách điểm danh", link: "/ListAttendanceInstructor" },
  { id: 3, name: "Cài đặt tài khoản", link: "/InformationInstructor" },
];
const SIDEBAR_ADMINS = [
  { id: 1, name: "Danh sách lớp học", link: "/ListClassAdmin" },
  { id: 2, name: "Danh sách người dùng", link: "/ListUserAdmin" },
];
const SIDEBAR_STUDENTS = [
  { id: 1, name: "Môn học điểm danh", link: "/SubjectAttendanceStudent" },
  { id: 2, name: "Cài đặt tài khoản", link: "/InformationStudent" },
];
export { BASE_URL, SIDEBAR_INSTRUCTORS, SIDEBAR_ADMINS, SIDEBAR_STUDENTS };
