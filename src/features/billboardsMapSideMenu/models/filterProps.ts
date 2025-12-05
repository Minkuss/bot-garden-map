export interface FilterProps<TValue> {
    onChangeFilters: (filters: TValue[]) => void;
    value: TValue[];
}
