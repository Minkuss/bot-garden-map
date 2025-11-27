import { billboardApi, BillboardDetailDto } from 'src/entities/billboard';
import { imagesApi } from 'src/shared/api/images-service';

export interface ModifiedCartItem extends BillboardDetailDto {
    start_date: string;
    end_date: string;
}

export const getModifiedBillboardWithDates = async(id: string, side: string, start: string, end: string) => {
    const billboard = await billboardApi.getBillboardInfo({
        id: id,
        side,
    });
    const billboardImages = await imagesApi.getBillboardImages({
        id: id,
        side: billboard.side,
    });

    const baseUrl = import.meta.env.VITE_API_URL || '';
    const imagePath = billboardImages.images[0].file_path;

    billboard.image_url = imagePath.startsWith('http')
        ? imagePath
        : `${baseUrl}${imagePath}`;

    const modifiedBillboard: ModifiedCartItem = {
        ...billboard,
        start_date: start,
        end_date: end,
    };

    return modifiedBillboard;
};

export const getModifiedBillboardInfo: (id: string, side: string) => Promise<BillboardDetailDto> = async(id: string, side: string) => {
    const billboard = await billboardApi.getBillboardInfo({
        id: id,
        side,
    });
    const billboardImages = await imagesApi.getBillboardImages({
        id: id,
        side: billboard.side,
    });

    const baseUrl = import.meta.env.VITE_API_URL || '';
    const imagePath = billboardImages.images[0].file_path;

    billboard.image_url = imagePath.startsWith('http')
        ? imagePath
        : `${baseUrl}${imagePath}`;

    return billboard;
};
