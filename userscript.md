## 功能注释

- `name`：脚本名称
- `namespace`：命名空间，用来区分相同名称的脚本，一般写成作者名字或者网址即可
- `version`：脚本版本，脚本更新时会读取该字段
- `description`：描述脚本的功能
- `author`：作者
- `match`：脚本匹配的网址，例如：`http://www.baidu.com/*`，具体可以查看[谷歌开发者文档](https://developer.chrome.com/docs/extensions/mv3/match_patterns/)
- `grant`：指定脚本运行所需权限，如果脚本拥有相应的权限，就可以调用油猴扩展提供的 API
  - 如果设置为 `none`，则表示脚本直接运行在网页的环境中，无法使用大部分油猴扩展的 API
  - 如果不指定的话，油猴会默认添加几个最常用的 API
- `require`：使用该指令在运行脚本之前**先加载其他库**，例如脚本依赖 jQuery 的话可以先加载 jQuery
- `connect`：使用 `GM_xmlhttpRequest` 请求数据时，需要使用该字段指定允许请求的域名，支持域名、子域名、IP地址以及*通配符
- `updateURL`：脚本更新网址，当油猴扩展检查更新的时候，会尝试从这个网址下载脚本，然后比对版本号确认是否更新

## 脚本权限

- unsafeWindow
- Subresource Integrity
- GM_addStyle(css)
- GM_addElement(tag_name, attributes), GM_addElement(parent_node, tag_name, attributes)
- GM_deleteValue(name)
- GM_listValues()
- GM_addValueChangeListener(name, function(name, old_value, new_value, remote) {})
- GM_removeValueChangeListener(listener_id)
- GM_setValue(name, value)
- GM_getValue(name, defaultValue)
- GM_log(message)
- GM_getResourceText(name)
- GM_getResourceURL(name)
- GM_registerMenuCommand(name, fn, accessKey)
- GM_unregisterMenuCommand(menuCmdId)
- GM_openInTab(url, options), GM_openInTab(url, loadInBackground)
- GM_xmlhttpRequest(details)
- GM_download(details), GM_download(url, name)
- GM_getTab(callback)
- GM_saveTab(tab)
- GM_getTabs(callback)
- GM_notification(details, ondone), GM_notification(text, title, image, onclick)
- GM_setClipboard(data, info)
- GM_info