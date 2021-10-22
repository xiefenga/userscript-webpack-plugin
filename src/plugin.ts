import { UserScriptMetaData } from './type'
import { generateUserScript } from './util'
import { ConcatSource, Source } from 'webpack-sources'
import { Compiler, ModuleFilenameHelpers, sources } from 'webpack'

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
    compiler.hooks.compilation.tap(UserScriptPlugin.PLUGIN_NAME, compilation => {
      compilation.hooks.optimizeChunkAssets.tap(UserScriptPlugin.PLUGIN_NAME, chunks => {
        for (const chunk of chunks) {
          if (ModuleFilenameHelpers.matchObject(this.rules, chunk.name)) {
            for (const filename of chunk.files) {
              compilation.updateAsset(filename, old => new ConcatSource(generateUserScript(this.metadata, this.padding), '\n', old as Source) as sources.Source)
            }
          }
        }
      })
    })
  }
}

