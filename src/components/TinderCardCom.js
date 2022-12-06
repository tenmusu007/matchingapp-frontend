import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import style from 'styled-components';
import '../styles/style.css';
import ImageListItem from '@mui/material/ImageListItem';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pill from './Pill';
import Stack from '@mui/material/Stack';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import FloatingButton from './FloatingButton';
import axios from 'axios';
import noMoreSvg from '../image/userImages/Search.svg';

const CardDiv = style.div`
  display: flex;
  justify-content: center;
`;

const ImgDiv = style.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 345px;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TinderCardCom = ({ usersData }) => {
  const [expanded, setExpanded] = useState(false);
  const [userNum, setUserNum] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const swiped = (direction, userId) => {
    switch (direction) {
      case 'right':
        const sendInfo = { to: userId };
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/like/sendlike`,
          sendInfo,
          {
            withCredentials: true,
          }
        );
        setUserNum(userNum + 1);

        return;

      case 'left':
        setUserNum(userNum + 1);
        return;

      default:
        break;
    }
  };

  if (userNum === usersData.length) {
    console.log('sssss');
  }

  return (
    <>
      {userNum === usersData.length ? (
        <>
          <CardDiv>
            <Card
              sx={{
                maxWidth: 345,
                minHeight: expanded && 700,
                mx: 'auto',
                my: '1.3rem',
              }}
            >
              <>
                <ImageListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ImgDiv
                    style={{
                      backgroundImage: `url(${noMoreSvg})`,
                    }}
                    bg={noMoreSvg}
                  >
                    <ImageListItemBar title={'Oops.. No more users!'} />
                  </ImgDiv>
                </ImageListItem>

                <CardContent
                  sx={{
                    minWidth: 345,
                    mx: 'auto',
                  }}
                ></CardContent>
              </>
            </Card>
          </CardDiv>
        </>
      ) : (
        <>
          {usersData?.map((person) => {
            return (
              <CardDiv key={person._id}>
                <TinderCard
                  className='swipe'
                  onSwipe={(dir) => swiped(dir, person._id)}
                  preventSwipe={['up', 'down']}
                  swipeRequirementType={'position'}
                  swipeThreshold={180}
                >
                  <Card
                    sx={{
                      maxWidth: 345,
                      minHeight: expanded && 700,
                      mx: 'auto',
                      my: '1.3rem',
                    }}
                  >
                    <>
                      <ImageListItem
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <ImgDiv
                          style={{
                            backgroundImage: `url(${person?.image})`,
                          }}
                          bg={person?.image}
                        >
                          <ImageListItemBar
                            title={`${person?.username} ${person?.age} `}
                            subtitle={person?.course}
                          />
                        </ImgDiv>
                      </ImageListItem>

                      <CardContent
                        sx={{
                          minWidth: 345,
                          mx: 'auto',
                        }}
                      >
                        <Collapse in={expanded} timeout='auto' unmountOnExit>
                          <Typography variant='h1'>About me</Typography>
                          <Typography
                            variant='body1'
                            sx={{
                              mx: 'auto',
                              py: 1,
                            }}
                          >
                            {person?.about}
                          </Typography>
                          <Typography variant='h1'>My Interests</Typography>
                          <Stack
                            direction='row'
                            spacing={1}
                            flexWrap={'wrap'}
                            sx={{ mx: 'auto', py: 1 }}
                          >
                            {person?.interests?.map((interest, index) => {
                              return (
                                <Pill text={interest.hobby} key={interest.id} />
                              );
                            })}
                          </Stack>
                        </Collapse>
                      </CardContent>
                    </>
                  </Card>
                </TinderCard>
              </CardDiv>
            );
          })}
          <Box
            sx={{
              '& > :not(style)': {
                top: 363,
                left: { xs: '70%', sm: '80%' },
                background: 'red',
              },
            }}
          >
            <FloatingButton color='secondary' onClick={handleExpandClick} />
          </Box>
        </>
      )}
    </>
  );
};

export default TinderCardCom;
