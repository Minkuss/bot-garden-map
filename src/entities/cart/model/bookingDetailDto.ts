export interface BookingDetailDto {
    billboard_id: string;
    billboard_side: string;
    client_name: string;
    client_phone: string;
    start_date: string;
    end_date: string;
    total_price: number;
    notes: string | null;
    id: string;
    created_at: string;
}
