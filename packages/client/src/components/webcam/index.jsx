import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Webcam from "react-webcam";
const {
  VITE_ATTENDANCE_SERVICE,
  VITE_AUTHENTICATION_SERVICE,
  VITE_AUTHENTICATION_MOBILE_SERVICE,
} = import.meta.env;
import { displayToastTop } from "@utils";
import { Box, Button } from "@mui/material";
import { BLUE_COLOR, RED_COLOR } from "@constants/color";
import "./webcam.scss";

function AttendanceWebcam(children) {
  const { studentIds, setStudentIds } = children ?? {};
  const [images, setImages] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.screen.width < 949 ? true : false
  );
  const [isCaptured, setIsCaptured] = useState(false);
  const webcamRef = useRef(null);
  const imageRef = useRef(null);

  const handleSubmit = useCallback(
    async (image) => {
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
            console.log("MSSV:", ids);
            const newStudentIds = ids.filter((student) => {
              return !studentIds.includes(student);
            });
            console.log("NEWS", newStudentIds);
            setStudentIds((prevData) => [...prevData, ...newStudentIds]);
            if (newStudentIds.length) {
              const messages = newStudentIds.map((mssv) => {
                const student = authResponse.students.find(
                  (student) => student.mssv === mssv
                );
                return `${student.mssv} - ${student.firstName} ${student.lastName}`;
              });
              console.log("MESSAGES:", messages);
              const allMessages = messages.join("\n");
              displayToastTop(allMessages, "success");
            } else {
              displayToastTop("Bạn đã điểm danh rồi", "info");
            }
            retake();
          }
        } else {
          throw new Error("Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [studentIds, setStudentIds]
  );
  const handleChooseFiles = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  useEffect(() => {
    if (!images.length) return;
    images.forEach((image) => {
      console.log(image);
      handleSubmit(image);
    });
    setImages([]);
  }, [images, handleSubmit]);

  const authen = async (attendanceName) => {
    try {
      console.log(attendanceName);
      const requestUrl =
        // isMobileScreen
        // ? VITE_AUTHENTICATION_MOBILE_SERVICE +
        //   new URLSearchParams({
        //     objectKey: `${attendanceName}.jpeg`,
        //   })
        // :
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
    console.log(isCaptured);
    if (!isCaptured) {
      console.log("RETURN");
      return;
    }
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
  }, [handleSubmit, isCaptured]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      const selectedFile = e.target.files;
      setImages((prev) => [...prev, ...selectedFile]);
    }
  };

  const retake = () => {
    setImgSrc(null);
    console.log("HERE RETAKE");
    setIsCaptured(false);
  };
  useEffect(() => {
    if (isCaptured) capture();
  }, [isCaptured]);
  return (
    <Box
      sx={{
        display: "flex",
        height: "820px",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", p: 4 }}>
        {imgSrc ? (
          <div className="my-3 py-md-0 sizewebcam">
            <img
              className="py-5    px-md-0 py-0 mt-3"
              src={imgSrc}
              alt="webcam"
              height={"100%"}
              width={"100%"}
            />
          </div>
        ) : (
          <div className="my-3 py-md-0 sizewebcam">
            <Webcam
              className="py-5    px-md-0 py-0 mt-3"
              height={"100%"}
              width={"100%"}
              screenshotFormat="image/jpeg"
              ref={webcamRef}
            />
          </div>
        )}
      </Box>
      <input
        type="file"
        accept="image/*"
        name="image"
        multiple
        style={{ display: "none" }}
        ref={imageRef}
        onChange={handleImageChange}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        {imgSrc ? (
          <Button
            className="py-md-3 py-3 col-9 mx-auto"
            variant="contained"
            sx={{
              fontSize: "2rem",
              background: BLUE_COLOR,
            }}
            onClick={() => {
              console.log("CLICK CAPTURED");
              retake();
            }}
          >
            Retake photo
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              background: BLUE_COLOR,
            }}
            className="py-md-3 py-3 col-9 mx-auto"
            onClick={() => {
              console.log("CLICK CAPTURED");
              setIsCaptured(true);
            }}
          >
            Capture photo
          </Button>
        )}
        <Button
          variant="contained"
          sx={{
            mt: 3,

            px: 3,

            background: RED_COLOR,
          }}
          className="py-md-3 py-3 col-9 mx-auto"
          onClick={handleChooseFiles}
        >
          Choose Files
        </Button>
      </Box>
    </Box>
  );
}

export default AttendanceWebcam;
