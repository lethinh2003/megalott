import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";

const BoxQuay = ({ isRunning, ketQuaRandom, phienHoanTatMoiNhat }) => {
  const testRef = useRef();
  const [firstDice, setFirstDice] = useState(0);
  const [secondDice, setSecondDice] = useState(0);
  const [thirdDice, setThirdDice] = useState(0);

  useEffect(() => {
    if (isRunning) {
      testRef.current = setInterval(() => {
        const randomFirstDice = getRandomArbitrary(1, 6);
        const randomSecondDice = getRandomArbitrary(1, 6);
        const randomThirdDice = getRandomArbitrary(1, 6);

        setFirstDice(randomFirstDice);
        setSecondDice(randomSecondDice);
        setThirdDice(randomThirdDice);
      }, 100);
    } else {
      clearInterval(testRef.current);
      setFirstDice(ketQuaRandom[0]);
      setSecondDice(ketQuaRandom[1]);
      setThirdDice(ketQuaRandom[2]);
    }
    return () => {
      clearInterval(testRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (phienHoanTatMoiNhat && phienHoanTatMoiNhat.ketQua) {
      const ketQuaRandom = phienHoanTatMoiNhat.ketQua;
      setFirstDice(ketQuaRandom[0]);
      setSecondDice(ketQuaRandom[1]);
      setThirdDice(ketQuaRandom[2]);
    }
  }, [phienHoanTatMoiNhat]);

  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const BoxContainer = styled(Box)(({ theme }) => ({
    background: "#00b977",
    borderRadius: "10px",
    height: "12rem",
    marginTop: "30px",
    padding: "10px",
    position: "relative",
    "&:before, &:after": {
      content: `""`,
      display: "block",
      height: "0.69333rem",
      position: "absolute",
      top: "50%",

      transform: "translateY(-50%)",
      width: "0.13333rem",
      zIndex: 0,
    },
    "&:before": {
      background: "#008b59",
      borderRadius: "0.13333rem 0 0 0.13333rem",
      left: "-0.13333rem",
    },
    "&:after": {
      background: "#008b59",
      borderRadius: "0.13333rem 0 0 0.13333rem",
      right: "-0.13333rem",
    },
    "& .box": {
      gap: "5px",
      alignItems: "center",
      background: "#003c26",
      borderRadius: "0.13333rem",
      display: "flex",
      height: "100%",
      justifyContent: "space-between",
      padding: "5px",
      position: "relative",
      width: "100%",
      "&:before, &:after": {
        content: `""`,
        borderBottom: "10px solid transparent",
        borderTop: "10px solid transparent",
        height: "0",
        position: "absolute",
        width: 0,
        zIndex: 3,
      },
      "&:before": {
        borderLeft: "15px solid #00b977",
        borderRight: "10px solid transparent",
        left: 0,
      },
      "&:after": {
        borderLeft: "10px solid transparent",
        borderRight: "15px solid #00b977",
        right: 0,
      },

      "& .slot-column": {
        background: "#333",
        borderRadius: "0.10667rem",
        display: "inline-block",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        textAlign: "center",
        verticalAlign: "bottom",
        width: "calc(20% - 0.10667rem)",
        "& .slot-transform": {
          transform: "translateY(-11.7rem)",
          "&.slot-scroll": {
            WebkitAnimation: "slotScroll 3s cubic-bezier(0.65, 0.02, 0.65, 1.06) infinite",
            animation: "slotScroll 3s cubic-bezier(0.65, 0.02, 0.65, 1.06) infinite",
            WebkitAnimationFillMode: "forwards",
            animationFillMode: "forwards",
          },

          "& .slot-num": {
            background: "#e1e1ec",
            borderRadius: "50%",
            color: "#0006",
            fontSize: "3rem",
            fontWeight: 700,
            height: "6rem",
            lineHeight: "60px",

            margin: "0 auto 5px",
            width: "6rem",
            "&.active": {
              background: "#00e065",
              color: "#fff",
            },
          },
        },
      },
    },
  }));

  return (
    <>
      <BoxContainer className="box-quay">
        <Box className="box">
          <Box className={`xucxac${firstDice}`}></Box>
          <Box className={`xucxac${secondDice}`}></Box>
          <Box className={`xucxac${thirdDice}`}></Box>
        </Box>
      </BoxContainer>
    </>
  );
};
export default React.memo(BoxQuay);
