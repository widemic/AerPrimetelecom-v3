// SensorDataModel.ts

export interface SensorDataModel {
    id: number;
    _id: string;
    temp: number;
    node: string;
    messageTime: string;
    hum: number;
    press: number;
    O3: number;
    NO: number;
    NO2: number;
    CO: number;
    SO2: number;
    CO2: number;
    batt: number;
    lattitude: string;
    longitude: string;
}
