import React, {FC, useEffect, useState, Dispatch, SetStateAction} from "react";

import styles from "components/ui/slider/slider.module.scss";

import Arrow from "assets/icon/general/arrow";
import defaultImg from "assets/images/goods/grey_square.jpg";

interface Props {
  images: { preview: string, file: File }[];
  deleteUploadFileHandler: Dispatch<SetStateAction<File[]>>;
  deletePreviewPhotoHandler: Dispatch<SetStateAction<{ preview: string, file: File }[]>>;
  onDelete?: boolean
}

const Slider: FC<Props> = (props) => {

  const {images, deleteUploadFileHandler, deletePreviewPhotoHandler, onDelete} = props
  const imagesLength = images.length
  const START_SHIFT = 0;
  const SHIFT = 25;
  const initStateIdeaSerialNr = images.length ? 1 : 0

  const [imgSerialNr, setIdeaSerialNr] = useState(initStateIdeaSerialNr)
  const [elementShift, setElementShift] = useState(START_SHIFT)

  useEffect(() => {
    if (imgSerialNr > imagesLength || imagesLength === 1) {
      setIdeaSerialNr(1)
      setElementShift(START_SHIFT)
    }
  }, [imagesLength])

  const onNextIdeaHandler = () => {
    if (imagesLength === 0 || imgSerialNr >= imagesLength) {
      setIdeaSerialNr(1)
      setElementShift(START_SHIFT)
      return
    }
    setIdeaSerialNr(prev => prev + 1)
    setElementShift(prev => prev - SHIFT)
  }

  const onPrevIdeaHandler = () => {
    if (imagesLength === 0) {
      setIdeaSerialNr(1)
      setElementShift(START_SHIFT)
      return;
    }
    if (imagesLength > 0 && imgSerialNr - 1 === 0) {
      setIdeaSerialNr(imagesLength)
      setElementShift((imagesLength - 1) * -SHIFT)
      return;
    }

    setIdeaSerialNr(prev => prev - 1)
    setElementShift(prev => prev + SHIFT
    )
  }

  const prevImage = !images.length ? defaultImg : images[imgSerialNr - 1] ? images[imgSerialNr - 1]?.preview : defaultImg;

  const deleteImage = () => {

    deleteUploadFileHandler(prev =>
      prev.filter(item => item.size !== images[imgSerialNr - 1].file.size
        && item.name !== images[imgSerialNr - 1].file.name)
    )
    deletePreviewPhotoHandler(prev =>
      prev.filter(item => item.file.size !== images[imgSerialNr - 1].file.size
        && item.file.name !== images[imgSerialNr - 1].file.name))
  }
  const shiftingSlider = elementShift > -76 && elementShift < 1 ? 0 : elementShift + (3 * SHIFT)


  console.log("imgSerialNr:", imgSerialNr,
    "elementShift:", elementShift, "shiftingSlider:", shiftingSlider)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.previewImgContainer}>
          {
            onDelete && images.length > 0 &&
						<button onClick={deleteImage}
										className={styles.deleteImg}
						>
							X
						</button>
          }
          <img src={prevImage}
               alt="product"
               className={styles.previewImages}/>
        </div>
        <div className={styles.sliderContainer}>
          <button className={styles.btnPver}
                  onClick={onPrevIdeaHandler}>
            <Arrow/>
          </button>
          <div className={styles.slider}>
            <div style={{marginLeft: `calc(${shiftingSlider}% )`}}
                 className={styles.slideWrap}>
              {images.length
                ? images.map((item, index) => (
                  <div className={index === imgSerialNr - 1 && styles.active}>
                    <img src={item.preview} alt="product"/>
                  </div>
                ))
                : <div>
                  <img src={defaultImg} alt="product"/>
                </div>
              }
            </div>
          </div>
          <button className={styles.btnNext}
                  onClick={onNextIdeaHandler}>
            <Arrow/>
          </button>
        </div>
      </div>
    </>
  )
    ;
};

export default Slider;