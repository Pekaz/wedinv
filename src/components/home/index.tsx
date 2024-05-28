import { Copy, EmojiLookLeft, EmojiLookRight, PinAlt } from "iconoir-react";
import Image from "next/image";
import React, { Fragment, useCallback, useRef, useState } from "react";
import QuickPinchZoom, {
  make3dTransformValue,
  UpdateAction,
} from "react-quick-pinch-zoom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled, { css } from "styled-components";
import Modal from "@/components/common/Modal";
import { Content } from "@/content";
import coverPic from "@/public/photos/cover_min.png";
import mapPic from "@/public/photos/map.png";
import { Main, SectionHeader, SectionHr, TextSansStyle } from "./styles";
import FloatModal from "../common/FloatModal";

const Header = styled.h1`
  display: inline-block;
  margin: 40px 0;

  font-size: 20px;
  font-weight: 500;
  line-height: 2.5;

  hr {
    width: 70%;
    margin: 0 auto;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

const CoverPicWrap = styled.div`
  position: relative;
  width: calc(100% - 40px);
  aspect-ratio: ${coverPic.width / coverPic.height};
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 30px;
  overflow: hidden;
  line-height: 0;
`;

const GreetingP = styled.p`
  white-space: pre;
  margin: 30px 0;
`;

const CallWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 40px 0;
  > * {
    margin: 0 15px;
  }
`;

const CallButtonWrap = styled.div<{ bgColor: string }>`
  ${TextSansStyle}
  font-size: 13px;

  svg {
    display: block;
    margin: 0 auto;
    margin-bottom: 4px;
    width: 60px;
    height: 60px;
    color: white;
    padding: 15px;
    border-radius: 30px;
    background-color: ${({ bgColor }) => bgColor};
  }
`;

type CallButtonProps = {
  icon: React.ReactNode;
  bgColor: string;
  label: string;
};

const CallButton = ({ icon, bgColor, label }: CallButtonProps) => (
  <>
    <CallButtonWrap bgColor={bgColor}>
      {icon}
      {label}
    </CallButtonWrap>
  </>
);

const PhotoGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;

  li {
    height: 200px;
    flex-grow: 1;
    margin: 4px;
  }

  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }
`;

const SliderWrap = styled.div<{ isZoomed: boolean }>`
  height: 100%;
  ${({ isZoomed }) =>
    isZoomed &&
    css`
      * {
        overflow: visible !important;
      }
    `}
  .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;

    ${({ isZoomed }) =>
      isZoomed &&
      css`
        &:not(.slick-active) {
          visibility: hidden;
        }
      `}

    height: auto;
    align-items: center;
    justify-content: center;
    div {
      outline: none;
    }
    img {
      width: 100%;
    }
  }
`;

type PinchPhotoProps = { src: string; onZoom: (isZoomed: boolean) => void };
const PinchPhoto = ({ src, onZoom }: PinchPhotoProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const pz = useRef<QuickPinchZoom>(null);
  const handleUpdate = useCallback(
    ({ x, y, scale }: UpdateAction) => {
      if (!imgRef.current) return;
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.setProperty("transform", value);
      onZoom(scale > 1);
    },
    [onZoom]
  );

  return (
    <QuickPinchZoom ref={pz} onUpdate={handleUpdate} draggableUnZoomed={false}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt="" loading="lazy" />
    </QuickPinchZoom>
  );
};

type PhotoGalleryProps = {
  photos: Content["photos"];
  initialSlide?: number;
  onClose: () => void;
};
const PhotoGallery = ({ photos, initialSlide, onClose }: PhotoGalleryProps) => {
  const [isZoomed, setZoomed] = useState(false);
  return (
    <SliderWrap isZoomed={isZoomed} onClick={onClose}>
      <Slider
        initialSlide={initialSlide || 0}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        dots={false}
      >
        {photos.map((p, i) => (
          <div key={i}>
            <PinchPhoto
              src={typeof p === "string" ? p : p.url}
              onZoom={setZoomed}
            />
          </div>
        ))}
      </Slider>
    </SliderWrap>
  );
};

const MapButton = styled.a`
  ${TextSansStyle}
  display: inline-block;
  padding: 8px 16px 8px 10px;
  border: 0;
  border-radius: 18px;
  margin: 0 10px;
  color: #666;
  font-size: 13px;
  text-decoration: none;
  background: #f3f3f3;
  line-height: 1.3;
  > svg {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: -4px 0;
    margin-right: 4px;
  }
`;

const GiveWrap = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 2;
`;

const CopyTextButton = styled.button`
  ${TextSansStyle}
  font-size: 13px;
  padding: 0;
  border: none;
  background: none;
  font-weight: 200;
  color: #489cff;

  svg {
    width: 20px;
    height: 20px;
    padding: 2px;
    color: #489cff;
    vertical-align: sub;
  }
`;
const CopyText = ({ text }: { text: string }) => {
  const handleCopyText = () => {
    const fallbackCopyClipboard = (value: string) => {
      const $text = document.createElement("textarea");
      document.body.appendChild($text);
      $text.value = value;
      $text.select();
      document.execCommand("copy");
      document.body.removeChild($text);
    };

    navigator.clipboard
      .writeText(text)
      .catch(() => fallbackCopyClipboard(text))
      .then(() => alert("계좌번호가 복사 되었습니다."));
  };
  return (
    <>
      {text}
      <CopyTextButton onClick={handleCopyText} aria-label="복사">
        <Copy />
        복사
      </CopyTextButton>
    </>
  );
};

