import { UserScriptMetaData } from './type'
import { generateUserScript } from './util'
import { RawSource } from 'webpack-sources'
import { Compiler, ModuleFilenameHelpers } from 'webpack'

export * from './type'

export interface PluginOptions {
  metadata: Partial<UserScriptMetaData>
  padding?: number
  rules?: RegExp | string
}

export default class UserScriptPlugin {
  public static PLUGIN_NAME: string = 'UserScriptPlugin'

  private metadata: Partial<UserScriptMetaData>

  private padding: number

  private rules: { test: RegExp | string }

  public constructor(options: PluginOptions) {
    if (!options?.metadata) {
      throw new TypeError('options must be a object with metadata prop')
    }
    this.metadata = options.metadata
    this.padding = options.padding ?? 5
    this.rules = { test: options.rules ?? /.+/ }
  }

  public apply(compiler: Compiler): void {
    const { PLUGIN_NAME } = UserScriptPlugin
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      // 使用 processAssets hook 会影响 sourceMap 文件的生成
      compilation.hooks.afterProcessAssets.tap(PLUGIN_NAME, (assets) => {
        Object.entries(assets).forEach(([filename, source]) => {
          if (ModuleFilenameHelpers.matchObject(this.rules, filename)) {
            let content = source.source()
            if (content instanceof Buffer) {
              content = content.toString('utf-8')
            }
            // @ts-ignore
            assets[filename] = new RawSource(
              `${generateUserScript(this.metadata, this.padding)}\n${content}`
            )
          }
        })
      })
    })
  }
}
