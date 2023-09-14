import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './styles/PresetHeadComponentStyles';
import tw from 'tailwind-styled-components';

const InfoTitle = tw.p`
  text-sm text-white font-light uppercase
`;

const InfoText = tw.p`
  text-sm text-[#F14EA7] font-medium
`;

const HorseInfoRow = tw.div`
  flex flex-row justify-between px-2 bg-[#EEC3FF]/10 py-1
`;
const HorseInfoContent = tw.div`
  flex flex-row space-x-1
`;
const HorseInfoImg = tw.img`
  img src="../../images/icons/diamond.svg"
`;

const HorseImgSection = tw.section`
relative h-[360px] w-full LD:h-full
`;

const HorseInfoSection = tw.section`

`;

export function PresetHeadComponent(props) {
  const classes = useStyles();
  const horse = props.item.horse;
  const stakeTypeID = props.item.stake.typeId;

  return (
    <Box className={classes.root}>
      <div className="absolute top-0 left-3 drop-shadow-lg w-fit rounded-b-md bg-gradient-to-r from-violet-900 from-25% via-fuchsia-700 via-70% to-fuchsia-800 px-3 py-2">
        <p className="text-white/80 flex flex-col items-center text-xs T:text-sm text-center tracking-wide">
          TYPE.0{stakeTypeID}
        </p>
      </div>
      {/* Horse Info */}
      <HorseInfoSection className="max-[1679px]:hidden absolute top-0 right-0">
        <div className="bg-[#48096D]/60 LD:w-[260px] LD:h-[382px] h-fit px-4 py-2">
          <h2 className="ml-1 text-2xl  text-[#F14EA7] pb-2">{horse.name}</h2>
          <div className="space-y-2">
            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>FRONT</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.front}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>STALKER</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.stalker}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>CLOSER</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.closer}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>COUNT RACING</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.countRacing}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>WIN FIRST</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.winFisrt}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>INNER THIRD</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.innerThird}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>BEST RECORD</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.bestRecord}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>LATEST RANK</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.latestRank}</InfoText>
            </HorseInfoRow>

            <HorseInfoRow>
              <HorseInfoContent>
                <HorseInfoImg />
                <InfoTitle>ACCUMULATE REWARD</InfoTitle>
              </HorseInfoContent>
              <InfoText>{horse.accReward}</InfoText>
            </HorseInfoRow>
          </div>
        </div>
      </HorseInfoSection>
    </Box>
  );
}
