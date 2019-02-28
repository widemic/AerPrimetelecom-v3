import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  uri = 'http://aer.primetelecom.ro:4000/waspdata';

  constructor(private http: HttpClient) { }

  getSensorData() {
    return this.http.get(`${this.uri}`);
  }
  getLastLimitSensorData(limit: number) {
    return this.http.get(`${this.uri}/limit/${limit}`);
  }
  getLastSensorData() {
    return this.http.get(`${this.uri}/last/`);
  }
  getNodeSensorData(node: string) {
    return this.http.get(`${this.uri}/node/${node}`);
  }
  getNodeLastSensorData(node: string) {
    return this.http.get(`${this.uri}/node/${node}/last`);
  }
  getNodeLastLimitSensorData(node: string, limit: number) {
    return this.http.get(`${this.uri}/node/${node}/limit/${limit}`);
  }
  getLocation() {
    return this.http.get(`${this.uri}/location`);
  }
  postNodeLocation(node: string, lat: number, long: number) {
    return this.http.get(`${this.uri}/location/add?node=${node}&lattitude=${lat}&longitute=${long}`);
  }

}
