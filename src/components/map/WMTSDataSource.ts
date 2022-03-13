import { CopyrightInfo, MapView, Tile, } from "@here/harp-mapview";
import { WebTileDataProvider, WebTileDataSource, WebTileDataSourceOptions } from "@here/harp-webtile-datasource";
import * as THREE from 'three'
import { WMTSProvider } from "./WMTSProvider";
import { webMercatorTilingScheme, TileKey, TilingScheme } from '@here/harp-geoutils'

export interface WMTSDataSourceOptions extends WebTileDataSourceOptions {
    url: string
    layer: string
    style: string
    service: "wmts",
    version?: string
    format?: "image/jpeg"|"image/png",
    tileMatrixSet: string
    tileMatrixLabels?: string[]
    tilingScheme?: TilingScheme
    rectangle?: any
}
export class WMTSDataSource extends WebTileDataSource {
    constructor(protected readonly m_options: WMTSDataSourceOptions) {
        super({
            ...m_options,
            minDataLevel: 1,
            maxDataLevel: 20,
            dataProvider: new WMTSProvider(m_options),
        })
    }
}