const SendButton = styled.button<{ marginLeft?: string }>`
  ${TextSansStyle}
  width: 120px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  color: black;
  border: 1px solid gray;
  font-weight: 200;
  margin-left: ${({ marginLeft }) => marginLeft ?? "0px"};
`;

const SendModal = styled.div`
  padding: 20px;
  margin: 0px auto;
  background-color: white;
  width: 90%;
  border-radius: 10px;
  border: 1px solid black;
`;

const SendTextDiv = styled.div`
  padding: 10px;
`;

type HomeProps = { content: Content };

const Home = ({ content: c }: HomeProps) => {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [lastClickedGalleryItem, setLastClickedGalleryItem] =
    useState<number>();

  const handlePhotoClick = (i: number) => {
    setLastClickedGalleryItem(i);
    setShowGalleryModal(true);
  };
  const handleGalleryModalClose = () => setShowGalleryModal(false);

  const [showSendGroomModal, setShowSendGroomModal] = useState(false);
  const [showSendBrideModal, setShowSendBrideModal] = useState(false);
  const handleSendGroomModalClick = () => {
    setShowSendGroomModal(!showSendGroomModal);
  };
  const handleSendBrideModalClick = () => {
    setShowSendBrideModal(!showSendBrideModal);
  };
  const handleSendModalClose = () => {
    setShowSendGroomModal(false);
    setShowSendBrideModal(false);
  };

  return (
    <Main>
      <Header>
        {c.groomFullName}
        <hr />
        {c.brideFullName}
      </Header>
      <CoverPicWrap>
        <Image src={coverPic} fill priority={true} placeholder="blur" alt="" />
      </CoverPicWrap>
      <p>
        {c.datetime}
        <br />
        {c.venue.desc}
      </p>

      <SectionHr />

      <SectionHeader>{c.greeting.title}</SectionHeader>
      {c.greeting.content.map((p, i) => (
        <GreetingP key={i}>
          {p
            .split("\n")
            .map((l) => l.trim())
            .join("\n")}
        </GreetingP>
      ))}
      <CallWrap>
        <a href={c.groomContact}>
          <CallButton
            icon={<EmojiLookRight />}
            bgColor="#abdaab"
            label="신랑측에 연락하기"
          />
        </a>
        <a href={c.brideContact}>
          <CallButton
            icon={<EmojiLookLeft />}
            bgColor="#c2e0a3"
            label="신부측에 연락하기"
          />
        </a>
      </CallWrap>
      <SectionHr />
      <PhotoGrid>
        {c.photos.map((p, i) => (
          <li key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              role="button"
              src={typeof p === "string" ? p : p.url}
              onClick={() => handlePhotoClick(i)}
              loading="lazy"
              alt=""
              style={
                p.objectPosition ? { objectPosition: p.objectPosition } : {}
              }
            />
          </li>
        ))}
      </PhotoGrid>
      {showGalleryModal && (
        <Modal handleClose={handleGalleryModalClose}>
          <PhotoGallery
            photos={c.orgPhotos}
            initialSlide={lastClickedGalleryItem}
            onClose={handleGalleryModalClose}
          />
        </Modal>
      )}
      <SectionHr />
      <SectionHeader>오시는 길</SectionHeader>
      <Image src={mapPic} width={300} alt="" />
      <p>
        {c.venue.address} <br />
        {c.venue.address2}
        <br />
        {c.venue.desc}
      </p>
      <MapButton href={c.venue.kakaoMapUrl}>
        <PinAlt color="#1199EE" /> 카카오맵
      </MapButton>
      <MapButton href={c.venue.naverMapUrl}>
        <PinAlt color="#66BB66" /> 네이버지도
      </MapButton>
      <SectionHr />
      <SectionHeader>💸 마음 전하실 곳</SectionHeader>
      <GiveWrap>
        <p>
          <SendButton onClick={() => handleSendGroomModalClick()}>
            신랑측
          </SendButton>
          {showSendGroomModal && (
            <FloatModal handleClose={handleSendModalClose}>
              <SendModal>
                {c.groomGive.map((g) => (
                  <Fragment key={g.account}>
                    <SendTextDiv>
                      {g.name} <br />
                      <CopyText text={g.account} />
                    </SendTextDiv>
                  </Fragment>
                ))}
              </SendModal>
            </FloatModal>
          )}
          <SendButton
            marginLeft="10px"
            onClick={() => handleSendBrideModalClick()}
          >
            신부측
          </SendButton>
          {showSendBrideModal && (
            <FloatModal handleClose={handleSendModalClose}>
              <SendModal>
                {c.brideGive.map((g) => (
                  <Fragment key={g.account}>
                    <SendTextDiv>
                      {g.name} <br />
                      <CopyText text={g.account} />
                    </SendTextDiv>
                  </Fragment>
                ))}
              </SendModal>
            </FloatModal>
          )}
        </p>
      </GiveWrap>
      <SectionHr />
    </Main>
  );
};

export default Home;
