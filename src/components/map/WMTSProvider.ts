import { CopyrightInfo, MapView, RequestHeaders, Tile } from "@here/harp-mapview";
import { WebTileDataProvider, WebTileDataSource } from "@here/harp-webtile-datasource";
import * as THREE from 'three'
import { TextureLoader } from "three";
import { WMTSDataSourceOptions } from "./WMTSDataSource";
const textureLoader = new TextureLoader();
export class WMTSProvider implements WebTileDataProvider {
    constructor(private readonly m_options: WMTSDataSourceOptions) {

    }
    getTexture(tile: Tile, abortSignal?: AbortSignal): Promise<[THREE.Texture | undefined, CopyrightInfo[]] | undefined> {
        const column = tile.tileKey.column;
        const row = tile.tileKey.row;
        const level = tile.tileKey.level;
        const quadKey = tile.tileKey.toQuadKey();
        const server = parseInt(quadKey[quadKey.length - 1], 10) + 1;
        const url =
            `${this.m_options.url}?${this.getImageRequestParams()}`

        return await this.getRequestHeaders().then(headers => {
            return Promise.all([
                TextureLoader.load(url, headers, abortSignal),
                this.getTileCopyright(tile, headers, abortSignal)
            ]);
        });
    }
    private getImageRequestParams(): string {
        const requestParams: string[] = [
            "request=GetTile",
            "service=WMTS"
        ]
        if (this.m_options.layer !== undefined) {
            requestParams.push(`layer=${this.m_options.layer}`);
        }
        if (this.m_options.style !== undefined) {
            requestParams.push(`style=${this.m_options.style}`);
        }
        if (this.m_options.version !== undefined) {
            requestParams.push(`version=${this.m_options.version}`);
        }
        if (this.m_options.format !== undefined) {
            requestParams.push(`format=${this.m_options.format}`);
        }
        if (this.m_options.tileMatrixSet !== undefined) {
            requestParams.push(`tileMatrixSet=${this.m_options.tileMatrixSet}`);
        }
        if (requestParams.length > 0) {
            return `${requestParams.join("&")}`;
        }
        return "";
    }
}