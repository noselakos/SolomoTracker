export interface IGeolocationRecord {
    [key:string]: any;
    geolocationId: number;
    ip: string;
    type: string;
    continentCode: string;
    continentName: string;
    countryCode: string;
    countryName: string;
    regionCode: string;
    regionName: string;
    city: string;
    zip: string;
    latitude: number;
    longitude: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof IGeolocationRecord;
    label: string;
    numeric: boolean;
}

export interface IGeolocationState {
    geolocationData: IGeolocationRecord[];
    geolocationSearchInput: string;
    isProcessing: boolean;
}