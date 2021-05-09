## Functions

<dl>
<dt><a href="#typescript-anchor plugin">typescript-anchor plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-anchor is a plugin for external routes
This will be used on routes marked as externals and the default behaviour is server-side routing</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TypescriptAnchorPluginConfig">TypescriptAnchorPluginConfig</a> : <code>object</code></dt>
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

