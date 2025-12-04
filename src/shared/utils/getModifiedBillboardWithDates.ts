import { billboardApi, BillboardDetailDto } from 'src/entities/billboard';

export interface ModifiedCartItem extends BillboardDetailDto {
    start_date: string;
    end_date: string;
}

export const getModifiedBillboardWithDates = async(id: string, side: string, start: string, end: string) => {
    const billboard = await billboardApi.getBillboardInfo({
        id: id,
        side,
    });

    const modifiedBillboard: ModifiedCartItem = {
        ...billboard,
        start_date: start,
        end_date: end,
    };

    return modifiedBillboard;
};

export const getModifiedBillboardInfo: (id: string, side: string) => Promise<BillboardDetailDto> = async(id: string, side: string) =>
    await billboardApi.getBillboardInfo({
        id: id,
        side,
    });
