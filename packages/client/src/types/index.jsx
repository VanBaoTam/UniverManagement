import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";
//COLS
const times = Array.from({ length: 15 }, (_, index) => ({
  field: `times_${index + 1}`,
  renderCell: (params) => {
    const value = params.value;
    const checked = value === "x" ? true : false;
    return (
      <Checkbox
        checked={checked}
        disabled
        style={{ color: checked ? "green" : "#f0eded" }}
      />
    );
  },
  headerName: `${index + 1}`,
  width: 20,
}));

export const listAttendancesCols = [
  {
    field: "id",
    headerName: "STT",
    width: 80,
  },
  {
    field: "studentId",
    headerName: "Mã sinh viên",
    width: 120,
  },
  {
    field: "name",
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
    width: 120,
  },
  {
    field: "studentName",
    headerName: "Họ tên sinh viên",
    width: 200,
  },
  {
    field: "studentClass",
    headerName: "Lớp",
    width: 120,
  },
  {
    field: "isAttendance",
    headerName: "Điểm danh",
    width: 120,
    renderCell: (params) => {
      const value = params.value;
      if (value)
        return (
          <Checkbox
            checked={value}
            disabled
            style={{ color: value ? "green" : "gray" }}
          />
        );
      else return <Checkbox disabled style={{ color: "#f0eded" }} />;
    },
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
    width: 300,
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    width: 300,
  },
];
export const CourseAttendanceCols = [
  {
    field: "id",
    headerName: "STT",
    width: 80,
  },
  {
    field: "course_title",
    headerName: "Môn học",
    width: 200,
  },
  {
    field: "start_date",
    headerName: "Ngày bắt đầu",
    valueFormatter: (data) => {
      return dayjs(data.value).format("DD/MM/YYYY");
    },
    width: 150,
  },
  {
    field: "end_date",
    headerName: "Ngày kết thúc",
    valueFormatter: (data) => {
      return dayjs(data.value).format("DD/MM/YYYY");
    },
    width: 150,
  },
  ...times,
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
    field: "id",
    headerName: "STT",
    width: 80,
  },
  {
    field: "course_title",
    headerName: "Môn học",
    width: 300,
  },
  {
    field: "shift",
    headerName: "Ca",
    width: 100,
  },
  {
    field: "days",
    headerName: "Thứ",
    valueFormatter: (data) => {
      return `Thứ ${data.value}`;
    },

    width: 100,
  },
  {
    field: "start_date",
    headerName: "Ngày mở lớp",
    valueFormatter: (data) => {
      return dayjs(data.value).format("DD/MM/YYYY");
    },
    width: 200,
  },
  {
    field: "end_date",
    headerName: "Ngày kết thúc",
    valueFormatter: (data) => {
      return dayjs(data.value).format("DD/MM/YYYY");
    },
    width: 200,
  },
];
