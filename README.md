# rekeys
React keyboard shortcuts in one line.

## Install

```
npm install @oqaan/rekeys
```

## Usage

```ts
import { useHotkeys } from '@oqaan/rekeys';

// Basic
useHotkeys('cmd+k', openSearch);

// With options
useHotkeys('cmd+s', save, { preventDefault: true, when: isEditing });

// Multiple shortcuts
useHotkeys([
  ['cmd+k', openSearch],
  ['cmd+s', save],
]);
```

## Options

| Option          | Type          | Default  | Description                                          |
|-----------------|---------------|----------|------------------------------------------------------|
| `preventDefault`| `boolean`     | `false`  | Calls `event.preventDefault()` on match             |
| `when`          | `boolean`     | `true`   | Set to `false` to disable the hotkey without removing it |
| `target`        | `EventTarget` | `window` | Element to attach the listener to                   |

## Modifiers

| Key        | Alias      | Notes                                      |
|------------|------------|--------------------------------------------|
| `cmd`      | `meta`     | ⌘ on Mac, Win key on Windows               |
| `ctrl`     | `control`  |                                            |
| `shift`    |            |                                            |
| `alt`      | `option`   |                                            |
| `mod`      |            | `cmd` on Mac, `ctrl` on Windows/Linux      |
