export interface IUploadImage {
  file: FormData;
  id: number;
}

interface IImages {
  image_id: number;
  product?: number;
  image_title: string;
  size: number;
}

export interface IProductImages extends IImages {
  original_title: string;
}

export interface IShotImagesInfo
  extends Pick<IProductImages, "image_id" | "image_title"> {}
