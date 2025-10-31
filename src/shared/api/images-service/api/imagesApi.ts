import { baseApi } from 'src/shared/api/baseApi';
import { ImagesListDto } from 'src/shared/api/images-service/model/imagesListDto';

export const imagesApi = {
    async getBillboardImages(params: { id: string, side?: string }): Promise<ImagesListDto> {
        const response = await baseApi.get(`/api/v1/images/billboard/${params.id}`, {
            params: {
                side: params.side,
            },
        });
        return response.data;
    },
};
