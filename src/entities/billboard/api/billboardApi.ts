import { baseApi } from 'src/shared/api/baseApi';
import { BillboardDetailDto } from 'src/entities/billboard/model/billboardDetailDto';
import { BillboardsMap } from 'src/entities/billboard/model/billboardsMap';

export const billboardApi = {
    async getBillboardsCoords(): Promise<BillboardsMap> {
        const response = await baseApi.get('/bitrix/billboards/coordinates');
        return response.data;
    },
    async getBillboardInfo(params: { id: string, side: string }): Promise<BillboardDetailDto> {
        const response = await baseApi.get(`/bitrix/billboards/${params.id}/${params.side}`);
        return response.data;
    },
};
