# rekeys

Tiny React hook for keyboard shortcuts.

[![npm](https://img.shields.io/npm/v/@oqaan/rekeys)](https://www.npmjs.com/package/@oqaan/rekeys)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@oqaan/rekeys)](https://bundlephobia.com/package/@oqaan/rekeys)
[![license](https://img.shields.io/npm/l/@oqaan/rekeys)](LICENSE)

## Install

```bash
npm install @oqaan/rekeys
```

## Why

Instead of writing this every time:

```ts
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'k') openSearch()
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [openSearch])
```

Just write:

```ts
useHotkeys('mod+k', openSearch)
```

## Usage

```ts
import { useHotkeys } from '@oqaan/rekeys'

// Basic
useHotkeys('mod+k', openSearch)

// With options
useHotkeys('mod+s', save, { preventDefault: true, when: isEditing })

// Multiple shortcuts
useHotkeys([
  ['mod+k', openSearch],
  ['mod+s', save],
])
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `preventDefault` | `boolean` | `false` | Calls `event.preventDefault()` on match |
| `when` | `boolean` | `true` | Set to `false` to disable without removing the listener |
| `target` | `EventTarget` | `window` | Element to attach the listener to |

## Modifiers

| Key | Alias | Notes |
|---|---|---|
| `cmd` | `meta` | ⌘ on Mac, Win key on Windows |
| `ctrl` | `control` | |
| `shift` | | |
| `alt` | `option` | |
| `mod` | | `cmd` on Mac, `ctrl` on Windows/Linux |

## License

MIT