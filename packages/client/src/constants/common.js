const BASE_URL = "http://localhost:5999/v1/api";
const SIDEBAR_INSTRUCTORS = [
  { id: 1, name: "Điểm danh", link: "/instructor/attendance" },
  { id: 2, name: "Danh sách điểm danh", link: "/instructor/list-attendance" },
  { id: 3, name: "Cài đặt tài khoản", link: "/instructor/information" },
];
const SIDEBAR_ADMINS = [
  { id: 1, name: "Danh sách lớp học", link: "/admin/list-courses" },
  { id: 2, name: "Danh sách người dùng", link: "/admin/list-user" },
];
const SIDEBAR_STUDENTS = [
  { id: 1, name: "Môn học điểm danh", link: "/student/subject-attendance" },
  { id: 2, name: "Cài đặt tài khoản", link: "/student/information" },
];

export { BASE_URL, SIDEBAR_INSTRUCTORS, SIDEBAR_ADMINS, SIDEBAR_STUDENTS };

export const PERMISSIONS = {
  STUDENT: 2,
  ADMIN: 1,
  TEACHER: 3,
};
export const ROUTES = {
  HOME: "/",
  ADMIN: 1,
  TEACHER: 3,
};
