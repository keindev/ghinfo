# Builder

Generate .ghinfo files with repo, npm package and media information


## Constructor

```typescript
new Builder(dir: string, type: string): Builder
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | *string* | Directory with media files |
| `type` | *string* | Repository content type |

**Returns:** [*Builder*](builder.md)

## Methods

### build

Build .ghinfo file structure

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paths` | *string*[] | media file paths |
| `pkg` | PackageJson | package.json content |
| `repo` | *string* | repository name |

### generate

create or rewrite .ghinfo file
