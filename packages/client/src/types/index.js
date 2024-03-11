//COLS
const times = [
  {
    field: "times_1",
    headerName: "Buổi 1",
    width: 80,
  },
  {
    field: "times_2",
    headerName: "Buổi 2",
    width: 80,
  },
  {
    field: "times_3",
    headerName: "Buổi 3",
    width: 80,
  },
  {
    field: "times_4",
    headerName: "Buổi 4",
    width: 80,
  },
  {
    field: "times_5",
    headerName: "Buổi 5",
    width: 80,
  },
  {
    field: "times_6",
    headerName: "Buổi 6",
    width: 80,
  },
  {
    field: "times_7",
    headerName: "Buổi 7",
    width: 80,
  },
  {
    field: "times_8",
    headerName: "Buổi 8",
    width: 80,
  },
  {
    field: "times_9",
    headerName: "Buổi 9",
    width: 80,
  },
  {
    field: "times_10",
    headerName: "Buổi 10",
    width: 80,
  },
  {
    field: "times_11",
    headerName: "Buổi 11",
    width: 80,
  },
  {
    field: "times_12",
    headerName: "Buổi 12",
    width: 80,
  },
  {
    field: "times_13",
    headerName: "Buổi 13",
    width: 80,
  },
  {
    field: "times_14",
    headerName: "Buổi 14",
    width: 80,
  },
  {
    field: "times_15",
    headerName: "Buổi 15",
    width: 80,
  },
];

export const listAttendancesCols = [
  {
    field: "id",
    headerName: "STT",
    width: 80,
  },
  {
    field: "studentId",
    headerName: "Mã sinh viên",
    width: 150,
  },
  {
    field: "studentName",
    headerName: "Họ tên sinh viên",
    width: 200,
  },
  {
    field: "class",
    headerName: "Lớp",
    width: 120,
  },
  ...times,
];

export const attendanceFacesCols = [
  {
    field: "id",
    headerName: "STT",
    width: 80,
  },
  {
    field: "studentId",
    headerName: "Mã sinh viên",
    width: 150,
  },
  {
    field: "studentName",
    headerName: "Họ tên sinh viên",
    width: 200,
  },
  {
    field: "class",
    headerName: "Lớp",
    width: 120,
  },
  {
    field: "isAttendanced",
    headerName: "Điểm danh",
    width: 120,
  },
];

export const classCols = [
  {
    field: "class",
    headerName: "Mã lớp",
    width: 80,
  },
  {
    field: "courseId",
    headerName: "Mã môn học",
    width: 150,
  },
  {
    field: "courseName",
    headerName: "Môn học",
    width: 200,
  },
  {
    field: "instructorName",
    headerName: "Giảng viên",
    width: 300,
  },
  {
    field: "startDate",
    headerName: "Ngày mở lớp",
  },
];
export const CourseAttendanceCols = [
  {
    field: "id",
    headerName: "STT",
    width: 80,
  },
  {
    field: "courseName",
    headerName: "Môn học",
    width: 150,
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    width: 200,
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    width: 200,
  },
];
export const userCols = [
  {
    field: "userId",
    headerName: "Mã người dùng",
    width: 150,
  },
  {
    field: "userRole",
    headerName: "Role",
    width: 150,
  },
  {
    field: "userName",
    headerName: "Họ tên",
    width: 300,
  },
  {
    field: "userEmal",
    headerName: "Email",
    width: 200,
  },
  {
    field: "userPhonenumber",
    headerName: "SĐT",
    width: 200,
  },
];

export const attendanceCourseCol = [
  {
    field: "class",
    headerName: "Mã lớp",
    width: 80,
  },
  {
    field: "courseName",
    headerName: "Môn học",
    width: 150,
  },
  {
    field: "shift",
    headerName: "Ca",
    width: 300,
  },
  {
    field: "day",
    headerName: "Thứ",
    width: 200,
  },
  {
    field: "startDate",
    headerName: "Ngày mở lớp",
    width: 200,
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    width: 200,
  },
];
