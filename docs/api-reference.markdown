---
layout: default
title: API Reference
nav_order: 3
---

# API Reference

# Navigation Structure
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

## `getSchema(namespace, name) -> Promise`
{:toc}

Get latest schema version for a given namespace and name. It caches versions in memory, so it only fetches from the API the first time any schema is used.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| namespace | `string` | Schema's namespace |
| name | `string` | Schema's name |

#### Example

```js
const schemadb = require('@schemadb/node-sdk');
schemadb.init('1036fae0-3a28-11ea-a5e3-...');
const schema = await schemadb.getSchema('com.example.store', 'order');
```

---------------