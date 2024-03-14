import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import Webcam from "react-webcam";
const { VITE_ATTENDANCE_SERVICE, VITE_AUTHENTICATION_SERVICE } = import.meta
  .env;
import UserContext from "@contexts/user";
import { displayToast } from "@utils";
import { Box } from "@mui/material";
function AttendanceWebcam(chilrens) {
  const { courseId, shifts, days } = chilrens ?? {};
  const [image, setImage] = useState(undefined);
  const { user } = useContext(UserContext) ?? {};
  const [uploadMessage, setUploadMessage] = useState("Please upload an image!");
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);
  const [studentIds, setStudentIds] = useState([]);

  const handleSubmit = async () => {
    const visitorImageName = uuidv4();
    console.log("image", image);
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
        console.log(authResponse);
        if (authResponse.Message === "success") {
          const newStudentIds = authResponse.students.map(
            (student) => student.mssv
          );
          setStudentIds((prevStudentIds) => {
            const uniqueIds = new Set([...prevStudentIds, ...newStudentIds]);
            return Array.from(uniqueIds);
          });
          const messages = authResponse.students.map((student) => {
            return `${student.mssv} - ${student.firstName} ${student.lastName} `;
          });
          const allMessages = messages.join("\n");
          displayToast(allMessages, "success");
          retake();
        } else {
          setUploadMessage("Authentication failed");
        }
      } else {
        throw new Error("Error uploading image");
      }
    } catch (error) {
      setUploadMessage("Try again");
      console.log(error);
    }
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
                setImage(file);
              })
              .catch((error) =>
                console.error("Error converting image data URL to File:", error)
              );
          }
        };
        img.src = imageSrc;
        setTimeout(() => {
          handleSubmit();
        }, 1000);
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

  useEffect(() => {
    console.log("IDS:", studentIds);
  }, [studentIds]);

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
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
        {/* <button onClick={handleSubmit}>SUBMIT</button> */}
      </Box>
    </Box>
  );
}

export default AttendanceWebcam;
