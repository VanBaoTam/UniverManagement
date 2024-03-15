import React, { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Webcam from "react-webcam";
const { VITE_ATTENDANCE_SERVICE, VITE_AUTHENTICATION_SERVICE } = import.meta
  .env;
import { displayToastTop } from "@utils";
import { Box, Button } from "@mui/material";
import { BLUE_COLOR } from "@constants/color";
function AttendanceWebcam(chilrens) {
  const { studentIds, setStudentIds } = chilrens ?? {};
  // const [image, setImage] = useState();
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);
  const handleSubmit = async (image) => {
    const visitorImageName = uuidv4();
    try {
      const response = await fetch(
        VITE_ATTENDANCE_SERVICE + `/${visitorImageName}.jpeg`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg",
          },
          body: image,
        }
      );
      if (response.ok) {
        const authResponse = await authen(visitorImageName);

        if (authResponse.Message === "success") {
          const ids = authResponse.students.map((element) => element.mssv);
          const newStudentIds = ids.filter((student) => {
            return !studentIds.includes(student);
          });
          setStudentIds((prevData) => [...prevData, ...newStudentIds]);
          const messages = newStudentIds.map((mssv) => {
            const student = authResponse.students.find(
              (student) => student.mssv === mssv
            );
            return `${student.mssv} - ${student.firstName} ${student.lastName}`;
          });
          const allMessages = messages.join("\n");
          displayToastTop(allMessages, "success");
          retake();
        }
      }
      if (response.ok) {
        const authResponse = await authen(visitorImageName);

        if (authResponse.Message === "success") {
          const ids = authResponse.students.map((element) => element.mssv);
          const newStudentIds = ids.filter((student) => {
            return !studentIds.includes(student);
          });
          setStudentIds((prevData) => [...prevData, ...newStudentIds]);
          const messages = newStudentIds.map((mssv) => {
            const student = authResponse.students.find(
              (student) => student.mssv === mssv
            );
            return `${student.mssv} - ${student.firstName} ${student.lastName}`;
          });
          const allMessages = messages.join("\n");
          displayToastTop(allMessages, "success");
          retake();
        }
      } else {
        throw new Error("Error uploading image");
      }
    } catch (error) {}
  };

  const authen = async (attendanceName) => {
    try {
      const requestUrl =
        VITE_AUTHENTICATION_SERVICE +
        new URLSearchParams({
          objectKey: `${attendanceName}.jpeg`,
        });
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error while authenticating:", error);
      throw error;
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      if (imageSrc) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imageDataUrl = canvas.toDataURL("image/jpeg");
            fetch(imageDataUrl)
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], uuidv4() + ".jpeg", {
                  type: "image/jpeg",
                });
                handleSubmit(file);
              })
              .catch((error) =>
                console.error("Error converting image data URL to File:", error)
              );
          }
        };
        img.src = imageSrc;
      }
    }
  }, [webcamRef]);

  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFile = e.target.files[0];
  //     setImage(selectedFile);
  //   }
  // };
  const retake = () => {
    setImgSrc(null);
    capture();
  };
  // useEffect(() => {
  //   handleSubmit(image);
  // }, [image]);
  // useEffect(() => {
  //   // //console.log("IDS:", studentIds);
  // }, [studentIds]);

  return (
    <Box sx={{ display: "flex", height: "750px", flexDirection: "column" }}>
      <Box sx={{ width: "100%", p: 4 }}>
        <span style={{ textAlign: "center", display: "block" }}>Điểm danh</span>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="webcam"
            style={{ marginTop: "70px", marginBottom: "80px" }}
            height={410}
            width={550}
          />
        ) : (
          <Webcam
            height={550}
            width={550}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
          />
        )}
      </Box>
      {/* <input
        type="file"
        accept="image/*"
        name="image"
        onChange={handleImageChange}
      /> */}
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {imgSrc ? (
          <Button
            variant="contained"
            sx={{
              fontSize: "2rem",
              px: 3,
              py: 1,
              background: BLUE_COLOR,
            }}
            onClick={retake}
          >
            Retake photo
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              fontSize: "2rem",
              px: 3,
              py: 1,
              background: BLUE_COLOR,
            }}
            onClick={capture}
          >
            Capture photo
          </Button>
        )}
        {/* <button onClick={handleSubmit}>SUBMIT</button> */}
      </Box>
    </Box>
  );
}

export default AttendanceWebcam;
