export interface IUploadImage {
  file: FormData;
  id: number;
}

interface IImages {
  image_id: number;
  image_title: string;
  product?: number;
  size: number;
}

export interface IProductImages extends IImages {
  original_title: string;
}

export interface IShotImagesInfo
  extends Pick<IProductImages, "image_id" | "image_title"> {}
