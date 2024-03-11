const BASE_URL = "http://localhost:5999/api/v1";
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
const TABLELIST_USERS = [
  { id: 1, column: "Mã người dùng" },
  { id: 2, column: "Role" },
  { id: 3, column: "Họ tên" },
  { id: 4, column: "Email" },
  { id: 5, column: "SĐT" },
  { id: 6, column: "Thao tác" },
];
const TABLELIST_CLASSS = [
  { id: 1, column: "Mã lớp" },
  { id: 2, column: "Mã môn học" },
  { id: 3, column: "Môn học" },
  { id: 4, column: "Giảng viên" },
  { id: 5, column: "Ngày mở lớp" },
  { id: 6, column: "Ngày kết thúc" },
  { id: 7, column: "Thao tác" },
];
const TABLESUBJECT_ATTENDANCES = [
  { id: 1, column: "STT" },
  { id: 2, column: "Môn học" },
  { id: 3, column: "Ngày bắt đầu" },
  { id: 4, column: "Ngày kết thúc" },
  { id: 5, column: "Buổi 1" },
  { id: 6, column: "Buổi 2" },
  { id: 7, column: "Buổi 3" },
  { id: 8, column: "Buổi 4" },
  { id: 9, column: "Buổi 5" },
  { id: 10, column: "Buổi 6" },
];
const TABLE_ATTENDANCE_INSTRUCTORS = [
  { id: 1, column: "Mã lớp" },
  { id: 2, column: "Môn học" },
  { id: 3, column: "Ca" },
  { id: 4, column: "Thứ" },
  { id: 5, column: "Ngày mở lớp" },
  { id: 6, column: "Ngày kết thúc" },
  { id: 7, column: "Thao tác" },
];
const TABLE_ATTENDANCE_FACES = [
  { id: 1, column: "STT" },
  { id: 2, column: "Mã SV" },
  { id: 3, column: "Họ tên SV" },
  { id: 4, column: "Ngày sinh" },
  { id: 5, column: "Lớp" },
  { id: 6, column: "Điểm danh" },
];
export {
  BASE_URL,
  SIDEBAR_INSTRUCTORS,
  SIDEBAR_ADMINS,
  TABLELIST_USERS,
  TABLELIST_CLASSS,
  SIDEBAR_STUDENTS,
  TABLESUBJECT_ATTENDANCES,
  TABLE_ATTENDANCE_INSTRUCTORS,
  TABLE_ATTENDANCE_FACES,
};
