## Functions

<dl>
<dt><a href="#typescript-react-router-5 plugin">typescript-react-router-5 plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-react-router-5 is a plugin for internal routes
This will be used on routes marked as internals i.e. handled by react-router
and the default behaviour is client-side routing</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TypescriptReactRouter5PluginConfig">TypescriptReactRouter5PluginConfig</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="typescript-react-router-5 plugin"></a>

## typescript-react-router-5 plugin() ⇒ <code>Array.&lt;TemplateFile&gt;</code>
<p>typescript-react-router-5 is a plugin for internal routes
This will be used on routes marked as internals i.e. handled by react-router
and the default behaviour is client-side routing</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;TemplateFile&gt;</code> - <p>Array of generated TemplateFile. This can be manipulated by the <code>generate</code> config</p>  

| Type |
| --- |
| <code>TypescriptRouteConfigPluginConfig</code> | 

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

