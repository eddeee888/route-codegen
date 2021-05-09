## Functions

<dl>
<dt><a href="#typescript-anchor plugin">typescript-anchor plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-anchor is a plugin for external routes
This will be used on routes marked as externals and the default behaviour is server-side routing</p></dd>
<dt><a href="#typescript-generate-url plugin">typescript-generate-url plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-generate-url is a general plugin
This is used to generate functions that are bound with route locations</p></dd>
<dt><a href="#typescript-next-js plugin">typescript-next-js plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-next-js is a plugin for internal routes
This will be used on routes marked as internals i.e. handled by next/router
and the default behaviour is client-side routing</p></dd>
<dt><a href="#typescript-pattern plugin">typescript-pattern plugin()</a> ⇒ <code>PatternTemplateFile</code></dt>
<dd><p>typescript-pattern is a pattern plugin for TypeScript
This is used to generate patterns and interfaces that
can be used by general plugins</p></dd>
<dt><a href="#typescript-react-router-5 plugin">typescript-react-router-5 plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-react-router-5 is a plugin for internal routes
This will be used on routes marked as internals i.e. handled by react-router
and the default behaviour is client-side routing</p></dd>
<dt><a href="#typescript-root-index plugin">typescript-root-index plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-root-index is a generated-files-processor plugin.
This is used to create a index file at the root to re-export
all generated constants and functions as one module.</p></dd>
<dt><a href="#typescript-route-config plugin">typescript-route-config plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-route-config is a generated-files-processor plugin.
This is used to create a Typescript version of the routeconfig
with internal and external relationships.
Internal and external component config can be used to further
hint callsites of route relationships.</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TypescriptAnchorPluginConfig">TypescriptAnchorPluginConfig</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#TypescriptNextJSPluginConfig">TypescriptNextJSPluginConfig</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#TypescriptReactRouter5PluginConfig">TypescriptReactRouter5PluginConfig</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#TypescriptRouteConfigPluginConfig">TypescriptRouteConfigPluginConfig</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="typescript-anchor plugin"></a>

## typescript-anchor plugin() ⇒ <code>Array.&lt;TemplateFile&gt;</code>
<p>typescript-anchor is a plugin for external routes
This will be used on routes marked as externals and the default behaviour is server-side routing</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;TemplateFile&gt;</code> - <p>Array of generated TemplateFile. This can be manipulated by the <code>generate</code> config</p>  

