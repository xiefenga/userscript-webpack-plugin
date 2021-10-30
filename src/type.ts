export interface UserScriptMetaData {
  name: string
  namespace: string
  version: string
  author: string
  description: string
  match: string
  require: string[]
  grant: Permission[]
  connect: string
  updateURL: string
  'run-at': RunMoment
}

// Application Programming Interface

export type Permission =
  | 'unsafeWindow'
  | 'Subresource Integrity'
  | 'GM_addStyle'
  | 'GM_addElement'
  | 'GM_addElement'
  | 'GM_deleteValue'
  | 'GM_listValues'
  | 'GM_addValueChangeListener'
  | 'GM_removeValueChangeListener'
  | 'GM_setValue'
  | 'GM_getValue'
  | 'GM_log'
  | 'GM_getResourceText'
  | 'GM_getResourceURL'
  | 'GM_registerMenuCommand'
  | 'GM_unregisterMenuCommand'
  | 'GM_openInTab'
  | 'GM_xmlhttpRequest'
  | 'GM_download'
  | 'GM_getTab'
  | 'GM_saveTab'
  | 'GM_getTabs'
  | 'GM_notification'
  | 'GM_setClipboard'
  | 'GM_info'

// run script time

export type RunMoment =
  | 'document-start'
  | 'document-body'
  | 'document-end'
  | 'document-idle'
  | 'context-menu'

// @name
// @namespace
// @version
// @author
// @description
// @homepage, @homepageURL, @website and @source
// @icon, @iconURL and @defaulticon
// @icon64 and @icon64URL
// @updateURL
// @downloadURL
// @supportURL
// @include
// @match
// @exclude
// @require
// @resource
// @connect
// @run-at
// @grant
// @antifeature
// @noframes
// @unwrap
// @nocompat
