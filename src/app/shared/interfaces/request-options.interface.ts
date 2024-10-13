import { HttpHeaders, HttpParams } from '@angular/common/http';

/** Request opciókat definiáló interface. */
export interface IRequestOptions {
  /** A request Http fejlécei. */
  headers?: HttpHeaders;

  /** Megmondja, hogy az eredmény Observable-be mi kerüljön. */
  observe?: 'body';

  /** A request Http paraméterei. */
  params?: HttpParams;

  /** Ha igaz, a request jelenti a jelenlegi állapotát. */
  reportProgress?: boolean;

  /**
   * A válasz típusa. Ha a válasz egyszerű szöveg, akkor 'string' as 'json'-ként kell megadni,
   * ellenkező esetben hibára fut.
   */
  responseType?: 'json';

  /** A 'withCredentials' Http header. */
  withCredentials?: boolean;

  /** A request tartalma. */
  body?: object;
}
