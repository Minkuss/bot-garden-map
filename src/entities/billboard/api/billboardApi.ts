import { baseApi } from 'src/shared/api/baseApi';
import { BillboardMarkerDto } from 'src/entities/billboard/model/billboardMarkerDto';
import { BillboardDetailDto } from 'src/entities/billboard/model/billboardDetailDto';

export const billboardApi = {
    async getBillboardsCoords(): Promise<BillboardMarkerDto[]> {
        const response = await baseApi.get('/billboards/coordinates');
        return response.data;
    },
    async getBillboardInfo(params: { id: string, side: string }): Promise<BillboardDetailDto> {
        const response = await baseApi.get(`/billboards/${params.id}`, {
            params: {
                billboard_side: params.side,
            },
        });
        return response.data;
    },
};