| Type |
| --- |
| [<code>TypescriptAnchorPluginConfig</code>](#TypescriptAnchorPluginConfig) | 

<a name="typescript-generate-url plugin"></a>

## typescript-generate-url plugin() ⇒ <code>Array.&lt;TemplateFile&gt;</code>
<p>typescript-generate-url is a general plugin
This is used to generate functions that are bound with route locations</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;TemplateFile&gt;</code> - <p>Array of with one generated TemplateFile.</p>  
<a name="typescript-next-js plugin"></a>

## typescript-next-js plugin() ⇒ <code>Array.&lt;TemplateFile&gt;</code>
<p>typescript-next-js is a plugin for internal routes
This will be used on routes marked as internals i.e. handled by next/router
and the default behaviour is client-side routing</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;TemplateFile&gt;</code> - <p>Array of generated TemplateFile. This can be manipulated by the <code>generate</code> config</p>  

| Type |
| --- |
| [<code>TypescriptNextJSPluginConfig</code>](#TypescriptNextJSPluginConfig) | 

<a name="typescript-pattern plugin"></a>

## typescript-pattern plugin() ⇒ <code>PatternTemplateFile</code>
<p>typescript-pattern is a pattern plugin for TypeScript
This is used to generate patterns and interfaces that
can be used by general plugins</p>

**Kind**: global function  
**Returns**: <code>PatternTemplateFile</code> - <p>PatternTemplateFile to be used by other plugins</p>  
<a name="typescript-react-router-5 plugin"></a>

## typescript-react-router-5 plugin() ⇒ <code>Array.&lt;TemplateFile&gt;</code>
<p>typescript-react-router-5 is a plugin for internal routes
This will be used on routes marked as internals i.e. handled by react-router
and the default behaviour is client-side routing</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;TemplateFile&gt;</code> - <p>Array of generated TemplateFile. This can be manipulated by the <code>generate</code> config</p>  

| Type |
| --- |
| [<code>TypescriptRouteConfigPluginConfig</code>](#TypescriptRouteConfigPluginConfig) | 

<a name="typescript-root-index plugin"></a>

## typescript-root-index plugin() ⇒ <code>Array.&lt;TemplateFile&gt;</code>
<p>typescript-root-index is a generated-files-processor plugin.
This is used to create a index file at the root to re-export
all generated constants and functions as one module.</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;TemplateFile&gt;</code> - <p>Array with one TemplateFile that is the index file</p>  
<a name="typescript-route-config plugin"></a>

## typescript-route-config plugin() ⇒ <code>Array.&lt;TemplateFile&gt;</code>
<p>typescript-route-config is a generated-files-processor plugin.
This is used to create a Typescript version of the routeconfig
with internal and external relationships.
Internal and external component config can be used to further
hint callsites of route relationships.</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;TemplateFile&gt;</code> - <p>Array of TemplateFile that can be generated</p>  

| Type |
| --- |
| [<code>TypescriptRouteConfigPluginConfig</code>](#TypescriptRouteConfigPluginConfig) | 

<a name="TypescriptAnchorPluginConfig"></a>

## TypescriptAnchorPluginConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| importCustomLink | <code>object</code> |  |
| importCustomLink.from | <code>string</code> | <p>Where the custom link can be imported from</p> |
| [importCustomLink.componentDefaultImport] | <code>boolean</code> | <p>Whether the custom link is a default export. Default is <code>false</code></p> |
| [importCustomLink.componentNamedImport] | <code>boolean</code> | <p>Whether the custom link is a named export. Default is <code>false</code></p> |
| importCustomLink.hrefProp | <code>string</code> | <p>What the custom href prop of the link component is to map href value to ( e.g. href, to, etc. )</p> |
| importCustomLink.propsNamedImport | <code>string</code> | <p>What the custom link prop import is. This is used to provide type safety</p> |
| generate | <code>object</code> |  |
| [generate.linkComponent] | <code>boolean</code> | <p>Whether a link component should be generated. Default is <code>false</code></p> |
| [generate.redirectComponent] | <code>boolean</code> | <p>Whether a redirect component should be generated. Requires @route-codegen/react. Default is <code>false</code></p> |
| [generate.useRedirect] | <code>boolean</code> | <p>Whether a useRedirect react hook should be generated. Default is <code>false</code></p> |
| [generate.useParams] | <code>boolean</code> | <p>Whether a useParams react hook should be generated. Default is <code>false</code></p> |

<a name="TypescriptNextJSPluginConfig"></a>

## TypescriptNextJSPluginConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| importCustomLink | <code>object</code> |  |
| importCustomLink.from | <code>string</code> | <p>Where the custom link can be imported from</p> |
| [importCustomLink.componentDefaultImport] | <code>boolean</code> | <p>Whether the custom link is a default export. Default is <code>false</code></p> |
| [importCustomLink.componentNamedImport] | <code>boolean</code> | <p>Whether the custom link is a named export. Default is <code>false</code></p> |
| importCustomLink.hrefProp | <code>string</code> | <p>What the custom href prop of the link component is to map href value to ( e.g. href, to, etc. )</p> |
| importCustomLink.propsNamedImport | <code>string</code> | <p>What the custom link prop import is. This is used to provide type safety</p> |
| generate | <code>object</code> |  |
| [generate.linkComponent] | <code>boolean</code> | <p>Whether a link component should be generated. Default is <code>false</code></p> |
| [generate.useRedirect] | <code>boolean</code> | <p>Whether a useRedirect react hook should be generated. Default is <code>false</code></p> |
| [generate.useParams] | <code>boolean</code> | <p>Whether a useParams react hook should be generated. Default is <code>false</code></p> |
| mode | <code>enum</code> | <p>&quot;strict&quot; or &quot;loose&quot;. Default is &quot;loose&quot;</p> |

<a name="TypescriptReactRouter5PluginConfig"></a>

## TypescriptReactRouter5PluginConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| importCustomLink | <code>object</code> |  |
| importCustomLink.from | <code>string</code> | <p>Where the custom link can be imported from</p> |
| [importCustomLink.componentDefaultImport] | <code>boolean</code> | <p>Whether the custom link is a default export. Default is <code>false</code></p> |
| [importCustomLink.componentNamedImport] | <code>boolean</code> | <p>Whether the custom link is a named export. Default is <code>false</code></p> |
| importCustomLink.hrefProp | <code>string</code> | <p>What the custom href prop of the link component is to map href value to ( e.g. href, to, etc. )</p> |
| importCustomLink.propsNamedImport | <code>string</code> | <p>What the custom link prop import is. This is used to provide type safety</p> |
| generate | <code>object</code> |  |
| [generate.linkComponent] | <code>boolean</code> | <p>Whether a link component should be generated. Default is <code>false</code></p> |
| [generate.redirectComponent] | <code>boolean</code> | <p>Whether a redirect component should be generated. Requires @route-codegen/react. Default is <code>false</code></p> |
| [generate.useRedirect] | <code>boolean</code> | <p>Whether a useRedirect react hook should be generated. Default is <code>false</code></p> |
| [generate.useParams] | <code>boolean</code> | <p>Whether a useParams react hook should be generated. Default is <code>false</code></p> |
| mode | <code>enum</code> | <p>&quot;strict&quot; or &quot;loose&quot;. Default is &quot;loose&quot;</p> |

<a name="TypescriptRouteConfigPluginConfig"></a>

## TypescriptRouteConfigPluginConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| config | <code>object</code> |  |
| [config.internalComponent] | <code>string</code> \| <code>Import</code> | <p>Optional arbitrary string that can be used to mark internal component OR an Import object to autowire to each route.</p> |
| [config.externalComponent] | <code>string</code> \| <code>Import</code> | <p>Optional arbitrary string that can be used to mark external component OR an Import object to autowire to each route.</p> |

