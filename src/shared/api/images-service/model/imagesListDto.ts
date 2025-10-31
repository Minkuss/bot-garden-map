import { ImageResponseDto } from 'src/shared/api/images-service/model/imageResponseDto';

export interface ImagesListDto {
    images: ImageResponseDto[];
    total: number;
}
