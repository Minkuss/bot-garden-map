import { baseApi } from 'src/shared/api/baseApi';
import { BookingCreateParams, BookingDetailDto } from 'src/entities/cart';

export const cartApi = {
    async createBooking(booking: BookingCreateParams): Promise<BookingDetailDto> {
        const response = await baseApi.post('/billboards/coordinates', booking);
        return response.data;
    },
};
