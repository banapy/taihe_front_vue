import { WebTileDataProvider } from "@here/harp-webtile-datasource";
import { CopyrightInfo, RequestHeaders, TextureLoader, Tile, UrlCopyrightProvider } from "@here/harp-mapview";
import { getParams, XYXProviderParamters } from "./XYZProvider";
const textureLoader = new TextureLoader();

export interface WMTSProviderParameters extends XYXProviderParamters {
    parameter?: {
        format?: "image/png" | "png" | "tiles";
        layer?: string;
        maximumLevel?: string;
        minimumLevel?: string;
        service: "wmts" | "wms";
        tk?: string;
    };
}
//http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=${tiandituTk}
export class WMTSProvider implements WebTileDataProvider {
    private readonly m_baseUrl: string;
    constructor(private readonly m_options: WMTSProviderParameters) {
        this.m_baseUrl = m_options.baseUrl;
    }
    async getTexture(tile: Tile, abortSignal?: AbortSignal): Promise<[THREE.Texture | undefined, CopyrightInfo[]] | undefined> {
        const column = tile.tileKey.column;
        const row = tile.tileKey.row;
        const level = tile.tileKey.level;
        const params = getParams(this.m_options.parameter)
        const url = `${this.m_baseUrl}?${params}&TILECOL=${column}&TILEROW=${row}&TILEMATRIX=${level}`;
        return Promise.all([textureLoader.load(url, {}, abortSignal), undefined]);
    }
}
