interface BillboardInCart {
    billboard_id: string;
    side: string;
    start_date: string;
    end_date: string;
}

export interface BookingCreateParams {
    billboards: BillboardInCart[];
    first_name: string;
    last_name: string;
    middle_name: string;
    organization: string;
    phone: string;
    email: string;
}
