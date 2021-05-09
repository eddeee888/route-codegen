## Functions

<dl>
<dt><a href="#typescript-route-config plugin">typescript-route-config plugin()</a> ⇒ <code>Array.&lt;TemplateFile&gt;</code></dt>
<dd><p>typescript-route-config is a generated-files-processor plugin.
This is used to create a Typescript version of the routeconfig
with internal and external relationships.
Internal and external component config can be used to further
hint callsites of route relationships.</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TypescriptRouteConfigPluginConfig">TypescriptRouteConfigPluginConfig</a> : <code>object</code></dt>
<dd></dd>
</dl>

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

<a name="TypescriptRouteConfigPluginConfig"></a>

## TypescriptRouteConfigPluginConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| config | <code>object</code> |  |
| [config.internalComponent] | <code>string</code> \| <code>Import</code> | <p>Optional arbitrary string that can be used to mark internal component OR an Import object to autowire to each route.</p> |
| [config.externalComponent] | <code>string</code> \| <code>Import</code> | <p>Optional arbitrary string that can be used to mark external component OR an Import object to autowire to each route.</p> |

