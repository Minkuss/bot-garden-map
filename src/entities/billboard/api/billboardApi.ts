import { baseApi } from 'src/shared/api/baseApi';
import { BillboardDetailDto } from 'src/entities/billboard/model/billboardDetailDto';
import { BillboardsMap } from 'src/entities/billboard/model/billboardsMap';
import { MapFilterValues } from 'src/features/billboardsMapSideMenu';

export const billboardApi = {
    async getBillboardsCoords(filters?: MapFilterValues): Promise<BillboardsMap> {
        const response = await baseApi.get('/bitrix/billboards/coordinates', {
            params: filters,
        });
        return response.data;
    },
    async getBillboardInfo(params: { id: string, side: string }): Promise<BillboardDetailDto> {
        const response = await baseApi.get(`/bitrix/billboards/${params.id}/${params.side}`);
        return response.data;
    },
};
