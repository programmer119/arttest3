import React, { useState, useRef, Suspense } from 'react';
import { Box, Tabs, Tab, Typography, Button, Modal, TextField, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import { useStyles } from './styles/CustomStyles';
import CustomCanvas, { ChangePartsOnInventory, ChangeGloss, ChangeColor } from './CustomCanvas';

function Custom(props) {
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const classes = useStyles();

  // 초기값 ( 서버가 준비 되면 서버에서 받아 온다. )
  const defaulthorseShape = {
    color: '#FFFFFF',
    roughness: 0, // 0~1
    shape: [1, 1, 1, 1, 1, 1, 1, 1], // 1~4
    material: [1, 1, 1, 1, 1, 1, 1, 1], // 1~4
  };

  const [horseShape, sethorseShape] = useState({
    color: '#ff0000',
    roughness: 1,
    shape: [99, 99, 99, 99, 99, 99, 99, 99], // 1~4
    material: [99, 99, 99, 99, 99, 99, 99, 99], // 1~4
  });
  
  return (
    <Box className={classes.root}>
      {isDesktop ? (
        <Box className={classes.pcStyle}>
          <Box className={classes.flexcenter}>
            <Suspense fallback={<div />}>
              <CustomCanvas
                item={props.item}
                texture={props.texture}
                file={props.file}
                horseShape={horseShape}
                sethorseShape={sethorseShape}
                defaulthorseShape={defaulthorseShape}
              ></CustomCanvas>
            </Suspense>
          </Box>
        </Box>
      ) : (
        <>
          <Box className={classes.flexcenter}>
            <Suspense fallback={<div />}>
              <CustomCanvas
                item={props.item}
                texture={props.texture}
                file={props.file}
                horseShape={horseShape}
                sethorseShape={sethorseShape}
                defaulthorseShape={defaulthorseShape}
              ></CustomCanvas>
            </Suspense>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Custom;
