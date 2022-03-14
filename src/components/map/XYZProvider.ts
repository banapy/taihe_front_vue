import { WebTileDataProvider } from "@here/harp-webtile-datasource";
import { CopyrightInfo, RequestHeaders, TextureLoader, Tile, UrlCopyrightProvider } from "@here/harp-mapview";
import { APIFormat } from "@here/harp-vectortile-datasource";
import { TileKey } from "@here/harp.gl";
const textureLoader = new TextureLoader();

export interface XYXProviderParamters {
    baseUrl: string
    parameter?: {
        [key: string]: string
    },
    urlTransform?: (url: string, tileKey: { row: number, column: number, level: number }) => string
}
export function getParams(obj?: { [key: string]: string }) {
    if (!obj) return ""
    let params = [];
    for (let key in obj) {
        params.push(`${key}=${obj[key]}`);
    }
    return params.join("&");
}
export class XYZProvider implements WebTileDataProvider {
    constructor(private readonly m_options: XYXProviderParamters) {
    }
    async getTexture(tile: Tile, abortSignal?: AbortSignal): Promise<[THREE.Texture | undefined, CopyrightInfo[]] | undefined> {
        const column = tile.tileKey.column;
        const row = tile.tileKey.row;
        const level = tile.tileKey.level;
        const params = getParams(this.m_options.parameter);
        let url = `${this.m_options.baseUrl}/${level}/${column}/${row}.png?${params}`;
        if (this.m_options.urlTransform) {
            url = this.m_options.urlTransform(url, { row, column, level })
        }
        return Promise.all([textureLoader.load(url, {}, abortSignal), undefined]);
    }
}