import React, { FC, useEffect, useState } from "react";

import styles from "components/ui/slider/slider.module.scss";

import { apiUrls } from "lib/enums/api-urls";

import Arrow from "assets/icon/general/arrow";
import defaultImg from "assets/images/goods/grey_square.jpg";
import { IProductImages } from "lib/interfaces/products/upload-image";

interface Props {
  images: IProductImages[];
  deleteHandler: (image_id: number) => void;
  onDelete?: boolean;
}

const Slider: FC<Props> = (props) => {
  const { images, deleteHandler, onDelete } = props;

  const START_SHIFT = 0;
  const SHIFT = 25;

  const [imgSerialNr, setIdeaSerialNr] = useState(images.length ? 1 : 0);
  const [elementShift, setElementShift] = useState(START_SHIFT);

  useEffect(() => {
    if (imgSerialNr > images.length || images.length === 1) {
      setIdeaSerialNr(1);
      setElementShift(START_SHIFT);
    }
  }, [images]);

  const onNextIdeaHandler = () => {
    if (images.length === 0 || imgSerialNr >= images.length) {
      setIdeaSerialNr(1);
      setElementShift(START_SHIFT);
      return;
    }
    setIdeaSerialNr((prev) => prev + 1);
    setElementShift((prev) => prev - SHIFT);
  };

  const onPrevIdeaHandler = () => {
    if (images.length === 0) {
      setIdeaSerialNr(1);
      setElementShift(START_SHIFT);
      return;
    }
    if (images.length > 0 && imgSerialNr - 1 === 0) {
      setIdeaSerialNr(images.length);
      setElementShift((images.length - 1) * -SHIFT);
      return;
    }
    setIdeaSerialNr((prev) => prev - 1);
    setElementShift((prev) => prev + SHIFT);
  };

  // const [prevImage, setPrevImages] = useState()
  // useEffect(() => {
  //   setPrevImages(!images.length && !isLoading
  //     ? defaultImg
  //     : images[imgSerialNr - 1]
  //       ?
  //       : defaultImg)
  // }, [images])

  const shiftingSlider =
    elementShift > -76 && elementShift < 1 ? 0 : elementShift + 3 * SHIFT;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.previewImgContainer}>
          {onDelete && images.length > 0 && (
            <button
              onClick={() => deleteHandler(images[imgSerialNr - 1].image_id)}
              className={styles.deleteImg}
            >
              X
            </button>
          )}
          {images.length ? (
            <img
              src={`${apiUrls.BASE_Image_URL}${
                images[imgSerialNr - 1]?.image_title
              }`}
              alt="product"
              className={styles.previewImages}
            />
          ) : (
            <img
              src={defaultImg}
              alt="product"
              className={styles.previewImages}
            />
          )}
        </div>
        <div className={styles.sliderContainer}>
          <button className={styles.btnPver} onClick={onPrevIdeaHandler}>
            <Arrow />
          </button>
          <div className={styles.slider}>
            <div
              style={{ marginLeft: `calc(${shiftingSlider}% )` }}
              className={styles.slideWrap}
            >
              {images.length > 0 && imgSerialNr > 0 ? (
                images.map((item, index) => (
                  <div
                    className={
                      index === imgSerialNr - 1 ? styles.active : undefined
                    }
                    key={index}
                  >
                    <img
                      src={`${apiUrls.BASE_Image_URL}${item.image_title}`}
                      alt="product"
                    />
                  </div>
                ))
              ) : (
                <div>
                  <img src={defaultImg} alt="product" />
                </div>
              )}
            </div>
          </div>
          <button className={styles.btnNext} onClick={onNextIdeaHandler}>
            <Arrow />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
