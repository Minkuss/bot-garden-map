import { billboardApi, BillboardDetailDto } from 'src/entities/billboard';
import { imagesApi } from 'src/shared/api/images-service';

export interface ModifiedCartItem extends BillboardDetailDto {
    start_date: string;
    end_date: string;
}

export const getModifiedBillboard = async(id: string, side: string, start: string, end: string) => {
    const billboard = await billboardApi.getBillboardInfo({
        id: id,
        side,
    });
    const billboardImages = await imagesApi.getBillboardImages({
        id: id,
        side: billboard.side,
    });

    billboard.image_url = import.meta.env.VITE_REACT_APP_API_URL + billboardImages.images[0].file_path;

    const modifiedBillboard: ModifiedCartItem = {
        ...billboard,
        start_date: start,
        end_date: end,
    };

    return modifiedBillboard;
};
